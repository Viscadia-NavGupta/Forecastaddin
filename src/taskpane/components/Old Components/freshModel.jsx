// import React from "react";
// import { useStyles3 } from "./FreshModelstyles";
// import * as XLSX from "xlsx";
// // import { formatModelName } from "./ACE_Format";
// import * as aceFormat from "./ACE_Format";

// const FreshModel = ({ setPageValue }) => {
//   const styles = useStyles3();

//   const ACE_Format1 = async () => {
//     await Excel.run(async (context) => {
//       // await aceFormat.formatGranularity(context, "ACE Sheet", "H5");
//       // await aceFormat.formatModelName(context, "ACE Sheet", "i6");
//       await aceFormat.addAssumption();
//        // Call the formatModelName function with the context and range address
//     });
//   };
//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Fresh</h2>
//       <button className={styles.backButton} >
//         <img src="assets/back.png" alt="Back" className={styles.backIcon} />
//       </button>
//       <div className={styles.buttonsContainer}>
//         <button className={styles.button} >
//           <img src="assets/Fresh.png" alt="Add Assumption" className={styles.icon} />
//           <span className={styles.fontText}>Add Assumption</span>
//         </button>
//         <button className={styles.button} onClick={() => setPageValue("UserLogin")}>
//           <img src="assets/Fresh.png" alt="Delete Assumption" className={styles.icon} />
//           <span className={styles.fontText}>Delete Assumption</span>
//         </button>
//         <button className={styles.button} onClick={ACE_Format1}>
//           <img src="assets/Fresh.png" alt="Add New Flow" className={styles.icon} />
//           <span className={styles.fontText}>Add New Flow</span>
//         </button>
//         <button className={styles.button} onClick={() => setPageValue("LoadPage")}>
//           <img src="assets/Fresh.png" alt="Open Flow Manager" className={styles.icon} />
//           <span className={styles.fontText}>Open Flow Manager</span>
//         </button>
//         <button className={styles.button}>
//           <img src="assets/Fresh.png" alt="Generate ACE Sheet" className={styles.icon} />
//           <span className={styles.fontText}>Generate ACE Sheet</span>
//         </button>
//         <button className={styles.button}>
//           <img src="assets/Fresh.png" alt="Placeholder" className={styles.icon} />
//           <span className={styles.fontText}>Text here</span>
//         </button>
//         <button className={styles.button}>
//           <img src="assets/Fresh.png" alt="Placeholder" className={styles.icon} />
//           <span className={styles.fontText}>Text here</span>
//         </button>
//         <button className={styles.button}>
//           <img src="assets/Fresh.png" alt="Placeholder" className={styles.icon} />
//           <span className={styles.fontText}>Text here</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FreshModel;

// // const addNewSheetWithFormatting = async () => {
// //   await Excel.run(async (context) => {
// //     const workbook = context.workbook;
// //     const newSheet = workbook.worksheets.add("ACE Sheet");

// //     const headerRange = newSheet.getRange("A1:Z1");
// //     headerRange.format.fill.color = "#0000FF"; // Blue color
// //     headerRange.format.font.color = "#FFFFFF"; // White font color for contrast

// //     newSheet.activate();
// //     await context.sync();

// //     console.log("New sheet 'ACE Sheet' added and formatted.");
// //   });
// // };

// // const readAndFormatSheet = async (sheetName) => {
// //   await Excel.run(async (context) => {
// //     const sheet = context.workbook.worksheets.getItem(sheetName);
// //     const range = sheet.getUsedRange();
// //     console.log("range>>>>>", range);
// //     const segmentData = [];

// //     range.load("values");

// //     await context.sync();

// //     let rowIndex = 0;
// //     while (rowIndex < range.values.length) {
// //       const cellValue = range.values[rowIndex][0];
// //       const cell = sheet.getRangeByIndexes(rowIndex, 0, 1, range.values[0].length);

// //       if (cellValue === "blue") {
// //         formatBlue(cell);
// //       } else if (cellValue === "red") {
// //         formatRed(cell);
// //       } else if (cellValue === "dropdown") {
// //         formatDropdown(sheet.getRangeByIndexes(rowIndex, 1, 1, 1)); // Apply to next column
// //       }

// //       rowIndex++;
// //     }

// //     sheet.gridlines = false; // Turn off gridlines
// //     formatBorders(sheet, range);

// //     await context.sync();
// //     console.log(`Sheet '${sheetName}' formatted successfully.`);
// //   }).catch((error) => console.error("Error:", error));
// // };

// // const formatBlue = (cell) => {
// //   cell.format.fill.color = "#0000FF"; // Blue
// // };

// // const formatRed = (cell) => {
// //   cell.format.fill.color = "#FF0000"; // Red
// // };

// // const formatDropdown = (cell) => {
// //   cell.dataValidation.rule = {
// //     list: {
// //       inCellDropDown: true,
// //       source: '="Yes,No"',
// //     },
// //   };
// // };

// // const formatBorders = (sheet, range) => {
// //   range.format.borders.getItem("EdgeTop").style = "Continuous";
// //   range.format.borders.getItem("EdgeBottom").style = "Continuous";
// //   range.format.borders.getItem("EdgeLeft").style = "Continuous";
// //   range.format.borders.getItem("EdgeRight").style = "Continuous";
// //   range.format.borders.getItem("EdgeTop").color = "#D3D3D3"; // Gray
// //   range.format.borders.getItem("EdgeBottom").color = "#D3D3D3"; // Gray
// //   range.format.borders.getItem("EdgeLeft").color = "#D3D3D3"; // Gray
// //   range.format.borders.getItem("EdgeRight").color = "#D3D3D3"; // Gray
// // };
