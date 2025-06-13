// import { useParams } from "react-router-dom";
// import { GujaratPackagesTourData } from "../../GujaratPackagesData";
// import { GujaratPackagesGuideCard } from "../../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard";

// export const GujaratPackagesDropDownCards = () => {
//   const { GujaratPath } = useParams();
//   const tourData = GujaratPackagesTourData[GujaratPath];

//   if (!tourData) {
//     return (
//       <div className="text-center text-red-500 text-xl p-10">
//         No package data found for this route.
//       </div>
//     );
//   }

//   const { TourGuide } = tourData;

//   return (
//     <>
//       {/* Tour Guide Card Section */}
//       {TourGuide && (
//         <div className="gujarat-packages-tour-guide-section">
//           <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">
//             <GujaratPackagesGuideCard
//               Title={TourGuide.Title}
//               Heading={TourGuide.Heading}
//               Faq={TourGuide.Faq}
//               Images={TourGuide.ImgUrl}
//               TableData={TourGuide.TourTable}
//               Optional={TourGuide.Optional}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

/** */

// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import BE_URL from "../../../../config";
// import { GujaratPackagesGuideCard } from "../../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard";

// export const GujaratPackagesDropDownCards = () => {
//   const { GujaratPath } = useParams();
//   const [packageData, setPackageData] = useState(null);
//   const [packageDataList, setPackageDataList] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!GujaratPath) return;

//       // Extract Nights and Days from slug
//       const match = GujaratPath.match(/(\d+)n-(\d+)d/i);
//       if (!match) return;

//       const [_, nightsStr, daysStr] = match;
//       const Nights = parseInt(nightsStr, 10);
//       const Days = parseInt(daysStr, 10);

//       try {
//         // Step 1: Get list of packages
//         const resPkg = await axios.get(`${BE_URL}/gujaratPackage`);
//         const allPackages = resPkg.data?.data || [];

//         // Step 2: Find matching package by Nights and Days
//         const matched = allPackages.find(
//           (pkg) => pkg.Nights === Nights && pkg.Days === Days
//         );

//         if (!matched) {
//           setPackageData(null);
//           return;
//         }

//         // Step 3: Get details using gujarat_package_id
//         const resData = await axios.get(
//           `${BE_URL}/gujaratPackageData/by-package/${matched.id}`
//         );
//         const allData = resData.data?.data || [];

//         const data = resData.data?.data?.[0];
//         if (!data) {
//           setPackageData(null);
//           return;
//         }
//         if (!allData.length) {
//           setPackageDataList([]);
//           return;
//         }

//         setPackageDataList(
//           allData.map((data) => ({
//             Title: `Gujarat Tour ${Nights} Nights ${Days} Days`,
//             Heading: data.heading,
//             Faq: data.faqs?.[0]?.faqs || [],
//             ImgUrl: data.multiple_images || [],
//             TourTable: data.price || {},
//             Optional: [],
//           }))
//         );
//       } catch (err) {
//         console.error("Error fetching package data", err);
//         setPackageData(null);
//       }
//     };

//     fetchData();
//   }, [GujaratPath]);

//   if (!packageDataList.length) {
//     return (
//       <div className="text-center text-black text-xl p-10">
//         Data is not available for this package.
//       </div>
//     );
//   }

//   return (
//     <div className="gujarat-packages-tour-guide-section">
//       <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">
//         {packageDataList.map((pkg, idx) => (
//           <div key={idx} className="mb-10">
//             <GujaratPackagesGuideCard
//               Title={pkg.Title}
//               Heading={pkg.Heading}
//               Faq={pkg.Faq}
//               Images={pkg.ImgUrl}
//               TableData={pkg.TourTable}
//               Optional={pkg.Optional}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

/** */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../../../config";
import { GujaratPackagesGuideCard } from "../../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard";

export const GujaratPackagesDropDownCards = () => {
  const { GujaratPath } = useParams();
  const [packageDataList, setPackageDataList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!GujaratPath) return;

      const match = GujaratPath.match(/(\d+)n-(\d+)d/i);
      if (!match) return;

      const [_, nightsStr, daysStr] = match;
      const Nights = parseInt(nightsStr, 10);
      const Days = parseInt(daysStr, 10);

      try {
        const resPkg = await axios.get(`${BE_URL}/gujaratPackage`);
        const allPackages = resPkg.data?.data || [];

        const matched = allPackages.find(
          (pkg) => pkg.Nights === Nights && pkg.Days === Days
        );

        if (!matched) {
          setPackageDataList([]);
          return;
        }

        const resData = await axios.get(
          `${BE_URL}/gujaratPackageData/by-package/${matched.id}`
        );
        const allData = resData.data?.data || [];

        const formattedList = allData.map((item) => ({
          Title: `Gujarat Tour ${Nights} Nights ${Days} Days`,
          Heading: item.heading || "",
          Faq:
            item.faqs?.flatMap((faqBlock) =>
              faqBlock.faqs.map((faq) => ({
                FaqTitle: faq.question,
                FaqFact: faq.answer,
              }))
            ) || [],
          ImgUrl: item.multiple_images || [],
          TourTable: item.price || {},
          Optional: [],
        }));

        setPackageDataList(formattedList);
      } catch (err) {
        console.error("Error fetching package data", err);
        setPackageDataList([]);
      }
    };

    fetchData();
  }, [GujaratPath]);

  if (!packageDataList.length) {
    return (
      <div className="text-center text-black text-xl p-10">
        Data is not available for this package.
      </div>
    );
  }

  return (
    <div className="gujarat-packages-tour-guide-section">
      <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">
        {packageDataList.map((pkg, idx) => (
          <div key={idx} className="mb-10">
            <GujaratPackagesGuideCard
              Title={pkg.Title}
              Heading={pkg.Heading}
              Faq={pkg.Faq}
              Images={pkg.ImgUrl}
              TableData={pkg.TourTable}
              Optional={pkg.Optional}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
