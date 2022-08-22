import {
  Tooltip,
  Center,
  Icon,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface SideBarItemInterface {
  onClick?: () => Promise<void>;
  icon: IconType;
  label: string;
  isLoading?: boolean;
}

export default function SideBarItem({
  onClick,
  icon,
  label,
  isLoading,
}: SideBarItemInterface) {
  return (
    <Tooltip
      bg={useColorModeValue("latte-overlay1", "frappe-overlay1")}
      label={label}
      placement="right"
      hasArrow
    >
      <Center
        onClick={async () => {
          if (!isLoading && onClick) await onClick();
        }}
        cursor="pointer"
        p={5}
        w="full"
        _hover={{
          bg: useColorModeValue("latte-surface2", "frappe-surface2"),
        }}
      >
        {isLoading ? <Spinner size="sm" /> : <Icon as={icon} />}
      </Center>
    </Tooltip>
  );
}
