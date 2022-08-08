import SideBarItem from "../SideBar/SideBarItem";
import { BsFillImageFill } from "react-icons/bs";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  useBreakpointValue,
  useColorModeValue,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useEffect, useState } from "react";
import SelectImageType from "./SelectImageType";
import type { Data } from "@ethersphere/bee-js";
import ImportFile from "../ImportFile/ImportFile";
import { BiImageAdd } from "react-icons/bi";
import { ImageType } from "../../constants/image-type";
import { useAtom } from "jotai";
import { slidesAtom, slidesLogoAtom } from "../../store";
import SetImagePosition from "./SetImagePosition";

const steps = [
  { label: "Select image type" },
  { label: "Select an image from Fairdrive" },
  { label: "Add Image" },
];

export default function AddImage() {
  const [slides, setSlides] = useAtom(slidesAtom);
  const [tmpSlides, setTmpSlides] = useState<string | undefined>();
  const [_, setSlidesLogo] = useAtom(slidesLogoAtom);
  const [imageType, setImageType] = useState<ImageType>();
  const [image, setImage] = useState<Data>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const stepsOrientation = useBreakpointValue({
    base: "vertical",
    md: "horizontal",
  }) as "horizontal" | "vertical";

  const isNextStepDisabled = () => {
    if (activeStep === 0) {
      return imageType === undefined;
    } else if (activeStep === 1) {
      return !image;
    } else {
      return false;
    }
  };

  const handleClose = () => {
    setImageType(undefined);
    setImage(undefined);
    setTmpSlides(undefined);
    reset();
    onClose();
  };

  const handleAddImage = () => {
    if (imageType === ImageType.LOGO) {
      setSlidesLogo(image);
    } else if (imageType === ImageType.SLIDE) {
      setSlides(tmpSlides);
    }

    handleClose();
  };

  return (
    <>
      <SideBarItem
        label="Add an Image"
        icon={BsFillImageFill}
        onClick={onOpen}
      />

      <Modal
        closeOnOverlayClick={false}
        size={{ base: "xs", sm: "md", md: "3xl" }}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("latte-crust", "frappe-crust")}>
          <ModalHeader>Add Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" width="100%">
              <Steps
                responsive={false}
                orientation={stepsOrientation}
                activeStep={activeStep}
              >
                {steps.map(({ label }, index) => (
                  <Step label={label} key={label}>
                    <Flex justify="center" py={5}>
                      {index === 0 && (
                        <SelectImageType
                          imageType={imageType}
                          setImageType={setImageType}
                        />
                      )}

                      {index === 1 && (
                        <VStack>
                          <ImportFile
                            setData={setImage}
                            allowedExtensions={["png", "jpg", "jpeg"]}
                          >
                            <Button rightIcon={<BiImageAdd />}>
                              Select an image from Fairdrive
                            </Button>
                          </ImportFile>

                          {image && (
                            <Image
                              h={100}
                              w={100}
                              src={URL.createObjectURL(
                                new Blob([image.buffer])
                              )}
                            />
                          )}
                        </VStack>
                      )}

                      {index === 2 ? (
                        imageType == ImageType.LOGO ? (
                          <Text w="400px" textAlign="center">
                            You can change the Logo/Copyright image position in
                            the presentation settings menu
                          </Text>
                        ) : (
                          <SetImagePosition
                            image={image!}
                            tmpSlides={tmpSlides}
                            setTmpSlides={setTmpSlides}
                          />
                        )
                      ) : null}
                    </Flex>
                  </Step>
                ))}
              </Steps>

              <Flex width="100%" justify="flex-end">
                <Button
                  isDisabled={activeStep === 0}
                  mr={4}
                  onClick={prevStep}
                  size="sm"
                  variant="ghost"
                >
                  Prev
                </Button>
                <Button
                  isDisabled={isNextStepDisabled()}
                  size="sm"
                  onClick={
                    activeStep === steps.length - 1 ? handleAddImage : nextStep
                  }
                >
                  {activeStep === steps.length - 1 ? "Add Image" : "Next"}
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
