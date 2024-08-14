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

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      await Excel.run(async (context) => {
        const sheet = context.workbook.worksheets.getItem("Report Genie");
        const usedRange = sheet.getUsedRange();
        usedRange.load("values");
        await context.sync();

        const allHeaders = usedRange.values[0];  // Get all column headers
        const dropdownHeaders = allHeaders.slice(0, 9);  // Only the first 9 columns for dropdowns
        setDropdownLabels(dropdownHeaders);

        // Create DataFrame with all columns
        const data = usedRange.values.slice(1); // Skip the first row (header)
        const df = new DataFrame(data, allHeaders);  // Include all headers for DataFrame
        setDataFrame(df);

        // Populate dropdowns with unique values from the first 9 columns
        const updatedDropdownItems = dropdownHeaders.reduce((acc, label) => {
          acc[label] = df.distinct(label).toArray().map(item => item[0]);
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
      Object.keys(selectedItems).forEach((key) => {
        if (selectedItems[key]?.length > 0) {
          filteredDF = filteredDF.filter(row => selectedItems[key].includes(row.get(key)));
        }
      });

      // Create a new worksheet and paste the filtered DataFrame
      const newSheet = workbook.worksheets.add(sheetName);
      newSheet.activate();

      const values = [
        dataFrame.listColumns(), // Include all original headers
        ...filteredDF.toArray(),
      ];

      const range = newSheet.getRangeByIndexes(0, 0, values.length, values[0].length);
      range.values = values;

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
