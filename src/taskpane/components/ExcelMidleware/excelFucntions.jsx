export async function aceSheetformat(sheetName) {
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getItem(sheetName);
    sheet.load("name");
    context.trackedObjects.add(sheet);
    await context.sync();
    console.log(sheet.name);

    // getting the used range of sheet
    var usedRange = sheet.getUsedRange();

    usedRange.load(["address", "values", "rowCount", "columnCount"]);
    context.trackedObjects.add(usedRange);
    await context.sync();
    console.log(usedRange.address);

    const totalRowcount = usedRange.rowCount;
    const totalColCount = usedRange.columnCount;
    console.log(totalColCount);
    console.log(totalRowcount);

    // loading all the helper columns of ACE sheet
    const columnAValues = usedRange.values.map((row) => row[0]);
    const columnBValues = usedRange.values.map((row) => row[1]);
    const columnCValues = usedRange.values.map((row) => row[2]);
    const columnDValues = usedRange.values.map((row) => row[3]);
    const columnEValues = usedRange.values.map((row) => row[4]);
    const columnFValues = usedRange.values.map((row) => row[5]);
    const columnGValues = usedRange.values.map((row) => row[6]);
    const columnHValues = usedRange.values.map((row) => row[7]);
    const columnIValues = usedRange.values.map((row) => row[8]);
    const columnJValues = usedRange.values.map((row) => row[9]);
    const columnKValues = usedRange.values.map((row) => row[10]);
    const columnLValues = usedRange.values.map((row) => row[11]);
    const columnMValues = usedRange.values.map((row) => row[12]);

    let LOT = [];
    let SegmentName = [];
    let Subsegment = [];
    let Product = [];
    let Sku = [];
    let Flowcount = [];
    let flowNames = [];
    let OutputNames = [];
    let ModelGranularity = "";

    const startcol = 1;
    const startrow = 1;
    const offsetcol = 6;
    const GrowthDropdwn = "=Sum,Avg,Step,Retain Values";
    const YesNoDropdown = "=Yes,No";
    let timelineaddress = "";

    let i = 0; // iterate over rows of used range
    let j = 0; // iterate over columns of used range
    let z = 0; // iterate over row of an array
    let k = 0; // iterate over 3rd metric of array

    while (i < totalRowcount) {
      if (columnBValues[i] === "timeline" && columnFValues[i] === "model specification|Timeline") {
        let sourceRange = usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, totalColCount - offsetcol);
        context.trackedObjects.add(sourceRange);
        await context.sync();
        await formatBluePattern(context, sourceRange, "#FFFFFF", "#143D66", "#BFBFBF", "mmm-yy");
        context.trackedObjects.remove(sourceRange);

        sourceRange = usedRange.getCell(i, offsetcol + 8).getAbsoluteResizedRange(1, totalColCount - offsetcol + 8);
        sourceRange.load("address");
        context.trackedObjects.add(sourceRange);
        await context.sync();
        timelineaddress = sourceRange.address;
        console.log(timelineaddress);
        context.trackedObjects.remove(sourceRange);
      } else if (
        columnBValues[i] === "Structure Data" &&
        columnFValues[i] === "model specification|model structure data"
      ) {
        LOT.push(columnIValues[i]);
        SegmentName.push([columnJValues[i], i]);
        Subsegment.push([columnKValues[i], i]);
        console.log(LOT[0], LOT[LOT.length - 1]);
      } else if (columnBValues[i] === "Product Data" && columnFValues[i] === "model specification|product data") {
        Product.push(columnGValues[i], i);
      } else if (columnBValues[i] === "Number of Flows" && columnFValues[i] === "model specification|flow count") {
        Flowcount.push(columnGValues[i]);
      } else if (columnBValues[i] === "Flow Names") {
        while (usedRange.values[i][j + 6] !== "") {
          flowNames.push([usedRange.values[i][j + 6], i]);
          console.log(flowNames[0], flowNames[flowNames.length - 1]);
          j++;
        }
      } else if (columnBValues[i] === "Flow Outputs") {
        j = 0;
        k = Flowcount[0];
        while (j < Flowcount[0] - 1) {
          if (!Array.isArray(OutputNames[z])) {
            OutputNames[z] = []; // Initialize as an empty array if not already defined
          }
          OutputNames[z][j] = usedRange.values[i][j + 6];
          OutputNames[z][k] = i;
          console.log(OutputNames[0], OutputNames[OutputNames.length - 1]);
          z++;
          j++;
        }
      } else if (columnBValues[i] === "Granularity" && columnFValues[i] === "model specification|granularity") {
        let sourceRange = usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, 3);
        ModelGranularity = columnIValues[i];
        context.trackedObjects.add(sourceRange);
        await formatBluePattern(context, sourceRange, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        context.trackedObjects.remove(sourceRange);
      } else if (
        columnAValues[i] === "Single Value" ||
        columnBValues[i] === "Events & Market Share -Head" ||
        columnAValues[i] === "-" ||
        columnBValues[i] === "Events & Market Share" ||
        columnAValues[i] === "Annual - Single Value" ||
        columnAValues[i] === "Annual - Time Series"
      ) {
        await formatLHSStructre(
          context,
          usedRange,
          i,
          columnAValues[i],
          columnBValues[i],
          columnCValues[i],
          columnDValues[i],
          columnEValues[i],
          sheetName,
          ModelGranularity,
          offsetcol,
          columnAValues,
          timelineaddress
        );
        i += columnDValues[i] - 1;
      } else if (columnAValues[i] === "Monthly - Time Series") {
        await formatLHSStructre(
          context,
          usedRange,
          i,
          columnAValues[i],
          columnBValues[i],
          columnCValues[i],
          columnDValues[i],
          columnEValues[i],
          sheetName,
          ModelGranularity,
          offsetcol,
          columnAValues,
          timelineaddress
        );
        i += columnDValues[i] - 1;
      } else if (columnBValues[i] === "Flow Start") {
        // await dropdownformula(sheetName, Flowcount, flowNames, SegmentName, OutputNames);
      } else if (columnAValues[i] === "") {
      }
      console.log(columnBValues[i], i);
      i++;
    }
  }).catch((error) => {
    console.error("Error in aceSheetformat:", error);
  });
}

