import {
  Spinner,
  VStack,
  Center,
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { join, extname } from 'path'
import { AiFillFolder, AiOutlineFile } from 'react-icons/ai'
import ItemBox from './ItemBox'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getFilesAndDirs, GetFilesResponse } from '../../api/fs'
import { useAtom } from 'jotai'
import { userAtom } from '../../store'
import { openPod } from '../../api/pod'

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
  const [user] = useAtom(userAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<GetFilesResponse>()
  const [isPodOpen, setIsPodOpen] = useState(false)

  useEffect(() => {
    if (user) {
      openPod(pod, user.password).finally(() => {
        setIsPodOpen(true)
      })
    }
  }, [user])

  const isItemsAvailable =
    items &&
    ((items.dirs && items.dirs.length > 0) ||
      (items.files && items.files.length > 0))

  useEffect(() => {
    let canceled = false
    setIsLoading(true)

    if (isPodOpen) {
      getFilesAndDirs(pod, tmpPath)
        .then((items) => {
          if (!canceled) setItems(items)
        })
        .catch(() => {
          if (!canceled) setItems(undefined)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    return () => {
      canceled = true
    }
  }, [pod, tmpPath, user, isPodOpen])

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
          {items &&
            items.dirs &&
            items.dirs.map((dir, i) => (
              <ItemBox
                key={i}
                text={dir.name}
                icon={AiFillFolder}
                onClick={() => {
                  const path = join(tmpPath, dir.name)
                  setTmpPath(path)
                }}
              />
            ))}
          {items &&
            items.files &&
            items.files.map((file, i) => {
              const fileExtension = extname(file.name).slice(1)

              if (
                allowedExtensions &&
                !allowedExtensions.includes(fileExtension)
              )
                return null

              return (
                <ItemBox
                  key={i}
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
