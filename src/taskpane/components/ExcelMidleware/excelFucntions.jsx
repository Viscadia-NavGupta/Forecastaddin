import { Output } from "@mui/icons-material";
import { fontSize } from "@mui/system";

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
    var z = 0; // iterate over row of an array
    let k = 0; // iterate over 3rd metric of array

    while (i < totalRowcount) {
      if (columnBValues[i] === "Timeline" && columnFValues[i] === "model specification|Timeline") {
        let sourceRange = usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, totalColCount - offsetcol);
        context.trackedObjects.add(sourceRange);
        sourceRange.format.columnWidth = 100;
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
        let flowNameRange = usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, j);
        flowNameRange.load("address");
        await context.sync();
        var flowNameRangeaddress = await toAbsoluteAddress(flowNameRange.address);
      } else if (columnBValues[i] === "Flow Outputs") {
        j = 0;
        k = Flowcount[0];
        OutputNames.push([usedRange.values[i][6], i]);
        z++;
        console.log(OutputNames);
      } else if (columnBValues[i] === "Granularity" && columnFValues[i] === "model specification|granularity") {
        let sourceRange = usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, 3);
        ModelGranularity = columnIValues[i];
        context.trackedObjects.add(sourceRange);
        await formatBluePattern(context, sourceRange, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        context.trackedObjects.remove(sourceRange);
      } else if (
        columnAValues[i] === "Monthly - Single Value" ||
        columnBValues[i] === "Events & Market Share - Head" ||
        columnAValues[i] === "-" ||
        columnBValues[i] === "Events & Market Share" ||
        columnAValues[i] === "Annual - Single Value" ||
        columnAValues[i] === "Annual - Time Series" ||
        columnBValues[i] === "Tx Mapping"
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
          timelineaddress,
          SegmentName,
          OutputNames,
          Flowcount
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
          timelineaddress,
          SegmentName,
          OutputNames,
          Flowcount
        );
        i += columnDValues[i] - 1;
      } else if (columnBValues[i] === "Multiple Flow Outputs") {
        if (columnAValues[i - 1] === "Drop1") {
          await formatBluePattern(
            context,
            usedRange.getCell(i - 1, offsetcol).getAbsoluteResizedRange(1, columnEValues[i]),
            "#FFFFFF",
            "#143D66",
            "#BFBFBF",
            "Text"
          );
        }
        await formatBluePattern(
          context,
          usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(columnDValues[i], columnEValues[i]),
          "#6D6E71",
          "#EBCB71",
          "#BFBFBF",
          "General"
        );

        for (k = 0; k < flowNames.length - 1; k++) {
          await DataValidation(
            context,
            usedRange.getCell(i, offsetcol + 2 + k).getAbsoluteResizedRange(columnDValues[i], 1),
            "=" + outputrangeaddress[k]
          );
        }
        let multiflowrange = usedRange
          .getCell(i, offsetcol + 1)
          .getAbsoluteResizedRange(columnDValues[i], columnEValues[i]);
        multiflowrange.load("address");
        await context.sync();
        var multiflowrangeaddress = await toAbsoluteAddress(multiflowrange.address);

        i += columnDValues[i] - 1;
      } else if (columnBValues[i] === "Rollup Outputs") {
        if (columnAValues[i - 1] === "Drop1") {
          await formatBluePattern(
            context,
            usedRange.getCell(i - 1, offsetcol).getAbsoluteResizedRange(1, columnEValues[i]),
            "#FFFFFF",
            "#143D66",
            "#BFBFBF",
            "Text"
          );
        }
        await formatBluePattern(
          context,
          usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(columnDValues[i], columnEValues[i]),
          "#6D6E71",
          "#EBCB71",
          "#BFBFBF",
          "General"
        );
        await formatBluePattern(
          context,
          usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(columnDValues[i], 1),
          "#6D6E71",
          "#FFFFFF",
          "#BFBFBF",
          "General"
        );
        let flownameinputrange = usedRange.getCell(i, offsetcol + 1).getAbsoluteResizedRange(1, 1);
        flownameinputrange.load("address");
        await context.sync();
        var flownameinputrangeaddress = flownameinputrange.address;
        var rollupdatarule = await Rollupoutputrange(
          flownameinputrangeaddress,
          multiflowrangeaddress,
          flowNameRangeaddress,
          outputrangeaddress
        );
        await DataValidation(
          context,
          usedRange.getCell(i, offsetcol + 1).getAbsoluteResizedRange(columnDValues[i], 1),
          "=" + flowNameRangeaddress
        );
        await DataValidation(
          context,
          usedRange.getCell(i, offsetcol + 2).getAbsoluteResizedRange(columnDValues[i], 1),
          rollupdatarule
        );

        i += columnDValues[i] - 1;
      } else if (columnBValues[i] === "Flow Start") {
        var hideend = i;
        var outputrangeaddress = await getRangeAddresses(context, flowNames, OutputNames, usedRange);
        await formatBluePattern(
          context,
          usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, 1),
          "#143D66",
          "#ffffff",
          "#ffffff",
          "General",
          12,
          true
        );
      } else if (columnBValues[i] === "Model Name") {
        await formatBluePattern(
          context,
          usedRange.getCell(i, offsetcol + 1).getAbsoluteResizedRange(columnDValues[i], 1),
          "#FFFFFF",
          "#143D66",
          "#BFBFBF",
          "General"
        );
        await formatBluePattern(
          context,
          usedRange.getCell(i, offsetcol + 2).getAbsoluteResizedRange(columnDValues[i], 1),
          "#808080",
          "#EBCB71",
          "#BFBFBF",
          "General"
        );
      } else if (columnBValues[i] === "Start Date" || columnBValues[i] === "End Date") {
        if (columnBValues[i] === "Start Date") {
          var hidestart = i;
        }
        await formatBluePattern(
          context,
          usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(1, 1),
          "#808080",
          "#ffffff",
          "#BFBFBF",
          "dd-mm-yyyy"
        );
      } else if (columnAValues[i] === "") {
      }
      console.log(columnBValues[i], i);
      i++;
    }
    sheet.showGridlines = false;
    // usedRange.getCell(1, 0).getAbsoluteResizedRange(totalRowcount, 5).clear(Excel.ClearApplyTo.contents);
    usedRange.getCell(1, 0).getAbsoluteResizedRange(1, 6).format.columnWidth = 0;
    usedRange.getCell(hidestart, 1).getAbsoluteResizedRange(hideend - hidestart - 2, 1).format.rowHeight = 0;
    usedRange.getCell(0, 0).getAbsoluteResizedRange(1, 1).format.rowHeight = 0;
    await context.sync();
    let rangerowsadd = sheet.getRange("A1");
    rangerowsadd.getEntireRow().insert(Excel.InsertShiftDirection.down);
    rangerowsadd.getEntireRow().insert(Excel.InsertShiftDirection.down);
    await context.sync();
    await setRowHeightAndColumnWidth(sheet.getRange("A1"));
    await addImageToSheet(sheetName);
    await formatBluePattern(context, sheet.getRange("A1:Z1"), "#143D66", "#BFBFBF", "#BFBFBF", "General", 14, true);
    let ACEvalue = sheet.getRange("H1");
    ACEvalue.values = "ACE";
    sheet.getRange("A1").select;
    await context.sync();
  }).catch((error) => {
    console.error("Error in aceSheetformat:", error);
  });
}

