import { SimpleGrid, Box, Heading, Icon } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { themes, StyleSettings } from "../../../store";
import { AiFillCheckCircle } from "react-icons/ai";

export default function ColorSelect() {
  const { setFieldValue, values } = useFormikContext<StyleSettings>();

  return (
    <Box>
      <Heading fontWeight="light" size="md" mb={3}>
        Color
      </Heading>
      <SimpleGrid columns={3} spacing={5}>
        {Object.entries(themes).map(([key, value]) => {
          return (
            <Box
              onClick={() => {
                setFieldValue("theme", key);
              }}
              cursor="pointer"
              border="1px"
              bg={value.bg}
              height="80px"
              position="relative"
              transition="all 0.2s"
              _hover={{
                boxShadow: "lg",
                transform: "scale(1.1)",
              }}
            >
              {values.theme === key && (
                <Icon
                  bg="white"
                  borderRadius="full"
                  color="green.500"
                  h="25px"
                  w="25px"
                  as={AiFillCheckCircle}
                  position="absolute"
                  top="-15%"
                  left="-10%"
                />
              )}

              <Box
                bg={value.mainColor}
                height="20px"
                width="20px"
                position="absolute"
                borderRadius="full"
                top="50%"
                left="40%"
                transform="translate(-50%, -50%)"
              ></Box>
              <Box
                bg={value.linkColor}
                height="20px"
                width="20px"
                position="absolute"
                borderRadius="full"
                top="50%"
                left="60%"
                transform="translate(-50%, -50%)"
              ></Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
