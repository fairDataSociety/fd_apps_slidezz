import { Button, HStack, IconButton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import type { Data } from "@ethersphere/bee-js";
import { useAtom } from "jotai";
import { slidesAtom } from "../../store";

const SlideShow = dynamic(() => import("../SlideShow"), {
  ssr: false,
});

interface State {
  indexh: number;
  indexv: number;
}

interface SetImagePositionProps {
  image: Data;
  tmpSlides: string | undefined;
  setTmpSlides: (value: string | undefined) => void;
}

export default function SetImagePosition({
  image,
  tmpSlides,
  setTmpSlides,
}: SetImagePositionProps) {
  const [slides, setSlides] = useAtom(slidesAtom);
  const [deck, setDeck] = useState<any>();
  const [position, setPosition] = useState<number>();

  useEffect(() => {
    if (slides) {
      setTmpSlides(slides);
    }

    return () => setTmpSlides(undefined);
  }, [slides]);

  const getCurrentSlideLen = () => {
    if (!tmpSlides || !deck) return 0;

    const state = deck.getState() as State;
    let slidesArray = tmpSlides.split("---");

    let currentSlide = slidesArray[state.indexh]
      .trim()
      .split("\n")
      .filter((item) => item !== "");

    return currentSlide.length;
  };

  const addImageToCurrentSlide = (index: number = 0, initial = true) => {
    if (!tmpSlides || !deck) return;

    const state = deck.getState() as State;
    let slidesArray = tmpSlides.split("---");

    setTmpSlides(undefined);

    let currentSlide = slidesArray[state.indexh]
      .trim()
      .split("\n")
      .filter((item) => item !== "");

    const newImage = `\n<img src="${URL.createObjectURL(
      new Blob([image.buffer])
    )}" />\n`;

    if (!initial)
      currentSlide = currentSlide
        .slice(0, position!)
        .concat(currentSlide.slice(position! + 1));

    currentSlide = currentSlide
      .slice(0, index)
      .concat(newImage)
      .concat(currentSlide.slice(index));

    slidesArray[state.indexh] = currentSlide.join("\n");

    setTimeout(() => {
      setTmpSlides(slidesArray.join("\n---\n"));
      setPosition(index);
    }, 500);
  };

  return (
    <VStack align="stretch" gap={1} w="full" h={{ base: "200px", md: "500px" }}>
      <HStack w="full" h="full">
        <VStack>
          <IconButton
            isDisabled={position === undefined || position === 0}
            onClick={() => {
              addImageToCurrentSlide(position! - 1, false);
            }}
            aria-label="up"
            icon={<ChevronUpIcon />}
          />
          <IconButton
            isDisabled={
              position === undefined || position >= getCurrentSlideLen() - 1
            }
            onClick={() => {
              addImageToCurrentSlide(position! + 1, false);
            }}
            aria-label="down"
            icon={<ChevronDownIcon />}
          />
        </VStack>

        <VStack align="stretch" w="full" h="full">
          <HStack>
            <Button
              isDisabled={!tmpSlides || !deck || position !== undefined}
              onClick={() => {
                addImageToCurrentSlide();
              }}
              leftIcon={<PlusSquareIcon />}
              size="sm"
            >
              Add the image to the current slide
            </Button>
          </HStack>
          {tmpSlides && (
            <SlideShow
              deckName="tmpDeck"
              deck={deck}
              setDeck={setDeck}
              slides={tmpSlides}
            />
          )}
        </VStack>
      </HStack>
    </VStack>
  );
}