async function formatLHSStructre(
  context,
  usedRange,
  Roucounter,
  ColumnAvalue,
  ColumnBvalue,
  ColumnCvalue,
  ColumnDvalue,
  ColumnEvalue,
  sheetName,
  ModelGranularity,
  offsetcol,
  columnAValues,
  timelineaddress
) {
  try {
    let LHSRangeTop;
    let LHSRangeBottom;
    let RHSRangeTop;
    let RHSRangeBottom;
    let numberformat;
    let ColCounter = 0;
    const SingleValueNumberFormat = ["Text", "Text", "mmm-yy", "0.0%"];
    const AnnualSingleValueNumberFormat = ["Text", "Text", "YYYY", "0.0%"];
    const EventNumberformat = ["Text", "mmm-yy", "Text", "0.0", "0"];
    const GrowthTypeRule = "Sum,Avg,Step,Retain Values";
    const OnOFF = "ON,OFF";
    const EventMethod = "Diffusion,Custom";
    let dataRule;
    timelineaddress = "=" + timelineaddress;
    // Const MethodDropdwon = "Diffusion,Custom";

    numberformat = dataStructFormat(ColumnCvalue);
    LHSRangeTop = usedRange.getCell(Roucounter - 1, offsetcol).getAbsoluteResizedRange(1, 7);
    LHSRangeBottom = usedRange.getCell(Roucounter, offsetcol).getAbsoluteResizedRange(ColumnDvalue, 7);
    RHSRangeTop = usedRange.getCell(Roucounter - 1, offsetcol + 7).getAbsoluteResizedRange(1, ColumnEvalue - 8);
    RHSRangeBottom = usedRange
      .getCell(Roucounter, offsetcol + 7)
      .getAbsoluteResizedRange(ColumnDvalue, ColumnEvalue - 8);

    context.trackedObjects.add(LHSRangeTop);
    context.trackedObjects.add(LHSRangeBottom);
    context.trackedObjects.add(RHSRangeTop);
    context.trackedObjects.add(RHSRangeBottom);

    if (ModelGranularity === "Monthly" && ColumnAvalue === "Monthly - Time Series") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "mmm-yy");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", numberformat);
    } else if (ModelGranularity === "Annual" && ColumnAvalue === "Annual - Time Series") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", numberformat);
    } else if (ColumnAvalue === "Single Value") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      for (ColCounter = 0; ColCounter < 4; ColCounter++) {
        await formatBluePattern(
          context,
          RHSRangeBottom.getColumn(ColCounter),
          "#6D6E71",
          "#EBCB71",
          "#BFBFBF",
          SingleValueNumberFormat[ColCounter]
        );
      }
      RHSRangeBottom = usedRange.getCell(Roucounter, offsetcol + 8).getAbsoluteResizedRange(ColumnDvalue, 1);
      await DataValidation(context, RHSRangeBottom, GrowthTypeRule);
    } else if (ColumnAvalue === "Annual - Single Value") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      for (ColCounter = 0; ColCounter < 4; ColCounter++) {
        await formatBluePattern(
          context,
          RHSRangeBottom.getColumn(ColCounter),
          "#6D6E71",
          "#EBCB71",
          "#BFBFBF",
          AnnualSingleValueNumberFormat[ColCounter]
        );
      }
      RHSRangeBottom = usedRange.getCell(Roucounter, offsetcol + 8).getAbsoluteResizedRange(ColumnDvalue, 1);
      await DataValidation(context, RHSRangeBottom, GrowthTypeRule);
    } else if (ColumnBvalue === "Events & Market Share -Head") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
      for (ColCounter = 0; ColCounter < ColumnEvalue - 9; ColCounter++) {
        await formatBluePattern(
          context,
          RHSRangeBottom.getCell(ColCounter, 1).getAbsoluteResizedRange(1, ColumnEvalue - 9),
          "#6D6E71",
          "#EBCB71",
          "#BFBFBF",
          EventNumberformat[ColCounter]
        );
        if (ColCounter === 0) {
          dataRule = OnOFF;
          await DataValidation(
            context,
            RHSRangeBottom.getCell(ColCounter, 1).getAbsoluteResizedRange(1, ColumnEvalue - 9),
            dataRule
          );
        } else if (ColCounter === 1) {
          dataRule = timelineaddress;
          await DataValidation(
            context,
            RHSRangeBottom.getCell(ColCounter, 1).getAbsoluteResizedRange(1, ColumnEvalue - 9),
            dataRule
          );
        } else if (ColCounter === 2) {
          dataRule = EventMethod;
          await DataValidation(
            context,
            RHSRangeBottom.getCell(ColCounter, 1).getAbsoluteResizedRange(1, ColumnEvalue - 9),
            dataRule
          );
        }
      }
    } else if (ColumnBvalue === "Tx Mapping") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
    } else if (ColumnBvalue === "Events & Market Share") {
      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
    } else if (ModelGranularity === "Monthly" && ColumnAvalue === "Annual - Time Series") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
      await formatBluePattern(
        context,
        RHSRangeBottom.getCell(0, 1).getAbsoluteResizedRange(ColumnDvalue, ColumnEvalue - 8),
        "#6D6E71",
        "#EBCB71",
        "#BFBFBF",
        numberformat
      );
    }

    context.trackedObjects.remove(LHSRangeTop);
    context.trackedObjects.remove(LHSRangeBottom);
    context.trackedObjects.remove(RHSRangeTop);
    context.trackedObjects.remove(RHSRangeBottom);

    console.log("formatLHSStructre function completed successfully.");
  } catch (error) {
    console.error("Error in formatLHSStructre function:", error);
  }
}

async function formatBluePattern(context, range, fontColor, fillColor, borderColor, numberFormat) {
  try {
    range.load([
      "address",
      "format/font",
      "format/fill",
      "numberFormat",
      "format/verticalAlignment",
      "format/horizontalAlignment",
      "format/borders",
    ]);
    context.trackedObjects.add(range);
    await context.sync();
    console.log(`Process 2: Loaded range properties: ${range.address}`);

    // Set the font color, name, and size
    range.format.font.color = fontColor;
    range.format.font.name = "Arial";
    range.format.font.size = 10;
    console.log(`Process 3: Set font color to ${fontColor}, name to Arial, and size to 10`);

    // Set the fill color
    range.format.fill.color = fillColor;
    console.log(`Process 4: Set fill color to ${fillColor}`);

    // Set number format
    range.numberFormat = numberFormat;
    console.log(`Process 5: Set number format to ${numberFormat}`);

    // Set vertical and horizontal alignment
    range.format.verticalAlignment = "center";
    range.format.horizontalAlignment = "center";
    console.log("Process 6: Set vertical alignment to middle and horizontal alignment to center");

    console.log("Process 7: First context sync completed");
    // Ensure the borders are set
    await border(context, range);

    console.log("Borders applied.");
    context.trackedObjects.remove(range);
    await context.sync();
  } catch (error) {
    console.error(`Error formatting range ${range.address}:`, error);
  }
}

async function border(context, range) {
  range.format.borders.getItem("InsideHorizontal").style = "Continuous";
  range.format.borders.getItem("InsideVertical").style = "Continuous";
  range.format.borders.getItem("EdgeBottom").style = "Continuous";
  range.format.borders.getItem("EdgeLeft").style = "Continuous";
  range.format.borders.getItem("EdgeRight").style = "Continuous";
  range.format.borders.getItem("EdgeTop").style = "Continuous";
  range.format.borders.getItem("InsideHorizontal").color = "#BFBFBF";
  range.format.borders.getItem("InsideVertical").color = "#BFBFBF";
  range.format.borders.getItem("EdgeBottom").color = "#BFBFBF";
  range.format.borders.getItem("EdgeLeft").color = "#BFBFBF";
  range.format.borders.getItem("EdgeRight").color = "#BFBFBF";
  range.format.borders.getItem("EdgeTop").color = "#BFBFBF";
}

async function DataValidation(context, range, Datarule) {
  try {
    console.log("Starting DataValidation function");
    console.log("Datarule: ", Datarule);

    // Ensure the range is properly defined
    if (!range) {
      throw new Error("Range is not defined or null");
    }
    console.log("Range before loading address: ", range);

    // Load the address property of the range
    range.load("address");
    await context.sync();
    console.log("Range address loaded successfully");

    console.log("Range address: ", range.address);

    // Add range to tracked objects
    context.trackedObjects.add(range);

    // Apply data validation rule
    range.dataValidation.rule = {
      list: {
        inCellDropDown: true,
        source: Datarule,
      },
    };

    await context.sync();
    console.log("Data validation rule applied");

    // Remove range from tracked objects
    context.trackedObjects.remove(range);
  } catch (error) {
    console.error("Error in DataValidation function:", error);
  }
}

function dataStructFormat(assumptionData) {
  let outputRHSFormat = "";

  switch (assumptionData) {
    case "Percentage":
      outputRHSFormat = "0.0%";
      break;
    case "Number":
      outputRHSFormat = '#,##0_);[Red](#,##0);"-"';
      break;
    case "Currency - Euros":
      outputRHSFormat = "€#,##0.00";
      break;
    case "Currency - US Dollars":
      outputRHSFormat = '"$" #,##0.0';
      break;
    case "Mapping Matrix":
      outputRHSFormat = "";
      break;
    default:
      outputRHSFormat = "";
      break;
  }

  return outputRHSFormat;
}

async function dropdownformula(sheetName, Flowcount, flowNames, segmentname, OutputNames) {
  let segmentdropdown = `=${sheetName}!J${segmentname[0][1]}:J${segmentname[segmentname.length - 1][1]}`;
  let startLetter = "G";
  let charCode = startLetter.charCodeAt(0);
  let outputdropdowndependent = "";

  
  for (let i = 0; i < Flowcount; i++) {

  } 
}
////////////////////////code first line ///////////////////////////////////
// export async function aceSheetformat(context, sheetName) {
//   const sheet = context.workbook.worksheets.getItem(sheetName);
//   sheet.load("name");
//   context.trackedObjects.add(sheet);
//   await context.sync();
//   console.log(sheet.name);

//   // getting the used range of sheet
//   var usedRange = sheet.getUsedRange();
//   usedRange.load(["address", "values", "rowCount", "columnCount"]);
//   context.trackedObjects.add(usedRange);
//   await context.sync();
//   console.log(usedRange.address);

//   const totalRowcount = usedRange.rowCount;
//   const totalColCount = usedRange.columnCount;
//   console.log(totalColCount);
//   console.log(totalRowcount);

