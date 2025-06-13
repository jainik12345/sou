// import { Banner } from "../../../components/Banner/Banner"
// import { GujaratPackagesTourData } from "../GujaratPackagesData"
// import { GujaratPackagesGuideCard } from "../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard"

// export const GujaratPackagesTourGuide = () => {

//     return (

//         <>

//             <Banner Title={"Gujarat Tour 3Nights 4Days"} />

//             <div className="gujarat-packages-tour-guide-section">

//                 <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">

//                     {

//                         GujaratPackagesTourData &&  GujaratPackagesTourData.map((PackageVal,PackageIdx)=>{

//                             return(

//                                 <GujaratPackagesGuideCard Title={PackageVal.Title} Heading={PackageVal.Heading} Faq={PackageVal.Faq} Images={PackageVal.ImgUrl} TableData={PackageVal.TourTable} key={PackageIdx} Optional={PackageVal.Optional}/>

//                             )

//                         })

//                     }

//                 </div>

//             </div>

//         </>

//     )
// }

/** */

// import { Banner } from "../../../components/Banner/Banner";
// import { GujaratPackagesTourGuideData } from "../GujaratPackagesData";
// import { GujaratPackagesGuideCard } from "../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard";

// export const GujaratPackagesTourGuide = () => {
//   return (
//     <>
//       <Banner Title={"Gujarat Tour 3Nights 4Days"} />

//       <div className="gujarat-packages-tour-guide-section">
//         <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">
//           {GujaratPackagesTourGuideData &&
//             GujaratPackagesTourGuideData.map((PackageVal, PackageIdx) => {
//               return (
//                 <GujaratPackagesGuideCard
//                   Title={PackageVal.Title}
//                   Heading={PackageVal.Heading}
//                   Faq={PackageVal.Faq}
//                   Images={PackageVal.ImgUrl}
//                   TableData={PackageVal.TourTable}
//                   key={PackageIdx}
//                   Optional={PackageVal.Optional}
//                 />
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

import { useState, useEffect } from "react";
import axios from "axios";
import { Banner } from "../../../components/Banner/Banner";
import { GujaratPackagesGuideCard } from "../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard";
import BE_URL from "../../../config";

export const GujaratPackagesTourGuide = () => {
  const [packages, setPackages] = useState([]);
  const [packageData, setPackageData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BE_URL}/gujaratPackage`)
      .then((res) => {
        const pkgs = Array.isArray(res.data.data) ? res.data.data : [];
        setPackages(pkgs);

        pkgs.forEach((pkg) => {
          axios
            .get(`${BE_URL}/gujaratPackageData/by-package/${pkg.id}`)
            .then((res2) => {
              setPackageData((prev) => ({
                ...prev,
                [pkg.id]: Array.isArray(res2.data.data) ? res2.data.data : [],
              }));
            })
            .catch(() => {
              setPackageData((prev) => ({ ...prev, [pkg.id]: [] }));
            });
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Parse helpers - always return objects for TableData and Optional
  const parseImages = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  };

  const parseFaqs = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  };

  // Always parse TableData as object
  const parseTableData = (val) => {
    if (!val) return {};
    if (typeof val === "object" && !Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      return typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  };

  // Always parse Optional as object
  const parseOptional = (val) => {
    if (!val) return {};
    if (typeof val === "object" && !Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      return typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  };

  return (
    <div>
      {loading && <div className="text-center py-10 text-lg">Loading...</div>}
      {!loading && packages.length === 0 && (
        <div className="text-center py-10 text-lg">No packages found.</div>
      )}

      {packages.map((pkg) => (
        <section key={pkg.id} className="mb-10">
          <Banner Title={`Gujarat Tour ${pkg.Nights}N / ${pkg.Days}D`} />

          <div className="gujarat-packages-tour-guide-section">
            <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">
              {(packageData[pkg.id] || []).length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  No details for this package.
                </div>
              )}

              {(packageData[pkg.id] || []).map((data, idx) => (
                <GujaratPackagesGuideCard
                  key={data.id || idx}
                  Heading={data.heading || ""}
                  Images={parseImages(data.multiple_images).map(
                    (img) =>
                      `${BE_URL}/Images/GujaratPackage/GujaratPackageDataImage/${img}`
                  )}
                  Title="Gujarat Tour Package"
                  Faq={
                    Array.isArray(data.faqs)
                      ? data.faqs.flatMap((group) =>
                          (group.faqs || []).map((item) => ({
                            FaqTitle: item.question,
                            FaqFact: item.answer,
                          }))
                        )
                      : parseFaqs(data.faqs)
                  }
                  TableData={parseTableData(data.price)}
                  Optional={parseOptional(data.optional)}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default GujaratPackagesTourGuide;
