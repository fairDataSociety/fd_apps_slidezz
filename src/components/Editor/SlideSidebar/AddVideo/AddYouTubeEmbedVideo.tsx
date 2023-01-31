import { Field, Formik } from 'formik'
import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { BsLink } from 'react-icons/bs'

import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'

import { addEmbedVideoToCurrentSlide } from '../../../../actions/addEmbedVideoToCurrentSlide'
import {
  addHistoryActionAtom,
  moveableTargetsAtom,
  slidesDeckAtom,
} from '../../../../store'
import { youtubeUrlParser } from '../../../../utils'

interface AddYouTubeEmbedVideoProps {
  addVideoOnClose: () => void
}

interface FormValues {
  url: string
}

const initialValues: FormValues = {
  url: '',
}

export default function AddYouTubeEmbedVideo({
  addVideoOnClose,
}: AddYouTubeEmbedVideoProps) {
  const deck = useAtomValue(slidesDeckAtom)
  const setMoveableTargets = useUpdateAtom(moveableTargetsAtom)
  const addHistoryAction = useUpdateAtom(addHistoryActionAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Tooltip label="Insert from Youtube" hasArrow>
        <IconButton onClick={onOpen} aria-label="link" icon={<BsLink />} />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik
          validateOnMount
          onSubmit={(values) => {
            if (!deck) return
            addEmbedVideoToCurrentSlide(
              values.url,
              deck,
              setMoveableTargets,
              addHistoryAction
            )
            onClose()
            addVideoOnClose()
          }}
          initialValues={initialValues}
        >
          {({ isValid, errors, touched, handleSubmit }) => (
            <ModalContent>
              <ModalHeader>Insert from Youtube</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isInvalid={!!touched.url && !!errors.url}>
                  <Field
                    as={Input}
                    id="url"
                    name="url"
                    placeHolder="https://..."
                    validate={(value: string) => {
                      let error: string | undefined

                      if (!value) {
                        error = 'Required'
                      } else if (youtubeUrlParser(value) === false) {
                        error = 'Invalid Youtube URL'
                      }

                      return error
                    }}
                  />
                  <FormErrorMessage>{errors.url}</FormErrorMessage>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button variant="c-outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={() => handleSubmit()} isDisabled={!isValid}>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </Formik>
      </Modal>
    </>
  )
}
