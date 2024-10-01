import {
  extendTheme,
  withDefaultSize,
  withDefaultVariant,
} from "@chakra-ui/react";
import { breakpoints } from "./foundations/breakpoints";
import { sizes } from "./sizes";
import { globalStyles } from "./styles/globalStyles";
import { buttonStyles } from "./components/button";
import { inputStyles } from "./components/input";
import { menuTheme } from "./components/menu";
import { tableTheme } from "./components/table";

export default extendTheme(
  withDefaultVariant({
    variant: "unstyled",
    components: ["Table"],
  }),
  withDefaultSize({
    size: "lg",
    components: ["Table"],
  }),
  {
    components: {
      Menu: menuTheme,
      Table: tableTheme,
    },
  },
  { breakpoints },
  globalStyles,
  buttonStyles,
  inputStyles,
  { sizes }
);
