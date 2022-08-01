import { Spinner, VStack, Center, Text, useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import { AiOutlineInbox } from "react-icons/ai";
import ItemBox from "./ItemBox";

interface SelectPodProps {
  setPod: (pod: Pod) => void;
}

export default function SelectPod({ setPod }: SelectPodProps) {
  const toast = useToast();
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
      .catch((error: any) => {
        toast({
          title: "Failed to load pods",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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
      ) : pods && pods.length > 0 ? (
        pods.map((pod) => (
          <ItemBox
            key={pod.name}
            text={pod.name}
            icon={AiOutlineInbox}
            onClick={() => setPod(pod)}
          />
        ))
      ) : (
        <Text align="center">No Pod found</Text>
      )}
      )
    </VStack>
  );
}
