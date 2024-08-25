import React, { useState, useEffect } from "react";
import { DataFrame } from "dataframe-js";
import {
  Container,
  Heading,
  DropdownContainer,
  ImportButton,
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
  StyledCheckbox,
  StyledListItemText,
  StyledOutlinedInput,
  StyledMenuItem,
  MenuProps
} from "./ReportGinnieStyles";

// Import the global CSS
import './globalStyles.css';

const ReportGinnie = () => {
  const [dropdownItems, setDropdownItems] = useState({});
  const [selectedItems, setSelectedItems] = useState({});
  const [dataFrame, setDataFrame] = useState(null);
  const [dropdownLabels, setDropdownLabels] = useState([]);
  const [columnMapping, setColumnMapping] = useState({});
  const [originalHeaders, setOriginalHeaders] = useState([]);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem("Report Genie Backend");
        const usedRange = sheet.getUsedRange();
        usedRange.load("values");
        await context.sync();

        const allHeaders = usedRange.values[0];  // Get all column headers
        setOriginalHeaders(allHeaders);  // Store the original headers separately
        const dropdownHeaders = allHeaders.slice(0, 12);  // Only the first 12 columns for dropdowns
        setDropdownLabels(dropdownHeaders);

        // Map headers to generic column names like "column1", "column2", etc.
        const columnMap = {};
        const mappedHeaders = allHeaders.map((header, index) => {
          const mappedHeader = `column${index + 1}`;
          columnMap[header] = mappedHeader; // Map original header to generic header
          return mappedHeader;
        });
        setColumnMapping(columnMap);

        // Create DataFrame with mapped headers
        const data = usedRange.values.slice(1); // Skip the first row (headers)
        const df = new DataFrame(data, mappedHeaders);  // Use mapped headers
        setDataFrame(df);

        // Populate dropdowns with unique values from the first 12 columns
        const updatedDropdownItems = dropdownHeaders.reduce((acc, label, index) => {
          const mappedHeader = `column${index + 1}`;
          acc[label] = df.distinct(mappedHeader).toArray().map(item => item[0]);
          return acc;
        }, {});

        setDropdownItems(updatedDropdownItems);
      });
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  const handleMultiSelectChange = (event, label) => {
    const { target: { value } } = event;
    const selectedValues = typeof value === 'string' ? value.split(',') : value;

    setSelectedItems(prevState => ({
      ...prevState,
      [label]: selectedValues,
    }));
  };

  const handleImportClick = async () => {
    await Excel.run(async (context) => {
      const workbook = context.workbook;
      const sheetName = "Filtered Report";
      
      // Check if the sheet exists
      const existingSheet = workbook.worksheets.getItemOrNullObject(sheetName);
      existingSheet.load("name");
      await context.sync();

      // If the sheet exists, delete it
      if (existingSheet.name) {
        existingSheet.delete();
        await context.sync();
      }

      // Filter the DataFrame based on selected items
      let filteredDF = dataFrame;
      Object.keys(selectedItems).forEach((key, index) => {
        const genericColumn = columnMapping[key]; // Use generic column names for filtering
        console.log(`Filtering on: ${genericColumn} with values: ${selectedItems[key]}`);
        if (selectedItems[key]?.length > 0) {
          filteredDF = filteredDF.filter(row => selectedItems[key].includes(row.get(genericColumn)));
        }
      });

      console.log("Filtered DataFrame (before conversion to array):", filteredDF.toArray());

      // Get the filtered data as an array
      const filteredData = filteredDF.toArray();

      // Ensure there's data to paste
      if (filteredData.length === 0) {
        console.error("No data to paste after filtering.");
        return;
      }

      // Combine original headers with filtered data
      const finalData = [originalHeaders, ...filteredData];

      // Create a new worksheet and paste the filtered data
      const newSheet = workbook.worksheets.add(sheetName);
      newSheet.activate();

      const range = newSheet.getRangeByIndexes(0, 0, finalData.length, finalData[0].length);
      range.values = finalData;

      await context.sync();
    });

    console.log("Filtered DataFrame:", selectedItems);
  };

  return (
    <Container>
      <Heading>Report Genie</Heading>
      <DropdownContainer>
        {dropdownLabels.map((label, index) => (
          <StyledFormControl key={index}>
            <StyledInputLabel id={`multiple-checkbox-label-${index}`}>{label}</StyledInputLabel>
            <StyledSelect
              labelId={`multiple-checkbox-label-${index}`}
              id={`multiple-checkbox-${index}`}
              multiple
              value={selectedItems[label] || []}
              onChange={(event) => handleMultiSelectChange(event, label)}
              input={<StyledOutlinedInput label={label} />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {dropdownItems[label]?.map((item) => (
                <StyledMenuItem key={item} value={item}>
                  <StyledCheckbox checked={selectedItems[label]?.indexOf(item) > -1} />
                  <StyledListItemText primary={item} />
                </StyledMenuItem>
              ))}
            </StyledSelect>
          </StyledFormControl>
        ))}
      </DropdownContainer>
      <ImportButton onClick={handleImportClick}>Generate Report →</ImportButton>
    </Container>
  );
};

export default ReportGinnie;
