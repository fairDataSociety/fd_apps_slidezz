import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { RiFontSize } from "react-icons/ri";
import { moveableTargetAtom } from "../../store";

export default function FontTab() {
  const [moveableTarget] = useAtom(moveableTargetAtom);
  const [fontSize, setFontSize] = useState("");
  const [textAlign, setTextAlign] = useState("");
  const [textDecoration, setTextDecoration] = useState("");
  const [fontStyle, setFontStyle] = useState("");

  useEffect(() => {
    if (moveableTarget) {
      setTextAlign(moveableTarget.style.textAlign);
      setTextDecoration(moveableTarget.style.textDecoration);
      setFontStyle(moveableTarget.style.fontStyle);
      setFontSize(moveableTarget.style.fontSize.replace(/px/, ""));
    }
  }, [moveableTarget]);

  return (
    <Box className="test" position="absolute" top={-9} right={0}>
      <Popover placement="left-end">
        <PopoverTrigger>
          <IconButton
            isDisabled={
              !moveableTarget ||
              !["h1", "h2", "h3", "h4", "h5", "h5", "p"].includes(
                moveableTarget.tagName.toLowerCase()
              )
            }
            colorScheme="blue"
            size="sm"
            aria-label="font"
            icon={<RiFontSize />}
          />
        </PopoverTrigger>
        <PopoverContent w={{ base: "15rem", md: "20rem" }}>
          <PopoverArrow />
          <PopoverBody>
            <SimpleGrid columns={2} spacing={2}>
              <FormControl>
                <FormLabel fontSize={{ base: "xs", md: "md" }}>
                  font-size
                </FormLabel>
                <NumberInput
                  value={fontSize}
                  onChange={(valueString) => {
                    if (moveableTarget) {
                      moveableTarget.style.fontSize = valueString + "px";
                      setFontSize(valueString);
                    }
                  }}
                  size="sm"
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: "xs", md: "md" }}>
                  text-align
                </FormLabel>
                <Select
                  value={textAlign}
                  onChange={(e) => {
                    if (moveableTarget && e.target.value !== "") {
                      const newValue = e.target.value;
                      moveableTarget.style.textAlign = newValue;
                      setTextAlign(newValue);
                    }
                  }}
                  size="sm"
                >
                  <option selected value=""></option>
                  <option value="left">left</option>
                  <option value="center">center</option>
                  <option value="right">right</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: "xs", md: "md" }}>
                  text-decoration
                </FormLabel>
                <Select
                  value={textDecoration}
                  onChange={(e) => {
                    if (moveableTarget && e.target.value !== "") {
                      const newValue = e.target.value;
                      moveableTarget.style.textDecoration = newValue;
                      setTextDecoration(newValue);
                    }
                  }}
                  size="sm"
                >
                  <option selected value=""></option>
                  <option value="none">none</option>
                  <option value="underline">underline</option>
                  <option value="overline">overline</option>
                  <option value="line-through">line-through</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: "xs", md: "md" }}>
                  font-style
                </FormLabel>
                <Select
                  value={fontStyle}
                  onChange={(e) => {
                    if (moveableTarget && e.target.value !== "") {
                      const newValue = e.target.value;
                      moveableTarget.style.fontStyle = newValue;
                      setFontStyle(newValue);
                    }
                  }}
                  size="sm"
                >
                  <option selected value=""></option>
                  <option value="normal">normal</option>
                  <option value="italic">italic</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
