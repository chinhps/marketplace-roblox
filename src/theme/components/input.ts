import { textareaTheme } from "./textarea";

export const inputStyles = {
  components: {
    Input: {
      defaultProps: {
        size: "md",
        fontSize: "14px",
      },
      variants: {
        search: () => ({
          field: {
            fontWeight: 400,
            borderRadius: "5px",
            bg: "#ffffff1f",
            border: "1px solid",
            color: "white",
            borderColor: "whiteAlpha.100",
          },
        }),
        auth: () => ({
          field: {
            fontWeight: 400,
            borderRadius: "7px",
            bg: "#ffffff1f",
            border: "1px solid",
            color: "black",
            padding: "1.5rem 1rem",
            borderColor: "main.item",
          },
        }),
      },
    },
    Select: {
      defaultProps: {
        size: "lg",
        fontSize: "13px",
      },
      variants: {
        auth: () => ({
          field: {
            // fontWeight: 400,
            borderRadius: "7px",
            bg: "#ffffff1f",
            border: "1px solid",
            color: "black",
            fontSize: "15px",
            borderColor: "main.item",
          },
        }),
      },
    },
    NumberInput: {
      variants: {
        auth: () => ({
          field: {
            fontWeight: 400,
            borderRadius: "7px",
            bg: "#ffffff1f",
            border: "1px solid",
            color: "black",
            borderColor: "main.item",
          },
        }),
      },
    },
    Textarea: textareaTheme,
  },
};
