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

const SlideShow = dynamic(() => import("../SlideShow/SlideShow"), {
  ssr: false,
});

interface State {
  slideWithImageIndex?: number;
  imageVerticalPosition?: number;
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
  const [state, setState] = useState<State>();

  useEffect(() => {
    if (slides) {
      setTmpSlides(slides);
    }

    return () => setTmpSlides(undefined);
  }, [slides]);

  const getCurrentSlideLen = () => {
    if (!tmpSlides || !deck) return 0;

    let slidesArray = tmpSlides.split("---");

    const currentSlideIndex = deck.getState().indexh as number;

    let currentSlide = slidesArray[currentSlideIndex]
      .trim()
      .split("\n")
      .filter((item) => item !== "");

    return currentSlide.length;
  };

  const addImageToCurrentSlide = (index: number = 0) => {
    if (!tmpSlides || !deck) return;

    let slidesArray = tmpSlides.split("---");
    const currentSlideIndex = deck.getState().indexh as number;

    let currentSlide = slidesArray[currentSlideIndex]
      .trim()
      .split("\n")
      .filter((item) => item !== "");

    const newImage = `\n<img src="${URL.createObjectURL(
      new Blob([image.buffer])
    )}" />\n`;

    if (state?.imageVerticalPosition !== undefined) {
      currentSlide = currentSlide
        .slice(0, state.imageVerticalPosition)
        .concat(currentSlide.slice(state.imageVerticalPosition + 1));
    }

    currentSlide = currentSlide
      .slice(0, index)
      .concat(newImage)
      .concat(currentSlide.slice(index));

    slidesArray[currentSlideIndex] = currentSlide.join("\n");

    setTmpSlides(slidesArray.join("\n---\n"));

    setState({
      imageVerticalPosition: index,
      slideWithImageIndex: currentSlideIndex,
    });
  };

  return (
    <VStack align="stretch" gap={1} w="full" h={{ base: "200px", md: "500px" }}>
      <HStack w="full" h="full">
        <VStack>
          {/* TODO: disable up and down button on slide change */}
          <IconButton
            isDisabled={
              state?.imageVerticalPosition === undefined ||
              state.imageVerticalPosition === 0
            }
            onClick={() => {
              if (!state) return;
              addImageToCurrentSlide(state.imageVerticalPosition! - 1);
            }}
            aria-label="up"
            icon={<ChevronUpIcon />}
          />
          <IconButton
            isDisabled={
              state?.imageVerticalPosition === undefined ||
              state.imageVerticalPosition >= getCurrentSlideLen() - 1
            }
            onClick={() => {
              if (!state) return;
              addImageToCurrentSlide(state.imageVerticalPosition! + 1);
            }}
            aria-label="down"
            icon={<ChevronDownIcon />}
          />
        </VStack>

        <VStack align="stretch" w="full" h="full">
          <HStack>
            <Button
              isDisabled={
                !tmpSlides ||
                !deck ||
                state?.imageVerticalPosition !== undefined
              }
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
              key={tmpSlides}
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
