import {
  Spinner,
  Box,
  VStack,
  Center,
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import type { DirectoryItem } from "@fairdatasociety/fdp-storage/dist/content-items/directory-item";
import { join } from "path";
import { AiFillFolder, AiOutlineFile } from "react-icons/ai";

interface SelectFileProps {
  pod: Pod;
  setFile: (file: string) => void;
}

export default function SelectFile({ pod, setFile }: SelectFileProps) {
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
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : items ? (
        <VStack align="stretch" gap={2}>
          {items?.getDirectories().map((dir) => (
            <Box
              bg="gray.100"
              _hover={{
                bg: "gray.300",
              }}
              p={5}
              rounded="xl"
              cursor="pointer"
              onClick={() => setPath(join(path, dir.name))}
            >
              <HStack>
                <Icon as={AiFillFolder} /> <Text>{dir.name}</Text>
              </HStack>
            </Box>
          ))}
          {items?.getFiles().map((file) => (
            <Box
              bg="gray.100"
              _hover={{
                bg: "gray.300",
              }}
              p={5}
              rounded="xl"
              cursor="pointer"
              onClick={() => setFile(join(path, file.name))}
            >
              <HStack>
                <Icon as={AiOutlineFile} /> <Text>{file.name}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      ) : (
        <Text align="center">No file/folder found.</Text>
      )}
    </>
  );
}
