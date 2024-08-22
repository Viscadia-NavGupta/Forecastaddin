// Excel.run(async (context) => {
//   const sheetName = "Viscadia Forecast Platform";
//   const workbook = context.workbook;
//   const sheets = workbook.worksheets;

//   // Step 1: Check if the sheet exists, and delete it if it does
//   let sheet;
//   try {
//       sheet = sheets.getItem(sheetName);
//       await context.sync();  // Sync to check if sheet exists
//       sheet.delete();
//       await context.sync();  // Sync to ensure the sheet is deleted
//   } catch (error) {
//       console.log("Sheet does not exist, proceeding to create a new one.");
//   }

//   // Step 2: Add a new worksheet
//   sheet = sheets.add(sheetName);
//   sheet.activate();
//   await context.sync();  // Sync after adding the new sheet

//   // Step 3: Add a rectangle shape
//   try {
//       const rectangleShape = sheet.shapes.addGeometricShape(Excel.GeometricShapeType.rectangle);
//       rectangleShape.left = 50; // Position the shape
//       rectangleShape.top = 50;
//       rectangleShape.width = 300;
//       rectangleShape.height = 100;
//       rectangleShape.fill.color = "#B22222";  // Red background
      
//       await context.sync();  // Sync after adding the shape
//       console.log("Rectangle shape created successfully.");
//   } catch (error) {
//       console.error("Error in setting up the rectangle shape: ", error);
//   }

//   // Step 4: Use Excel cells to add text with custom formatting
//   try {
//       const textRange = sheet.getRange("B2:D2");
//       textRange.values = [["Viscadia Forecast Platform"]]; // Set the text in the cells
//       textRange.format.font.color = "#FFFFFF"; // White text
//       textRange.format.font.size = 20; // Font size
//       textRange.format.horizontalAlignment = "Center"; // Center align horizontally
//       textRange.format.verticalAlignment = "Center"; // Center align vertically
//       sheet.getRange("B2").format.rowHeight = 40; // Adjust row height to better fit the text
      
//       await context.sync();  // Sync after setting up the text in cells
//       console.log("Text added to cells with custom formatting.");
//   } catch (error) {
//       console.error("Error in setting up text formatting in cells: ", error);
//   }
// });
