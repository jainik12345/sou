// import { GalleryImagesCards } from "./GalleryImagesCards/GalleryImagesCards";
// import { Banner } from "../../../components/Banner/Banner";
// import { useParams } from "react-router-dom";

// export const GalleryDropDown = () => {
//   const { GalleryPath } = useParams();

//   if (!GalleryPath) {
//     return <h1 className="text-2xl text-red-600">Invalid Gujarat Package</h1>;
//   }

//   return (
//     <>
//       <Banner Title={"Gallery"} />
//       <GalleryImagesCards />
//     </>
//   );
// };

/* */

import { GalleryImagesCards } from "./GalleryImagesCards/GalleryImagesCards";
import { Banner } from "../../../components/Banner/Banner";
import { useParams } from "react-router-dom";

export const GalleryDropDown = () => {
  const { GalleryPath } = useParams();

  if (!GalleryPath) {
    return <h1 className="text-2xl text-red-600">Invalid Gujarat Package</h1>;
  }

  // Convert slug to human-readable title, e.g., "tent-city-1" -> "Tent City 1"
  const formatSlugToTitle = (slug) => {
    if (!slug) return "";
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const bannerTitle = formatSlugToTitle(GalleryPath);

  return (
    <>
      <Banner Title={bannerTitle} />
      <GalleryImagesCards />
    </>
  );
};
