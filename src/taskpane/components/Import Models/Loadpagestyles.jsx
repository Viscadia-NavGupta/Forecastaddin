import { styled } from "@mui/system";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';

export const Container = styled("div")({
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  background: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight for consistency
});

export const Heading = styled("h2")({
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight for Roboto Light
  color: "#808080",  // Updated to a deep grayish-blue color for consistency
  fontSize: "18px",  // Increased font size for better emphasis
  backgroundColor: "transparent",  // Remove the background color
  border: "none",  // No border
  padding: "0",  // Remove padding
  cursor: "default",  // Remove pointer cursor
  textDecoration: "underline",  // Underline the heading
  textAlign: "center",  // Center-align the heading
});

export const DropdownContainer = styled("div")({
  width: "100%",
  background: "#FFFFFF",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",  // Space between dropdowns
  alignItems: "center",
});

export const StyledFormControl = styled(FormControl)({
  margin: "0.5em",  // Reduced margin
  width: "180px",  // Smaller width for dropdown
});

export const StyledInputLabel = styled(InputLabel)({
  fontSize: "0.7rem",  // Smaller font size
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight
});

export const StyledSelect = styled(Select)({
  fontSize: "0.7rem",  // Smaller font size
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight
});

export const StyledCheckbox = styled(Checkbox)({
  transform: "scale(0.8)",  // Smaller checkbox
});

export const StyledListItemText = styled(ListItemText)({
  fontSize: "8px",  // Font size set to 8px for list item text
  padding: "0px",  // Reduce padding around text
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight
});

export const StyledOutlinedInput = styled(OutlinedInput)({
  fontSize: "0.7rem",  // Smaller font size
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight
});

export const StyledMenuItem = styled(MenuItem)({
  fontSize: "8px",  // Font size set to 8px when dropdown is open
  padding: "4px 8px",  // Reduce padding within menu items
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontWeight: 300,  // Light font weight
});

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 30 * 4.5 + 6,  // Smaller item height and padding
      width: 180,  // Smaller dropdown width
    },
  },
};

export const ImportButton = styled("button")({
  padding: "8px 11px",
  marginLeft: "6px",
  fontFamily: "Roboto, sans-serif",  // Applied Roboto font
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "9px",
  color: "#FFFFFF",
  backgroundColor: "#0081C5",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#005f99",
  },
});
