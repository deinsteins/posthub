import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#F5F7FF",
      100: "#E0E4FF",
      200: "#C1C8FF",
      300: "#A2AAFF",
      400: "#7F8AFF",
      500: "#5C6AFF",
      600: "#4D5BD4",
      700: "#323F94",
      800: "#252C6F",
      900: "#1C2157",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
});

export default theme;
