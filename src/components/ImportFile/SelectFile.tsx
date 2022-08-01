import {
  Spinner,
  VStack,
  Center,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import type { DirectoryItem } from "@fairdatasociety/fdp-storage/dist/content-items/directory-item";
import { join } from "path";
import { AiFillFolder, AiOutlineFile } from "react-icons/ai";
import ItemBox from "./ItemBox";
import { ArrowBackIcon } from "@chakra-ui/icons";

interface SelectFileProps {
  pod: Pod;
  setFilePath: (filePath: string) => void;
}

export default function SelectFile({ pod, setFilePath }: SelectFileProps) {
  const [path, setPath] = useState("/");
  const [fdp] = useAtom(fdpAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<DirectoryItem>();

  useEffect(() => {
    let canceled = false;

    setIsLoading(true);
    fdp.directory
      .read(pod.name, path)
      .then((items) => {
        if (!canceled) setItems(items);
      })
      .catch(() => {
        if (!canceled) setItems(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [pod, path]);

  return (
    <>
      <HStack mb={3}>
        <IconButton
          isDisabled={path === "/" || isLoading}
          onClick={() => {
            const pathArray = path.split("/");
            let newPath = pathArray.slice(0, pathArray.length - 1).join("/");
            if (newPath === "") newPath = "/";
            setPath(newPath);
          }}
          size="sm"
          aria-label="back"
          icon={<ArrowBackIcon />}
        />
        <Text>Dir: {path}</Text>
      </HStack>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : items ? (
        <VStack align="stretch" gap={2}>
          {items?.getDirectories().map((dir) => (
            <ItemBox
              key={dir.name}
              text={dir.name}
              icon={AiFillFolder}
              onClick={() => setPath(join(path, dir.name))}
            />
          ))}
          {items?.getFiles().map((file) => (
            <ItemBox
              key={file.name}
              text={file.name}
              icon={AiOutlineFile}
              onClick={() => setFilePath(join(path, file.name))}
            />
          ))}
        </VStack>
      ) : (
        <Text align="center">No file/folder found.</Text>
      )}
    </>
  );
}