async function Rollupoutputrange(
  flownameinputrangeaddress,
  multiflowrangeaddress,
  flowNameRangeaddress,
  outputrangeaddress
) {
  let Rollupdatarule = "";

  // Convert the output range addresses array to a comma-separated string
  let dependentstring = outputrangeaddress.join(",");

  // Construct the Rollupdatarule string
  Rollupdatarule =
    "=CHOOSE(IFERROR(MATCH(" +
    flownameinputrangeaddress +
    "," +
    flowNameRangeaddress +
    ",0),1)," +
    dependentstring +
    "," +
    multiflowrangeaddress +
    ")";

  // Return the constructed string
  return Rollupdatarule;
}
async function getRangeAddresses(context, flowNames, OutputNames, usedRange) {
  let rangeAddresses = [];

  // Load the address property of the usedRange
  usedRange.load("address");

  await context.sync();

  let columnindex = 6;
  let rowindexstart = OutputNames[0][1];
  let rowindexend = OutputNames[OutputNames.length - 1][1];

  // Iterate over the length of the first array
  for (let i = 0; i < flowNames.length - 1; i++) {
    // Get the start and end cell addresses from the used range
    let startCell = usedRange.getCell(rowindexstart, columnindex + i);
    let endCell = usedRange.getCell(rowindexend, columnindex + i);

    // Load the addresses of the start and end cells
    startCell.load("address");
    endCell.load("address");

    await context.sync();

    let startCellAddress = startCell.address.split("!")[1];
    let endCellAddress = endCell.address.split("!")[1];

    let rangeAddress = `${startCellAddress}:${endCellAddress}`;
    rangeAddress = toAbsoluteAddress(rangeAddress);
    rangeAddresses.push(rangeAddress);
  }
  return rangeAddresses;
}