//   /// loading all the helper columns of ACE sheet
//   const columnAValues = usedRange.values.map((row) => row[0]);
//   const columnBValues = usedRange.values.map((row) => row[1]);
//   const columnCValues = usedRange.values.map((row) => row[2]);
//   const columnDValues = usedRange.values.map((row) => row[3]);
//   const columnEValues = usedRange.values.map((row) => row[4]);
//   const columnFValues = usedRange.values.map((row) => row[5]);
//   const columnGValues = usedRange.values.map((row) => row[6]);
//   const columnHValues = usedRange.values.map((row) => row[7]);
//   const columnIValues = usedRange.values.map((row) => row[8]);
//   const columnJValues = usedRange.values.map((row) => row[9]);
//   const columnKValues = usedRange.values.map((row) => row[10]);
//   const columnLValues = usedRange.values.map((row) => row[11]);
//   const columnMValues = usedRange.values.map((row) => row[12]);

//   let LOT = [];
//   let SegmentName = [];
//   let Subsegment = [];
//   let Product = [];
//   let Sku = [];
//   let Flowcount = [];
//   let flowNames = [];
//   let OutputNames = [];
//   let ModelGranularity = "";

//   const startcol = 1;
//   const startrow = 1;
//   const offsetcol = 6;
//   const GrowthDropdwn = "Sum,Avg,Step,Retain Values";
//   const YesNoDropdown = "Yes,No";
//   let timelineaddress = "";

//   let i = 0; // iterate over rows of used range
//   let j = 0; // itrate over columns of used range
//   let z = 0; // iterate over row of an array
//   let k = 0; // ietrare over 3rd metric of array

//   while (i < totalRowcount) {
//     if (columnBValues[i] === "Timeline" && columnFValues[i] === "model specification|Timeline") {
//       let sourceRange = usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, totalColCount - offsetcol);
//       context.trackedObjects.add(sourceRange);
//       await context.sync();
//       await formatBluePattern(context, sourceRange, "#FFFFFF", "#143D66", "#BFBFBF", "mmm-yy");
//       context.trackedObjects.remove(sourceRange);

//       sourceRange = sheet.getRangeByIndexes(i, offsetcol + 8, 1, totalColCount - offsetcol);
//       sourceRange.load("address");
//       context.trackedObjects.add(sourceRange);
//       await context.sync();
//       timelineaddress = sourceRange.address;
//       context.trackedObjects.remove(sourceRange);
//     } else if (
//       columnBValues[i] === "Structure Data" &&
//       columnFValues[i] === "model specification|model structure data"
//     ) {
//       LOT.push(columnIValues[i]);
//       SegmentName.push([columnJValues[i], i]);
//       Subsegment.push([columnKValues[i], i]);
//       console.log(LOT[0], LOT[LOT.length - 1]);
//     } else if (columnBValues[i] === "Product Data" && columnFValues[i] === "model specification|product data") {
//       Product.push(columnGValues[i]);
//     } else if (columnBValues[i] === "Number of Flows" && columnFValues[i] === "model specification|flow count") {
//       Flowcount.push(columnGValues[i]);
//     } else if (columnBValues[i] === "Flow Names") {
//       while (usedRange.values[i][j + 6] !== "") {
//         flowNames.push([usedRange.values[i][j + 6], i]);
//         console.log(flowNames[0], flowNames[flowNames.length - 1]);
//         j++;
//       }
//     } else if (columnBValues[i] === "Flow Outputs") {
//       j = 0;
//       k = Flowcount[0];
//       while (j < Flowcount[0] - 1) {
//         if (!Array.isArray(OutputNames[z])) {
//           OutputNames[z] = []; // Initialize as an empty array if not already defined
//         }
//         OutputNames[z][j] = usedRange.values[i][j + 6];
//         OutputNames[z][k] = i;
//         console.log(OutputNames[0], OutputNames[OutputNames.length - 1]);
//         z++;
//         j++;
//       }
//     } else if (columnBValues[i] === "Granularity" && columnFValues[i] === "model specification|granularity") {
//       let sourceRange = usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, 3);
//       ModelGranularity = columnIValues[i];
//       context.trackedObjects.add(sourceRange);
//       await formatBluePattern(context, sourceRange, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//       context.trackedObjects.remove(sourceRange);
//     } else if (
//       columnAValues[i] === "Single Value" ||
//       columnBValues[i] === "Events & Market Share -Head" ||
//       columnAValues[i] === "-" ||
//       columnBValues[i] === "Events & Market Share" ||
//       columnAValues[i] === "Annual - Single Value" ||
//       columnAValues[i] === "Annual - Time Series"
//     ) {
//       await formatLHSStructre(
//         context,
//         usedRange,
//         i,
//         columnAValues[i],
//         columnBValues[i],
//         columnCValues[i],
//         columnDValues[i],
//         columnEValues[i],
//         sheetName,
//         ModelGranularity,
//         offsetcol,
//         columnAValues,
//         timelineaddress
//       );
//       i += columnDValues[i] - 1;
//     } else if (columnAValues[i] === "Monthly - Time Series") {
//       await formatLHSStructre(
//         context,
//         usedRange,
//         i,
//         columnAValues[i],
//         columnBValues[i],
//         columnCValues[i],
//         columnDValues[i],
//         columnEValues[i],
//         sheetName,
//         ModelGranularity,
//         offsetcol,
//         columnAValues,
//         timelineaddress
//       );
//       i += columnDValues[i] - 1;
//     } else if (columnAValues[i] === "") {
//     }
//     console.log(columnBValues[i], i);
//     i++;
//   }
// }

// async function formatLHSStructre(
//   context,
//   usedRange,
//   Roucounter,
//   ColumnAvalue,
//   ColumnBvalue,
//   ColumnCvalue,
//   ColumnDvalue,
//   ColumnEvalue,
//   sheetName,
//   ModelGranularity,
//   offsetcol,
//   columnAValues,
//   timelineaddress
// ) {
//   try {
//     let LHSRangeTop;
//     let LHSRangeBottom;
//     let RHSRangeTop;
//     let RHSRangeBottom;
//     let numberformat;
//     let ColCounter = 0;
//     const SingleValueNumberFormat = ["Text", "Text", "mmm-yy", "0.0%"];
//     const AnnualSingleValueNumberFormat = ["Text", "Text", "YYYY", "0.0%"];
//     const EventNumberformat = ["Text", "mmm-yy", "Text", "0.0", "0"];
//     const GrowthTypeRule = "Sum,Avg,Step,Retain Values";
//     const OnOFF = "ON,OFF";
//     // Const MethodDropdwon = "Diffusion,Custom";

//     numberformat = dataStructFormat(ColumnCvalue);
//     // if (
//     //   (ModelGranularity === "Monthly" && ColumnAvalue === "Monthly - Time Series") ||
//     //   (ModelGranularity === "Annual" && ColumnAvalue === "Annual - Time Series")
//     // ) {
//     LHSRangeTop = usedRange.getCell(Roucounter - 1, offsetcol).getAbsoluteResizedRange(1, 7);
//     LHSRangeBottom = usedRange.getCell(Roucounter, offsetcol).getAbsoluteResizedRange(ColumnDvalue, 7);
//     RHSRangeTop = usedRange.getCell(Roucounter - 1, offsetcol + 7).getAbsoluteResizedRange(1, ColumnEvalue - 8);
//     RHSRangeBottom = usedRange
//       .getCell(Roucounter, offsetcol + 7)
//       .getAbsoluteResizedRange(ColumnDvalue, ColumnEvalue - 8);
//     // }
//     context.trackedObjects.add(LHSRangeTop);
//     context.trackedObjects.add(LHSRangeBottom);
//     context.trackedObjects.add(RHSRangeTop);
//     context.trackedObjects.add(RHSRangeBottom);

//     if (ModelGranularity === "Monthly" && ColumnAvalue === "Monthly - Time Series") {
//       if (columnAValues[Roucounter - 1] === "Drop1") {
//         await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//         await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "mmm-yy");
//       }

//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", numberformat);
//     } else if (ModelGranularity === "Annual" && ColumnAvalue === "Annual - Time Series") {
//       if (columnAValues[Roucounter - 1] === "Drop1") {
//         await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//         await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
//       }

//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", numberformat);
//     } else if (ColumnAvalue === "Single Value") {
//       if (columnAValues[Roucounter - 1] === "Drop1") {
//         await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//         await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
//       }

