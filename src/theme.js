// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const palette = {
  hoverPrimary: "#3B82F6",      // blue.500
  navbarBackground: "#FFFFFF",  // white
  buttonPrimary: "#2563EB",     // blue.600
  hoverButtonPrimary: "#1E40AF",// blue.700
  primaryText: "blue.800",
  primaryBlue:"blue.800",    // blue.800
  whiteText: "#FFFFFF",         // white
  accentRed: "#FFA07A",         // soft red
  textColor: "#fff",
  pink:"pink.900"
};

const theme = extendTheme({
  colors: {
    // You can spread your palette into the colors object.
    palette,
    // Optionally override or add additional colors here.
  },
});

export default theme;