export async function addAssumption() {
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const selectedRange = context.workbook.getSelectedRange();
    selectedRange.load(["address", "columnIndex", "rowIndex"]);
    await context.sync();

    console.log("Selected Range Address:", selectedRange.address);

    // Check if there is an active cell
    if (!selectedRange.address) {
      console.error("No cell selected.");
      console.log("No selected cell");
      return;
    }

    // Initialize variables to store dynamic column numbers
    let modelAssumptionIndex;
    let colAN, colBB, colAP, colAO;

    const checkRow = 7; // Change this row as needed to where the labels are expected to be
    const checkRowRange = sheet.getRange(`A${checkRow}:AAA${checkRow}`); // Adjust the column range if needed
    checkRowRange.load("values");
    await context.sync();

    console.log("Check 1: Row values loaded");

    try {
      console.log("Check Row Range Values: ", checkRowRange.values);

      if (!checkRowRange.values || checkRowRange.values.length === 0 || !checkRowRange.values[0]) {
        console.error("Row values are empty or null.");
        return;
      }

      const rowValues = checkRowRange.values[0];
      console.log("Row Values:", rowValues);

      for (let i = 0; i < rowValues.length; i++) {
        if (rowValues[i] === "Model Assumptions") {
          modelAssumptionIndex = i + 1; // 1-based index
          console.log("Model Assumption Index:", modelAssumptionIndex);
          break;
        }
      }

      console.log("Check 2");

      if (!modelAssumptionIndex) {
        console.error("Model Assumptions not found.");
        return;
      }

      // Set the dynamic column numbers based on the index of "Model Assumptions"
      colAN = modelAssumptionIndex; // Column AN dynamically where "Model Assumptions" is found
      colBB = modelAssumptionIndex + 14; // Column BB dynamically 14 columns after "Model Assumptions"
      colAP = modelAssumptionIndex + 2; // Column AP dynamically 2 columns after "Model Assumptions"
      colAO = modelAssumptionIndex + 1; // Column AO dynamically 1 column after "Model Assumptions"

      const col = selectedRange.columnIndex + 1; // 1-based column index
      const row = selectedRange.rowIndex + 1; // 1-based row index

      console.log(`Selected Cell: Row ${row}, Column ${col}`);

      const withinRange = col >= colAN && col <= colBB;
      console.log("Within Range:", withinRange);

      if (withinRange) {
        const modelAssumptionRange = sheet.getRangeByIndexes(row - 1, colAN - 1, 1, colBB - colAN + 1);
        const previosvalueselectedcell = sheet.getRangeByIndexes(row - 2, colAN - 1, 1, colBB - colAN + 1);
        modelAssumptionRange.load("values");
        previosvalueselectedcell.load("values");
        await context.sync();

        console.log("Model Assumption Range Values:", modelAssumptionRange.values);

        const snumbercheck = previosvalueselectedcell.values[0][colAP - colAN];

        const currentValue = modelAssumptionRange.values[0][colAP - colAN];
        let currentVal = isNaN(currentValue) ? 1 : currentValue;

        console.log("Current Value:", currentVal);

        if (snumbercheck != "S.No" && snumbercheck != "") {
          // Insert row only between AN and BB
          modelAssumptionRange.insert(Excel.InsertShiftDirection.down);
          modelAssumptionRange.getCell(0, colAP - colAN).values = [[currentVal]];
          console.log(colAN);
          console.log(colAO);

          // Copy values from AN and AO only
          const previousRowAN = sheet.getRangeByIndexes(row - 2, colAN - 1, 1, 1);
          const previousRowAO = sheet.getRangeByIndexes(row - 2, colAO - 1, 1, 1);
          previousRowAN.load("values");
          previousRowAO.load("values");
          previousRowAN.load("address");
          previousRowAO.load("address");
          await context.sync();

          console.log("Previous Row AN Values:", previousRowAN.values);
          console.log("Previous Row AO Values:", previousRowAO.values);
          console.log("Previous Row AN Values:", previousRowAN.address);
          console.log("Previous Row AO Values:", previousRowAO.address);

          const newRowAN = sheet.getRangeByIndexes(row - 1, colAN - 1, 1, 1);
          const newRowAO = sheet.getRangeByIndexes(row - 1, colAO - 1, 1, 1);
          const newRowAOindex = sheet.getRangeByIndexes(row - 1, colAO, 1, 1);

          newRowAN.values = previousRowAN.values;
          newRowAO.values = previousRowAO.values;
          newRowAOindex.values = currentValue;

          // Update the sequence in column AP starting from the row immediately after the inserted row
          let assumptionsnumber = currentValue;
          let i = row;
          while (true) {
            const cellAP = sheet.getRangeByIndexes(i, colAP - 1, 1, 1);
            const cellAN = sheet.getRangeByIndexes(i, colAN - 1, 1, 1);
            cellAP.load("values");
            cellAN.load("values");
            await context.sync();

            if (cellAP.values[0][0] === "" || cellAN.values[0][0] !== "Model Assumptions") break;

            assumptionsnumber += 1;
            cellAP.values = [[assumptionsnumber]];
            i++;
          }

          console.log("Row inserted and values updated between columns AN and BB.");
        } else {
          console.error("Selected cell is outside the specified column range (AN-BB). No row inserted.");
        }

        await context.sync();
      }
    } catch (error) {
      console.error("Error processing row values:", error);
    }
  });
}

