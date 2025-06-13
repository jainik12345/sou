// import { FaTent } from "react-icons/fa6";
// import { BiDish } from "react-icons/bi";
// import { FaCar } from "react-icons/fa";
// import { IoRestaurantOutline } from "react-icons/io5";
// import { GrGroup } from "react-icons/gr";
// import { FaWifi } from "react-icons/fa6";
// import { FaSwimmingPool } from "react-icons/fa";
// import { TbTreadmill } from "react-icons/tb";
// import { GiTheater } from "react-icons/gi";
// import { useParams } from "react-router-dom";
// import { StayInTentDropDownData } from "../../StayInTent";

// export const StayInTentDropDownIcons = () => {
//   const { StayInTentPath } = useParams();

//   const FormattedPath = StayInTentPath.toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");

//   const FormattedData =
//     StayInTentDropDownData[FormattedPath].FacilitiesIcons || [];

//   return (
//     <>
//       <div className="facilities-section bg-gray-100">
//         {FormattedData?.FacilitiesHeader || FormattedData?.FacilitiesPara ? (
//           <div className="container max-w-screen-xl mx-auto py-20 px-10 flex flex-col gap-10 ">
//             <div className="header flex flex-col gap-5">
//               <h1 className="text-[2rem] text-orange-color font-(family-name:--font-layer-font) text-center ">
//                 {FormattedData?.FacilitiesHeader}
//               </h1>
//               <p className="text-center text-gray-700 font-medium text-[1.1rem]">
//                 {FormattedData?.FacilitiesPara}
//               </p>
//             </div>

//             <div className="icons-container">
//               {" "}
//               {/*SoU Tent City 1 */}
//               <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-5">
//                 {FormattedPath === "sou-tent-city-1" ? (
//                   <>
//                     <div className="flex flex-col items-center justify-center gap-5">
//                       <FaCar className="icon-item bg-white shadow-md  rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
//                       <p className="text-[1.2rem] font-semibold text-gray-600">
//                         Free Parking
//                       </p>
//                     </div>
//                   </>
//                 ) : FormattedPath === "unity-village-resort" ? (
//                   <>
//                     <div className="flex flex-col items-center justify-center gap-5">
//                       <FaSwimmingPool className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
//                       <p className="text-[1.2rem] font-semibold text-gray-600">
//                         Swimming Pool
//                       </p>
//                     </div>
//                   </>
//                 ) : FormattedPath === "nirvana-resort-restaurant" ? (
//                   <>
//                     <div className="flex flex-col items-center justify-center gap-5">
//                       <FaCar className="icon-item bg-white shadow-md  rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
//                       <p className="text-[1.2rem] font-semibold text-gray-600">
//                         Free Parking
//                       </p>
//                     </div>
//                   </>
//                 ) : null}
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     </>
//   );
// };

/** */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";

export const StayInTentDropDownIcons = () => {
  const { StayInTentPath } = useParams();
  const [amenities, setAmenities] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Format the route param for matching
  const formattedPath = StayInTentPath.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    // 1. Fetch all sou_package_name
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        const allPackages = res.data.data || [];
        // 2. Find package whose name matches formattedPath
        const found = allPackages.find(
          (pkg) =>
            pkg.sou_package_name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") === formattedPath
        );
        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        setPackageName(found.sou_package_name);

        // 3. Fetch amenities for that package
        return axios.get(`${BE_URL}/souPackageAmenities/package/${found.id}`);
      })
      .then((amenitiesRes) => {
        if (amenitiesRes && amenitiesRes.data && amenitiesRes.data.data) {
          setAmenities(amenitiesRes.data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [formattedPath]);

  if (loading) {
    return (
      <div className="facilities-section bg-gray-100 py-20 text-center">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }
  if (notFound || !packageName) {
    return (
      <div className="facilities-section bg-gray-100 py-20 text-center">
        <span className="text-lg text-red-600">
          No amenities found for this package.
        </span>
      </div>
    );
  }

  return (
    <div className="facilities-section bg-gray-100">
      <div className="container max-w-screen-xl mx-auto py-20 px-10 flex flex-col gap-10">
        <div className="header flex flex-col gap-5">
          <h1 className="text-[2rem] text-orange-color font-bold text-center">
            Facilities for {packageName}
          </h1>
        </div>
        <div className="icons-container">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-5">
            {amenities.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No amenities found for this package.
              </p>
            )}
            {amenities.map((amenity) => (
              <div
                key={amenity.id}
                className="flex flex-col items-center justify-center gap-5"
              >
                <img
                  src={`${BE_URL}/Images/SouPackage/SouPackageAmenities/${amenity.image}`}
                  alt={amenity.title}
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
