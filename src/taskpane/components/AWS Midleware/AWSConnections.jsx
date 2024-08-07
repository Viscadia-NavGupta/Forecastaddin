/// authentication funcitons
import * as XLSX from "xlsx";
import Papa from "papaparse";
import * as excelfunctions from "../ExcelMidleware/excelFucntions";
import React from "react";
import ReactDOM from "react-dom";
import { DialogProvider, useDialog } from "../dialogcontext";
import Overirdeconfirmation from "../OverideConfirmationpage";

function logCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  console.log(`Current Time: ${hours}:${minutes}:${seconds}`);
}

export async function orchestrationfucntion(
  buttonname,
  override_flag = "",
  UUID = "",
  forecast_uuid = "",
  scenarioname = "",
  cycleName = ""
) {
  try {
    const verified = await verifyRoleAndFetchSecrets(sessionStorage.getItem("username"), buttonname);
    console.log(verified);
    console.log("Secret Name:", verified.secret_name);
    console.log("Upload S3 URL:", verified.urls.UploadS3);
    console.log("Download S3 URL:", verified.urls.DownloadS3);
    console.log("Service Orchestration Lambda URL:", verified.urls.ServiceOrchestrationLambda);
    console.log("PollingLambda URL:", verified.urls.PollingLambda);
    var UUIDGenrated;
    if (UUID === "") {
      UUIDGenrated = await generateUUID();
      console.log(UUIDGenrated);
      if (buttonname === "GENERATE ACE SHEET" || buttonname === "RUN COMPUTATION") {
        var isUploaded = await uploadFileToS3(UUIDGenrated, verified.urls.UploadS3, buttonname);
        console.log("File uploaded to S3 successfully.");
      } else if (buttonname === "SAVE FORECAST" || buttonname === "UNLOCK FORECAST" || buttonname === "LOCK FORECAST") {
        isUploaded = true;
      }
    } else if (UUID != "") {
      UUIDGenrated = UUID;
      isUploaded = true;
    }

    if (isUploaded) {
      var serviceranflag = await runService(
        UUIDGenrated,
        buttonname,
        verified.secret_name,
        verified.urls.ServiceOrchestrationLambda,
        verified.urls.PollingLambda,
        override_flag,
        cycleName,
        scenarioname,
        forecast_uuid
      );
      // Additional logic if needed
    } else {
      console.log("Failed to upload the file to S3.");
      // Additional logic if needed
    }
    if (serviceranflag.result === true) {
      if (buttonname === "GENERATE ACE SHEET") {
        UUIDGenrated = UUIDGenrated + ".csv";
      }
      let outputflag = await downloadAndInsertDataFromExcel(UUIDGenrated, verified.urls.DownloadS3, buttonname);
      console.log(outputflag);
      if (outputflag.success && buttonname === "GENERATE ACE SHEET") {
        logCurrentTime();
        await excelfunctions.aceSheetformat(outputflag.newSheetName);
        logCurrentTime();
        return { uuid: UUIDGenrated, result: true };
      }
    } else if (serviceranflag.result === "Override") {
      return serviceranflag;
    }
  } catch (error) {
    console.error("Error in orchestrationfucntion:", error);
  }
}

export async function getCognitoAccessToken(username, password) {
  const clientId = "4nur5l5aqs5hp1tvurcc6gt5oj"; // Replace with your Cognito App Client ID
  const url = "https://cognito-idp.ap-south-1.amazonaws.com/";

  const body = JSON.stringify({
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-amz-json-1.1",
        "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        "X-Amz-User-Agent": "aws-amplify/0.1.x js",
      },
      body: body,
    });

    if (response.ok) {
      const responseBody = await response.json();
      if (responseBody.AuthenticationResult && responseBody.AuthenticationResult.IdToken) {
        const token = responseBody.AuthenticationResult.IdToken;
        console.log("Token received: ", token);
        return { success: true, token: token };
      } else {
        return { success: false, message: "Failed to retrieve token." };
      }
    } else {
      const errorBody = await response.json();
      const errorMessage = errorBody.message || "HTTP error! status: " + response.status;
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error("Error fetching Cognito access token:", error);
    return { success: false, message: error.message };
  }
}
///////////////// very roles and Secrects data

