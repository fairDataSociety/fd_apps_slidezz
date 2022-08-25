import { useAtom } from "jotai";
import { useState } from "react";
import { slidesAtom } from "../../../store";
import CopyPanel from "./CopyPanel";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  VStack,
  Select,
} from "@chakra-ui/react";
import { slideThemes } from "../../../config/slide-themes";

export default function EmbedCode() {
  const [slides] = useAtom(slidesAtom);
  const [width, setWidth] = useState(576);
  const [height, setHeight] = useState(420);
  const [style, setStyle] = useState("white");

  const embedURL = `${process.env.NEXT_PUBLIC_BASE_URL!}/shared-slideshow/${
    slides?.sharedRef
  }/embed?theme=${style}`;

  const embedCode = `<iframe src="${embedURL}" width="${width}" height="${height}"></iframe>`;

  return (
    <VStack align="stretch">
      <HStack gap={5}>
        <FormControl>
          <FormLabel>Width:</FormLabel>
          <NumberInput
            min={0}
            value={width}
            onChange={(_, value) => setWidth(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Height:</FormLabel>
          <NumberInput
            min={0}
            value={height}
            onChange={(_, value) => setHeight(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Style:</FormLabel>
          <Select
            onChange={(e) => {
              setStyle(e.target.value);
            }}
          >
            {Object.keys(slideThemes).map((theme) => (
              <option value={theme}>{theme}</option>
            ))}
          </Select>
        </FormControl>
      </HStack>

      <CopyPanel label="Embed Code" text={embedCode} />
    </VStack>
  );
}
