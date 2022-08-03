import { Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { ImageType } from "../../constants/image-type";

interface SelectImageTypeProps {
  imageType?: number;
  setImageType: (imageType: number) => void;
}

export default function SelectImageType({
  imageType,
  setImageType,
}: SelectImageTypeProps) {
  return (
    <RadioGroup
      onChange={(value) => setImageType(Number(value))}
      value={imageType}
      size="lg"
    >
      <VStack align="stretch">
        <Radio value={ImageType.LOGO}>Logo/Copyright image</Radio>
        <Radio value={ImageType.SLIDE}>Slide image</Radio>
      </VStack>
    </RadioGroup>
  );
}
