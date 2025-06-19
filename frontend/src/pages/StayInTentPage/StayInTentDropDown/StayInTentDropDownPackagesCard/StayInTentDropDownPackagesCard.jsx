// import { useParams } from "react-router-dom";
// import { BookOnline } from "../../../../components/Buttons/BookOnline";
// import BE_URL from "../../../../config";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function groupByFoodPlans(data = []) {
//     return data.reduce((acc, pkg) => {
//         const plan = (pkg.food_plans ).toUpperCase();
//         if (!acc[plan]) acc[plan] = [];
//         acc[plan].push(pkg);
//         return acc;
//     }, {});
// }

// function groupByWeek(data = []) {
//     return data.reduce((acc, pkg) => {
//         const week = pkg.week ;
//         if (!acc[week]) acc[week] = [];
//         acc[week].push(pkg);
//         return acc;
//     }, {});
// }

// // Title for food plans, you can expand as needed
// const FOOD_PLAN_LABELS = {
//     CP: 'CP (Continental Plan: Includes stay & breakfast only)',
//     MAP: 'MAP (Modified American Plan: Includes stay, breakfast, and one major meal – lunch or dinner)',
//     AP: 'AP (American Plan: Includes stay and all meals – breakfast, lunch, and dinner)',
//     EP: 'EP (European Plan: Includes stay only, no meals provided)',
// };

// export const StayInTentDropDownPackagesCard = () => {
//     const { StayInTentPath } = useParams();
//     const [StayInTentDropDownPackagesCardData, setStayInTentDropDownPackagesCardData] = useState([]);

//     useEffect(() => {
//         const Fetch_of_StayInTent_Packages_Cards_data = async () => {
//             try {
//                 const FetchSouPackgesNames = await axios.get(`${BE_URL}/souPackageName`);
//                 const FindId = FetchSouPackgesNames.data.data && FetchSouPackgesNames.data.data.find((Key) => {
//                     return (
//                         StayInTentPath === Key.sou_package_name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
//                     );
//                 });

//                 if (!FindId) {
//                     setStayInTentDropDownPackagesCardData([]);
//                     return;
//                 }

//                 const Fetch_StayInTent_Pacakges_API = await axios.get(`${BE_URL}/souPackageResort/package/${FindId.id}`);
//                 if (Fetch_StayInTent_Pacakges_API.status === 200) {
//                     setStayInTentDropDownPackagesCardData(Fetch_StayInTent_Pacakges_API.data.data);
//                 } else {
//                     setStayInTentDropDownPackagesCardData([]);
//                     console.warn("Unexpected response status:", Fetch_StayInTent_Pacakges_API.status);
//                 }
//             } catch (error) {
//                 setStayInTentDropDownPackagesCardData([]);
//                 console.error(
//                     "Unable To Fetch Data Of Stay In Tent Packages Cards Section:- ",
//                     error
//                 );
//             }
//         };

//         Fetch_of_StayInTent_Packages_Cards_data();
//     }, [StayInTentPath]);

//     // Don't render anything if no data
//     if (!StayInTentDropDownPackagesCardData || StayInTentDropDownPackagesCardData.length === 0) {
//         return null;
//     }

//     // Group by food plan
//     const foodPlanGroups = groupByFoodPlans(StayInTentDropDownPackagesCardData);

//     return (
//         <section className="w-full bg-white py-8">
//             <div className="max-w-screen-xl mx-auto px-2 md:px-6 flex flex-col gap-10">
//                 {Object.entries(foodPlanGroups).map(([planKey, planPackages]) => {
//                     // Further group by week
//                     const weekGroups = groupByWeek(planPackages);
//                     return (
//                         <div key={planKey} className="mb-10">
//                             <div className="w-full text-center mb-4">
//                                 <h3 className="font-bold text-base md:text-lg text-[#e65100] mb-1">
//                                     {FOOD_PLAN_LABELS[planKey] || planKey}
//                                 </h3>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                 {Object.entries(weekGroups).map(([week, weekPkgs]) =>
//                                     weekPkgs.map((pkg, idx) => (
//                                         <div
//                                             key={pkg.id || `${planKey}-${week}-${idx}`}
//                                             className="bg-white border border-gray-200 rounded-2xl shadow-xl transition-all flex flex-col items-center overflow-hidden relative"
//                                         >
//                                             {/* Week badge */}
//                                             {week && (
//                                                 <span className="absolute left-4 top-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
//                                                     {week}
//                                                 </span>
//                                             )}
//                                             {/* Image */}
//                                             <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-50 overflow-hidden">
//                                                 <img
//                                                     src={`${BE_URL}/Images/SouPackage/SouPackageResortImages/${pkg.image}`}
//                                                     alt={pkg.type_room_name}
//                                                     className="object-cover w-full h-full"
//                                                 />
//                                             </div>
//                                             {/* Card Body */}
//                                             <div className="flex flex-col items-center gap-2 w-full px-6 py-7">
//                                                 <h4 className="font-bold text-lg text-gray-900 text-center mb-1">
//                                                     {pkg.type_room_name}
//                                                 </h4>
//                                                 <div className="flex flex-col items-center gap-1 my-1">
//                                                     <span className="bg-orange-100 text-orange-600 font-bold rounded px-3 py-1 text-base">
//                                                         Per Couple: ₹{pkg.per_couple}/-
//                                                     </span>
//                                                 </div>
//                                                 <div className="mt-4 w-full flex justify-center">
//                                                     <BookOnline />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </section>
//     );
// };

