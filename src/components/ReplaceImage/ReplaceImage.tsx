import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { moveableTargetAtom, replaceImageElementAtom } from "../../store";
import { File } from "../../types";
import AddImageModal from "../AddImage/AddImageModal";

export function ReplaceImage() {
  const [isOpen, setIsOpen] = useState(true);
  const [_, setMoveableTarget] = useAtom(moveableTargetAtom);
  const [replaceImageElement, setReplaceImageElement] = useAtom(
    replaceImageElementAtom
  );

  const handleReplaceImage = (image: File) => {
    if (!replaceImageElement) return;

    replaceImageElement.src = URL.createObjectURL(
      new Blob([image.data.buffer])
    );
    replaceImageElement.alt = image.name;

    replaceImageElement.setAttribute("data-pod", image.podName);
    replaceImageElement.setAttribute("data-path", image.fullPath);

    setReplaceImageElement(undefined);
  };

  useEffect(() => {
    setMoveableTarget(undefined);
  }, []);

  return (
    <AddImageModal
      handleAddImage={(image) => handleReplaceImage(image)}
      isOpen={isOpen}
      onClose={() => {
        setReplaceImageElement(undefined);
        setIsOpen(false);
      }}
    />
  );
}