//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       for (ColCounter = 0; ColCounter < 4; ColCounter++) {
//         await formatBluePattern(
//           context,
//           RHSRangeBottom.getColumn(ColCounter),
//           "#6D6E71",
//           "#EBCB71",
//           "#BFBFBF",
//           SingleValueNumberFormat[ColCounter]
//         );
//       }
//     } else if (ColumnAvalue === "Annual - Single Value") {
//       if (columnAValues[Roucounter - 1] === "Drop1") {
//         await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//         await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
//       }

//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       for (ColCounter = 0; ColCounter < 4; ColCounter++) {
//         await formatBluePattern(
//           context,
//           RHSRangeBottom.getColumn(ColCounter),
//           "#6D6E71",
//           "#EBCB71",
//           "#BFBFBF",
//           AnnualSingleValueNumberFormat[ColCounter]
//         );
//       }
//       await DataValidation(context, LHSRangeBottom.getColumn(1), GrowthTypeRule);
//     } else if (ColumnBvalue === "Events & Market Share -Head") {
//       if (columnAValues[Roucounter - 1] === "Drop1") {
//         await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//         await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//       }

//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
//       for (ColCounter = 0; ColCounter < ColumnEvalue - 9; ColCounter++) {
//         await formatBluePattern(
//           context,
//           RHSRangeBottom.getCell(ColCounter, 1).getAbsoluteResizedRange(1, ColumnEvalue - 9),
//           "#6D6E71",
//           "#EBCB71",
//           "#BFBFBF",
//           EventNumberformat[ColCounter]
//         );
//       }
//     } else if (ColumnBvalue === "Tx Mapping") {
//       if (columnAValues[Roucounter - 1] === "Drop1") {
//         await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//         await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//       }

//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
//     } else if (ColumnBvalue === "Events & Market Share") {
//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
//     } else if (ModelGranularity === "Monthly" && ColumnAvalue === "Annual - Time Series") {
//       if (columnAValues[Roucounter - 1] === "Drop1") {
//         await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
//         await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
//       }

//       await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
//       await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
//       await formatBluePattern(
//         context,
//         RHSRangeBottom.getCell(0, 1).getAbsoluteResizedRange(ColumnDvalue, ColumnEvalue - 8),
//         "#6D6E71",
//         "#EBCB71",
//         "#BFBFBF",
//         numberformat
//       );
//     }

//     context.trackedObjects.remove(LHSRangeTop);
//     context.trackedObjects.remove(LHSRangeBottom);
//     context.trackedObjects.remove(RHSRangeTop);
//     context.trackedObjects.remove(RHSRangeBottom);

//     console.log("formatLHSStructre function completed successfully.");
//   } catch (error) {
//     console.error("Error in formatLHSStructre function:", error);
//   }
// }

// async function formatBluePattern(context, range, fontColor, fillColor, borderColor, numberFormat) {
//   try {
//     range.load([
//       "address",
//       "format/font",
//       "format/fill",
//       "numberFormat",
//       "format/verticalAlignment",
//       "format/horizontalAlignment",
//       "format/borders",
//     ]);
//     context.trackedObjects.add(range);
//     await context.sync();
//     console.log(`Process 2: Loaded range properties: ${range.address}`);

//     // Set the font color, name, and size
//     range.format.font.color = fontColor;
//     range.format.font.name = "Arial";
//     range.format.font.size = 10;
//     console.log(`Process 3: Set font color to ${fontColor}, name to Arial, and size to 10`);

//     // Set the fill color
//     range.format.fill.color = fillColor;
//     console.log(`Process 4: Set fill color to ${fillColor}`);

//     // Set number format
//     range.numberFormat = numberFormat;
//     console.log(`Process 5: Set number format to ${numberFormat}`);

//     // Set vertical and horizontal alignment
//     range.format.verticalAlignment = "center";
//     range.format.horizontalAlignment = "center";
//     console.log("Process 6: Set vertical alignment to middle and horizontal alignment to center");

//     console.log("Process 7: First context sync completed");
//     // Ensure the borders are set
//     await border(context, range);

//     console.log("Borders applied.");
//     context.trackedObjects.remove(range);
//     await context.sync();
//   } catch (error) {
//     console.error(`Error formatting range ${range.address}:`, error);
//   }
// }

// async function border(context, range) {
//   range.format.borders.getItem("InsideHorizontal").style = "Continuous";
//   range.format.borders.getItem("InsideVertical").style = "Continuous";
//   range.format.borders.getItem("EdgeBottom").style = "Continuous";
//   range.format.borders.getItem("EdgeLeft").style = "Continuous";
//   range.format.borders.getItem("EdgeRight").style = "Continuous";
//   range.format.borders.getItem("EdgeTop").style = "Continuous";
//   range.format.borders.getItem("InsideHorizontal").color = "#BFBFBF";
//   range.format.borders.getItem("InsideVertical").color = "#BFBFBF";
//   range.format.borders.getItem("EdgeBottom").color = "#BFBFBF";
//   range.format.borders.getItem("EdgeLeft").color = "#BFBFBF";
//   range.format.borders.getItem("EdgeRight").color = "#BFBFBF";
//   range.format.borders.getItem("EdgeTop").color = "#BFBFBF";
// }

// async function DataValidation(context, range, Datarule) {
//   try {
//     console.log("Starting DataValidation function");
//     console.log("Datarule: ", Datarule);

//     // Add range to tracked objects
//     context.trackedObjects.add(range);

//     // Apply data validation rule
//     range.dataValidation.rule = {
//       list: {
//         inCellDropDown: true,
//         source: Datarule,
//       },
//     };

//     await context.sync();
//     console.log("Data validation rule applied");

//     // Remove range from tracked objects
//     context.trackedObjects.remove(range);
//   } catch (error) {
//     console.error("Error in DataValidation function:", error);
//   }
// }

// function dataStructFormat(assumptionData) {
//   let outputRHSFormat = "";

//   switch (assumptionData) {
//     case "Percentage":
//       outputRHSFormat = "0.0%";
//       break;
//     case "Number":
//       outputRHSFormat = '#,##0_);[Red](#,##0);"-"';
//       break;
//     case "Currency - Euros":
//       outputRHSFormat = "€#,##0.00";
//       break;
//     case "Currency - US Dollars":
//       outputRHSFormat = '"$" #,##0.0';
//       break;
//     case "Mapping Matrix":
//       outputRHSFormat = "";
//       break;
//     default:
//       outputRHSFormat = "";
//       break;
//   }

//   return outputRHSFormat;
// }
// ///////////////////////////// code last line///////////////////////////////////////////
/// format border function
// async function border(context, rangeAddress) {
//   console.log("vorders");
//   if (!rangeAddress || !rangeAddress.load) {
//     throw new Error("Invalid range object passed to border function.");
//   }
//   // sheet.getRange(rangeAddress);
//   rangeAddress.load([
//     "address",
//     "format/font",
//     "format/fill",
//     "numberFormat",
//     "format/verticalAlignment",
//     "format/horizontalAlignment",
//     "format/borders",
//   ]);
//   await context.sync();
//   rangeAddress.format.borders.getItem("InsideHorizontal").style = "Continuous";
//   rangeAddress.format.borders.getItem("InsideVertical").style = "Continuous";
//   rangeAddress.format.borders.getItem("EdgeBottom").style = "Continuous";
//   rangeAddress.format.borders.getItem("EdgeLeft").style = "Continuous";
//   rangeAddress.format.borders.getItem("EdgeRight").style = "Continuous";
//   rangeAddress.format.borders.getItem("EdgeTop").style = "Continuous";
//   rangeAddress.format.borders.getItem("InsideHorizontal").color = "#BFBFBF";
//   rangeAddress.format.borders.getItem("InsideVertical").color = "#BFBFBF";
//   rangeAddress.format.borders.getItem("EdgeBottom").color = "#BFBFBF";
//   rangeAddress.format.borders.getItem("EdgeLeft").color = "#BFBFBF";
//   rangeAddress.format.borders.getItem("EdgeRight").color = "#BFBFBF";
//   rangeAddress.format.borders.getItem("EdgeTop").color = "#BFBFBF";
//   await context.sync();
//   console.log("Borders completed");
// }

