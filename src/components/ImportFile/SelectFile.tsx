import { Spinner, VStack, Center, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import type { DirectoryItem } from "@fairdatasociety/fdp-storage/dist/content-items/directory-item";
import { join } from "path";
import { AiFillFolder, AiOutlineFile } from "react-icons/ai";
import ItemBox from "./ItemBox";

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
    setIsLoading(true);
    fdp.directory
      .read(pod.name, path)
      .then((items) => {
        setItems(items);
      })
      .catch(() => {
        setItems(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pod, path]);

  return (
    <>
      <Text mb={3}>Dir: {path}</Text>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : items ? (
        <VStack align="stretch" gap={2}>
          {items?.getDirectories().map((dir) => (
            <ItemBox
              text={dir.name}
              icon={AiFillFolder}
              onClick={() => setPath(join(path, dir.name))}
            />
          ))}
          {items?.getFiles().map((file) => (
            <ItemBox
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
