async function downloadAndInsertDataFromExcel() {
    const fileName = "test.csv";
    const s3Url = `https://viscadia-forecasting-data.s3.amazonaws.com/viscadia_test/${fileName}`;
    const BATCH_SIZE = 20000; // Number of rows per batch
    const NORMALIZE_BATCH_SIZE = 1000; // Number of rows to normalize at once

    async function fetchData() {
      console.log("Starting to fetch the file from S3...");
      alert("Done");
      const response = await fetch(s3Url);
      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }
      console.log("File fetched successfully. Streaming data in chunks...");

      return response.body;
    }

    async function processStream(stream) {
      console.log("Starting to process stream...");
      const reader = stream.getReader();
      let rows = [];
      let rowIndex = 1; // Initialize row index for insertion
      let buffer = ""; // Buffer for incomplete lines

      return new Promise((resolve, reject) => {
        const processChunk = async ({ done, value }) => {
          if (done) {
            if (buffer) {
              processBuffer(buffer); // Process any remaining buffer
            }
            if (rows.length > 0) {
              await normalizeRows(rows);
              await insertParsedData(rows, rowIndex);
              rowIndex += rows.length;
            }
            console.log("Stream processing completed.");
            resolve();
            return;
          }

          const text = new TextDecoder("utf-8").decode(value);
          const lines = (buffer + text).split("\n");
          buffer = lines.pop(); // Save last line in buffer in case it's incomplete

          for (let line of lines) {
            processBuffer(line);
          }

          if (rows.length >= BATCH_SIZE) {
            await normalizeRows(rows);
            await insertParsedData(rows.slice(0, BATCH_SIZE), rowIndex);
            rowIndex += BATCH_SIZE;
            rows = rows.slice(BATCH_SIZE);
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
          error: function (error) {
            console.error(`Error parsing line: ${error.message}`);
          },
        });

        if (parsedLine.errors.length > 0) {
          parsedLine.errors.forEach((err) => console.error(`CSV Parsing Error: ${err.message}`));
        } else {
          rows.push(parsedLine.data[0]);
        }
      }
    }

    async function normalizeRows(rows) {
      return new Promise((resolve) => {
        const maxCols = Math.max(...rows.map((row) => row.length));
        console.log(`Normalizing rows to ${maxCols} columns.`);
        let index = 0;

        function normalizeBatch() {
          const endIndex = Math.min(index + NORMALIZE_BATCH_SIZE, rows.length);
          for (let i = index; i < endIndex; i++) {
            while (rows[i].length < maxCols) {
              rows[i].push("");
            }
          }
          index = endIndex;
          if (index < rows.length) {
            requestAnimationFrame(normalizeBatch);
          } else {
            resolve();
          }
        }

        normalizeBatch();
      });
    }

    async function insertParsedData(rows, startRow) {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getActiveWorksheet();
        const endRow = startRow + rows.length - 1;
        const rangeAddress = `A${startRow}:${String.fromCharCode(65 + rows[0].length - 1)}${endRow}`;
        const range = sheet.getRange(rangeAddress);
        range.values = rows;
        await sheet.context.sync();
        console.log(`Inserted rows ${startRow} to ${endRow}`);
      }).catch((error) => {
        console.error("Error during Excel run:", error);
      });
    }

    try {
      console.log("Starting the download and insertion process...");
      const stream = await fetchData();
      await processStream(stream);
      console.log("Data has been successfully inserted into the worksheet.");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch data. Please try again.");
    }
  }