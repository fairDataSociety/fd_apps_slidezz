import { Tooltip, Center, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface SideBarItemInterface {
  onClick: () => void;
  icon: IconType;
  label: string;
}

export default function SideBarItem({
  onClick,
  icon,
  label,
}: SideBarItemInterface) {
  return (
    <Tooltip label={label} placement="right" hasArrow>
      <Center
        onClick={onClick}
        cursor="pointer"
        p={5}
        w="full"
        _hover={{ bg: "gray.500", color: "gray.100" }}
      >
        <Icon as={icon} />
      </Center>
    </Tooltip>
  );
}
