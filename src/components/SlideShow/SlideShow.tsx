import { Box, Image, useColorModeValue, Textarea } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { LogoPositions } from "../../constants/logo-positions";

//@ts-ignore
import Reveal from "reveal.js";
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";

import {
  slideShowSettingsAtom,
  styleSettingsAtom,
  slidesLogoAtom,
} from "../../store";
import Moveable from "react-moveable";
import MoveableHelper from "moveable-helper";
import fscreen from "fscreen";
import SlideSideBar from "../SlideSideBar/SlideSideBar";

interface SlideShowProps {
  deckName: string;
  deck: any;
  setDeck: (deck: any) => void;
  slides: string;
}

export default function SlideShow({
  deckName,
  deck,
  setDeck,
  slides,
}: SlideShowProps) {
  const [slideShowSettings] = useAtom(slideShowSettingsAtom);
  const [styleSettings] = useAtom(styleSettingsAtom);
  const [slidesLogo] = useAtom(slidesLogoAtom);
  const [target, setTarget] = useState<HTMLElement>();
  const [moveableHelper] = useState(() => {
    return new MoveableHelper();
  });
  const [elementGuidelines, setElementGuidelines] = useState<HTMLElement[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", styleSettings.theme);
  }, [styleSettings]);

  useEffect(() => {
    //@ts-ignore
    const newDeck = Reveal(document.querySelector(`.${deckName}`), {
      embedded: true,
      keyboardCondition: "focused",
      plugins: [Markdown],
      ...slideShowSettings,
    });
    newDeck.initialize().then(() => {
      setDeck(newDeck);
      newDeck.layout();
      newDeck.sync();

      newDeck.getSlides().forEach((slide: any) => {
        slide.children.forEach((element: HTMLElement) => {
          element.addEventListener("click", () => {
            setTarget(element);
          });
          element.style.cursor = "pointer";
        });
      });

      setElementGuidelines([
        newDeck.getRevealElement(),
        newDeck.getSlidesElement(),
        newDeck.getViewportElement(),
      ]);

      document.querySelector(".backgrounds")!.addEventListener("click", () => {
        setTarget(undefined);
      });

      newDeck.on("slidechanged", () => {
        setTarget(undefined);
      });

      newDeck.on("overviewshown", () => {
        setTarget(undefined);
      });
    });

    fscreen.addEventListener("fullscreenchange", () => {
      setIsFullscreen(fscreen.fullscreenElement !== null);
    });

    window.addEventListener("resize", () => {
      setTarget(undefined);
    });

    return () => {
      newDeck.destroy();
      fscreen.removeEventListener("fullscreenchange", () => {});
      window.removeEventListener("resize", () => {});
    };
  }, []);

  useEffect(() => {
    if (deck) {
      deck.layout();
      deck.sync();
    }
  }, [deck]);

  useEffect(() => {
    if (deck) deck.configure(slideShowSettings);
  }, [slideShowSettings]);

  return (
    <Box
      className="slideshow"
      position="relative"
      borderWidth="1px"
      borderColor={useColorModeValue("latte-overlay0", "frappe-overlay0")}
      borderBottom="none"
      w="full"
      h="full"
    >
      <SlideSideBar />

      <Box className={`reveal ${deckName}`}>
        <Box className="slides">
          <section data-markdown="" data-separator="---">
            <Textarea data-template defaultValue={slides} />
          </section>
        </Box>
        {slidesLogo && (
          <Image
            position="absolute"
            {...LogoPositions[slideShowSettings.slidesLogoPosition]}
            h={{ base: "10px", sm: "20px", md: "30px", lg: "50px" }}
            w={{ base: "10px", sm: "20px", md: "30px", lg: "50px" }}
            objectFit="cover"
            src={URL.createObjectURL(new Blob([slidesLogo.buffer]))}
          />
        )}
      </Box>

      {target && !isFullscreen ? (
        <Moveable
          bounds={{
            left: 0,
            top: 0,
            right: document.querySelector(".slideshow")?.clientWidth,
            bottom: document.querySelector(".slideshow")?.clientHeight,
          }}
          elementGuidelines={elementGuidelines}
          target={target}
          draggable={true}
          // resizable={true}
          throttleDrag={0}
          startDragRotate={0}
          throttleDragRotate={0}
          zoom={1}
          origin={true}
          padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
          scalable={true}
          keepRatio={false}
          throttleScale={0}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          edge={false}
          snappable={true}
          verticalGuidelines={[0, 200, 400]}
          horizontalGuidelines={[0, 200, 400]}
          snapThreshold={5}
          isDisplaySnapDigit={true}
          snapGap={true}
          snapDirections={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            center: true,
            middle: true,
          }}
          elementSnapDirections={{
            top: true,
            right: true,
            bottom: true,
            left: true,
            center: true,
            middle: true,
          }}
          snapDigit={0}
          onDragStart={moveableHelper.onDragStart}
          onDrag={moveableHelper.onDrag}
          onScaleStart={moveableHelper.onScaleStart}
          onScale={moveableHelper.onScale}
          // onResizeStart={moveableHelper.onResizeStart}
          // onResize={moveableHelper.onResize}
        />
      ) : null}
    </Box>
  );
}