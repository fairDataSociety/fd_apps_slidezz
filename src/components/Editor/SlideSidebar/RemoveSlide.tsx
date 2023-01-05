import { useAtomValue } from 'jotai'
import { AiFillDelete } from 'react-icons/ai'

import { removeCurrentSlide } from '../../../actions/removeCurrentSlide'
import { slidesDeckAtom } from '../../../store'
import SlideSideBarItem from './SlideSidebarItem'

export default function RemoveSlide() {
  const deck = useAtomValue(slidesDeckAtom)

  return (
    <SlideSideBarItem
      icon={AiFillDelete}
      label="Remove slide"
      onClick={() => {
        if (!deck) return
        removeCurrentSlide(deck)
      }}
    />
  )
}