function toAbsoluteAddress(address1) {
  return address1.replace(/([A-Z]+)(\d+)/g, "$$$1$$$2");
}

async function addImageToSheet(sheetName) {
  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(sheetName);

      // Base64 image string
      const base64Image =
        "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";

      // Add the shape and set its fill to the base64 image
      const shapes = sheet.shapes;
      const imageShape = shapes.addImage(base64Image);
      imageShape.left = 0; // Position from the left (in points)
      imageShape.top = 0; // Position from the top (in points)
      imageShape.width = 54; // Width of the image (in points)
      imageShape.height = 54; // Height of the image (in points)

      // Optionally set the image name
      imageShape.name = "MyImage";

      await context.sync();
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function setRowHeightAndColumnWidth(range) {
  try {
    // Load the necessary properties for the range
    range.load(["rowCount", "columnCount"]);
    await range.context.sync();

    // Set row height to 20 for each row in the range
    for (let i = 0; i < range.rowCount; i++) {
      const row = range.getRow(i);
      row.format.rowHeight = 54;
    }

    // Set column width to 10 for each column in the range
    for (let j = 0; j < range.columnCount; j++) {
      const column = range.getColumn(j);
      column.format.columnWidth = 54;
    }

    await range.context.sync();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
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
  timelineaddress,
  segmentname,
  OutputNames,
  Flowcount
) {
  try {
    let LHSRangeTop;
    let LHSRangeBottom;
    let RHSRangeTop;
    let RHSRangeBottom;
    let numberformat;
    let ColCounter = 0;
    const SingleValueNumberFormat = ["Text", "Text", "0.0%", "0.0%"];
    const AnnualSingleValueNumberFormat = ["Text", "Text", "0.0%", "0.0%"];
    const EventNumberformat = ["Text", "mmm-yy", "Text", "0.0", "0"];
    const GrowthTypeRule = "Sum,Avg,Step,Retain Values";
    const OnOFF = "ON,OFF";
    const EventMethod = "Diffusion,Custom";
    const persistencydropdown = "Custom,Diffusion,Mean,Median";
    let dataRule;
    timelineaddress = "=" + (await toAbsoluteAddress(timelineaddress));

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
    LHSRangeTop.load("address");
    LHSRangeBottom.load("address");
    RHSRangeTop.load("address");
    RHSRangeBottom.load("address");
    await context.sync();
    console.log("break");

    if (
      ModelGranularity === "Monthly" &&
      ColumnAvalue === "Monthly - Time Series" &&
      ColumnBvalue != "Persistency Assumption"
    ) {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "mmm-yy");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", numberformat);
    } else if (ColumnBvalue === "Persistency Assumption") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "General");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      // await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "0.0%");
      // await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
      await DataValidation(context, RHSRangeBottom.getColumn(1), persistencydropdown);

      await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "General");
      await formatBluePattern(context, RHSRangeBottom.getColumn(1), "#6D6E71", "#EBCB71", "#BFBFBF", "General");
      await formatBluePattern(context, RHSRangeBottom.getColumn(2), "#6D6E71", "#EBCB71", "#BFBFBF", "General");
      await formatBluePattern(context, RHSRangeBottom.getColumn(3), "#6D6E71", "#EBCB71", "#BFBFBF", "General");
      await formatBluePattern(context, RHSRangeBottom.getColumn(4), "#6D6E71", "#EBCB71", "#BFBFBF", "General");
      await formatBluePattern(
        context,
        RHSRangeBottom.getCell(0, 5).getAbsoluteResizedRange(ColumnDvalue, ColumnEvalue - 13),
        "#6D6E71",
        "#EBCB71",
        "#BFBFBF",
        "0.0%"
      );
      await context.sync();
    } else if (ModelGranularity === "Annual" && ColumnAvalue === "Annual - Time Series") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", numberformat);
    } else if (ColumnAvalue === "Monthly - Single Value") {
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
    } else if (ColumnBvalue === "Events & Market Share - Head") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "Text");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "Text");
      await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "Text");
      for (ColCounter = 0; ColCounter < ColumnEvalue - 10; ColCounter++) {
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
      let segmentdropdownrange = usedRange
        .getCell(segmentname[0][1], 9)
        .getAbsoluteResizedRange(segmentname.length - 1, 1);
      segmentdropdownrange.load("address");
      await context.sync();
      let txpmapdropdown = await toAbsoluteAddress(segmentdropdownrange.address);
      txpmapdropdown = "=" + txpmapdropdown;

      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "General");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "General");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "General");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "General");
      let i = 0;
      for (i = 0; i < ColumnDvalue + 1; i++) {
        await DataValidation(
          context,
          usedRange.getCell(Roucounter + i, offsetcol + 8).getAbsoluteResizedRange(1, ColumnEvalue - 9),
          txpmapdropdown
        );
      }
    } else if (ColumnBvalue === "Events & Market Share") {
      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "General");
      await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "General");
    } else if (ModelGranularity === "Monthly" && ColumnAvalue === "Annual - Time Series") {
      if (columnAValues[Roucounter - 1] === "Drop1") {
        await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "General");
        await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "YYYY");
      }

      await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "General");
      await formatBluePattern(context, RHSRangeBottom.getColumn(0), "#6D6E71", "#EBCB71", "#BFBFBF", "General");
      await formatBluePattern(
        context,
        RHSRangeBottom.getCell(0, 1).getAbsoluteResizedRange(ColumnDvalue, ColumnEvalue - 8),
        "#6D6E71",
        "#EBCB71",
        "#BFBFBF",
        numberformat
      );
      await DataValidation(context, RHSRangeBottom.getColumn(1), GrowthTypeRule);
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

