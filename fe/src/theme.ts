import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        solid: {
          bg: "rgb(39, 59, 75)",

          _hover: {
            bg: "rgb(65, 122, 155)",
          },
        },
      },
    },
    Card: {
      variants: {
        outline: {
          container: {
            backgroundColor: "rgb(0, 30, 60)",
            borderColor: "rgb(30, 73, 118)",
          },
        },
      },

      defaultProps: {
        variant: "outline",
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          backgroundColor: "rgb(0, 30, 60)",
          borderColor: "rgb(30, 73, 118)",
          borderWidth: "1px",
          boxShadow: "none",
          color: "white",
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        background: "rgb(10, 25, 41)",
      },
    },
  },
});

export default theme;