export async function verifyRoleAndFetchSecrets(email, buttonName) {
  try {
    // Validate email
    if (!email || email.indexOf("@") === -1) {
      throw new Error("Please enter a valid email address.");
    }

    const url = "https://k06jq91m02.execute-api.ap-south-1.amazonaws.com/ViscadiaTest/SQLdbQueryTest/user-login";
    const jsonPayload = JSON.stringify({
      email_id: email,
      action: buttonName,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonPayload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseBody = await response.json();
    console.log("Response Body:", responseBody); // Debugging line, remove if not needed

    // Extract the first result key and parse the JSON string
    const firstResultKey = Object.keys(responseBody.results)[0];
    const resultData = JSON.parse(responseBody.results[firstResultKey]);

    // Prepare the return data object
    const returnData = {
      secret_name: responseBody.secret_name,
      urls: {
        UploadS3: resultData.UploadS3,
        DownloadS3: resultData.DownloadS3,
        ServiceOrchestrationLambda: resultData.ServiceOrchestrationLambda,
        PollingLambda: resultData.PollingLambda,
      },
    };

    console.log("Return Data:", returnData); // Debugging line, remove if not needed

    return returnData;
  } catch (error) {
    console.error("Error in verifyRoleAndFetchSecrets:", error);
    throw error;
  }
}

/// UUID genrator

async function generateUUID() {
  // Generate a random UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    console.log(v.toString(16));
    return v.toString(16);
  });
}

export async function uploadFileToS3(uuid, uploadURL, buttonName) {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const range = sheet.getUsedRange();
      range.load(["values", "numberFormat"]);
      await context.sync();

      // Convert the sheet data to a workbook binary using XLSX
      const worksheetData = range.values;
      const numberFormats = range.numberFormat;

      // Create worksheet and apply values
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Apply number formats
      for (let R = 0; R < worksheetData.length; R++) {
        for (let C = 0; C < worksheetData[R].length; C++) {
          const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
          if (worksheet[cellRef]) {
            worksheet[cellRef].z = numberFormats[R][C];
          }
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        buttonName === "GENERATE ACE SHEET" ? "Model Management" : "ACE"
      );

      // Generate the binary output for the workbook
      const workbookBinary = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([workbookBinary], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Ensure that the uploadURL ends with a slash
      if (!uploadURL.endsWith("/")) {
        uploadURL += "/";
      }

      // Set the URL for the S3 bucket's endpoint with the filename as the UUID
      const strURL = `${uploadURL}${uuid}.xlsx`;

      const startTime = performance.now();

      const response = await fetch(strURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: blob,
      });

      const endTime = performance.now();
      const uploadTime = (endTime - startTime) / 1000; // Convert to seconds

      if (response.ok) {
        console.log(`File uploaded successfully. Time taken: ${uploadTime} seconds.`);
        return true; // Indicating success
      } else {
        console.error(`Error uploading file. Status code: ${response.status}`, await response.text());
        return false; // Indicating failure
      }
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return false; // Indicating failure
  }
}

//// polling

export async function poll(uuid, secret_name, pollingUrl) {
  // Validate input parameters
  if (!uuid || !secret_name || !pollingUrl) {
    console.log("All parameters must be provided.");
    return { uuid: uuid, result: false };
  }

  // Initialize attempts counter
  let attempts = 0;
  const maxAttempts = 100;
  const delay = 5000; // 5 seconds delay

  // Construct the JSON payload
  const jsonPayload = JSON.stringify({ uuid, secret_name });

  // Polling loop
  while (attempts < maxAttempts) {
    try {
      const response = await fetch(pollingUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonPayload,
      });

      const responseBodyText = await response.text();

      // Parse the first level of response
      let responseBody;
      try {
        responseBody = JSON.parse(responseBodyText);
      } catch (error) {
        console.error("Response is not valid JSON:", responseBodyText);
        return { uuid: uuid, result: false };
      }

      console.log("Parsed response:", responseBody);

      // Check the response status directly
      switch (responseBody.status) {
        case "DONE":
          return { uuid: uuid, result: true };
        case "PENDING":
          // Wait for a specified time (e.g., 5 seconds) before polling again
          await new Promise((resolve) => setTimeout(resolve, delay));
          attempts++;
          break;
        default:
          console.error("Service call failed:", responseBody.message, ". Please rerun the service.");
          return false;
      }
    } catch (error) {
      console.error("Error during polling:", error);
      return { uuid: uuid, result: false };
    }
  }

  console.error("Polling exceeded maximum attempts");
  return { uuid: uuid, result: false };
}

