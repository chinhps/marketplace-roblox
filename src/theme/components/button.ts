import { defineStyle } from "@chakra-ui/react";

const xl = defineStyle({
  fontSize: "xl",
  px: "6",
  h: "130px",
  w: "130px",
  borderRadius: "md",
});

export const buttonStyles = {
  components: {
    Button: {
      sizes: { xl },
      baseStyle: {
        lineHeight: "none",
        _hover: {
          bg: "main.item3",
          color: "white.100",
        },
      },
      variants: {
        outlineRed: () => ({
          textTransform: "uppercase",
          fontSize: "15px",
          fontWeight: "600",
          padding: "20px",
          borderRadius: "7px",
          bg: "main.item",
          color: "main.text",
          border: "solid 1.5px",
          borderColor: "ocean.100",
        }),
        auth: () => ({
          padding: "15px 20px",
          bg: "main.item",
          color: "main.text",
        }),
        outlineAuth: () => ({
          padding: "15px 20px",
          borderColor: "main.item",
          border: "solid 1.5px",
        }),
        red: () => ({
          bg: "red.600",
          color: "white",
          padding: "10px 20px",
          rounded: "2xl",
          _hover: {
            bg: "red.500",
            textDecoration: "none",
          },
        }),
      },
    },
  },
};