export async function deleteAssumption() {
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const selectedRange = context.workbook.getSelectedRange();
    selectedRange.load(["address", "columnIndex", "rowIndex"]);
    await context.sync();

    console.log("Selected Range Address:", selectedRange.address);

    // Check if there is an active cell
    if (!selectedRange.address) {
      console.error("No cell selected.");
      console.log("No selected cell");
      return;
    }

    // Initialize variables to store dynamic column numbers
    let modelAssumptionIndex;
    let colAN, colBB, colAP, colAO;

    const checkRow = 7; // Change this row as needed to where the labels are expected to be
    const checkRowRange = sheet.getRange(`A${checkRow}:AAA${checkRow}`); // Adjust the column range if needed
    checkRowRange.load("values");
    await context.sync();

    console.log("Check 1: Row values loaded");

    try {
      console.log("Check Row Range Values: ", checkRowRange.values);

      if (!checkRowRange.values || checkRowRange.values.length === 0 || !checkRowRange.values[0]) {
        console.error("Row values are empty or null.");
        return;
      }

      const rowValues = checkRowRange.values[0];
      console.log("Row Values:", rowValues);

      for (let i = 0; i < rowValues.length; i++) {
        if (rowValues[i] === "Model Assumptions") {
          modelAssumptionIndex = i + 1; // 1-based index
          console.log("Model Assumption Index:", modelAssumptionIndex);
          break;
        }
      }

      console.log("Check 2");

      if (!modelAssumptionIndex) {
        console.error("Model Assumptions not found.");
        return;
      }

      // Set the dynamic column numbers based on the index of "Model Assumptions"
      colAN = modelAssumptionIndex; // Column AN dynamically where "Model Assumptions" is found
      colBB = modelAssumptionIndex + 14; // Column BB dynamically 14 columns after "Model Assumptions"
      colAP = modelAssumptionIndex + 2; // Column AP dynamically 2 columns after "Model Assumptions"
      colAO = modelAssumptionIndex + 1; // Column AO dynamically 1 column after "Model Assumptions"

      const col = selectedRange.columnIndex + 1; // 1-based column index
      const row = selectedRange.rowIndex + 1; // 1-based row index

      console.log(`Selected Cell: Row ${row}, Column ${col}`);

      const withinRange = col >= colAN && col <= colBB;
      console.log("Within Range:", withinRange);

      if (withinRange) {
        const activeCellRange = sheet.getRangeByIndexes(row - 1, colAN - 1, 1, colBB - colAN + 1);
        activeCellRange.load("values");
        await context.sync();

        const cellAN = sheet.getRangeByIndexes(row - 1, colAN - 1, 1, 1);
        const cellANAbove = sheet.getRangeByIndexes(row - 2, colAN - 1, 1, 1);
        const cellANBelow = sheet.getRangeByIndexes(row, colAN - 1, 1, 1);
        const previousSNocell = sheet.getRangeByIndexes(row - 2, colAN + 1, 1, 1);

        cellAN.load("values");
        cellANAbove.load("values");
        cellANBelow.load("values");
        previousSNocell.load("values");
        await context.sync();

        const snumbercheck = previousSNocell.values;

        if (
          cellAN.values[0][0] === "Model Assumptions" &&
          (cellANAbove.values[0][0] === "Model Assumptions" || cellANBelow.values[0][0] === "Model Assumptions") &&
          snumbercheck != "S.No"
        ) {
          // Delete the row
          activeCellRange.delete(Excel.DeleteShiftDirection.up);

          // Update the sequence in column AP starting from the deleted row
          let i = row - 1; // Start from the current row
          const previousValueRange = sheet.getRangeByIndexes(i - 1, colAP - 1, 1, 1);
          previousValueRange.load("values");
          await context.sync();
          let currentVal = previousValueRange.values[0][0] + 1;

          while (true) {
            const cellAP = sheet.getRangeByIndexes(i, colAP - 1, 1, 1);
            const cellAN = sheet.getRangeByIndexes(i, colAN - 1, 1, 1);
            cellAP.load("values");
            cellAN.load("values");
            await context.sync();

            if (cellAP.values[0][0] === "" || cellAN.values[0][0] !== "Model Assumptions") break;

            cellAP.values = [[currentVal]];
            currentVal += 1;
            i++;
          }

          console.log("Row deleted and values updated between columns AN and BB.");
        } else {
          console.error("Adjacent rows do not meet criteria. No row deleted.");
        }
      } else {
        console.error("Selected cell is outside the specified column range (AN-BB). No row deleted.");
      }

      await context.sync();
    } catch (error) {
      console.error("Error processing row values:", error);
    }
  });
}

