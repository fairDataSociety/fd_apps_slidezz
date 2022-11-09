import { useEffect, useState } from 'react'
import { AiOutlineInbox } from 'react-icons/ai'

import { Center, Spinner, Text, VStack, useToast } from '@chakra-ui/react'

import { getPods } from '../../api/fairos/pod'
import ItemBox from './ItemBox'

interface SelectPodProps {
  setPod: (pod: string) => void
}

export default function SelectPod({ setPod }: SelectPodProps) {
  const toast = useToast()
  const [pods, setPods] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getPods()
      .then((pods) => {
        setPods(pods.pod_name)
      })
      .catch((error: any) => {
        toast({
          title: 'Failed to load pods',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <VStack align="stretch" gap={2}>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : pods && pods.length > 0 ? (
        pods.map((pod, i) => (
          <ItemBox
            key={i}
            text={pod}
            icon={AiOutlineInbox}
            onClick={() => {
              setPod(pod)
            }}
          />
        ))
      ) : (
        <Text align="center">No Pod found</Text>
      )}
      )
    </VStack>
  )
}