// export async function formatModelName(context, sheetName, rangeAddress) {
//   const sheet = context.workbook.worksheets.getItem(sheetName);
//   const range = sheet.getRange(rangeAddress);
//   range.load(["address", "format"]);
//   await context.sync();

//   // Set font properties
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.font.color = "#FFFFFF"; // Set font color to white

//   // Set fill color
//   range.format.fill.color = "#DA4E4E"; // Set fill color to rgb(20, 61, 102)
//   console.log("Fill red colour");

//   // Set horizontal alignment
//   range.format.horizontalAlignment = "Center";

//   // Set border styles
//   const borders = range.format.borders;
//   borders.getItem("EdgeLeft").style = "Continuous";
//   borders.getItem("EdgeTop").style = "Continuous";
//   borders.getItem("EdgeRight").style = "Continuous";
//   borders.getItem("EdgeBottom").style = "Continuous";

//   // Optionally set border colors if needed
//   borders.getItem("EdgeLeft").color = "#000000"; // Black
//   borders.getItem("EdgeTop").color = "#000000"; // Black
//   borders.getItem("EdgeRight").color = "#000000"; // Black
//   borders.getItem("EdgeBottom").color = "#000000"; // Black

//   await context.sync();
//   console.log("Formatting complete");
// }

// export async function formatGranularity(context, sheetName, rangeAddress) {
//   const sheet = context.workbook.worksheets.getItem(sheetName);
//   const range = sheet.getRange(rangeAddress);
//   range.load(["address", "format"]);
//   await context.sync();

//   // Set font properties
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.font.color = "#FFFFFF"; // Set font color to white

//   // Set fill color
//   range.format.fill.color = "#143D66"; // Set fill color to rgb(20, 61, 102)

//   // Set horizontal alignment
//   range.format.horizontalAlignment = "Center";

//   // Set border styles
//   const borders = range.format.borders;
//   borders.getItem("EdgeLeft").style = "Continuous";
//   borders.getItem("EdgeTop").style = "Continuous";
//   borders.getItem("EdgeRight").style = "Continuous";
//   borders.getItem("EdgeBottom").style = "Continuous";

//   // Optionally set border colors if needed
//   borders.getItem("EdgeLeft").color = "#000000"; // Black
//   borders.getItem("EdgeTop").color = "#000000"; // Black
//   borders.getItem("EdgeRight").color = "#000000"; // Black
//   borders.getItem("EdgeBottom").color = "#000000"; // Black

//   await context.sync();
//   console.log("Formatting complete");
// }

// export async function formatTimelineTop(context, sheetName, rangeAddress) {
//   const sheet = context.workbook.worksheets.getItem(sheetName);
//   const range = sheet.getRange(rangeAddress);
//   range.load(["address", "format", "rowIndex", "columnIndex"]);
//   await context.sync();

//   // Define the first range to format
//   const range1 = range.getRowsBelow(1).getCell(0, 0); // This is to ensure we are working with the first row

//   // Calculate the address of the second range (offset by 8 columns to the left)
//   const range2Address = `${String.fromCharCode(range.columnIndex + 65 - 8)}${range.rowIndex + 1}`;
//   const range2 = sheet.getRange(range2Address);
//   range2.load(["address", "format"]);
//   await context.sync();

//   // Apply formatting to the first range
//   applyFormatting(range1);

//   // Apply formatting to the second range
//   applyFormatting(range2);

//   await context.sync();
//   console.log("Formatting complete");
// }

// function applyFormatting(range) {
//   // Set font properties
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.font.color = "#FFFFFF"; // Set font color to white

//   // Set fill color
//   range.format.fill.color = "#143D66"; // Set fill color to rgb(20, 61, 102)

//   // Set horizontal alignment
//   range.format.horizontalAlignment = "Center";

//   // Set border styles and colors
//   const borders = range.format.borders;
//   borders.getItem("EdgeLeft").style = "Continuous";
//   borders.getItem("EdgeTop").style = "Continuous";
//   borders.getItem("EdgeRight").style = "Continuous";
//   borders.getItem("EdgeBottom").style = "Continuous";

//   borders.getItem("EdgeLeft").color = "#BFBFBF"; // Gray
//   borders.getItem("EdgeTop").color = "#BFBFBF"; // Gray
//   borders.getItem("EdgeRight").color = "#BFBFBF"; // Gray
//   borders.getItem("EdgeBottom").color = "#BFBFBF"; // Gray
// }

// export async function formatLHS(context, sheetName, rangeAddress) {
//   await Excel.run(async (context) => {
//     const sheet = context.workbook.worksheets.getItem(sheetName);
//     const range1 = sheet.getRange(rangeAddress);

//     // Load necessary properties
//     range1.load(["address", "rowIndex", "columnIndex", "rowCount"]);
//     await context.sync();

//     // Define the data range (excluding the first row)
//     const dataRange = range1.getOffsetRange(1, 0).getResizedRange(-1, 0);

//     // Apply formatting to the data range
//     applyFormatting1(dataRange);

//     await context.sync();
//     console.log("Formatting complete");
//   }).catch((error) => {
//     console.error("Error:", error);
//   });
// }

// function applyFormatting1(range) {
//   // Set font properties
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.font.color = "#6D6E71"; // RGB(109, 110, 113)

//   // Set fill color
//   range.format.fill.color = "#F2F2F2"; // RGB(242, 242, 242)

//   // Set horizontal alignment
//   range.format.horizontalAlignment = "Center";

//   // Set border styles and colors
//   const borders = range.format.borders;
//   borders.getItem("EdgeLeft").style = "Continuous";
//   borders.getItem("EdgeTop").style = "Continuous";
//   borders.getItem("EdgeRight").style = "Continuous";
//   borders.getItem("EdgeBottom").style = "Continuous";
//   borders.getItem("InsideVertical").style = "Continuous";
//   borders.getItem("InsideHorizontal").style = "Continuous";

//   borders.getItem("EdgeLeft").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeTop").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeRight").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeBottom").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideVertical").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideHorizontal").color = "#BFBFBF"; // RGB(191, 191, 191)

//   // Set border weight
//   borders.getItem("EdgeLeft").weight = "Thin";
//   borders.getItem("EdgeTop").weight = "Thin";
//   borders.getItem("EdgeRight").weight = "Thin";
//   borders.getItem("EdgeBottom").weight = "Thin";
//   borders.getItem("InsideVertical").weight = "Thin";
//   borders.getItem("InsideHorizontal").weight = "Thin";
// }

// export async function formatLHSHead(context, sheetName, rangeAddress) {
//   const sheet = context.workbook.worksheets.getItem(sheetName);
//   const range = sheet.getRange(rangeAddress);
//   range.load(["address", "rowCount", "columnCount"]);
//   await context.sync();

//   // Define the data range (excluding the first row)
//   // const dataRange = range.getOffsetRange(1, 0).getResizedRange(1, 0);

//   // Format the first row
//   const firstRow = range.getRow(0); //Check with NG (-2)
//   formatFirstRow(firstRow);

//   await context.sync();
//   console.log("Formatting complete");
// }

// function formatFirstRow(range) {
//   // Set font properties
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.font.color = "#FFFFFF"; // RGB(255, 255, 255)

//   // Set fill color
//   range.format.fill.color = "#143D66"; // RGB(20, 61, 102)

//   // Set horizontal alignment
//   range.format.horizontalAlignment = "Center";

//   // Set border styles and colors
//   const borders = range.format.borders;
//   borders.getItem("EdgeLeft").style = "Continuous";
//   borders.getItem("EdgeTop").style = "Continuous";
//   borders.getItem("EdgeRight").style = "Continuous";
//   borders.getItem("EdgeBottom").style = "Continuous";
//   borders.getItem("InsideVertical").style = "Continuous";
//   borders.getItem("InsideHorizontal").style = "Continuous";

//   borders.getItem("EdgeLeft").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeTop").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeRight").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeBottom").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideVertical").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideHorizontal").color = "#BFBFBF"; // RGB(191, 191, 191)

//   // Set border weight
//   borders.getItem("EdgeLeft").weight = "Thin";
//   borders.getItem("EdgeTop").weight = "Thin";
//   borders.getItem("EdgeRight").weight = "Thin";
//   borders.getItem("EdgeBottom").weight = "Thin";
//   borders.getItem("InsideVertical").weight = "Thin";
//   borders.getItem("InsideHorizontal").weight = "Thin";
// }