export async function addFlow() {
  await Excel.run(async (context) => {
    try {
      console.log("Start addFlow function");

      const sheet = context.workbook.worksheets.getActiveWorksheet();
      sheet.load("name");
      await context.sync();
      console.log("Active sheet retrieved:", sheet.name);

      // Define helper variables
      let helperColumn1, helperColumn2;

      // Define the predefined data array
      const predefinedArray = [
        [
          "S.No",
          "Assumption Name",
          "Outputs Names",
          "Assumption Application",
          "Override",
          "Relation",
          "Granularity",
          "Data Type",
          "Line of Therapy",
          "Patient Segment",
          "Patient Sub-Segment",
          "Product",
          "SKU",
        ],
        ["1", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["2", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["3", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["4", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["5", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["6", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["7", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["8", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["9", "", "", "", "", "", "", "", "", "", "", "", ""],
        ["10", "", "", "", "", "", "", "", "", "", "", "", ""],
      ];

      // Scan row 7 to find 'Model Assumptions' and 'Flow 1'
      const checkRow = 7;
      const checkRowRange = sheet.getRange(`A${checkRow}:ZZ${checkRow}`);
      checkRowRange.load("values");
      await context.sync();
      console.log("Row values loaded: ", checkRowRange.values);

      const rowValues = checkRowRange.values[0];
      for (let i = 0; i < rowValues.length; i++) {
        if (rowValues[i] === "Model Assumptions") {
          helperColumn1 = i + 1;
        } else if (rowValues[i] === "Flow 1") {
          helperColumn2 = i + 1;
        }
      }

      if (!helperColumn1 || !helperColumn2) {
        console.error("Model Assumptions or Flow 1 not found in row 7.");
        return;
      }

      console.log("Helper columns identified: Model Assumptions at", helperColumn1, "Flow 1 at", helperColumn2);

      // Find the last row with data in the dynamically found column Helpercolumn2
      const usedRange = sheet.getUsedRange();
      usedRange.load("rowCount");
      await context.sync();
      const lastRowRange = sheet.getRange(
        `${String.fromCharCode(64 + helperColumn2)}1:${String.fromCharCode(64 + helperColumn2)}${usedRange.rowCount}`
      );
      lastRowRange.load("values");
      await context.sync();
      console.log("Last row values loaded:", lastRowRange.values);

      // Create a dictionary to ensure uniqueness
      const uniqueValues = new Set();
      const helperArray = [];
      for (let i = 0; i < lastRowRange.values.length; i++) {
        const value = lastRowRange.values[i][0];
        helperArray.push(value);
        uniqueValues.add(value);
      }

      console.log("Helper array populated and unique values identified:", uniqueValues);

      // Calculate starting row for pasting predefined array
      const pasteStartRow = 4 + helperArray.length;
      const pasteStartCol = helperColumn2 + 1; // Paste column is dynamically one more than Helpercolumn2

      console.log("Paste start row:", pasteStartRow, "Paste start column:", pasteStartCol);

      // Paste predefined array data starting from the calculated row in column right next to Helpercolumn2
      const pasteRange = sheet.getRangeByIndexes(
        pasteStartRow - 1,
        pasteStartCol - 1,
        predefinedArray.length,
        predefinedArray[0].length
      );
      pasteRange.values = predefinedArray;
      await context.sync();

      console.log("Predefined array data pasted successfully");

      // Write "Model Assumptions" in column Helpercolumn1
      const modelAssumptionStartRow = 5 + helperArray.length;
      const modelAssumptionEndRow = 14 + helperArray.length;
      const modelAssumptionRange = sheet.getRangeByIndexes(
        modelAssumptionStartRow - 1,
        helperColumn1 - 1,
        modelAssumptionEndRow - modelAssumptionStartRow + 1,
        1
      );
      const modelAssumptionValues = Array(modelAssumptionEndRow - modelAssumptionStartRow + 1).fill([
        "Model Assumptions",
      ]);
      modelAssumptionRange.values = modelAssumptionValues;
      await context.sync();

      console.log("Model Assumptions text added");

      // Write "Flow X" where X is the number of unique elements in HelperArray
      const flowText = `Flow ${uniqueValues.size}`;
      const flowTextStartRow = helperArray.length + 3;
      const flowTextRange = sheet.getRangeByIndexes(flowTextStartRow - 1, helperColumn2 - 1, 1, 1);
      const flowTextRangeNext = sheet.getRangeByIndexes(flowTextStartRow - 1, helperColumn2, 1, 1);
      flowTextRange.values = [[flowText]];
      flowTextRangeNext.values = [[flowText]];

      const flowTextFillRange = sheet.getRangeByIndexes(
        modelAssumptionStartRow - 1,
        helperColumn2 - 1,
        modelAssumptionEndRow - modelAssumptionStartRow + 1,
        1
      );
      const flowTextFillValues = Array(modelAssumptionEndRow - modelAssumptionStartRow + 1).fill([flowText]);
      flowTextFillRange.values = flowTextFillValues;
      await context.sync();

      console.log("Flow text added successfully");
    } catch (error) {
      console.error("Error in addFlow function:", error);
    }
  });
}

// export async function copyFormatting(context, sourceRangeAddress, destinationRangeAddress) {
//   const sheet = context.workbook.worksheets.getActiveWorksheet();

//   // Get the source and destination ranges
//   const sourceRange = sheet.getRange(sourceRangeAddress);
//   const destinationRange = sheet.getRange(destinationRangeAddress);

//   // Copy the formatting from source to destination
//   destinationRange.copyFrom(sourceRange, Excel.RangeCopyType.formats);

//   await context.sync();
//   console.log(`Formatting copied from ${sourceRangeAddress} to ${destinationRangeAddress}`);
// }

export async function copyFormattingAndDataValidation(context, sourceRangeAddress, destinationRangeAddress) {
  const sheet = context.workbook.worksheets.getActiveWorksheet();

  // Get the source and destination ranges
  const sourceRange = sheet.getRange(sourceRangeAddress);
  const destinationRange = sheet.getRange(destinationRangeAddress);

  // Copy the formatting from source to destination
  destinationRange.copyFrom(sourceRange, Excel.RangeCopyType.formats);
  await context.sync();
  console.log("Process 1: Formatting copied");

  // Load the data validation from the source range
  sourceRange.load(["address", "rowCount", "columnCount", "dataValidation"]);
  await context.sync();
  console.log("Process 2: Data validation loaded from source range");

  const rowCount = sourceRange.rowCount;
  const colCount = sourceRange.columnCount;

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < colCount; j++) {
      const srcCell = sourceRange.getCell(i, j);
      const destCell = destinationRange.getCell(i, j);

      srcCell.load("dataValidation");
      await context.sync();

      const dataValidation = srcCell.dataValidation;
      if (dataValidation && dataValidation.rule) {
        console.log(`Applying data validation for cell (${i}, ${j})`);

        destCell.dataValidation.rule = dataValidation.rule;
        destCell.dataValidation.errorAlert = dataValidation.errorAlert;
        destCell.dataValidation.prompt = dataValidation.prompt;
        console.log(`Data validation applied for cell (${i}, ${j})`);
      }
    }
  }

  await context.sync();
  console.log(`Formatting and data validation copied from ${sourceRangeAddress} to ${destinationRangeAddress}`);
}

// export async function addDimension1(context) {
//   console.log("Start addDimension function");
//   await Excel.run(async (context) => {
//     const sheet = context.workbook.worksheets.getActiveWorksheet();
//     sheet.load("name");
//     await context.sync();
//     console.log("Active sheet retrieved:", sheet.name);

//     const checkRow = 7;
//     const usedRange = sheet.getUsedRange();
//     usedRange.load(["address", "values", "rowCount", "columnCount"]);
//     await context.sync();

//     console.log("Row values loaded:", usedRange.values);
//     console.log("Used range address:", usedRange.address);
//     console.log("Used range rowCount:", usedRange.rowCount);
//     console.log("Used range columnCount:", usedRange.columnCount);

//     let colModelDim = 0;
//     const rowValues = usedRange.values[checkRow - 1];

//     // Find the 'Modeling Dimensions' column
//     for (let i = 0; i < rowValues.length; i++) {
//       if (rowValues[i] === "Modeling Dimensions") {
//         colModelDim = i + 1; // 1-based index
//         break;
//       }
//     }

//     if (colModelDim === 0) {
//       console.error("Column 'Modeling Dimensions' not found.");
//       return;
//     }

//     console.log("Modeling Dimensions column identified at:", colModelDim);

//     const col2 = colModelDim + 1;

//     // Calculate unique elements in col2 excluding the first 3 rows
//     const uniqueDict = {};
//     const col2Range = sheet.getRangeByIndexes(7, col2 - 1, usedRange.rowCount - 7, 1);
//     col2Range.load("values");
//     await context.sync();

//     col2Range.values.forEach((row) => {
//       const cellValue = row[0];
//       if (cellValue && !uniqueDict[cellValue]) {
//         uniqueDict[cellValue] = true;
//       }
//     });

//     const uniqueCount = Object.keys(uniqueDict).length + 1;
//     console.log("Unique elements in col2 identified:", uniqueCount - 1);

//     // Define and copy source and destination ranges
//     const lastRow = usedRange.rowCount + 1;
//     const sourceRange = sheet.getRangeByIndexes(lastRow - 2, colModelDim - 1, 1, 5);
//     const destinationRange = sheet.getRangeByIndexes(lastRow - 1, colModelDim - 1, 1, 5);

//     // Copy the formatting from source to destination
//     destinationRange.copyFrom(sourceRange, Excel.RangeCopyType.formats);
//     await context.sync();
//     console.log("Source range values and formats copied to destination range");

//     // Write the calculated node value in col2 of the new row
//     const newCell = sheet.getRangeByIndexes(lastRow - 1, col2 - 1, 1, 1);
//     newCell.values = [["Node " + uniqueCount]];
//     console.log("Node value written to new row");

//     // Adjust column widths
//     const columnsRange = sheet.getRangeByIndexes(0, colModelDim - 1, 1, 5);
//     columnsRange.format.autofitColumns();
//     console.log("Column widths adjusted");

//     // Copy data validation for each cell in the range
//     sourceRange.load(["address", "values", "rowCount", "columnCount","dataValidation"]);
//     await context.sync();
//     for (let rowIndex = 0; rowIndex < sourceRange.rowCount; rowIndex++) {
//       for (let colIndex = 0; colIndex < sourceRange.columnCount; colIndex++) {
//         const srcCell = sourceRange.getCell(rowIndex, colIndex);
//         const dstCell = destinationRange.getCell(rowIndex, colIndex);
//         srcCell.load("dataValidation");
//         await context.sync();

//         if (srcCell.dataValidation && srcCell.dataValidation.rule) {
//           dstCell.dataValidation.rule = srcCell.dataValidation.rule;
//           dstCell.dataValidation.errorAlert = srcCell.dataValidation.errorAlert;
//           dstCell.dataValidation.prompt = srcCell.dataValidation.prompt;
//           console.log(`Data validation copied from source cell (${rowIndex}, ${colIndex}) to destination cell.`);
//         } else {
//           console.log(`No data validation found for source cell (${rowIndex}, ${colIndex}).`);
//         }
//       }
//     }

//     await context.sync();
//     console.log(`Formatting and data validation copied from source to destination range.`);
//   }).catch((error) => {
//     console.error("Error in addDimension function:", error);
//   });
// }

export async function addDimension1(context) {
  console.log("Start addDimension function");
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    sheet.load("name");
    await context.sync();
    console.log("Active sheet retrieved:", sheet.name);

    const checkRow = 7;
    const usedRange = sheet.getUsedRange();
    usedRange.load(["address", "values", "rowCount", "columnCount"]);
    await context.sync();

    console.log("Row values loaded:", usedRange.values);
    console.log("Used range address:", usedRange.address);
    console.log("Used range rowCount:", usedRange.rowCount);
    console.log("Used range columnCount:", usedRange.columnCount);

    let colModelDim = 0;
    const rowValues = usedRange.values[checkRow - 1];

    // Find the 'Modeling Dimensions' column
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "Modeling Dimensions") {
        colModelDim = i + 1; // 1-based index
        break;
      }
    }

    if (colModelDim === 0) {
      console.error("Column 'Modeling Dimensions' not found.");
      return;
    }

    console.log("Modeling Dimensions column identified at:", colModelDim);

    const col2 = colModelDim + 1;

    // Calculate unique elements in col2 excluding the first 3 rows
    const uniqueDict = {};
    const col2Range = sheet.getRangeByIndexes(7, col2 - 1, usedRange.rowCount - 7, 1);
    col2Range.load("values");
    await context.sync();

    col2Range.values.forEach((row) => {
      const cellValue = row[0];
      if (cellValue && !uniqueDict[cellValue]) {
        uniqueDict[cellValue] = true;
      }
    });

    const uniqueCount = Object.keys(uniqueDict).length + 1;
    console.log("Unique elements in col2 identified:", uniqueCount - 1);

    // Find the last filled row in the colModelDim column
    const colModelDimRange = sheet.getRangeByIndexes(0, colModelDim - 1, usedRange.rowCount, 1);
    colModelDimRange.load(["values", "rowIndex"]);
    await context.sync();

    let lastFilledRow = 0;
    for (let i = colModelDimRange.values.length - 1; i >= 0; i--) {
      if (colModelDimRange.values[i][0] !== "") {
        lastFilledRow = colModelDimRange.rowIndex + i + 1;
        break;
      }
    }
    console.log("Last filled row in colModelDim identified at:", lastFilledRow);

    // Define and copy source and destination ranges
    const sourceRange = sheet.getRangeByIndexes(lastFilledRow - 1, colModelDim - 1, 1, 5);
    const destinationRange = sheet.getRangeByIndexes(lastFilledRow, colModelDim - 1, 1, 5);

    // Copy the formatting from source to destination
    destinationRange.copyFrom(sourceRange, Excel.RangeCopyType.formats);
    await context.sync();
    console.log("Source range values and formats copied to destination range");

    // Write the calculated node value in col2 of the new row
    const newCell = sheet.getRangeByIndexes(lastFilledRow, col2 - 1, 1, 1);
    await context.sync();
    newCell.values = [["Node " + uniqueCount]];
    await context.sync();
    console.log("Node value written to new row");

    // adding model Dimenison in new row
    const newCell1 = sheet.getRangeByIndexes(lastFilledRow, col2 - 2, 1, 1);
    await context.sync();
    newCell1.values = [["Modeling Dimensions"]];
    await context.sync();
    console.log("Modeling Dimensions value written to new row");

    // Adjust column widths
    const columnsRange = sheet.getRangeByIndexes(0, colModelDim - 1, 1, 5);
    columnsRange.format.autofitColumns();
    console.log("Column widths adjusted");

    await context.sync();
    // console.log(`Formatting and data validation copied from source to destination range.`);
  }).catch((error) => {
    console.error("Error in addDimension function:", error);
  });
}

export async function addProduct(context) {
  console.log("Start sku function");
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    sheet.load("name");
    await context.sync();
    console.log("Active sheet retrieved:", sheet.name);

    const checkRow = 7;
    const usedRange = sheet.getUsedRange();
    usedRange.load(["address", "values", "rowCount", "columnCount"]);
    await context.sync();

    console.log("Row values loaded:", usedRange.values);
    console.log("Used range address:", usedRange.address);
    console.log("Used range rowCount:", usedRange.rowCount);
    console.log("Used range columnCount:", usedRange.columnCount);

    let colModelDim = 0;
    const rowValues = usedRange.values[checkRow - 1];

    // Find the 'SKU Characterization' column
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "SKU Characterization") {
        colModelDim = i + 1; // 1-based index
        break;
      }
    }

    let colProductTracking = 0;
    // Find the 'Product Tracking' column
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "Product Tracking") {
        colProductTracking = i + 1; // 1-based index
        break;
      }
    }
    console.log("SKU Characterization column identified at:", colProductTracking);

    if (colModelDim === 0) {
      console.error("Column 'SKU Characterization' not found.");
      return;
    }

    console.log("SKU Characterization column identified at:", colModelDim);

    const col2 = colModelDim + 1;

    // Calculate unique elements in col2 excluding the first 3 rows
    const uniqueDict = {};
    const col2Range = sheet.getRangeByIndexes(7, col2 - 1, usedRange.rowCount - 7, 1);
    col2Range.load("values");
    await context.sync();

    col2Range.values.forEach((row) => {
      const cellValue = row[0];
      if (cellValue && !uniqueDict[cellValue]) {
        uniqueDict[cellValue] = true;
      }
    });

    const uniqueCount = Object.keys(uniqueDict).length + 1;
    console.log("Unique elements in col2 identified:", uniqueCount - 1);

    // Find the last filled row in the colModelDim column
    const colModelDimRange = sheet.getRangeByIndexes(0, colModelDim - 1, usedRange.rowCount, 1);
    colModelDimRange.load(["values", "rowIndex"]);
    await context.sync();

    let lastFilledRow = 0;
    for (let i = colModelDimRange.values.length - 1; i >= 0; i--) {
      if (colModelDimRange.values[i][0] !== "") {
        lastFilledRow = colModelDimRange.rowIndex + i + 1;
        break;
      }
    }
    console.log("Last filled row in colModelDim identified at:", lastFilledRow);

    // Define and copy source and destination ranges
    const sourceRange = sheet.getRangeByIndexes(
      lastFilledRow - 1,
      colModelDim - 1,
      1,
      1 + colProductTracking - colModelDim
    );
    const destinationRange = sheet.getRangeByIndexes(
      lastFilledRow,
      colModelDim - 1,
      1,
      1 + colProductTracking - colModelDim
    );
    console.log(sourceRange);
    console.log(destinationRange);

    // Copy the formatting from source to destination
    destinationRange.copyFrom(sourceRange, Excel.RangeCopyType.formats);
    await context.sync();
    console.log("Source range values and formats copied to destination range");

    // Write the calculated node value in col2 of the new row
    const newCell = sheet.getRangeByIndexes(lastFilledRow, col2 - 1, 1, 1);
    await context.sync();
    newCell.values = [["Node " + uniqueCount]];
    await context.sync();
    console.log("Node value written to new row");

    // adding model Dimenison in new row
    const newCell1 = sheet.getRangeByIndexes(lastFilledRow, col2 - 2, 1, 1);
    await context.sync();
    newCell1.values = [["SKU Characterization"]];
    await context.sync();
    console.log("SKU Characterization value written to new row");

    // Adjust column widths
    const columnsRange = sheet.getRangeByIndexes(0, colModelDim - 1, 1, 5);
    columnsRange.format.autofitColumns();
    console.log("Column widths adjusted");

    // Copy data validation for each cell in the range
    // sourceRange.load("dataValidation");
    // await context.sync();
    // for (let rowIndex = 0; rowIndex < sourceRange.rowCount; rowIndex++) {
    //   for (let colIndex = 0; colIndex < sourceRange.columnCount; colIndex++) {
    //     const srcCell = sourceRange.getCell(rowIndex, colIndex);
    //     const dstCell = destinationRange.getCell(rowIndex, colIndex);
    //     srcCell.load("dataValidation");
    //     await context.sync();

    //     if (srcCell.dataValidation && srcCell.dataValidation.rule) {
    //       dstCell.dataValidation.rule = srcCell.dataValidation.rule;
    //       dstCell.dataValidation.errorAlert = srcCell.dataValidation.errorAlert;
    //       dstCell.dataValidation.prompt = srcCell.dataValidation.prompt;
    //       console.log(`Data validation copied from source cell (${rowIndex}, ${colIndex}) to destination cell.`);
    //     } else {
    //       console.log(`No data validation found for source cell (${rowIndex}, ${colIndex}).`);
    //     }
    //   }
    // }

    await context.sync();
    // console.log(`Formatting and data validation copied from source to destination range.`);
  }).catch((error) => {
    console.error("Error in SKU Characterization:", error);
  });
}

