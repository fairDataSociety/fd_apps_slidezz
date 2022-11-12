import fscreen from 'fscreen'
import { useAtom } from 'jotai'
import { FaPlay } from 'react-icons/fa'

import { Box, useColorModeValue } from '@chakra-ui/react'

import { slidesAtom, slidesDeckAtom } from '../../../store'
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

  return (
    <Box
      bg={useColorModeValue('latte-crust', 'frappe-crust')}
      fontSize={{ base: 'xl', md: '2xl' }}
      w="5rem"
      h="90%"
      my="auto"
      overflow="hidden"
    >
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
