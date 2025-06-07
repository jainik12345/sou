import { GalleryImagesCards } from "./GalleryImagesCards/GalleryImagesCards";
import { Banner } from "../../../components/Banner/Banner";
import { useParams } from "react-router-dom";


export const GalleryDropDown = () => {

  const { GalleryPath } = useParams();

  if (!GalleryPath) {
    return <h1 className="text-2xl text-red-600">Invalid Gujarat Package</h1>;
  }

  return (
    <>

      <Banner Title={"Gallery"} />
      <GalleryImagesCards />

    </>
  )
}