import fscreen from 'fscreen'
import { useAtom } from 'jotai'
import { FaPlay } from 'react-icons/fa'

import { Box, Divider, VStack } from '@chakra-ui/react'

import useColors from '../../../hooks/useColors'
import { slidesAtom, slidesDeckAtom } from '../../../store'
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
  const [deck] = useAtom(slidesDeckAtom)
  const [slides] = useAtom(slidesAtom)
  const { surface0 } = useColors()

  return (
    <Box bg={surface0} fontSize="2xl" w="5rem" h="full" my="auto">
      <VStack my={2}>
        <BackButton />
        <ThemeToggleButton />
      </VStack>

      <Divider />

      <SideBarItem
        icon={FaPlay}
        label="Present"
        onClick={() => {
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
