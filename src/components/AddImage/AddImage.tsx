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
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { useState } from "react";
import SelectImageType from "./SelectImageType";
import type { Data } from "@ethersphere/bee-js";
import ImportFile from "../ImportFile/ImportFile";
import { BiImageAdd } from "react-icons/bi";
import { ImageType } from "../../constants/image-type";
import { useAtom } from "jotai";
import { slidesLogoAtom } from "../../store";

const steps = [
  { label: "Choose image type" },
  { label: "Choose an image from Fairdrive" },
  { label: "Add Image" },
];

export default function AddImage() {
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom);
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

  const isNextDisabled = (activeStep: number) => {
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
    reset();
    onClose();
  };

  const handleAddImage = () => {
    if (imageType === ImageType.LOGO) {
      setSlidesLogo(image);
    } else if (imageType === ImageType.SLIDE) {
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
        size={{ base: "xs", sm: "sm", md: "3xl" }}
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
                  isDisabled={isNextDisabled(activeStep)}
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
