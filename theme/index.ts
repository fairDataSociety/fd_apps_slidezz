import { extendTheme, withDefaultProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import colors from "./colors";

const theme = extendTheme(
  {
    colors,
    styles: {
      global: (props: any) => ({
        body: {
          bg: mode("base.150", "text.900")(props),
          color: mode("text.800", "text.50")(props),
        },
        h2: {
          color: mode("subtext0.700", "subtext0.50")(props),
        },
      }),
    },
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: "surface1",
    },
    components: ["Button"],
  })
);

export default theme;
