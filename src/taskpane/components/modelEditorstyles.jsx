import { styled } from "@mui/system";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Roboto, sans-serif", // Consistent font family
});

export const ModelManagementButton = styled("h2")({
  fontFamily: "Roboto",
  fontStyle: "normal",
  color: "#6D6E71",  // Grey color matching the text color in the second image
  fontSize: "16px",  // Font size set to 16px for consistency
  fontWeight: "normal",  // Normal font weight
  backgroundColor: "transparent",  // No background color
  border: "none",  // No border
  padding: "0",  // Remove padding
  cursor: "default",  // Remove pointer cursor
  textDecoration: "underline",
});

export const ButtonsContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)", // 2 columns grid layout
  gap: "15px", // Adjusted gap between buttons for consistency with the second image
  justifyItems: "center",
  alignItems: "center",
  padding: "20px 0", // Additional padding at the top and bottom for spacing
});

export const Button = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "85px",  // Reduced width
  height: "85px",  // Reduced height
  backgroundColor: "#f5f5f5",  // Light grey background similar to the second image
  borderRadius: "8px",  // Slightly rounded corners
  boxShadow: "none",  // Removed box-shadow for a flat look
  cursor: "pointer",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "#e0e0e0",  // Slightly darker on hover
  },
});

export const Icon = styled("img")({
  width: "30px",  // Reduced icon size to match the smaller button
  height: "30px",
  filter: "grayscale(100%)",  // Makes the icon grey (monochrome)
  marginBottom: "8px",  // Consistent margin for spacing
  marginTop: "8px",
});

export const Label = styled("span")({
  fontSize: "10px",  // Reduced label text size to match smaller buttons
  fontWeight: "normal",  // Normal font weight
  color: "#6D6E71",  // Grey text color consistent with the second image
  textAlign: "center", // Ensure the text is centered
  fontFamily: "Roboto, sans-serif", // Consistent font across all components
});
