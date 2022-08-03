import { extendTheme, withDefaultProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import colors from "./colors";

const theme = extendTheme(
  {
    colors,
    styles: {
      global: (props: any) => ({
        body: {
          bg: mode("latte-base", "frappe-base")(props),
          color: mode("latte-text", "frappe-text")(props),
        },
        h2: {
          color: mode("latte-subtext0", "frappe-subtext0")(props),
        },
      }),
    },
    components: {
      Text: {
        variants: {
          subtext: (props: any) => ({
            color: mode("latte-subtext1", "frappe-subtext1")(props),
          }),
        },
      },
      Link: {
        variants: {
          primary: (props: any) => ({
            fontWeight: "semibold",
            color: mode("latte-rosewater", "frappe-rosewater")(props),
            _hover: {
              color: mode("latte-flamingo", "frappe-flamingo")(props),
            },
          }),
        },
        defaultProps: {
          variant: "primary",
        },
      },

      Select: {
        variants: {
          primary: (props: any) => ({
            field: {
              cursor: "pointer",
              border: "1px",
              borderColor: mode("latte-overlay0", "frappe-overlay0")(props),
              bg: "transparent",
              _focus: {
                borderColor: mode("latte-lavender", "frappe-lavender")(props),
              },
            },
          }),
        },
        defaultProps: {
          variant: "primary",
        },
      },
      Input: {
        variants: {
          primary: (props: any) => ({
            field: {
              border: "1px",
              borderColor: mode("latte-overlay0", "frappe-overlay0")(props),
              bg: "transparent",
              _focus: {
                borderColor: mode("latte-lavender", "frappe-lavender")(props),
              },
            },
          }),
        },
        defaultProps: {
          variant: "primary",
        },
      },
      Tooltip: {
        variants: {
          primary: (props: any) => ({
            bg: mode("latte-overlay1", "frappe-overlay1")(props),
            arrow: {
              bg: "red",
            },
          }),
        },
        defaultProps: {
          variant: "primary",
        },
      },
      Steps,
    },
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: "surface1",
      size: "lg",
    },
    components: ["Button", "Checkbox", "Radio"],
  })
);

export default theme;
