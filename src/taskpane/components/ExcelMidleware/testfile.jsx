export async function aceSheetformat(sheetName) {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem(sheetName);
      sheet.load("name");
      context.trackedObjects.add(sheet);
      await context.sync();
      console.log(sheet.name);
  
      // Getting the used range of sheet
      const usedRange = sheet.getUsedRange();
      usedRange.load(["address", "values", "rowCount", "columnCount"]);
      context.trackedObjects.add(usedRange);
      await context.sync();
      console.log(usedRange.address);
  
      const totalRowcount = usedRange.rowCount;
      const totalColCount = usedRange.columnCount;
      console.log(totalColCount);
      console.log(totalRowcount);
  
      // Loading all the helper columns of ACE sheet
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
          await formatBluePattern(context, sourceRange, "#FFFFFF", "#143D66", "#BFBFBF", "mmm-yy", SegmentName);
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
            SegmentName
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
            SegmentName
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
              "Text",
              SegmentName
            );
          }
          await formatBluePattern(
            context,
            usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(columnDValues[i], columnEValues[i]),
            "#6D6E71",
            "#EBCB71",
            "#BFBFBF",
            "General",
            SegmentName
          );
          i += columnDValues[i] - 1;
        } else if (columnBValues[i] === "Rollup Outputs") {
          if (columnAValues[i - 1] === "Drop1") {
            await formatBluePattern(
              context,
              usedRange.getCell(i - 1, offsetcol).getAbsoluteResizedRange(1, columnEValues[i]),
              "#FFFFFF",
              "#143D66",
              "#BFBFBF",
              "Text",
              SegmentName
            );
          }
          await formatBluePattern(
            context,
            usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(columnDValues[i], columnEValues[i]),
            "#6D6E71",
            "#EBCB71",
            "#BFBFBF",
            "General",
            SegmentName
          );
          await formatBluePattern(
            context,
            usedRange.getCell(i, offsetcol).getAbsoluteResizedRange(columnDValues[i], 1),
            "#6D6E71",
            "#FFFFFF",
            "#BFBFBF",
            "General",
            SegmentName
          );
  
          i += columnDValues[i] - 1;
        } else if (columnBValues[i] === "Flow Start") {
          // await dropdownformula(sheetName, Flowcount, flowNames, SegmentName, OutputNames);
        } else if (columnAValues[i] === "") {
        } else if (i === 38) {
          console.log(i);
        }
        console.log(columnBValues[i], i);
        i++;
      }
      context.trackedObjects.remove(usedRange);
      context.trackedObjects.remove(sheet);
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
    timelineaddress,
    segmentname
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
        let Txmappingdropdown = await convertAddressForDataValidation(segmentdropdownrange.address);
        if (columnAValues[Roucounter - 1] === "Drop1") {
          await formatBluePattern(context, LHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "General");
          await formatBluePattern(context, RHSRangeTop, "#FFFFFF", "#143D66", "#BFBFBF", "General");
        }
  
        await formatBluePattern(context, LHSRangeBottom, "#6D6E71", "#F2F2F2", "#BFBFBF", "General");
        await formatBluePattern(context, RHSRangeBottom, "#6D6E71", "#EBCB71", "#BFBFBF", "General");
  
        await DataValidation1(RHSRangeBottom, Txmappingdropdown);
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
        "format/font",
        "format/fill",
        "numberFormat",
        "format/verticalAlignment",
        "format/horizontalAlignment",
        "format/borders",
      ]);
      context.trackedObjects.add(range);
      await context.sync();
  
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
  
      // Ensure the borders are set
      await border(context, range);
  
      console.log("Borders applied.");
      context.trackedObjects.remove(range);
      await context.sync();
    } catch (error) {
      console.error(`Error formatting range:`, error);
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
  
        await context.sync();
  
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
  