import { useParams } from "react-router-dom";
import { BookOnline } from "../../../../components/Buttons/BookOnline";
import BE_URL from "../../../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function groupByFoodPlans(data = []) {
  return data.reduce((acc, pkg) => {
    const plan = pkg.food_plans.toUpperCase();
    if (!acc[plan]) acc[plan] = [];
    acc[plan].push(pkg);
    return acc;
  }, {});
}

function groupByWeek(data = []) {
  return data.reduce((acc, pkg) => {
    const week = pkg.week;
    if (!acc[week]) acc[week] = [];
    acc[week].push(pkg);
    return acc;
  }, {});
}

const FOOD_PLAN_LABELS = {
  CP: "CP (Continental Plan: Includes stay & breakfast only)",
  MAP: "MAP (Modified American Plan: Includes stay, breakfast, and one major meal – lunch or dinner)",
  AP: "AP (American Plan: Includes stay and all meals – breakfast, lunch, and dinner)",
  EP: "EP (European Plan: Includes stay only, no meals provided)",
};

export const StayInTentDropDownPackagesCard = () => {
  const { StayInTentPath } = useParams();
  const [
    StayInTentDropDownPackagesCardData,
    setStayInTentDropDownPackagesCardData,
  ] = useState([]);

  useEffect(() => {
    const Fetch_of_StayInTent_Packages_Cards_data = async () => {
      try {
        const FetchSouPackgesNames = await axios.get(
          `${BE_URL}/souPackageName`
        );
        const FindId =
          FetchSouPackgesNames.data.data &&
          FetchSouPackgesNames.data.data.find((Key) => {
            return (
              StayInTentPath ===
              Key.sou_package_name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
            );
          });

        if (!FindId) {
          setStayInTentDropDownPackagesCardData([]);
          return;
        }

        const Fetch_StayInTent_Pacakges_API = await axios.get(
          `${BE_URL}/souPackageResort/package/${FindId.id}`
        );
        if (Fetch_StayInTent_Pacakges_API.status === 200) {
          setStayInTentDropDownPackagesCardData(
            Fetch_StayInTent_Pacakges_API.data.data
          );
        } else {
          setStayInTentDropDownPackagesCardData([]);
          console.warn(
            "Unexpected response status:",
            Fetch_StayInTent_Pacakges_API.status
          );
        }
      } catch (error) {
        setStayInTentDropDownPackagesCardData([]);
        console.error(
          "Unable To Fetch Data Of Stay In Tent Packages Cards Section:- ",
          error
        );
      }
    };

    Fetch_of_StayInTent_Packages_Cards_data();
  }, [StayInTentPath]);

  if (
    !StayInTentDropDownPackagesCardData ||
    StayInTentDropDownPackagesCardData.length === 0
  ) {
    return null;
  }

  const foodPlanGroups = groupByFoodPlans(StayInTentDropDownPackagesCardData);

  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-screen-xl mx-auto px-2 md:px-6 flex flex-col gap-10">
        {Object.entries(foodPlanGroups).map(([planKey, planPackages]) => {
          const weekGroups = groupByWeek(planPackages);
          return (
            <div key={planKey} className="mb-10">
              <div className="w-full text-center mb-4">
                <h3 className="font-bold text-base md:text-lg text-[#e65100] mb-1">
                  {FOOD_PLAN_LABELS[planKey] || planKey}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(weekGroups).map(([week, weekPkgs]) =>
                  weekPkgs.map((pkg, idx) => (
                    <div
                      key={pkg.id || `${planKey}-${week}-${idx}`}
                      className="bg-white border border-gray-200 rounded-2xl shadow-xl transition-all flex flex-col items-center overflow-hidden relative max-w-[400px] mx-auto"
                    >
                      {week && (
                        <span className="absolute left-4 top-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                          {week}
                        </span>
                      )}
                      <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-50 overflow-hidden">
                        <LazyLoadImage
                          src={`${BE_URL}/Images/SouPackage/SouPackageResortImages/${pkg.image}`}
                          alt={pkg.type_room_name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-2 w-full px-4 py-4">
                        <h4 className="font-bold text-lg text-gray-900 text-center mb-1">
                          {pkg.type_room_name}
                        </h4>
                        <div className="flex flex-col items-center gap-1 my-1">
                          <span className="bg-orange-100 text-orange-600 font-bold rounded px-3 py-1 text-base">
                            Per Couple: ₹{pkg.per_couple}/-
                          </span>
                        </div>
                        <div className="mt-4 w-full flex justify-center">
                          <BookOnline />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
