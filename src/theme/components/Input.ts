import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const Input: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    field: {
      border: "1px",
      borderColor: mode("latte-overlay0", "frappe-overlay0")(props),
      bg: "transparent",
      _focus: {
        borderColor: mode("latte-lavender", "frappe-lavender")(props),
      },
    },
  }),
};

export default Input;
