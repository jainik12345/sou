// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import BE_URL from "../../../../config";

// export const StayInTentDropDownMealPlan = () => {
//   const { StayInTentPath } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [mealData, setMealData] = useState({});
//   const [notFound, setNotFound] = useState(false);

//   // Format path for matching
//   const formattedPath = (StayInTentPath || "")
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");

//   useEffect(() => {
//     setLoading(true);
//     setNotFound(false);
//     setMealData({});

//     // 1. Fetch all package names
//     axios
//       .get(`${BE_URL}/souPackageName`)
//       .then((res) => {
//         const allPackages = res.data.data || [];
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
//           return;
//         }
//         // 2. Fetch all meal plans for that package
//         return axios.get(`${BE_URL}/souPackageMealPlan/package/${found.id}`);
//       })
//       .then((mealRes) => {
//         if (!mealRes || !mealRes.data || !Array.isArray(mealRes.data.data)) {
//           setLoading(false);
//           return;
//         }
//         const plans = mealRes.data.data;

//         // Group by week, then by food_plans
//         const grouped = {};
//         plans.forEach((plan) => {
//           const week = plan.week || "";
//           const foodPlan = plan.food_plans || "Other";
//           if (!grouped[week]) grouped[week] = {};
//           if (!grouped[week][foodPlan]) grouped[week][foodPlan] = [];
//           let parsedData = [];
//           try {
//             parsedData = Array.isArray(plan.data)
//               ? plan.data
//               : JSON.parse(plan.data);
//           } catch {
//             parsedData = [];
//           }
//           grouped[week][foodPlan].push({
//             ...plan,
//             data: parsedData,
//           });
//         });
//         setMealData(grouped);
//         setLoading(false);
//       })
//       .catch(() => {
//         setNotFound(true);
//         setLoading(false);
//       });
//   }, [formattedPath]);

//   if (loading)
//     return (
//       <section className="w-full px-4 py-12 bg-gray-50 text-center">
//         <span className="text-lg">Loading...</span>
//       </section>
//     );

//   if (notFound || !Object.keys(mealData).length) return null;

//   return (
//     <section className="w-full px-4 py-12 bg-gray-50">
//       <div className="max-w-screen-xl mx-auto">
//         <div className="heading">
//           <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-orange-600">
//             Affordable Tour Packages For Soil to Soul Resort
//           </h1>
//           <p className="text-center text-gray-600 mb-1">
//             Depending on your vacation duration, you can choose 1 Night &amp; 2
//             Days Package with us. Below 6yr. Child Complimentary.
//           </p>
//           <p className="text-center text-gray-500 mb-8">
//             All packages include cultural programs to highlight local culture.
//             After a full day of sightseeing, unwind on our lush green lawn.
//           </p>
//         </div>

//         {/* Render by week */}

