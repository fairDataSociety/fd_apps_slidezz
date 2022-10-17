import AddImage from '../SlideSidebar/AddImage/AddImage'
import { BsImageAlt } from 'react-icons/bs'
import SideBarItem from './SidebarItem'
import { useAtom } from 'jotai'
import { slidesLogoAtom } from '../../../store'

export default function AddLogoImage() {
  const [_, setSlidesLogo] = useAtom(slidesLogoAtom)

  return (
    <AddImage
      handleAddImage={(image) =>
        setSlidesLogo({
          data: image.data,
          podName: image.podName,
          fullPath: image.fullPath,
        })
      }
    >
      <SideBarItem icon={BsImageAlt} label="Logo/Copyright image" />
    </AddImage>
  )
}
