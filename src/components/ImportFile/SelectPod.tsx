import { Spinner, VStack, Center, Text } from "@chakra-ui/react";
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
      ) : pods && pods.length > 0 ? (
        pods.map((pod) => (
          <ItemBox
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
