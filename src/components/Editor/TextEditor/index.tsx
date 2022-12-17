import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

import { editTextAtom } from '../../../store'
import MenuBar from './MenuBar'

export default function TextEditor() {
  const [editText, setEditText] = useAtom(editTextAtom)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
  })

  useEffect(() => {
    if (editText && editor) {
      editor.commands.setContent(editText.element.innerHTML)
    }
  }, [editText, editor])

  const onClose = () => {
    setEditText(undefined)
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isCentered
      isOpen={true}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Text editor</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MenuBar editor={editor} />
          <Divider my={2} />
          <Box maxH="20rem" overflowY="scroll">
            <EditorContent editor={editor} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="outline" mr={2} size="sm">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const html = editor?.getHTML()
              if (editText && html) {
                editText.element.innerHTML = html
                editText.callback && editText.callback()
              }
              onClose()
            }}
            size="sm"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
