import AddImage from '../SlideSidebar/AddImage/AddImage'
import { BsImageAlt } from 'react-icons/bs'
import SideBarItem from './SidebarItem'
import { useAtom } from 'jotai'
import { slidesLogoAtom } from '../../../store'
import blobToBase64 from '../../../utils/blobToBase64'

export default function AddLogoImage() {
  const setSlidesLogo = useAtom(slidesLogoAtom)[1]

  return (
    <AddImage
      handleAddImage={async (image) =>
        setSlidesLogo({
          data: await blobToBase64(image.data),
        })
      }
    >
      <SideBarItem icon={BsImageAlt} label="Logo/Copyright image" />
    </AddImage>
  )
}
