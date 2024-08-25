import Papa from "papaparse";

export async function downloadAndInsertDataFromExcel(fileName, s3Url, serviceName, stringA = "ABC", stringB = "SCN1") {
  const filenamedownload = fileName;
  const downloadURL = s3Url + filenamedownload;
  const BATCH_SIZE = 120000;
  const TEMP_SHEET_NAME = "tempAWSdata";
  const OUTPUTS_SHEET_NAME = "Report Genie Backend";

  async function fetchData() {
    console.log("Starting to fetch the file from S3...");
    const response = await fetch(downloadURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${response.statusText}`);
    }
    console.log("File fetched successfully. Streaming data in chunks...");
    return response.body;
  }

  async function processStream(stream, sheetName) {
    console.log("Starting to process stream...");
    const reader = stream.getReader();
    let rows = [];
    let buffer = "";

    return new Promise((resolve, reject) => {
      const processChunk = async ({ done, value }) => {
        if (done) {
          if (buffer) {
            processBuffer(buffer);
          }
          if (rows.length > 2) {
            rows = rows.slice(2);
            await normalizeAndInsert(rows, sheetName);
          }
          console.log("Stream processing completed.");
          resolve();
          return;
        }

        const text = new TextDecoder("utf-8").decode(value);
        const lines = (buffer + text).split("\n");
        buffer = lines.pop();

        for (let line of lines) {
          processBuffer(line);
        }

        if (rows.length >= BATCH_SIZE) {
          rows = rows.slice(2);
          await normalizeAndInsert(rows, sheetName);
          rows = [];
        }

        reader.read().then(processChunk).catch(reject);
      };

      reader.read().then(processChunk).catch(reject);
    });

    function processBuffer(line) {
      const parsedLine = Papa.parse(line, {
        header: false,
        dynamicTyping: true,
        skipEmptyLines: true,
        quoteChar: '"',
        escapeChar: '"',
      });

      if (parsedLine.errors.length === 0) {
        rows.push([stringA, stringB, ...parsedLine.data[0]]); // Add stringA to column A and stringB to column B
      } else {
        parsedLine.errors.forEach((err) => console.error(`CSV Parsing Error: ${err.message}`));
      }
    }
  }

  async function normalizeAndInsert(rows, sheetName) {
    const maxCols = Math.max(...rows.map((row) => row.length));
    console.log(`Normalizing rows to ${maxCols} columns.`);

    rows.forEach((row) => {
      while (row.length < maxCols) {
        row.push("");
      }
    });

    await insertParsedData(rows, sheetName);
  }

  function getColumnLetter(index) {
    let letter = "";
    while (index >= 0) {
      letter = String.fromCharCode((index % 26) + 65) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  }

  async function insertParsedData(rows, sheetName) {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItemOrNullObject(sheetName);
      await context.sync();

      if (sheet.isNullObject) {
        throw new Error(`Sheet "${sheetName}" does not exist.`);
      }

      const usedRange = sheet.getUsedRange();
      usedRange.load("rowCount");
      await context.sync();

      const lastRow = usedRange.rowCount + 1;
      const columnCount = rows[0].length;
      const maxColumnIndex = Math.min(16383, columnCount - 1);
      const endRow = lastRow + rows.length - 1;
      const rangeAddress = `A${lastRow}:${getColumnLetter(maxColumnIndex)}${endRow}`;

      console.log(`Range Address: ${rangeAddress}`);

      try {
        const range = sheet.getRange(rangeAddress);
        range.values = rows;
        await context.sync();
        console.log(`Inserted rows ${lastRow} to ${endRow} starting from column A in sheet "${sheetName}"`);
      } catch (error) {
        console.error("Error during Excel run:", error);
        throw new Error("Invalid range or sheet. Please check the range and sheet name.");
      }
    });
  }

  async function renameSheet(serviceName) {
    return Excel.run(async (context) => {
      const tempSheet = context.workbook.worksheets.getItemOrNullObject(TEMP_SHEET_NAME);
      await context.sync();

      if (tempSheet.isNullObject) {
        console.error(`Sheet "${TEMP_SHEET_NAME}" does not exist.`);
        return { success: false, newSheetName: null };
      }

      let newSheetName;

      if (serviceName === "GENERATE ACE SHEET") {
        const cellI5 = tempSheet.getRange("J5");
        cellI5.load("values");
        await context.sync();

        newSheetName = cellI5.values[0][0];
        if (!newSheetName) {
          console.error("Cell I5 is empty");
          return { success: false, newSheetName: null };
        }

        newSheetName = newSheetName
          .substring(0, 31)
          .replace(/[:\/\\\?\*\[\]]/g, "")
          .trim();
      } else if (serviceName === "RUN COMPUTATION") {
        newSheetName = "outputs";
        const existingSheet = context.workbook.worksheets.getItemOrNullObject(newSheetName);
        await context.sync();

        if (!existingSheet.isNullObject) {
          console.log("Outputs sheet already exists. Skipping rename.");
          return { success: true, newSheetName: null };
        }
      } else {
        console.error("Unknown service name.");
        return { success: false, newSheetName: null };
      }

      if (newSheetName && newSheetName !== "outputs") {
        const existingSheet = context.workbook.worksheets.getItemOrNullObject(newSheetName);
        await context.sync();

        if (!existingSheet.isNullObject) {
          existingSheet.delete();
          await context.sync();
        }
      }

      if (newSheetName) {
        tempSheet.name = newSheetName;
        await context.sync();
        console.log(`Sheet renamed to ${newSheetName}`);
      }

      return { success: true, newSheetName: newSheetName };
    }).catch((error) => {
      console.error("Error: " + error);
      return { success: false, newSheetName: null };
    });
  }

  try {
    console.log("Starting the download and insertion process...");
    const stream = await fetchData();

    if (serviceName === "RUN COMPUTATION") {
      await processStream(stream, OUTPUTS_SHEET_NAME);
      console.log("Data has been successfully inserted into the outputs sheet.");
      return { success: true, newSheetName: OUTPUTS_SHEET_NAME };
    } else {
      await createOrClearSheet(TEMP_SHEET_NAME);
      await processStream(stream, TEMP_SHEET_NAME);
      console.log("Data has been successfully inserted into the temp sheet.");

      return await renameSheet(serviceName);
    }
  } catch (error) {
    console.error("Error:", error);
    console.log("Failed to fetch data. Please try again.");
    return { success: false, newSheetName: null };
  }
}