export async function addSku(context) {
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    // const range = sheet.getRange(rangeAddress);
    // range.load(["columnIndex", "rowCount", "columnCount"]);
    // await context.sync();

    //////////////////////////////////////////////////////////////
    sheet.load("name");
    await context.sync();
    console.log("Active sheet retrieved:", sheet.name);

    const checkRow = 7;
    const usedRange = sheet.getUsedRange();
    usedRange.load(["values", "rowCount", "columnCount"]);
    await context.sync();

    console.log("Row values loaded:", usedRange.values);

    let colSKU = 0;
    let colModelAssumptions = 0;
    const rowValues = usedRange.values[checkRow - 1];

    // Scan the 7th row to find 'SKU Characterization' and 'Model Assumptions'
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "SKU Characterization") {
        colSKU = i + 1; // 1-based index
      } else if (rowValues[i] === "Model Assumptions") {
        colModelAssumptions = i + 1; // 1-based index
      }
      if (colSKU > 0 && colModelAssumptions > 0) {
        break;
      }
    }

    // Ensure both necessary column headers were found
    if (colSKU === 0 || colModelAssumptions === 0) {
      console.error("Required column headers not found.");
      return;
    }

    console.log("SKU Characterization column identified at:", colSKU);
    console.log("Model Assumptions column identified at:", colModelAssumptions);

    const columnDistance = colModelAssumptions - colSKU - 3;

    // Determine the last filled row in the 'SKU Characterization' column
    const colSKURange = sheet.getRangeByIndexes(0, colSKU - 1, usedRange.rowCount, 1);
    colSKURange.load("values");
    await context.sync();

    let lastFilledRowSKU = 0;
    for (let i = colSKURange.values.length - 1; i >= 0; i--) {
      if (colSKURange.values[i][0] !== "") {
        lastFilledRowSKU = i + 1;
        break;
      }
    }
    console.log("Last filled row in SKU Characterization column identified at:", lastFilledRowSKU);

    // Calculate new column index, 3 columns back from 'Model Assumptions'
    const newColumnIndex = colModelAssumptions - 4;

    // Insert a new column at the calculated index
    const newColumnRange = sheet.getRangeByIndexes(0, newColumnIndex, usedRange.rowCount, 1);
    newColumnRange.load(["address"]);
    await context.sync();
    console.log(`Total row count: ${newColumnRange.address}`);

    //////////////////////////////////////

    const newColumnRange1 = sheet.getRange(newColumnRange.address);
    newColumnRange1.load(["columnIndex", "rowCount", "columnCount"]);
    await context.sync();

    console.log(`Range columnIndex: ${newColumnRange1.columnIndex}`);
    console.log(`Range rowCount: ${newColumnRange1.rowCount}`);
    console.log(`Range columnCount: ${newColumnRange1.columnCount}`);

    const columnIndex = newColumnRange1.columnIndex + newColumnRange1.columnCount;

    const usedRange1 = sheet.getUsedRange();
    usedRange1.load("rowCount");
    await context.sync();

    const rowCount = usedRange1.rowCount;
    console.log(`Calculated columnIndex for insertion: ${columnIndex}`);
    console.log(`Total row count: ${rowCount}`);

    // Insert a new column by shifting the existing columns to the right
    const insertRange = sheet.getRangeByIndexes(0, columnIndex - 1, rowCount, 1);
    insertRange.load(["address"]);
    await context.sync();

    console.log(`Insert Range Address: ${insertRange.address}`);

    insertRange.insert(Excel.InsertShiftDirection.right);

    sheet.getRangeByIndexes(5, newColumnIndex, 1, 1).values = [["Dimension " + columnDistance]];
    sheet.getRangeByIndexes(6, newColumnIndex, 1, 1).values = [["SKU " + (columnDistance - 1)]];
    console.log("Headers updated in the new column");

    await context.sync();

    await context.sync();
    console.log(`New column inserted to the right of ${newColumnRange}`);
  }).catch((error) => {
    console.error("Error in insertColumnToRight function:", error);
  });
}

