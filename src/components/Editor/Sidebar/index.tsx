import { useColors } from 'catppuccin-chakra-ui-theme'
import fscreen from 'fscreen'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { FaPlay } from 'react-icons/fa'
import { MdRedo, MdUndo } from 'react-icons/md'

import { Box, Divider, IconButton, VStack } from '@chakra-ui/react'

import {
  redoHistoryAtom,
  redoHistoryStackLenAtom,
  slidesAtom,
  slidesDeckAtom,
  undoHistoryAtom,
  undoHistoryStackLenAtom,
} from '../../../store'
import BackButton from '../../Buttons/BackButton'
import ThemeToggleButton from '../../Buttons/ThemeToggleButton'
import DownloadSlides from './DownloadSlides'
import LogoImage from './LogoImage'
import SaveSlides from './SaveSlides'
import PresentationSettings from './Settings/SlideshowSettings'
import StyleSettings from './Settings/StyleSettings'
import ShareSlides from './ShareSlides'
import SideBarItem from './SidebarItem'

interface SidebarProps {
  isSlidesReadOnly?: boolean
}

export default function Sidebar({ isSlidesReadOnly }: SidebarProps) {
  const deck = useAtomValue(slidesDeckAtom)
  const slides = useAtomValue(slidesAtom)
  const { surface0 } = useColors()
  const undoHisoryStackLen = useAtomValue(undoHistoryStackLenAtom)
  const redoHisoryStackLen = useAtomValue(redoHistoryStackLenAtom)
  const undoHistory = useUpdateAtom(undoHistoryAtom)
  const redoHistory = useUpdateAtom(redoHistoryAtom)

  return (
    <Box bg={surface0} fontSize="2xl" w="5rem" h="full" my="auto">
      <VStack my={2}>
        <BackButton />
        <ThemeToggleButton />

        <IconButton
          aria-label="undo"
          icon={<MdUndo />}
          isDisabled={!undoHisoryStackLen}
          onClick={() => undoHistory()}
        />
        <IconButton
          aria-label="redo"
          icon={<MdRedo />}
          isDisabled={!redoHisoryStackLen}
          onClick={() => redoHistory()}
        />
      </VStack>

      <Divider />

      <SideBarItem
        icon={FaPlay}
        label="Present"
        onClick={() => {
          if (!deck) return
          fscreen.requestFullscreen(deck.getRevealElement())
        }}
      />

      <PresentationSettings />
      <StyleSettings />

      {!isSlidesReadOnly && (
        <>
          <LogoImage />
          <SaveSlides />
          <ShareSlides />
        </>
      )}

      {!isSlidesReadOnly || slides?.sharingInfo?.allowDownloading ? (
        <DownloadSlides />
      ) : null}
    </Box>
  )
}
