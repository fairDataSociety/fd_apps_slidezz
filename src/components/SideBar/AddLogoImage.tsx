import AddImage from "../SlideSideBar/AddImage/AddImage";
import { BsImageAlt } from "react-icons/bs";
import SideBarItem from "./SideBarItem";
import { useAtom } from "jotai";
import { slidesLogoAtom } from "../../store";

export default function AddLogoImage() {
  const [_, setSlidesLogo] = useAtom(slidesLogoAtom);

  return (
    <AddImage handleAddImage={(image) => setSlidesLogo(image.data)}>
      <SideBarItem icon={BsImageAlt} label="Logo/Copyright image" />
    </AddImage>
  );
}
