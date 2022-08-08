import { Radio, RadioGroup, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ImageType } from "../../constants/image-type";
import { slidesAtom } from "../../store";

interface SelectImageTypeProps {
  imageType?: number;
  setImageType: (imageType: number) => void;
}

export default function SelectImageType({
  imageType,
  setImageType,
}: SelectImageTypeProps) {
  const [slides] = useAtom(slidesAtom);

  return (
    <RadioGroup
      onChange={(value) => setImageType(Number(value))}
      value={imageType}
      size="lg"
    >
      <VStack align="stretch">
        <Radio value={ImageType.LOGO}>Logo/Copyright image</Radio>
        <Radio isDisabled={!slides} value={ImageType.SLIDE}>
          Slide image
        </Radio>
      </VStack>
    </RadioGroup>
  );
}
