import { styled } from "@mui/system";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

// Container for the entire page
export const Container = styled("div")({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: 0,  // No outer padding
});

// Heading for the page
export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  backgroundColor: "#00a19B",
  color: "#fff",
  border: "none",
  borderRadius: "20px",
  padding: "10px 40px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginBottom: "20px",
});

// Container for the dropdowns
export const DropdownContainer = styled("div")({
  width: "100%",
  background: "#FFFFFF",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",  // Space between dropdowns
  alignItems: "center",
});

// Import Button styling
export const ImportButton = styled("button")({
  padding: "10px 20px",
  marginTop: "20px",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  color: "#FFFFFF",
  backgroundColor: "#0081C5",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#005f99",
  },
});

// Styling for the FormControl component
export const StyledFormControl = styled(FormControl)({
  margin: "0.5em",  // Reduced margin
  width: "180px",  // Smaller width for dropdown
});

// Styling for InputLabel component
export const StyledInputLabel = styled(InputLabel)({
  fontSize: "0.7rem",  // Smaller font size
});

// Styling for Select component
export const StyledSelect = styled(Select)({
  fontSize: "0.7rem",  // Smaller font size
});

// Styling for Checkbox component
export const StyledCheckbox = styled(Checkbox)({
  transform: "scale(0.8)",  // Smaller checkbox
});

// Styling for ListItemText component
export const StyledListItemText = styled(ListItemText)({
  fontSize: "8px",  // Font size set to 8px for list item text
  padding: "0px",  // Reduce padding around text
});

// Styling for OutlinedInput component
export const StyledOutlinedInput = styled(OutlinedInput)({
  fontSize: "0.7rem",  // Smaller font size
});

// Styling for MenuItem component
export const StyledMenuItem = styled(MenuItem)({
  fontSize: "8px",  // Font size set to 8px when dropdown is open
  padding: "4px 8px",  // Reduce padding within menu items
});

// Apply custom font size for MuiTypography-root
export const TypographyRootOverride = styled("div")({
  "& .css-10hburv-MuiTypography-root": {
    fontSize: "8px",  // Override font size to 8px
  },
});

// MenuProps for controlling the dropdown menu
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 30 * 4.5 + 6,  // Smaller item height and padding
      width: 180,  // Smaller dropdown width
    },
  },
};
