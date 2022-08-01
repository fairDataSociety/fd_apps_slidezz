import { Box, HStack, Icon, useColorModeValue, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ItemBoxProps {
  text: string;
  icon: IconType;
  onClick: () => void;
}

export default function ItemBox({ text, icon, onClick }: ItemBoxProps) {
  return (
    <Box
      bg={useColorModeValue("latte-surface2", "frappe-surface2")}
      _hover={{
        bg: useColorModeValue("latte-overlay1", "frappe-overlay1"),
      }}
      p={5}
      rounded="xl"
      cursor="pointer"
      onClick={onClick}
    >
      <HStack>
        <Icon as={icon} /> <Text>{text}</Text>
      </HStack>
    </Box>
  );
}
