import { Editor } from '@tiptap/react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import {
  BiAlignJustify,
  BiAlignLeft,
  BiAlignMiddle,
  BiAlignRight,
  BiCode,
  BiCodeBlock,
} from 'react-icons/bi'
import { MdHorizontalRule, MdRedo, MdUndo } from 'react-icons/md'
import { TbBlockquote } from 'react-icons/tb'

import {
  Button,
  Divider,
  IconButton,
  Input,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import useColors from '../../../hooks/useColors'

interface MenuBarProps {
  editor: Editor | null
}

export default function MenuBar({ editor }: MenuBarProps) {
  const { crust } = useColors()

  return (
    <VStack align="stretch" bg={crust} p={2} h="full" w="12rem">
      {editor ? (
        <>
          <Wrap>
            <WrapItem>
              <IconButton
                variant="outline"
                size="sm"
                aria-label="undo"
                icon={<MdUndo />}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                  !editor.can().chain().focus().undo().run() ||
                  !editor.isFocused
                }
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant="outline"
                size="sm"
                aria-label="redo"
                icon={<MdRedo />}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                  !editor.can().chain().focus().redo().run() ||
                  !editor.isFocused
                }
              />
            </WrapItem>
          </Wrap>
          <Divider />
          <Wrap>
            <WrapItem>
              <IconButton
                variant={editor.isActive('bold') ? 'solid' : 'outline'}
                size="sm"
                aria-label="bold"
                icon={<AiOutlineBold />}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                  !editor.can().chain().focus().toggleBold().run() ||
                  !editor.isFocused
                }
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('italic') ? 'solid' : 'outline'}
                size="sm"
                aria-label="italic"
                icon={<AiOutlineItalic />}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                  !editor.can().chain().focus().toggleItalic().run() ||
                  !editor.isFocused
                }
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('strike') ? 'solid' : 'outline'}
                size="sm"
                aria-label="strike"
                icon={<AiOutlineStrikethrough />}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                  !editor.can().chain().focus().toggleStrike().run() ||
                  !editor.isFocused
                }
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('underline') ? 'solid' : 'outline'}
                size="sm"
                aria-label="underline"
                icon={<AiOutlineUnderline />}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.isFocused}
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('code') ? 'solid' : 'outline'}
                size="sm"
                aria-label="code"
                icon={<BiCode />}
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                  !editor.can().chain().focus().toggleCode().run() ||
                  !editor.isFocused
                }
              />
            </WrapItem>

            <WrapItem>
              <Button
                variant={editor.isActive('paragraph') ? 'solid' : 'outline'}
                size="sm"
                w={5}
                aria-label="paragraph"
                onClick={() => editor.chain().focus().setParagraph().run()}
                disabled={!editor.isFocused}
              >
                P
              </Button>
            </WrapItem>

            <WrapItem>
              <Button
                variant={
                  editor.isActive('heading', { level: 1 }) ? 'solid' : 'outline'
                }
                size="sm"
                w={5}
                aria-label="h1"
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 1 }).run()
                }
                disabled={!editor.isFocused}
              >
                H1
              </Button>
            </WrapItem>

            <WrapItem>
              <Button
                variant={
                  editor.isActive('heading', { level: 2 }) ? 'solid' : 'outline'
                }
                size="sm"
                w={5}
                aria-label="h2"
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 2 }).run()
                }
                disabled={!editor.isFocused}
              >
                H2
              </Button>
            </WrapItem>

            <WrapItem>
              <Button
                variant={
                  editor.isActive('heading', { level: 3 }) ? 'solid' : 'outline'
                }
                size="sm"
                w={5}
                aria-label="h3"
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 3 }).run()
                }
                disabled={!editor.isFocused}
              >
                H3
              </Button>
            </WrapItem>

            <WrapItem>
              <Button
                variant={
                  editor.isActive('heading', { level: 4 }) ? 'solid' : 'outline'
                }
                size="sm"
                w={5}
                aria-label="h4"
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 4 }).run()
                }
                disabled={!editor.isFocused}
              >
                H4
              </Button>
            </WrapItem>

            <WrapItem>
              <Button
                variant={
                  editor.isActive('heading', { level: 5 }) ? 'solid' : 'outline'
                }
                size="sm"
                w={5}
                aria-label="h5"
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 5 }).run()
                }
                disabled={!editor.isFocused}
              >
                H5
              </Button>
            </WrapItem>

            <WrapItem>
              <Button
                variant={
                  editor.isActive('heading', { level: 6 }) ? 'solid' : 'outline'
                }
                size="sm"
                w={5}
                aria-label="h6"
                onClick={() =>
                  editor.chain().focus().setHeading({ level: 6 }).run()
                }
                disabled={!editor.isFocused}
              >
                H6
              </Button>
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('bulletList') ? 'solid' : 'outline'}
                size="sm"
                aria-label="bulletList"
                icon={<AiOutlineUnorderedList />}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.isFocused}
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('orderedList') ? 'solid' : 'outline'}
                size="sm"
                fontSize="xl"
                aria-label="orderedList"
                icon={<AiOutlineOrderedList />}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.isFocused}
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('codeBlock') ? 'solid' : 'outline'}
                size="sm"
                aria-label="codeBlock"
                icon={<BiCodeBlock />}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                disabled={!editor.isFocused}
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={editor.isActive('blockquote') ? 'solid' : 'outline'}
                size="sm"
                aria-label="blockquote"
                icon={<TbBlockquote />}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={!editor.isFocused}
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant="outline"
                size="sm"
                aria-label="horizontal-rule"
                icon={<MdHorizontalRule />}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                disabled={!editor.isFocused}
              />
            </WrapItem>

            <WrapItem>
              <Button
                variant="outline"
                size="sm"
                w={5}
                aria-label="br"
                onClick={() => editor.chain().focus().setHardBreak().run()}
                disabled={!editor.isFocused}
              >
                BR
              </Button>
            </WrapItem>
          </Wrap>
          <Divider />
          <Wrap>
            <WrapItem>
              <IconButton
                variant={
                  editor.isActive({ textAlign: 'left' }) ? 'solid' : 'outline'
                }
                size="sm"
                aria-label="alignment-left"
                icon={<BiAlignLeft />}
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
                disabled={!editor.isFocused}
              />
            </WrapItem>

            <WrapItem>
              <IconButton
                variant={
                  editor.isActive({ textAlign: 'center' }) ? 'solid' : 'outline'
                }
                size="sm"
                aria-label="alignment-center"
                icon={<BiAlignMiddle />}
                onClick={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
                disabled={!editor.isFocused}
              />
            </WrapItem>
            <WrapItem>
              <IconButton
                variant={
                  editor.isActive({ textAlign: 'right' }) ? 'solid' : 'outline'
                }
                size="sm"
                aria-label="alignment-right"
                icon={<BiAlignRight />}
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
                disabled={!editor.isFocused}
              />
            </WrapItem>
            <WrapItem>
              <IconButton
                variant={
                  editor.isActive({ textAlign: 'justify' })
                    ? 'solid'
                    : 'outline'
                }
                size="sm"
                aria-label="alignment-justify"
                icon={<BiAlignJustify />}
                onClick={() =>
                  editor.chain().focus().setTextAlign('justify').run()
                }
                disabled={!editor.isFocused}
              />
            </WrapItem>
          </Wrap>
          <Divider />
          <Wrap>
            <WrapItem>
              <Input
                size="sm"
                w="6rem"
                type="color"
                onInput={(event: any) =>
                  editor.chain().focus().setColor(event.target.value).run()
                }
                value={editor.getAttributes('textStyle').color}
                disabled={!editor.isFocused}
              />
            </WrapItem>
            <WrapItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().unsetColor().run()}
                disabled={!editor.isFocused}
              >
                unsetColor
              </Button>
            </WrapItem>
          </Wrap>
          <Divider />
          <Wrap>
            <WrapItem>
              <Input
                size="sm"
                w="6rem"
                type="color"
                onInput={(event: any) =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: event.target.value })
                    .run()
                }
                value={editor.getAttributes('highlight').color}
                disabled={!editor.isFocused}
              />
            </WrapItem>
            <WrapItem>
              <Button
                variant="outline"
                size="sm"
                onClick={() => editor.chain().focus().unsetHighlight().run()}
                disabled={!editor.isFocused}
              >
                unsetHighlight
              </Button>
            </WrapItem>
          </Wrap>
        </>
      ) : null}
    </VStack>
  )
}