export async function DeleteSku(context) {
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    // const range = sheet.getRange(rangeAddress);
    // range.load(["columnIndex", "rowCount", "columnCount"]);
    // await context.sync();

    //////////////////////////////////////////////////////////////
    sheet.load("name");
    await context.sync();
    console.log("Active sheet retrieved:", sheet.name);

    const checkRow = 7;
    const usedRange = sheet.getUsedRange();
    usedRange.load(["values", "rowCount", "columnCount"]);
    await context.sync();

    console.log("Row values loaded:", usedRange.values);

    let colSKU = 0;
    let colModelAssumptions = 0;
    const rowValues = usedRange.values[checkRow - 1];

    // Scan the 7th row to find 'SKU Characterization' and 'Model Assumptions'
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "SKU Characterization") {
        colSKU = i + 1; // 1-based index
      } else if (rowValues[i] === "Model Assumptions") {
        colModelAssumptions = i + 1; // 1-based index
      }
      if (colSKU > 0 && colModelAssumptions > 0) {
        break;
      }
    }

    // Ensure both necessary column headers were found
    if (colSKU === 0 || colModelAssumptions === 0) {
      console.error("Required column headers not found.");
      return;
    }

    console.log("SKU Characterization column identified at:", colSKU);
    console.log("Model Assumptions column identified at:", colModelAssumptions);

    const columnDistance = colModelAssumptions - colSKU - 3;

    // Determine the last filled row in the 'SKU Characterization' column
    const colSKURange = sheet.getRangeByIndexes(0, colSKU - 1, usedRange.rowCount, 1);
    colSKURange.load("values");
    await context.sync();

    let lastFilledRowSKU = 0;
    for (let i = colSKURange.values.length - 1; i >= 0; i--) {
      if (colSKURange.values[i][0] !== "") {
        lastFilledRowSKU = i + 1;
        break;
      }
    }
    console.log("Last filled row in SKU Characterization column identified at:", lastFilledRowSKU);

    // Calculate new column index, 3 columns back from 'Model Assumptions'
    const newColumnIndex = colModelAssumptions - 4;

    // Insert a new column at the calculated index
    const newColumnRange = sheet.getRangeByIndexes(0, newColumnIndex, usedRange.rowCount, 1);
    newColumnRange.load(["address"]);
    await context.sync();
    console.log(`Total row count: ${newColumnRange.address}`);

    //////////////////////////////////////

    const newColumnRange1 = sheet.getRange(newColumnRange.address);
    newColumnRange1.load(["columnIndex", "rowCount", "columnCount"]);
    await context.sync();

    console.log(`Range columnIndex: ${newColumnRange1.columnIndex}`);
    console.log(`Range rowCount: ${newColumnRange1.rowCount}`);
    console.log(`Range columnCount: ${newColumnRange1.columnCount}`);

    const columnIndex = newColumnRange1.columnIndex + newColumnRange1.columnCount;

    const usedRange1 = sheet.getUsedRange();
    usedRange1.load("rowCount");
    await context.sync();

    const rowCount = usedRange1.rowCount;
    console.log(`Calculated columnIndex for insertion: ${columnIndex}`);
    console.log(`Total row count: ${rowCount}`);

    // Insert a new column by shifting the existing columns to the right
    const insertRange = sheet.getRangeByIndexes(0, columnIndex - 2, rowCount, 1);
    insertRange.load(["address"]);
    await context.sync();

    console.log(`Insert Range Address: ${insertRange.address}`);

    insertRange.delete(Excel.DeleteShiftDirection.left);

    // sheet.getRangeByIndexes(5, newColumnIndex, 1, 1).values = [["Dimension " + columnDistance]];
    // sheet.getRangeByIndexes(6, newColumnIndex, 1, 1).values = [["SKU " + (columnDistance - 1)]];
    // console.log("Headers updated in the new column");

    await context.sync();

    await context.sync();
    console.log(`New column inserted to the right of ${newColumnRange}`);
  }).catch((error) => {
    console.error("Error in insertColumnToRight function:", error);
  });
}

