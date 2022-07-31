import {
  Spinner,
  Box,
  VStack,
  Center,
  HStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import { AiOutlineInbox } from "react-icons/ai";

interface SelectPodProps {
  setPod: (pod: Pod) => void;
}

export default function SelectPod({ setPod }: SelectPodProps) {
  const [fdp] = useAtom(fdpAtom);
  const [pods, setPods] = useState<Pod[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fdp.personalStorage
      .list()
      .then((pods) => {
        setPods(pods);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <VStack align="stretch" gap={2}>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        pods?.map((pod) => (
          <Box
            bg="gray.100"
            _hover={{
              bg: "gray.300",
            }}
            p={5}
            rounded="xl"
            cursor="pointer"
            onClick={() => setPod(pod)}
          >
            <HStack>
              <Icon as={AiOutlineInbox} /> <Text>{pod.name}</Text>
            </HStack>
          </Box>
        ))
      )}
    </VStack>
  );
}
