// import { GujaratPackagesCardData } from "../GujaratPackagesData";
// import { GujaratPackagesCard } from "../../../components/GujaratPackagesCard/GujaratPackagesCard";

// export const GujaratPackagesCards = () => {
//   return (
//     <>
//       <div className="cards-section">
//         <div className="cards-cont max-w-screen-xl mx-auto p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
//           {GujaratPackagesCardData &&
//             GujaratPackagesCardData.map((CardVal, CardIdx) => {
//               return (
//                 <GujaratPackagesCard
//                   CardImg={CardVal.CardImg}
//                   CardTitle={CardVal.CardTitle}
//                   CardPara={CardVal.CardPara}
//                   key={CardIdx}
//                 />
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default GujaratPackagesCards;

/** */

import React, { useEffect, useState } from "react";
import axios from "axios";
import GujaratPackagesCard from "../../../components/GujaratPackagesCard/GujaratPackagesCard";
import BE_URL from "../../../config";

export const GujaratPackagesCards = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get(`${BE_URL}/gujaratPackage`)
      .then((res) => {
        setPackages(res.data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch Gujarat packages:", err);
      });
  }, []);

  const getImageUrl = (imageArrString) => {
    try {
      const arr = JSON.parse(imageArrString || "[]");
      if (arr.length > 0) {
        return `${BE_URL}/Images/GujaratPackage/GujaratPackageImage/${arr[0]}`;
      }
    } catch (e) {
      console.error("errror is ", e);
    }
  };

  return (
    <div className="cards-section">
      <div className="cards-cont max-w-[1400px] mx-auto p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {packages.map((pkg, idx) => (
          <GujaratPackagesCard
            key={pkg.id || idx}
            CardImg={getImageUrl(pkg.image)}
            TourTitle={`Gujarat Tour ${pkg.Nights}N / ${pkg.Days}D`}
            PlacesName={pkg.places_name}
          />
        ))}
      </div>
    </div>
  );
};

export default GujaratPackagesCards;
