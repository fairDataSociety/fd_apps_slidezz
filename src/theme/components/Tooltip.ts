import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const Tooltip: ComponentStyleConfig = {
  baseStyle: (props: any) => ({
    bg: mode("latte-overlay1", "frappe-overlay1")(props),
    arrow: {
      bg: "red",
    },
  }),
};

export default Tooltip;
