import { Tooltip, Center, Icon, useColorModeValue } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface SlideSideBarItemInterface {
  onClick?: () => void;
  icon: IconType;
  label: string;
}

export default function SlideSideBarItem({
  onClick,
  icon,
  label,
}: SlideSideBarItemInterface) {
  return (
    <Tooltip
      bg={useColorModeValue("latte-overlay1", "frappe-overlay1")}
      label={label}
      placement="right"
      hasArrow
    >
      <Center
        onClick={onClick}
        cursor="pointer"
        p={{ base: 2, md: 5 }}
        w="full"
        _hover={{
          bg: useColorModeValue("latte-surface2", "frappe-surface2"),
        }}
      >
        <Icon as={icon} />
      </Center>
    </Tooltip>
  );
}
