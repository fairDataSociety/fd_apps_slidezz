import { Editor } from '@tiptap/react'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnderline,
  AiOutlineUnorderedList,
} from 'react-icons/ai'
import { BiCode, BiCodeBlock } from 'react-icons/bi'
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

interface MenuBarProps {
  editor: Editor | null
}

export default function MenuBar({ editor }: MenuBarProps) {
  if (!editor) return null

  return (
    <VStack align="stretch">
      <Wrap>
        <WrapItem>
          <IconButton
            variant="outline"
            size="sm"
            aria-label="undo"
            icon={<MdUndo />}
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant="outline"
            size="sm"
            aria-label="redo"
            icon={<MdRedo />}
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
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
            disabled={!editor.can().chain().focus().toggleBold().run()}
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant={editor.isActive('italic') ? 'solid' : 'outline'}
            size="sm"
            aria-label="italic"
            icon={<AiOutlineItalic />}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant={editor.isActive('strike') ? 'solid' : 'outline'}
            size="sm"
            aria-label="strike"
            icon={<AiOutlineStrikethrough />}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant={editor.isActive('underline') ? 'solid' : 'outline'}
            size="sm"
            aria-label="underline"
            icon={<AiOutlineUnderline />}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant={editor.isActive('code') ? 'solid' : 'outline'}
            size="sm"
            aria-label="code"
            icon={<BiCode />}
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
          />
        </WrapItem>

        <WrapItem>
          <Button
            variant={editor.isActive('paragraph') ? 'solid' : 'outline'}
            size="sm"
            w={5}
            aria-label="paragraph"
            onClick={() => editor.chain().focus().setParagraph().run()}
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
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant={editor.isActive('codeBlock') ? 'solid' : 'outline'}
            size="sm"
            aria-label="codeBlock"
            icon={<BiCodeBlock />}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant={editor.isActive('blockquote') ? 'solid' : 'outline'}
            size="sm"
            aria-label="blockquote"
            icon={<TbBlockquote />}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
        </WrapItem>

        <WrapItem>
          <IconButton
            variant="outline"
            size="sm"
            aria-label="horizontal-rule"
            icon={<MdHorizontalRule />}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          />
        </WrapItem>

        <WrapItem>
          <Button
            variant="outline"
            size="sm"
            w={5}
            aria-label="br"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            BR
          </Button>
        </WrapItem>
      </Wrap>

      <Divider />

      <Wrap>
        <Button
          variant={editor.isActive({ textAlign: 'left' }) ? 'solid' : 'outline'}
          size="xs"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          left
        </Button>
        <Button
          variant={
            editor.isActive({ textAlign: 'center' }) ? 'solid' : 'outline'
          }
          size="xs"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          center
        </Button>
        <Button
          variant={
            editor.isActive({ textAlign: 'right' }) ? 'solid' : 'outline'
          }
          size="xs"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          right
        </Button>
        <Button
          variant={
            editor.isActive({ textAlign: 'justify' }) ? 'solid' : 'outline'
          }
          size="xs"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          justify
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={() => editor.chain().focus().unsetTextAlign().run()}
        >
          unsetTextAlign
        </Button>
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
          />
        </WrapItem>
        <WrapItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().unsetColor().run()}
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
          />
        </WrapItem>
        <WrapItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().unsetHighlight().run()}
          >
            unsetHighlight
          </Button>
        </WrapItem>
      </Wrap>
    </VStack>
  )
}