//         {Object.entries(mealData).map(([week, foodPlans]) => (
//           <div key={week} className="mb-12">
//             <h2 className="text-2xl font-bold mb-4 text-blue-600">{week}</h2>
//             <div className="grid md:grid-cols-2 gap-8">
//               {Object.entries(foodPlans).map(([foodPlan, plansArr]) =>
//                 plansArr.map((plan, idx) => (
//                   <div
//                     key={foodPlan + idx}
//                     className="bg-white rounded-xl shadow-md border border-orange-200 flex flex-col"
//                     style={{ height: "100%" }}
//                   >
//                     <div className="p-6 pb- flex-1 flex flex-col">
//                       <h3 className="text-xl font-semibold text-orange-500 mb-3 text-center">
//                         {foodPlan}
//                       </h3>
//                       {plan.subtitle && (
//                         <p className="text-center text-gray-500 mb-4"></p>
//                       )}
//                       <div className="overflow-x-auto rounded mb-4">
//                         <table className="min-w-full border border-orange-300">
//                           <thead>
//                             <tr className="bg-orange-500 text-white">
//                               <th className="px-4 py-2 text-left">Category</th>
//                               <th className="px-4 py-2 text-left">
//                                 Double Occupancy
//                               </th>
//                               <th className="px-4 py-2 text-left">
//                                 Extra Person
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {plan.data.map((item, i) => (
//                               <tr
//                                 key={item.category + i}
//                                 className={i % 2 === 1 ? "bg-orange-50" : ""}
//                               >
//                                 <td className="px-4 py-2 font-medium">
//                                   {item.category}
//                                 </td>
//                                 <td className="px-4 py-2">
//                                   {item.double_occupancyy}
//                                 </td>
//                                 <td className="px-4 py-2">
//                                   {item.extra_person}
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                       {/* This empty div takes up remaining space to push the button down */}
//                       <div className="flex-1"></div>
//                       {/* Book button always at the bottom */}
//                       <div className="flex justify-center mt-6">
//                         <button
//                           className={`px-8 py-3 rounded-lg text-white font-semibold transition bg-orange-500 hover:bg-orange-600 shadow-md focus:outline-none`}
//                         >
//                           Book Online
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";

export const StayInTentDropDownMealPlan = () => {
  const { StayInTentPath } = useParams();
  const [loading, setLoading] = useState(true);
  const [mealData, setMealData] = useState({});
  const [notFound, setNotFound] = useState(false);

  // Format path for matching
  const formattedPath = (StayInTentPath || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setMealData({});

    // 1. Fetch all package names
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        const allPackages = res.data.data || [];
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
        // 2. Fetch all meal plans for that package
        return axios.get(`${BE_URL}/souPackageMealPlan/package/${found.id}`);
      })
      .then((mealRes) => {
        if (!mealRes || !mealRes.data || !Array.isArray(mealRes.data.data)) {
          setLoading(false);
          return;
        }
        const plans = mealRes.data.data;

        // Group by week, then by food_plans
        const grouped = {};
        plans.forEach((plan) => {
          const week = plan.week || "";
          const foodPlan = plan.food_plans || "Other";
          if (!grouped[week]) grouped[week] = {};
          if (!grouped[week][foodPlan]) grouped[week][foodPlan] = [];
          let parsedData = [];
          try {
            parsedData = Array.isArray(plan.data)
              ? plan.data
              : JSON.parse(plan.data);
          } catch {
            parsedData = [];
          }
          grouped[week][foodPlan].push({
            ...plan,
            data: parsedData,
          });
        });
        setMealData(grouped);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [formattedPath]);

  if (loading)
    return (
      <section className="w-full px-4 py-12 bg-gray-50 text-center">
        <span className="text-lg">Loading...</span>
      </section>
    );

  if (notFound || !Object.keys(mealData).length) return null;

  // Flatten all tables regardless of week/foodPlan
  const allTables = [];
  Object.entries(mealData).forEach(([week, foodPlans]) => {
    Object.entries(foodPlans).forEach(([foodPlan, plansArr]) => {
      plansArr.forEach((plan) => {
        allTables.push({ week, foodPlan, plan });
      });
    });
  });

  return (
    <section className="w-full px-4 py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="heading">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-orange-600">
            Affordable Tour Packages For{" "}
            {formattedPath
              .replace(/-/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </h1>
          <p className="text-center text-gray-600 mb-1">
            Depending on your vacation duration, you can choose 1 Night &amp; 2
            Days Package with us. Below 6yr. Child Complimentary.
          </p>
          <p className="text-center text-gray-500 mb-8">
            All packages include cultural programs to highlight local culture.
            After a full day of sightseeing, unwind on our lush green lawn.
          </p>
        </div>
        {/* Render all tables in a 2-column grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {allTables.map(({ week, foodPlan, plan }, idx) => (
            <div
              key={week + foodPlan + idx}
              className="bg-white rounded-xl shadow-md border border-orange-200 flex flex-col"
              style={{ height: "100%" }}
            >
              <div className="p-6 pb- flex-1 flex flex-col">
                <h2 className="text-2xl font-bold mb-2 text-center">{week}</h2>
                <h3 className="text-xl font-semibold text-orange-500 mb-3 text-center">
                  {foodPlan}
                </h3>
                {plan.subtitle && (
                  <p className="text-center text-gray-500 mb-4">
                    {plan.subtitle}
                  </p>
                )}
                <div className="overflow-x-auto rounded mb-4">
                  <table className="min-w-full border border-orange-300">
                    <thead>
                      <tr className="bg-orange-500 text-white">
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">
                          Double Occupancy
                        </th>
                        <th className="px-4 py-2 text-left">Extra Person</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plan.data.map((item, i) => (
                        <tr
                          key={item.category + i}
                          className={i % 2 === 1 ? "bg-orange-50" : ""}
                        >
                          <td className="px-4 py-2 font-medium">
                            {item.category}
                          </td>
                          <td className="px-4 py-2">
                            {item.double_occupancyy}
                          </td>
                          <td className="px-4 py-2">{item.extra_person}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* This empty div takes up remaining space to push the button down */}
                <div className="flex-1"></div>
                {/* Book button always at the bottom */}
                <div className="flex justify-center mt-6">
                  <button
                    className={`px-8 py-3 rounded-lg text-white font-semibold transition bg-orange-500 hover:bg-orange-600 shadow-md focus:outline-none`}
                  >
                    Book Online
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