/// end of polling
export async function runService(
  uuid,
  buttonName,
  secret_name,
  serviceUrl,
  pollingUrl,
  override_flag = "",
  cycleName = "",
  scenarioname = "",
  forecastuuid = ""
) {
  // Validate input parameters
  if (!uuid || !buttonName || !secret_name || !serviceUrl) {
    console.error("All parameters must be provided.");
    return false;
  }

  // Construct the JSON payload based on the button name using switch case logic
  let jsonPayload;
  switch (buttonName) {
    case "GENERATE ACE SHEET":
    case "RUN COMPUTATION":
      jsonPayload = {
        uuid: uuid,
        buttonName: buttonName,
        secret_name: secret_name,
        override_flag: override_flag,
      };
      break;
    case "LOCK FORECAST":
    case "UNLOCK FORECAST":
    case "SAVE FORECAST":
      jsonPayload = {
        model_uuid: uuid,
        forecast_uuid: forecastuuid,
        buttonName: buttonName,
        secret_name: secret_name,
        cycle_name: cycleName,
        scenario_name: scenarioname,
      };
      break;
    default:
      jsonPayload = {
        uuid: uuid,
        buttonName: buttonName,
        secret_name: secret_name,
      };
      break;
  }

  try {
    // Make the HTTP request
    const response = await fetch(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonPayload),
    });

    const responseBody = await response.json();
    console.log(responseBody);

    // Check the response status
    if (responseBody.status === "Success" || responseBody.statusCode) {
      return { uuid: uuid, result: true };
    } else if (responseBody.message === "Endpoint request timed out") {
      // Poll for completion -> make an API call to polling lambda
      console.log("Polling for completion");
      return await poll(uuid, secret_name, pollingUrl);
    } else if (responseBody.status === "Override" && buttonName === "GENERATE ACE SHEET") {
      return { uuid: uuid, result: "Override" };
    } else {
      // alert("Model Generation cancelled by user.");
      return false;
    }
  } catch (error) {
    console.error("Error in service call:", error);
    return { uuid: uuid, result: false };
  }
}