// export async function formatTimelineHead(
//   context,
//   sheetName,
//   rangeAddress,
//   modelGranularity,
//   inputGranularity,
//   formatString
// ) {
//   const sheet = context.workbook.worksheets.getItem(sheetName);
//   const range = sheet.getRange(rangeAddress);
//   range.load(["address", "rowCount", "columnCount"]);
//   await context.sync();

//   // Define the data range (excluding the first row)
//   const dataRange = range.getOffsetRange(1, 0).getResizedRange(-1, 0);

//   // Identify the data format based on the input granularity
//   let formatStringHead;
//   if (inputGranularity === "Monthly") {
//     formatStringHead = "mmm-yy";
//   } else if (inputGranularity === "Annual") {
//     formatStringHead = "yyyy";
//   }

//   // Format the first row
//   const firstRow = range.getRowsAbove(-2).getRow(0); //Check with NG
//   await formatFirstRow1(firstRow, formatStringHead);

//   await context.sync();
//   console.log("Formatting complete");
// }

// async function formatFirstRow1(range, formatStringHead) {
//   // Set font properties
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.numberFormat = [[formatStringHead]];
//   range.format.font.color = "#FFFFFF"; // RGB(255, 255, 255)

//   // Set fill color
//   range.format.fill.color = "#143D66"; // RGB(20, 61, 102)

//   // Set horizontal alignment
//   range.format.horizontalAlignment = "Center";

//   // Set border styles and colors
//   const borders = range.format.borders;
//   borders.getItem("EdgeLeft").style = "Continuous";
//   borders.getItem("EdgeTop").style = "Continuous";
//   borders.getItem("EdgeRight").style = "Continuous";
//   borders.getItem("EdgeBottom").style = "Continuous";
//   borders.getItem("InsideVertical").style = "Continuous";
//   borders.getItem("InsideHorizontal").style = "Continuous";

//   borders.getItem("EdgeLeft").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeTop").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeRight").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeBottom").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideVertical").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideHorizontal").color = "#BFBFBF"; // RGB(191, 191, 191)

//   // Set border weight
//   borders.getItem("EdgeLeft").weight = "Thin";
//   borders.getItem("EdgeTop").weight = "Thin";
//   borders.getItem("EdgeRight").weight = "Thin";
//   borders.getItem("EdgeBottom").weight = "Thin";
//   borders.getItem("InsideVertical").weight = "Thin";
//   borders.getItem("InsideHorizontal").weight = "Thin";
// }

// export async function eventFormat(context, sheetName, rangeAddress, timeline1, modelGranularity) {
//   const sheet = context.workbook.worksheets.getItem(sheetName);
//   const range = sheet.getRange(rangeAddress);
//   range.load(["address", "rowCount", "columnCount"]);
//   await context.sync();

//   // Identify the data format based on the model granularity
//   let formatStringHead;
//   if (modelGranularity === "Monthly") {
//     formatStringHead = "mmm-yy";
//   } else if (modelGranularity === "Annual") {
//     formatStringHead = "yyyy";
//   }

//   // Define the data range (excluding the first row)
//   const dataRange = range.getCell(1, 0).getResizedRange(range.rowCount - 2, range.columnCount - 1);

//   // Format the data range
//   await formatDataRange(dataRange);

//   await context.sync();
//   console.log("Formatting complete");
// }

// async function formatDataRange(range) {
//   // Set font properties
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.numberFormat = [["0.0%"]];
//   range.format.font.color = "#6D6E71"; // RGB(109, 110, 113)

//   // Set fill color
//   range.format.fill.color = "#F0D995"; // RGB(240, 217, 149)

//   // Set horizontal alignment
//   range.format.horizontalAlignment = "Center";

//   // Set border styles and colors
//   const borders = range.format.borders;
//   borders.getItem("EdgeLeft").style = "Continuous";
//   borders.getItem("EdgeTop").style = "Continuous";
//   borders.getItem("EdgeRight").style = "Continuous";
//   borders.getItem("EdgeBottom").style = "Continuous";
//   borders.getItem("InsideVertical").style = "Continuous";
//   borders.getItem("InsideHorizontal").style = "Continuous";

//   borders.getItem("EdgeLeft").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeTop").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeRight").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("EdgeBottom").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideVertical").color = "#BFBFBF"; // RGB(191, 191, 191)
//   borders.getItem("InsideHorizontal").color = "#BFBFBF"; // RGB(191, 191, 191)

//   // Set border weight
//   borders.getItem("EdgeLeft").weight = "Thin";
//   borders.getItem("EdgeTop").weight = "Thin";
//   borders.getItem("EdgeRight").weight = "Thin";
//   borders.getItem("EdgeBottom").weight = "Thin";
//   borders.getItem("InsideVertical").weight = "Thin";
//   borders.getItem("InsideHorizontal").weight = "Thin";
// }
// export async function formatPersistenceHead(context, rangeAddress) {
//   Excel.run(function (context) {
//     var sheet = context.workbook.worksheets.getActiveWorksheet();
//     var range = sheet.getRange(rangeAddress);

//     // const rowCount = range.rowCount;
//     // const colCount = range.columnCount;

//     // var curveType = "Custom,Diffusion,Mean,Median";

//     // Format the head row
//     var headerRange = range.getRow(0);
//     console.log("Process 1");

//     headerRange.format.font.size = 9;
//     headerRange.format.font.name = "Arial";
//     headerRange.format.fill.color = "#143D66";
//     headerRange.format.font.color = "#FFFFFF";
//     console.log("Process 2");
//     headerRange.format.horizontalAlignment = Excel.HorizontalAlignment.center;
//     headerRange.format.borders.getItem("EdgeTop").style = Excel.BorderLineStyle.continuous;
//     headerRange.format.borders.getItem("EdgeBottom").style = Excel.BorderLineStyle.continuous;
//     headerRange.format.borders.getItem("EdgeLeft").style = Excel.BorderLineStyle.continuous;
//     console.log("Process 3");
//     headerRange.format.borders.getItem("EdgeRight").style = Excel.BorderLineStyle.continuous;
//     headerRange.format.borders.getItem("EdgeTop").weight = Excel.BorderWeight.thin;
//     headerRange.format.borders.getItem("EdgeBottom").weight = Excel.BorderWeight.thin;
//     headerRange.format.borders.getItem("EdgeLeft").weight = Excel.BorderWeight.thin;
//     console.log("Process 4");
//     headerRange.format.borders.getItem("EdgeRight").weight = Excel.BorderWeight.thin;
//     headerRange.format.borders.getItem("EdgeTop").color = "#BFBFBF";
//     headerRange.format.borders.getItem("EdgeBottom").color = "#BFBFBF";
//     headerRange.format.borders.getItem("EdgeLeft").color = "#BFBFBF";
//     headerRange.format.borders.getItem("EdgeRight").color = "#BFBFBF";

//     return context.sync();
//   }).catch(function (error) {
//     console.log(error);
//   });
// }

// export async function formatPersistence(context, rangeAddress) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Load the rowCount and columnCount properties
//       range.load(["rowCount", "columnCount"]);
//       await context.sync();

//       const rowCount = range.rowCount;
//       const colCount = range.columnCount;
//       console.log(rowCount, colCount);

//       const curveType = "Custom,Diffusion,Mean,Median";
//       console.log("Process number 1");
//       // Format the first column
//       const firstColumnRange = range
//         .getColumn(0)
//         .getCell(1, 0)
//         .getResizedRange(rowCount - 2, 0);
//       formatColumn(
//         firstColumnRange,
//         9,
//         "Arial",
//         "#F0D995",
//         "#6D6E71",
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF"
//       );
//       console.log("Process number 2");
//       setValidation(firstColumnRange, curveType);

//       // Format the second column
//       const secondColumnRange = range
//         .getColumn(1)
//         .getCell(1, 0)
//         .getResizedRange(rowCount - 2, 0);
//       formatColumn(
//         secondColumnRange,
//         9,
//         "Arial",
//         "#F0D995",
//         "#6D6E71",
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         '#,##0_);[Red](#,##0);"-"'
//       );

//       // Format the third column
//       const thirdColumnRange = range
//         .getColumn(2)
//         .getCell(1, 0)
//         .getResizedRange(rowCount - 2, 0);
//       formatColumn(
//         thirdColumnRange,
//         9,
//         "Arial",
//         "#F0D995",
//         "#6D6E71",
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         "0.0%"
//       );