export async function deletediemnsions(context) {
  console.log("Start clearLastRow function");
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    sheet.load("name");
    await context.sync();
    console.log("Active sheet retrieved:", sheet.name);

    const checkRow = 7;
    const usedRange = sheet.getUsedRange();
    usedRange.load(["address", "values", "rowCount", "columnCount"]);
    await context.sync();

    console.log("Row values loaded:", usedRange.values);
    console.log("Used range address:", usedRange.address);
    console.log("Used range rowCount:", usedRange.rowCount);
    console.log("Used range columnCount:", usedRange.columnCount);

    let colModelDim = 0;
    const rowValues = usedRange.values[checkRow - 1];

    // Find the 'Modeling Dimensions' column
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "Modeling Dimensions") {
        colModelDim = i + 1; // 1-based index
        break;
      }
    }

    if (colModelDim === 0) {
      console.error("Column 'Modeling Dimensions' not found.");
      return;
    }

    console.log("Modeling Dimensions column identified at:", colModelDim);

    const col2 = colModelDim + 1;

    // Calculate unique elements in col2 excluding the first 3 rows
    const uniqueDict = {};
    const col2Range = sheet.getRangeByIndexes(7, col2 - 1, usedRange.rowCount - 7, 1);
    col2Range.load("values");
    await context.sync();

    col2Range.values.forEach((row) => {
      const cellValue = row[0];
      if (cellValue && !uniqueDict[cellValue]) {
        uniqueDict[cellValue] = true;
      }
    });

    const uniqueCount = Object.keys(uniqueDict).length + 1;
    console.log("Unique elements in col2 identified:", uniqueCount - 1);

    // Find the last filled row in the colModelDim column
    const colModelDimRange = sheet.getRangeByIndexes(0, colModelDim - 1, usedRange.rowCount, 1);
    colModelDimRange.load(["values", "rowIndex"]);
    await context.sync();

    let lastFilledRow = 0;
    for (let i = colModelDimRange.values.length - 1; i >= 0; i--) {
      if (colModelDimRange.values[i][0] !== "") {
        lastFilledRow = colModelDimRange.rowIndex + i + 1;
        break;
      }
    }
    console.log("Last filled row in colModelDim identified at:", lastFilledRow);

    const dimensioncolcount = 5;

    // Define the range of the last row in the colModelDim column and clear its contents
    const lastRowRange = sheet.getRangeByIndexes(lastFilledRow - 1, colModelDim - 1, 1, dimensioncolcount);
    lastRowRange.clear(Excel.ClearApplyTo.all);
    await context.sync();
    console.log("Contents of the last row cleared");

    // Adjust column widths
    const columnsRange = sheet.getRangeByIndexes(0, colModelDim - 1, 1, 5);
    columnsRange.format.autofitColumns();
    console.log("Column widths adjusted");

    await context.sync();
  }).catch((error) => {
    console.error("Error in clearLastRow function:", error);
  });
}

