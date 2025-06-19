// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import BE_URL from "../../../../config";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// export const StayInTentDropDownIcons = () => {
//   const { StayInTentPath } = useParams();
//   const [amenities, setAmenities] = useState([]);
//   const [packageName, setPackageName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [notFound, setNotFound] = useState(false);

//   // Format the route param for matching
//   const formattedPath = StayInTentPath.toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");

//   useEffect(() => {
//     setLoading(true);
//     setNotFound(false);

//     // 1. Fetch all sou_package_name
//     axios
//       .get(`${BE_URL}/souPackageName`)
//       .then((res) => {
//         const allPackages = res.data.data || [];

//         // 2. Find package whose name matches formattedPath
//         const found = allPackages.find(
//           (pkg) =>
//             pkg.sou_package_name
//               .toLowerCase()
//               .replace(/\s+/g, "-")
//               .replace(/[^a-z0-9-]/g, "") === formattedPath
//         );

//         if (!found) {
//           setNotFound(true);
//           setLoading(false);
//           return null;
//         }

//         setPackageName(found.sou_package_name);

//         // 3. Fetch amenities for that package
//         return axios.get(`${BE_URL}/souPackageAmenities/package/${found.id}`);
//       })
//       .then((amenitiesRes) => {
//         if (amenitiesRes?.data?.data?.length) {
//           setAmenities(amenitiesRes.data.data);
//         }
//         setLoading(false);
//       })
//       .catch(() => {
//         setNotFound(true);
//         setLoading(false);
//       });
//   }, [formattedPath]);

//   // Display loading state
//   if (loading) {
//     return (
//       <div className="facilities-section bg-gray-100 py-20 text-center">
//         <span className="text-lg">Loading...</span>
//       </div>
//     );
//   }

//   // Display error or not found state
//   if (notFound || !packageName || amenities.length === 0) {
//     return null; // Or return a message instead if preferred
//   }

//   // Render the section only if amenities exist
//   return (
//     <div className="facilities-section bg-gray-100">
//       <div className="container max-w-screen-xl mx-auto py-20 px-10 flex flex-col gap-10">
//         <div className="header flex flex-col gap-5">
//           <h1 className="text-[2rem] text-orange-color font-bold text-center">
//             Facilities for {packageName}
//           </h1>
//         </div>
//         <div className="icons-container">
//           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-5">
//             {amenities?.map((amenity) => (
//               <div
//                 key={amenity.id}
//                 className="flex flex-col items-center justify-center gap-5"
//               >
//                 <LazyLoadImage
//                   src={`${BE_URL}/Images/SouPackage/SouPackageAmenities/${amenity.image}`}
//                   alt={amenity.title}
//                   className="icon-item bg-white shadow-md rounded-lg object-contain w-32 h-32 p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center"
//                 />
//                 <p className="text-[1.2rem] font-semibold text-gray-600 text-center">
//                   {amenity.title}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const StayInTentDropDownIcons = () => {
  const { StayInTentPath } = useParams();
  const [amenities, setAmenities] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(true);

  // Format the route param for matching
  const formattedPath = StayInTentPath
    ? StayInTentPath.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    : "";

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setAmenities([]);
      setPackageName("");

      try {
        // 1. Fetch all SOU packages
        const res = await axios.get(`${BE_URL}/souPackageName`);
        const allPackages = Array.isArray(res.data?.data) ? res.data.data : [];

        // 2. Find package whose kebab-case matches the route
        const found = allPackages.find(
          (pkg) =>
            pkg.sou_package_name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") === formattedPath
        );

        if (!found) {
          if (!cancelled) setLoading(false);
          return;
        }

        if (!cancelled) setPackageName(found.sou_package_name);

        // 3. Fetch amenities for that package id
        const amenitiesRes = await axios.get(
          `${BE_URL}/souPackageAmenities/package/${found.id}`
        );
        const data = Array.isArray(amenitiesRes.data?.data)
          ? amenitiesRes.data.data
          : [];

        if (!cancelled) {
          setAmenities(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("err", err);
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [formattedPath]);

  // Loading state
  if (loading) return null;

  if (!packageName || !amenities.length) return null;

  return (
    <div className="facilities-section bg-gray-100">
      <div className="container max-w-screen-xl mx-auto py-20 px-4 md:px-10 flex flex-col gap-10">
        <div className="header flex flex-col gap-5">
          <h1 className="text-[2rem] text-orange-color font-bold text-center">
            Facilities for {packageName}
          </h1>
        </div>
        <div className="icons-container">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex flex-col items-center justify-center gap-5"
              >
                <LazyLoadImage
                  src={`${BE_URL}/Images/SouPackage/SouPackageAmenities/${amenity.image}`}
                  alt={amenity.title}
                  effect="blur"
                  className="icon-item bg-white shadow-md rounded-lg object-contain w-32 h-32 p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center"
                />
                <p className="text-[1.2rem] font-semibold text-gray-600 text-center">
                  {amenity.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
