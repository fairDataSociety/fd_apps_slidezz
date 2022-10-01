import {
  Spinner,
  VStack,
  Center,
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { fdpAtom } from '../../store'
import { useEffect, useState } from 'react'
import type { DirectoryItem } from '@fairdatasociety/fdp-storage/dist/content-items/directory-item'
import { join, extname } from 'path'
import { AiFillFolder, AiOutlineFile } from 'react-icons/ai'
import ItemBox from './ItemBox'
import { ArrowBackIcon } from '@chakra-ui/icons'

interface SelectPathProps {
  pod: string
  setPath: (path: string) => void
  allowedExtensions?: string[]
}

export default function SelectPath({
  pod,
  setPath,
  allowedExtensions,
}: SelectPathProps) {
  const [tmpPath, setTmpPath] = useState('/')
  const [fdp] = useAtom(fdpAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<DirectoryItem>()
  const isItemsAvailable = !!items && items.content.length > 0

  useEffect(() => {
    let canceled = false

    setIsLoading(true)
    fdp.directory
      .read(pod, tmpPath)
      .then((items) => {
        if (!canceled) setItems(items)
      })
      .catch(() => {
        if (!canceled) setItems(undefined)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => {
      canceled = true
    }
  }, [pod, tmpPath])

  return (
    <>
      <HStack mb={3}>
        <IconButton
          isDisabled={tmpPath === '/' || isLoading}
          onClick={() => {
            const pathArray = tmpPath.split('/')
            let newPath = pathArray.slice(0, pathArray.length - 1).join('/')
            if (newPath === '') newPath = '/'
            setTmpPath(newPath)
          }}
          size="sm"
          aria-label="back"
          icon={<ArrowBackIcon />}
        />
        <Text>Dir: {tmpPath}</Text>
      </HStack>
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : isItemsAvailable ? (
        <VStack align="stretch" gap={2}>
          {items?.getDirectories().map((dir) => (
            <ItemBox
              key={dir.name}
              text={dir.name}
              icon={AiFillFolder}
              onClick={() => {
                const path = join(tmpPath, dir.name)
                setTmpPath(path)
              }}
            />
          ))}
          {items?.getFiles().map((file) => {
            const fileExtension = extname(file.name).slice(1)

            if (allowedExtensions && !allowedExtensions.includes(fileExtension))
              return null

            return (
              <ItemBox
                key={file.name}
                text={file.name}
                icon={AiOutlineFile}
                onClick={() => setPath(join(tmpPath, file.name))}
              />
            )
          })}
        </VStack>
      ) : (
        <Text align="center">No file/folder found.</Text>
      )}
    </>
  )
}
