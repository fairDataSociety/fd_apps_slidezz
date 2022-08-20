import { HStack, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FaMousePointer } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { editModeAtom } from "../../store";

export default function EditMode() {
  const [editMode, setEditMode] = useAtom(editModeAtom);
  const activeColor = useColorModeValue("latte-sky", "frappe-sky");

  return (
    <HStack position="absolute" top={{ base: -8, md: -10 }} left={0}>
      <IconButton
        variant="outline"
        onClick={() => setEditMode("MOVE")}
        color={editMode === "MOVE" ? activeColor : undefined}
        size={{ base: "xs", md: "sm" }}
        aria-label="mouse"
        icon={<FaMousePointer />}
      />
      <IconButton
        variant="outline"
        size={{ base: "xs", md: "sm" }}
        onClick={() => setEditMode("TEXT")}
        color={editMode === "TEXT" ? activeColor : undefined}
        aria-label="text"
        icon={<RiText />}
      />
    </HStack>
  );
}