//       // Format the fourth column
//       const fourthColumnRange = range
//         .getColumn(3)
//         .getCell(1, 0)
//         .getResizedRange(rowCount - 2, 0);
//       formatColumn(
//         fourthColumnRange,
//         9,
//         "Arial",
//         "#F0D995",
//         "#6D6E71",
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         '#,##0_);[Red](#,##0);"-"'
//       );

//       // Format from the fifth to the nth columns
//       const otherColumnsRange = range.getCell(1, 4).getResizedRange(rowCount - 2, colCount - 5);
//       formatColumn(
//         otherColumnsRange,
//         9,
//         "Arial",
//         "#F0D995",
//         "#6D6E71",
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         "0.0%"
//       );

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatColumn(
//   range,
//   fontSize,
//   fontName,
//   fillColor,
//   fontColor,
//   borderStyle,
//   borderWeight,
//   borderColor,
//   numberFormat
// ) {
//   range.format.font.size = fontSize;
//   range.format.font.name = fontName;
//   range.format.fill.color = fillColor;
//   range.format.font.color = fontColor;
//   range.format.horizontalAlignment = Excel.HorizontalAlignment.center;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = borderStyle;
//     border.weight = borderWeight;
//     border.color = borderColor;
//   });

//   if (numberFormat) {
//     range.numberFormat = numberFormat;
//   }
// }

// function setValidation(range, list) {
//   console.log("Process number 3");
//   range.dataValidation.rule = {
//     list: {
//       inCellDropDown: true,
//       source: list,
//     },
//     ignoreBlanks: true,
//   };
// }

// export async function timelineFormatSinglePointHead(rangeAddress, formatstring, inputGranularity) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Load the rowCount and columnCount properties
//       range.load(["rowCount", "columnCount"]);
//       await context.sync();

//       const rowCount = range.rowCount;
//       const colCount = range.columnCount;
//       console.log(rowCount, colCount);

//       const validationFormula = "Sum,Avg,Step,Retain Values";
//       let formatstringhead = "";

//       // Define the data range (excluding the first row)
//       const dataRng = range.getOffsetRange(0, 1).getResizedRange(0, colCount - 2);

//       // Set formatstringhead based on inputGranularity
//       if (inputGranularity === "Monthly") {
//         formatstringhead = "mmm-yy";
//       } else if (inputGranularity === "Annual") {
//         formatstringhead = "yyyy";
//       }

//       // Format the first row
//       const firstRowRange = range.getRow(0);
//       formatRow(
//         firstRowRange,
//         9,
//         "Arial",
//         "#143D66",
//         "#FFFFFF",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF"
//       );

//       // Format the last cell in the first row
//       const lastCell = range.getCell(0, colCount - 1);
//       lastCell.format.font.size = 9;
//       lastCell.format.font.name = "Arial";
//       lastCell.numberFormat = formatstringhead;
//       lastCell.format.fill.color = "#143D66";
//       lastCell.format.font.color = "#FFFFFF";
//       lastCell.format.horizontalAlignment = Excel.HorizontalAlignment.center;
//       ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//         const border = lastCell.format.borders.getItem(edge);
//         border.style = Excel.BorderLineStyle.continuous;
//         border.weight = Excel.BorderWeight.thin;
//         border.color = "#BFBFBF";
//       });

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatRow(
//   range,
//   fontSize,
//   fontName,
//   fillColor,
//   fontColor,
//   horizontalAlignment,
//   borderStyle,
//   borderWeight,
//   borderColor
// ) {
//   range.format.font.size = fontSize;
//   range.format.font.name = fontName;
//   range.format.fill.color = fillColor;
//   range.format.font.color = fontColor;
//   range.format.horizontalAlignment = horizontalAlignment;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = borderStyle;
//     border.weight = borderWeight;
//     border.color = borderColor;
//   });
// }
// export async function formatTimelineGrowthHead(context, rangeAddress, formatstring, inputGranularity) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Load the rowCount and columnCount properties
//       range.load(["rowCount", "columnCount"]);
//       await context.sync();

//       const rowCount = range.rowCount;
//       const colCount = range.columnCount;
//       console.log(rowCount, colCount);

//       const validationFormula = "Sum,Avg,Step,Retain Values";
//       let formatstringhead = "";

//       // Define the data range (excluding the first row)
//       const dataRng = range.getOffsetRange(1, 1).getResizedRange(rowCount - 2, colCount - 1);

//       // Set formatstringhead based on inputGranularity
//       if (inputGranularity === "Monthly") {
//         formatstringhead = "mmm-yy";
//       } else if (inputGranularity === "Annual") {
//         formatstringhead = "yyyy";
//       }

//       // Format the first cell in the first row
//       const firstCell = range.getCell(0, 0);
//       formatCell(
//         firstCell,
//         9,
//         "Arial",
//         "#143D66",
//         "#FFFFFF",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF"
//       );

//       // Format the rest of the first row
//       const firstRowRange = range
//         .getRow(0)
//         .getCell(0, 1)
//         .getResizedRange(0, colCount - 2);
//       formatCell(
//         firstRowRange,
//         9,
//         "Arial",
//         "#143D66",
//         "#FFFFFF",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         formatstringhead
//       );

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatCell(
//   range,
//   fontSize,
//   fontName,
//   fillColor,
//   fontColor,
//   horizontalAlignment,
//   borderStyle,
//   borderWeight,
//   borderColor,
//   numberFormat = null
// ) {
//   range.format.font.size = fontSize;
//   range.format.font.name = fontName;
//   range.format.fill.color = fillColor;
//   range.format.font.color = fontColor;
//   range.format.horizontalAlignment = horizontalAlignment;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = borderStyle;
//     border.weight = borderWeight;
//     border.color = borderColor;
//   });

//   if (numberFormat) {
//     range.numberFormat = numberFormat;
//   }
// }
// export async function formatTxMapHead(context, rangeAddress) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Load the rowCount and columnCount properties
//       range.load(["rowCount", "columnCount"]);
//       await context.sync();

//       const rowCount = range.rowCount;
//       const colCount = range.columnCount;
//       console.log(`Row count: ${rowCount}, Column count: ${colCount}`);

//       // Format the head row
//       const headerRow = range.getRow(0);
//       formatHeaderRow(headerRow);

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatHeaderRow(range) {
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.fill.color = "#143D66"; // RGB(20, 61, 102)
//   range.format.font.color = "#FFFFFF"; // RGB(255, 255, 255)
//   range.format.horizontalAlignment = Excel.HorizontalAlignment.center;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = Excel.BorderLineStyle.continuous;
//     border.weight = Excel.BorderWeight.thin;
//     border.color = "#BFBFBF"; // RGB(191, 191, 191)
//   });
// }
// export async function formatTxMap(context, rangeAddress) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       console.log("Step 1");

//       // Load the rowCount and columnCount properties
//       range.load(["rowCount", "columnCount"]);
//       await context.sync();
//       console.log("Step 2");
//       const rowCount = range.rowCount;
//       const colCount = range.columnCount;
//       console.log(`Row count: ${rowCount}, Column count: ${colCount}`);
//       console.log("Step 3");
//       // Define the persistency curvetype inputs here in the string
//       // let result = `${segmentname[1]}:${segmentname[segmentname.length - 1]}`;

//       // Format first columns
//       const formatRange = range.getCell(1, 0).getResizedRange(rowCount - 2, colCount - 1);
//       console.log("Step 4");
//       formatFirstColumns(formatRange, result);
//       console.log("Step 5");
//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatFirstColumns(range, validationFormula) {
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.fill.color = "#F0D995"; // RGB(240, 217, 149)
//   range.format.font.color = "#6D6E71"; // RGB(109, 110, 113)
//   range.format.horizontalAlignment = Excel.HorizontalAlignment.center;
//   console.log("Intermediate step 1")[("EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight")].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = Excel.BorderLineStyle.continuous;
//     border.weight = Excel.BorderWeight.thin;
//     border.color = "#BFBFBF"; // RGB(191, 191, 191)
//   });
//   console.log("Intermediate step 2");
//   // Apply validation
//   range.dataValidation.rule = {
//     list: {
//       inCellDropDown: true,
//       source: [validationFormula],
//     },

//     ignoreBlanks: true,
//   };
// }
// export async function formatBlanks(context, rangeAddress) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Format the first row
//       const firstRow = range.getRow(0);

//       firstRow.format.font.size = 9;
//       firstRow.format.font.name = "Arial";
//       firstRow.format.borders.color = "#BFBFBF"; // RGB(191, 191, 191)
//       firstRow.format.fill.color = "#FFFFFF"; // RGB(255, 255, 255)
//       firstRow.format.font.color = "#FFFFFF"; // RGB(255, 255, 255)
//       firstRow.format.horizontalAlignment = Excel.HorizontalAlignment.center;

//       ["EdgeLeft", "EdgeTop", "EdgeRight", "EdgeBottom"].forEach((edge) => {
//         const border = firstRow.format.borders.getItem(edge);
//         border.style = Excel.BorderLineStyle.continuous;
//       });

//       ["InsideVertical", "InsideHorizontal"].forEach((edge) => {
//         const border = firstRow.format.borders.getItem(edge);
//         border.style = Excel.BorderLineStyle.none;
//       });

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
// export async function formatTimeline(context, rangeAddress, inputGranularity, formatstring) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Load the rowCount property
//       range.load(["rowCount"]);
//       await context.sync();

//       const rowCount = range.rowCount;

//       // Define the data range (excluding the first row)
//       const dataRng = range.getCell(1, 0).getResizedRange(rowCount - 2, range.columnCount - 1);

//       let formatstringhead;
//       let inputType;

//       if (inputGranularity === "Monthly") {
//         formatstringhead = "mmm-yy";
//         inputType = "Monthly";
//       } else if (inputGranularity === "Annual") {
//         formatstringhead = "yyyy";
//         inputType = "Annual";
//       }

//       // Format the data range
//       formatDataRange1(dataRng, formatstring);

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatDataRange1(range, formatstring) {
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.numberFormat = formatstring;
//   range.format.fill.color = "#F0D995"; // RGB(240, 217, 149)
//   range.format.font.color = "#6D6E71"; // RGB(109, 110, 113)
//   range.format.horizontalAlignment = Excel.HorizontalAlignment.center;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = Excel.BorderLineStyle.continuous;
//     border.weight = Excel.BorderWeight.thin;
//     border.color = "#BFBFBF"; // RGB(191, 191, 191)
//   });
// }
// export async function formatTimelineGrowth(context, rangeAddress, formatstring, inputGranularity) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Load the rowCount and columnCount properties
//       range.load(["rowCount", "columnCount"]);
//       await context.sync();

//       const rowCount = range.rowCount;
//       const colCount = range.columnCount;
//       console.log(`Row count: ${rowCount}, Column count: ${colCount}`);

//       let formatstringhead;
//       const validationFormula = "Sum,Avg,Step,Retain Values";

//       if (inputGranularity === "Monthly") {
//         formatstringhead = "mmm-yy";
//       } else if (inputGranularity === "Annual") {
//         formatstringhead = "yyyy";
//       }

//       // Define the data range (excluding the first row)
//       const dataRng = range.getOffsetRange(1, 1).getResizedRange(rowCount - 2, colCount - 1);

//       // Format the first column
//       const firstColumnRange = range
//         .getColumn(0)
//         .getCell(1, 0)
//         .getResizedRange(rowCount - 2, 0);
//       formatFirstColumn(firstColumnRange, validationFormula);

//       // Format the data range
//       formatDataRange2(dataRng, formatstring);

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatFirstColumn(range, validationFormula) {
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.format.fill.color = "#F0D995"; // RGB(240, 217, 149)
//   range.format.font.color = "#6D6E71"; // RGB(109, 110, 113)
//   range.format.horizontalAlignment = Excel.HorizontalAlignment.center;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = Excel.BorderLineStyle.continuous;
//     border.weight = Excel.BorderWeight.thin;
//     border.color = "#BFBFBF"; // RGB(191, 191, 191)
//   });

//   // Apply validation
//   range.dataValidation.rule = {
//     list: {
//       inCellDropDown: true,
//       source: validationFormula.split(","),
//     },
//     ignoreBlanks: true,
//   };
// }

// function formatDataRange2(range, formatstring) {
//   range.format.font.size = 9;
//   range.format.font.name = "Arial";
//   range.numberFormat = formatstring;
//   range.format.fill.color = "#F0D995"; // RGB(240, 217, 149)
//   range.format.font.color = "#6D6E71"; // RGB(109, 110, 113)
//   range.format.horizontalAlignment = Excel.HorizontalAlignment.center;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = Excel.BorderLineStyle.continuous;
//     border.weight = Excel.BorderWeight.thin;
//     border.color = "#BFBFBF"; // RGB(191, 191, 191)
//   });
// }
// export async function eventFormatHead(context, rangeAddress, timeline1, modelGranularity) {
//   try {
//     await Excel.run(async (context) => {
//       const sheet = context.workbook.worksheets.getActiveWorksheet();
//       const range = sheet.getRange(rangeAddress);

//       // Load the rowCount and columnCount properties
//       range.load(["rowCount", "columnCount"]);
//       await context.sync();

//       const rowCount = range.rowCount;
//       const colCount = range.columnCount;
//       console.log(`Row count: ${rowCount}, Column count: ${colCount}`);

//       const onoff = "ON,OFF";
//       const curveType = "Custom,Diffusion";
//       let formatstringhead;

//       if (modelGranularity === "Monthly") {
//         formatstringhead = "mmm-yy";
//       } else if (modelGranularity === "Annual") {
//         formatstringhead = "yyyy";
//       }

//       // Format the first row
//       formatRow1(
//         range.getRow(0),
//         9,
//         "Arial",
//         "#143D66",
//         "#FFFFFF",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF"
//       );

//       // Format the second row with validation
//       formatRowWithValidation(
//         range.getRow(1),
//         9,
//         "Arial",
//         formatstringhead,
//         "#F0D995",
//         "#6D6E71",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         onoff
//       );

//       // Format the third row with validation
//       formatRowWithValidation(
//         range.getRow(2),
//         9,
//         "Arial",
//         formatstringhead,
//         "#F0D995",
//         "#6D6E71",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         `=${timeline1}`
//       );

//       // Format the fourth row with validation
//       formatRowWithValidation(
//         range.getRow(3),
//         9,
//         "Arial",
//         formatstringhead,
//         "#F0D995",
//         "#6D6E71",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF",
//         curveType
//       );

//       // Format rows 5 and 6
//       const rows5and6 = range.getCell(4, 0).getResizedRange(1, colCount - 1);
//       formatRow1(
//         rows5and6,
//         9,
//         "Arial",
//         "#F0D995",
//         "#6D6E71",
//         Excel.HorizontalAlignment.center,
//         Excel.BorderLineStyle.continuous,
//         Excel.BorderWeight.thin,
//         "#BFBFBF"
//       );

//       await context.sync(); // Final sync
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// function formatRow1(
//   range,
//   fontSize,
//   fontName,
//   fillColor,
//   fontColor,
//   horizontalAlignment,
//   borderStyle,
//   borderWeight,
//   borderColor
// ) {
//   range.format.font.size = fontSize;
//   range.format.font.name = fontName;
//   range.format.fill.color = fillColor;
//   range.format.font.color = fontColor;
//   range.format.horizontalAlignment = horizontalAlignment;

//   ["EdgeTop", "EdgeBottom", "EdgeLeft", "EdgeRight"].forEach((edge) => {
//     const border = range.format.borders.getItem(edge);
//     border.style = borderStyle;
//     border.weight = borderWeight;
//     border.color = borderColor;
//   });
// }

// function formatRowWithValidation(
//   range,
//   fontSize,
//   fontName,
//   numberFormat,
//   fillColor,
//   fontColor,
//   horizontalAlignment,
//   borderStyle,
//   borderWeight,
//   borderColor,
//   validationFormula
// ) {
//   //formatRow(range, fontSize, fontName, fillColor, fontColor, horizontalAlignment, borderStyle, borderWeight, borderColor);
//   range.numberFormat = numberFormat;
//   range.dataValidation.rule = {
//     list: {
//       inCellDropDown: true,
//       source: validationFormula.split(","),
//     },
//     ignoreBlanks: true,
//   };
// }
export async function getActiveSheetName() {
  return await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    sheet.load("name");
    await context.sync();
    console.log(`The active sheet name is: ${sheet.name}`);
    return sheet.name;
  }).catch((error) => {
    console.error("Error: " + error);
  });
}