export async function deleteProduct(context) {
  console.log("Start sku function");
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    sheet.load("name");
    await context.sync();
    console.log("Active sheet retrieved:", sheet.name);

    const checkRow = 7;
    const usedRange = sheet.getUsedRange();
    usedRange.load(["address", "values", "rowCount", "columnCount"]);
    await context.sync();

    console.log("Row values loaded:", usedRange.values);
    console.log("Used range address:", usedRange.address);
    console.log("Used range rowCount:", usedRange.rowCount);
    console.log("Used range columnCount:", usedRange.columnCount);

    let colModelDim = 0;
    const rowValues = usedRange.values[checkRow - 1];

    // Find the 'SKU Characterization' column
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "SKU Characterization") {
        colModelDim = i + 1; // 1-based index
        break;
      }
    }

    let colProductTracking = 0;
    // Find the 'Product Tracking' column
    for (let i = 0; i < rowValues.length; i++) {
      if (rowValues[i] === "Product Tracking") {
        colProductTracking = i + 1; // 1-based index
        break;
      }
    }
    console.log("SKU Characterization column identified at:", colProductTracking);

    if (colModelDim === 0) {
      console.error("Column 'SKU Characterization' not found.");
      return;
    }

    console.log("SKU Characterization column identified at:", colModelDim);

    const col2 = colModelDim + 1;

    // Calculate unique elements in col2 excluding the first 3 rows
    const uniqueDict = {};
    const col2Range = sheet.getRangeByIndexes(7, col2 - 1, usedRange.rowCount - 7, 1);
    col2Range.load("values");
    await context.sync();

    col2Range.values.forEach((row) => {
      const cellValue = row[0];
      if (cellValue && !uniqueDict[cellValue]) {
        uniqueDict[cellValue] = true;
      }
    });

    const uniqueCount = Object.keys(uniqueDict).length + 1;
    console.log("Unique elements in col2 identified:", uniqueCount - 1);

    // Find the last filled row in the colModelDim column
    const colModelDimRange = sheet.getRangeByIndexes(0, colModelDim - 1, usedRange.rowCount, 1);
    colModelDimRange.load(["values", "rowIndex"]);
    await context.sync();

    let lastFilledRow = 0;
    for (let i = colModelDimRange.values.length - 1; i >= 0; i--) {
      if (colModelDimRange.values[i][0] !== "") {
        lastFilledRow = colModelDimRange.rowIndex + i + 1;
        break;
      }
    }
    console.log("Last filled row in colModelDim identified at:", lastFilledRow);

    // Define and copy source and destination ranges
    const sourceRange = sheet.getRangeByIndexes(
      lastFilledRow - 1,
      colModelDim - 1,
      1,
      1 + colProductTracking - colModelDim
    );
    const destinationRange = sheet.getRangeByIndexes(
      lastFilledRow - 1,
      colModelDim - 1,
      1,
      1 + colProductTracking - colModelDim
    );
    console.log(sourceRange);
    console.log(destinationRange);

    destinationRange.clear(Excel.ClearApplyTo.all);
    await context.sync();
    console.log("Contents of the last row cleared");

    // Adjust column widths
    const columnsRange = sheet.getRangeByIndexes(0, colModelDim - 1, 1, 5);
    columnsRange.format.autofitColumns();
    console.log("Column widths adjusted");

    await context.sync();
    // console.log(`Formatting and data validation copied from source to destination range.`);
  }).catch((error) => {
    console.error("Error in SKU Characterization:", error);
  });
}
