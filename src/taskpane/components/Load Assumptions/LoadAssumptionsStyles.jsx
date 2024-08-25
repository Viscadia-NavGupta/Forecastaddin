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
});

export const Heading = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  color: "#6D6E71",
  fontSize: "16px",
  fontWeight: "normal",
  backgroundColor: "transparent",
  border: "none",
  padding: "0",
  cursor: "default",
  textDecoration: "underline",
});

export const DropdownContainer = styled("div")({
  width: "100%",
  background: "#FFFFFF",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "center",
});

export const StyledFormControl = styled(FormControl)({
  margin: "0.5em",
  width: "180px",
});

export const StyledInputLabel = styled(InputLabel)({
  fontSize: "0.7rem",
});

export const StyledSelect = styled(Select)({
  fontSize: "0.7rem",
});

export const StyledCheckbox = styled(Checkbox)({
  transform: "scale(0.8)",
});

export const StyledListItemText = styled(ListItemText)({
  fontSize: "8px",
  padding: "0px",
});

export const StyledOutlinedInput = styled(OutlinedInput)({
  fontSize: "0.7rem",
});

export const StyledMenuItem = styled(MenuItem)({
  fontSize: "8px",
  padding: "4px 8px",
});

export const ImportButton = styled("button")({
  padding: "8px 11px",
  fontFamily: "Roboto",
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

export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 30 * 4.5 + 6,
      width: 180,
      overflowX: "hidden",
    },
  },
};