async function formatBluePattern(
  context,
  range,
  fontColor,
  fillColor,
  borderColor,
  numberFormat,
  fontsize = 10,
  isBold = false
) {
  try {
    range.load([
      // "address",
      "format/font",
      "format/fill",
      "numberFormat",
      "format/verticalAlignment",
      "format/horizontalAlignment",
      "format/borders",
    ]);
    context.trackedObjects.add(range);
    await context.sync();
    // console.log(`Process 2: Loaded range properties: ${range.address}`);

    // Set the font color, name, and size
    range.format.font.color = fontColor;
    range.format.font.name = "Arial";
    range.format.font.size = fontsize;
    if (isBold) {
      range.format.font.bold = true;
    }
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
    await border(context, range, borderColor);

    console.log("Borders applied.");
    context.trackedObjects.remove(range);
    await context.sync();
    console.log("this is done");
  } catch (error) {
    // console.error(`Error formatting range ${range.address}:`, error);
  }
}

async function border(context, range, borderColor) {
  range.format.borders.getItem("InsideHorizontal").style = "Continuous";
  range.format.borders.getItem("InsideVertical").style = "Continuous";
  range.format.borders.getItem("EdgeBottom").style = "Continuous";
  range.format.borders.getItem("EdgeLeft").style = "Continuous";
  range.format.borders.getItem("EdgeRight").style = "Continuous";
  range.format.borders.getItem("EdgeTop").style = "Continuous";
  range.format.borders.getItem("InsideHorizontal").color = borderColor;
  range.format.borders.getItem("InsideVertical").color = borderColor;
  range.format.borders.getItem("EdgeBottom").color = borderColor;
  range.format.borders.getItem("EdgeLeft").color = borderColor;
  range.format.borders.getItem("EdgeRight").color = borderColor;
  range.format.borders.getItem("EdgeTop").color = borderColor;
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

async function DataValidation1(range, dataRule) {
  await Excel.run(async (context) => {
    try {
      console.log("Starting DataValidation function");
      console.log("Data rule: ", dataRule);

      // Ensure the range is properly defined
      if (!range) {
        throw new Error("Range is not defined or null");
      }
      console.log("Range before loading address: ", range);

      // Load the address property of the range
      // range.load("address");
      await context.sync();
      // console.log("Range address loaded successfully");

      // console.log("Range address: ", range.address);

      // Apply data validation rule
      range.dataValidation.rule = {
        list: {
          inCellDropDown: true,
          source: dataRule,
        },
      };

      await context.sync();
      console.log("Data validation rule applied");
    } catch (error) {
      console.error("Error in DataValidation function:", error);
    }
  });
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

function convertAddressForDataValidation(rangeAddress) {
  if (typeof rangeAddress !== "string") {
    throw new Error("Invalid input: rangeAddress must be a string");
  }

  // Split the address into sheet name and range part
  const addressParts = rangeAddress.split("!");
  if (addressParts.length === 2) {
    // Extract the sheet name and range address
    const sheetName = addressParts[0].replace(/'/g, ""); // Remove any single quotes
    const rangePart = addressParts[1];

    // Return the formatted address with an equal sign
    return `=${sheetName}!${rangePart}`;
  } else {
    throw new Error("Invalid address format");
  }
}

async function dropdownformula(sheetName, Flowcount, flowNames, segmentname, OutputNames) {
  let segmentdropdown = `=${sheetName}!J${segmentname[0][1]}:J${segmentname[segmentname.length - 1][1]}`;
  let startLetter = "G";
  let charCode = startLetter.charCodeAt(0);
  let outputdropdowndependent = "";

  for (let i = 0; i < Flowcount; i++) {}
}
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
export async function ACEgetcomlumn6(sheetname) {
  return Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getItem(sheetname);
    const range = sheet.getUsedRange();
    range.load("values");
    await context.sync();

    if (!range.values) {
      console.error("No values found in the range.");
      return [];
    }

    const columnValues = range.values.map((row) => row[5]);
    const filteredUniqueValues = [...new Set(columnValues)].filter(
      (value) => typeof value === "string" && value.includes("ACE Sheet Inputs")
    );
    const updatedValues = await extractValues(filteredUniqueValues);

    const uniqueupdatevals = [...new Set(updatedValues)].filter(
      (value) => value !== null && value !== undefined && value !== ""
    );

    return uniqueupdatevals;
  }).catch((error) => {
    console.error("Error reading values from Excel:", error);
    return [];
  });
}

function extractValues(arrayOfStrings) {
  return arrayOfStrings.map((str) => {
    const firstPipeIndex = str.indexOf("|");
    if (firstPipeIndex === -1) {
      return null; // or handle the case where no "|" is found
    }
    const secondPipeIndex = str.indexOf("|", firstPipeIndex + 1);
    if (secondPipeIndex === -1) {
      return str.substring(firstPipeIndex + 1); // Handle cases where there is no second "|"
    }
    return str.substring(firstPipeIndex + 1, secondPipeIndex);
  });
}

export async function highlightAndScrollToSubstring(sheetname, address) {
  return Excel.run(async (context) => {
    let addresstolocate = address.includes("!") ? address.split("!")[1] : address;
    const sheet = context.workbook.worksheets.getItem(sheetname);
    const range = sheet.getRange(addresstolocate);

    // Scroll to the cell
    sheet.getRange(addresstolocate).select();

    await context.sync();
  }).catch((error) => {
    console.error("Error highlighting and scrolling to cell:", error);
  });
}

export async function getColumnHtoK(sheetname) {
  return Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getItem(sheetname);
    const range = sheet.getUsedRange();
    range.load("values, address");
    await context.sync();

    if (!range.values) {
      console.error("No values found in the range.");
      return [];
    }

    const columns = { H: [], J: [], K: [] };
    const addresses = { H: [], J: [], K: [] };

    range.values.forEach((row, rowIndex) => {
      columns.H.push(row[7]); // Column H is index 7
      addresses.H.push(`${sheetname}!H${rowIndex + 1}`);
      columns.J.push(row[9]); // Column J is index 9
      addresses.J.push(`${sheetname}!J${rowIndex + 1}`);
      columns.K.push(row[10]); // Column K is index 10
      addresses.K.push(`${sheetname}!K${rowIndex + 1}`);
    });

    let flowIndex = columns.H.findIndex((value) => typeof value === "string" && value.includes("Flow 1:"));
    flowIndex = flowIndex - 1;
    const sNoIndex = columns.H.findIndex((value) => typeof value === "string" && value.includes("S.No"));

    if (flowIndex === -1 || sNoIndex === -1 || sNoIndex <= flowIndex) {
      console.error("Invalid indexes for 'Flow 1:' and 'S.No'");
      return [];
    }

    const keptIndexes = Array.from({ length: sNoIndex - flowIndex - 1 }, (_, i) => i + flowIndex + 1);

    const dataFrame = keptIndexes.map((index) => ({
      H: { value: columns.H[index], address: addresses.H[index] },
      J: { value: columns.J[index], address: addresses.J[index] },
      K: { value: columns.K[index], address: addresses.K[index] },
    }));

    const uniqueValuesH = [...new Set(keptIndexes.map((index) => columns.H[index]))];
    const tableOfContents = uniqueValuesH.map((valueH) => {
      const filteredJ = dataFrame.filter((row) => row.H.value === valueH);
      const uniqueValuesJ = [...new Set(filteredJ.map((row) => row.J.value))];

      const childrenJ = uniqueValuesJ.map((valueJ) => {
        const filteredK = filteredJ.filter((row) => row.J.value === valueJ);
        const uniqueValuesK = [...new Set(filteredK.map((row) => row.K.value))];

        const childrenK = uniqueValuesK.map((valueK) => ({
          value: valueK,
          address: filteredK.find((row) => row.K.value === valueK).K.address,
          children: [],
        }));

        return {
          value: valueJ,
          address: filteredJ.find((row) => row.J.value === valueJ).J.address,
          children: childrenK,
        };
      });

      return {
        value: valueH,
        address: dataFrame.find((row) => row.H.value === valueH).H.address,
        children: childrenJ,
      };
    });

    // Values to be removed from the table of contents
    const ignoreValues = [
      "Assumption",
      "",
      "ALL",
      "Market Event - ON/OFF",
      "Market Event - Start Date",
      "Market Event - Method",
      "Market Event - Diffusion Constant",
      "Market Event - Months To Peak",
    ];

    // Remove the items with the specified values from the table of contents
    const filteredTableOfContents = tableOfContents.filter((item) => !ignoreValues.includes(item.value));

    // Remove the items at indexes 2 and 3 from the table of contents if they exist
    if (filteredTableOfContents.length > 3) {
      filteredTableOfContents.splice(2, 2);
    }

    return { tableOfContents: filteredTableOfContents, dataFrame };
  }).catch((error) => {
    console.error("Error reading values from Excel:", error);
    return [];
  });
}

export async function activateSheet(sheetName) {
  Excel.run(function (context) {
    // Get the worksheet by name
    const sheet = context.workbook.worksheets.getItem(sheetName);

    // Activate the worksheet
    sheet.activate();

    // Sync to apply the changes
    return context.sync().then(function () {
      console.log(`Sheet "${sheetName}" is now active.`);
    });
  }).catch(function (error) {
    console.log(`Error: ${error}`);
  });
}
