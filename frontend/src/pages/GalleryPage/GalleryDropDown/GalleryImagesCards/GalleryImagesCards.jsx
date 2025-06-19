// import { GalleryImgData } from "../../Gallery.js";
// import { useParams } from "react-router-dom";
// import { GalleryCards } from "../../../../components/GalleryCards/GalleryCards.jsx";
// import BE_URL from "../../../../config.js";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export const GalleryImagesCards = () => {

//     //useStates Definations
//     const [GalleryImgs, setGalleryImgs] = useState([]);
//     const [FetchError, setFetchError] = useState(null);

//     //routing path defineded
//     const { GalleryPath } = useParams();

//     // Convert GalleryPath to match the key format in GalleryImgData
//     const formattedGalleryPath = GalleryPath?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
//     const GalleryData = GalleryImgData[formattedGalleryPath];

//     // Error handling: If GalleryData is undefined
//     // if (!GalleryData) {
//     //     return (
//     //         <div className="text-center py-10">
//     //             <h2 className="text-red-500 text-2xl font-semibold">
//     //                 Gallery not found. Please check the URL.
//     //             </h2>
//     //         </div>
//     //     );
//     // }

//     //Fetching API Here

//     useEffect(() => {

//         const FetchingGalleryDropdown = async () => {

//             try {

//                 //fetching packages names of sou

//                 const FetchSouPackagesNames = await axios.get(`${BE_URL}/souPackageName`);

//                 const FindId = FetchSouPackagesNames.data.data && FetchSouPackagesNames.data.data.find((key) => key.sou_package_name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") === GalleryPath);

//                 const FetchGalleryImg = await axios.get(`${BE_URL}/souPackageGallery/package/${FindId.id}`);

//                 if (FetchGalleryImg.status === 200) {

//                     setGalleryImgs(FetchGalleryImg.data.data);

//                     setFetchError(null);

//                 } else {

//                     setFetchError("Failed To Load Gallery Data.");
//                     console.warn("Unexpected response status:", FetchGalleryImg.status);

//                 }

//             } catch (error) {

//                 console.error("Unable To Fetch Data Of Gallery Data :- ", error);
//             }

//         };

//         FetchingGalleryDropdown();

//     }, [GalleryPath]);

//     return (
//         <>
//             <div className="gallery-img-section">
//                 <div className="gallery-img-cont max-w-screen-xl mx-auto p-5 flex flex-col gap-5">
//                     <div className="heading flex flex-col items-center justify-center">
//                         <h2 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold font-(family-name:--font-title-font)">
//                             Tallest statue in the world
//                         </h2>
//                         <h2 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold">
//                             {formattedGalleryPath}
//                         </h2>
//                     </div>

//                     <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-5">
//                         <GalleryCards GalleryImgs={GalleryImgs} />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

/* */

import { GalleryImgData } from "../../Gallery.js";
import { useParams } from "react-router-dom";
import { GalleryCards } from "../../../../components/GalleryCards/GalleryCards.jsx";
import BE_URL from "../../../../config.js";
import axios from "axios";
import { useEffect, useState } from "react";


// Helper: kebab-case to camelCase
const kebabToCamel = (str) =>
  str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

// Helper: kebab-case to human readable ("-" to " ", capitalize)
const kebabToSentence = (str) =>
  str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const GalleryImagesCards = () => {
  // useStates definitions
  const [GalleryImgs, setGalleryImgs] = useState([]);
  const [FetchError, setFetchError] = useState(null);

  // routing path defined
  const { GalleryPath } = useParams();

  // Convert GalleryPath to match the key format in GalleryImgData
  // (If keys are camelCase)
  const formattedGalleryPath = GalleryPath?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const camelCaseGalleryPath = kebabToCamel(formattedGalleryPath);
  const humanReadableGalleryPath = kebabToSentence(formattedGalleryPath);
  const GalleryData = GalleryImgData[camelCaseGalleryPath];

  useEffect(() => {
    const FetchingGalleryDropdown = async () => {
      try {
        // Fetching packages names of sou
        const FetchSouPackagesNames = await axios.get(
          `${BE_URL}/souPackageName`
        );

        const FindId =
          FetchSouPackagesNames.data.data &&
          FetchSouPackagesNames.data.data.find(
            (key) =>
              key.sou_package_name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "") === formattedGalleryPath
          );

        if (!FindId) {
          setFetchError("Gallery not found. Please check the URL.");
          setGalleryImgs([]);
          return;
        }

        const FetchGalleryImg = await axios.get(
          `${BE_URL}/souPackageGallery/package/${FindId.id}`
        );

        if (FetchGalleryImg.status === 200) {
          setGalleryImgs(FetchGalleryImg.data.data);
          setFetchError(null);
        } else {
          setFetchError("Failed To Load Gallery Data.");
          setGalleryImgs([]);
          console.warn("Unexpected response status:", FetchGalleryImg.status);
        }
      } catch (error) {
        setFetchError("Unable to fetch gallery data.");
        setGalleryImgs([]);
        console.error("Unable To Fetch Data Of Gallery Data :- ", error);
      }
    };

    FetchingGalleryDropdown();
  }, [GalleryPath]);

  return (
    <>
      <div className="gallery-img-section">
        <div className="gallery-img-cont max-w-screen-xl mx-auto p-5 flex flex-col gap-5">
          <div className="heading flex flex-col items-center justify-center">
            <h2 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold font-(family-name:--font-title-font)">
              Tallest statue in the world
            </h2>
            <h2 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold">
              {humanReadableGalleryPath}
            </h2>
          </div>

          {FetchError ? (
            <div className="text-center py-10">
              <h2 className="text-red-500 text-2xl font-semibold">
                {FetchError}
              </h2>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-5">
              <GalleryCards GalleryImgs={GalleryImgs} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