// NEW CODE
export async function downloadAndInsertDataFromExcel(fileName, s3Url, serviceName) {
  const filenamedownload = fileName;
  const downloadURL = s3Url + filenamedownload;
  const BATCH_SIZE = 20000; // Number of rows per batch
  const NORMALIZE_BATCH_SIZE = 1000; // Number of rows to normalize at once
  const TEMP_SHEET_NAME = "tempAWSdata";

  // Fetch the data from S3
  async function fetchData() {
    console.log("Starting to fetch the file from S3...");
    const response = await fetch(downloadURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch the file: ${response.statusText}`);
    }
    console.log("File fetched successfully. Streaming data in chunks...");
    return response.body;
  }

  // Process the streamed data
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

    // Parse each line and add to rows
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

  // Normalize the rows to ensure they all have the same number of columns
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

  // Get Excel column letter from index
  function getColumnLetter(index) {
    let letter = "";
    while (index >= 0) {
      letter = String.fromCharCode((index % 26) + 65) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  }

  // Insert parsed data into the temp sheet
  async function insertParsedData(rows, startRow) {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(TEMP_SHEET_NAME);
      const endRow = startRow + rows.length - 1;
      const columnCount = rows[0].length;
      const rangeAddress = `A${startRow}:${getColumnLetter(columnCount - 1)}${endRow}`;

      console.log(`Range Address: ${rangeAddress}`);
      console.log(`Rows to insert:`, rows);

      const range = sheet.getRange(rangeAddress);
      range.values = rows;
      await sheet.context.sync();
      console.log(`Inserted rows ${startRow} to ${endRow}`);
    }).catch((error) => {
      console.error("Error during Excel run:", error);
    });
  }

  // Create a temp sheet
  async function createTempSheet(sheetName) {
    await Excel.run(async (context) => {
      // Check if the sheet exists and delete it if it does
      try {
        const tempSheet = context.workbook.worksheets.getItem(sheetName);
        tempSheet.delete();
        await context.sync();
      } catch (error) {
        console.log(`${sheetName} sheet does not exist. Proceeding to create it.`);
      }

      // Create a new sheet
      const tempSheet = context.workbook.worksheets.add(sheetName);
      await context.sync();
    }).catch((error) => {
      console.error("Error: " + error);
    });
  }

  // Rename the sheet based on the service name
  async function renameSheet(serviceName) {
    return Excel.run(async (context) => {
      const TEMP_SHEET_NAME = "tempAWSdata"; // Ensure this is correctly defined
      const tempSheet = context.workbook.worksheets.getItem(TEMP_SHEET_NAME);
      let newSheetName;

      if (serviceName === "GENERATE ACE SHEET") {
        const cellI5 = tempSheet.getRange("I5");
        cellI5.load("values");
        await context.sync();

        newSheetName = cellI5.values[0][0];
        if (newSheetName === "") {
          console.error("Cell I5 is empty");
          return { success: false, newSheetName: null };
        }

        // Truncate to 31 characters and remove invalid characters
        newSheetName = newSheetName.substring(0, 31).replace(/[:\/\\\?\*\[\]]/g, "");
        newSheetName = newSheetName.trim(); // Remove leading/trailing spaces
      } else if (serviceName === "RUN COMPUTATION") {
        newSheetName = "outputs";
      } else {
        console.error("Unknown service name.");
        return { success: false, newSheetName: null };
      }

      // Check if a sheet with the new name already exists
      let sheetExists = false;
      try {
        const existingSheet = context.workbook.worksheets.getItem(newSheetName);
        existingSheet.load("name");
        await context.sync();
        sheetExists = true;
      } catch (error) {
        sheetExists = false;
      }

      // If the sheet with the name already exists, delete it
      if (sheetExists) {
        const sheetToDelete = context.workbook.worksheets.getItem(newSheetName);
        sheetToDelete.delete();
        await context.sync();
      }

      // Rename the temporary sheet to the new name
      tempSheet.name = newSheetName;
      await context.sync();

      console.log(`Sheet renamed to ${newSheetName}`);
      return { success: true, newSheetName: newSheetName };
    }).catch((error) => {
      console.error("Error: " + error);
      return { success: false, newSheetName: null };
    });
  }
  // Main function logic
  try {
    console.log("Starting the download and insertion process...");
    const stream = await fetchData();

    // Create the temp sheet
    await createTempSheet(TEMP_SHEET_NAME);

    // Insert data into the temp sheet
    await processStream(stream);
    console.log("Data has been successfully inserted into the temp sheet.");

    // Rename the temp sheet based on the service name
    const result = await renameSheet(serviceName);
    return result;
  } catch (error) {
    console.error("Error:", error);
    console.log("Failed to fetch data. Please try again.");
    return { success: false, newSheetName: null };
  }
}
export async function uploadFileToS3test(uuid, uploadURL, buttonName) {
  try {
    return await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet();
      const range = sheet.getUsedRange();

      // Load additional properties
      range.load(["values", "numberFormat", "format/fill", "format/font", "format/borders"]);
      await context.sync();

      // Convert the sheet data to a workbook binary using XLSX
      const worksheetData = range.values;
      const numberFormats = range.numberFormat;
      const fills = range.format.fill;
      const fonts = range.format.font;
      const borders = range.format.borders;

      // Check and log worksheet data
      console.log("Worksheet Data:", worksheetData);

      // Handle empty cells by replacing undefined values with an empty string
      for (let R = 0; R < worksheetData.length; R++) {
        for (let C = 0; C < worksheetData[R].length; C++) {
          if (worksheetData[R][C] === undefined) {
            worksheetData[R][C] = "";
          }
        }
      }

      // Create worksheet and apply values
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Apply number formats, fills, fonts, and borders
      for (let R = 0; R < worksheetData.length; R++) {
        for (let C = 0; C < worksheetData[R].length; C++) {
          const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
          if (worksheet[cellRef]) {
            worksheet[cellRef].z = numberFormats[R][C]; // Number format

            // Ensure fills, fonts, and borders exist before applying
            worksheet[cellRef].s = {
              fill: fills[R] && fills[R][C] ? mapFills(fills[R][C]) : undefined,
              font: fonts[R] && fonts[R][C] ? mapFonts(fonts[R][C]) : undefined,
              border: borders[R] && borders[R][C] ? mapBorders(borders[R][C]) : undefined,
            };
          }
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        buttonName === "GENERATE ACE SHEET" ? "Model Management" : "ACE"
      );

      // Generate the binary output for the workbook
      const workbookBinary = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([workbookBinary], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Ensure that the uploadURL ends with a slash
      if (!uploadURL.endsWith("/")) {
        uploadURL += "/";
      }

      const strURL = `${uploadURL}${uuid}.xlsx`;

      const startTime = performance.now();
      const response = await fetch(strURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: blob,
      });
      const endTime = performance.now();
      const uploadTime = (endTime - startTime) / 1000; // Convert to seconds

      if (response.ok) {
        console.log(`File uploaded successfully. Time taken: ${uploadTime} seconds.`);
        return true; // Indicating success
      } else {
        console.error(`Error uploading file. Status code: ${response.status}`, await response.text());
        return false; // Indicating failure
      }
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return false; // Indicating failure
  }
}

// Helper Functions

function mapBorders(borders) {
  const borderStyles = {};

  if (borders) {
    const sides = ["top", "bottom", "left", "right"];
    sides.forEach((side) => {
      if (borders[side]) {
        borderStyles[side] = {
          style: borders[side].style,
          color: { rgb: borders[side].color },
        };
      }
    });
  }

  return borderStyles;
}

function mapFonts(font) {
  return {
    name: font.name,
    color: { rgb: font.color },
    bold: font.bold,
    italic: font.italic,
    underline: font.underline ? true : undefined,
    size: font.size,
  };
}

function mapFills(fill) {
  return {
    fgColor: { rgb: fill.color },
  };
}
