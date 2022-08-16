import { HStack, IconButton } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { FaMousePointer } from "react-icons/fa";
import { RiText } from "react-icons/ri";
import { editModeAtom } from "../../store";

export default function EditMode() {
  const [editMode, setEditMode] = useAtom(editModeAtom);

  return (
    <HStack position="absolute" top={-10} left={0} gap={2}>
      <IconButton
        onClick={() => setEditMode("MOVE")}
        variant={editMode === "MOVE" ? "solid" : "outline"}
        size="sm"
        aria-label="mouse"
        icon={<FaMousePointer />}
      />
      <IconButton
        onClick={() => setEditMode("TEXT")}
        variant={editMode === "TEXT" ? "solid" : "outline"}
        size="sm"
        aria-label="text"
        icon={<RiText />}
      />
    </HStack>
  );
}
