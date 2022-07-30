interface CheckBoxSettings {
  name: "controls" | "progress" | "history" | "center" | "loop" | "slideNumber";
  label: string;
  description: string;
}

export const checkBoxSettings: CheckBoxSettings[] = [
  {
    name: "controls",
    label: "Controls",
    description: "Display presentation control arrows",
  },
  {
    name: "progress",
    label: "Progress",
    description: "Display a presentation progress bar",
  },
  {
    name: "history",
    label: "History",
    description: "Push each slide change to the browser history",
  },
  {
    name: "center",
    label: "Center",
    description: "Vertical centering of slides",
  },
  {
    name: "loop",
    label: "Loop",
    description: "Loop the presentation",
  },
  {
    name: "slideNumber",
    label: "Slide Number",
    description: "Display the page number of the current slide",
  },
];

interface SelectSettings {
  name: "controlsLayout" | "controlsBackArrows";
  label: string;
  description: string;
  options: string[];
}

export const selectSettings: SelectSettings[] = [
  {
    name: "controlsLayout",
    label: "Controls Layout",
    description: "Determines where controls appear",
    options: ["edges", "bottom-right"],
  },
  {
    name: "controlsBackArrows",
    label: "Controls Back Arrows",
    description: "Visibility rule for backwards navigation arrows",
    options: ["faded", "hidden", "visible"],
  },
];
