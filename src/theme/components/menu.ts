import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: "medium",
    bg: "teal.500",
    color: "gray.200",
    _hover: {
      bg: "teal.600",
      color: "white",
    },
  },
  list: {
    // this will style the MenuList component
    p: "1rem",
    borderRadius: "md",
    border: "1px solid",
    borderColor: "main.item3",
    bg: "main.item",
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: "white.100",
    bg: "main.item",
    _hover: {
      bg: "main.item4",
    },
  },
  groupTitle: {
    textTransform: "uppercase",
    color: "white",
    fontSize: "15px",
    letterSpacing: "wider",
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: "0.8",
    fontFamily: "mono",
    fontSize: "sm",
    letterSpacing: "tighter",
    pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    my: "4",
    borderColor: "white",
    borderBottom: "2px dotted",
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
