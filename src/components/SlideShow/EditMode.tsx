import { HStack, IconButton } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FaMousePointer } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { editModeAtom } from "../../store";

export default function EditMode() {
  const [editMode, setEditMode] = useAtom(editModeAtom);

  return (
    <HStack position="absolute" top={-9} left={0}>
      <IconButton
        colorScheme="blue"
        variant={editMode === "MOVE" ? "solid" : "outline"}
        onClick={() => setEditMode("MOVE")}
        size="sm"
        aria-label="mouse"
        icon={<FaMousePointer />}
      />
      <IconButton
        colorScheme="blue"
        variant={editMode === "TEXT" ? "solid" : "outline"}
        size="sm"
        onClick={() => setEditMode("TEXT")}
        aria-label="text"
        icon={<RiText />}
      />
    </HStack>
  );
}
