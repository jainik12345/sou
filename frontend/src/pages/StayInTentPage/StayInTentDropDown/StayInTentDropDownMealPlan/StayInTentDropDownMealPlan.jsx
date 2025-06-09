// import { useParams } from "react-router-dom";
// import { StayInTentDropDownData } from "../../StayInTent";

// export const StayInTentDropDownMealPlan = () => {

//     const { StayInTentPath } = useParams();

//     const FormattedPath = StayInTentPath
//         .toLowerCase()
//         .replace(/\s+/g, "-")
//         .replace(/[^a-z0-9-]/g, "");
//     const FormattedData = StayInTentDropDownData[FormattedPath || []];

//     return (

//         {

//             FormattedData?.mealPlans && (
                
//             <section className="w-full px-4 py-12 bg-gray-50 min-h-screen">
//                 <div className="max-w-screen-xl mx-auto">

//                     <div className="heading">

//                         <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-orange-600">
//                             Affordable Tour Packages For Soil to Soul Resort
//                         </h1>
//                         <p className="text-center text-gray-600 mb-1">
//                             Depending on how long your vacation is, you can choose 1 Night &amp; 2 Days Package with us. and below 6yr. Child Complimentary
//                         </p>
//                         <p className="text-center text-gray-500 mb-8">
//                             For all of our visitors, our Soil to Soul Resort Package also comes with interesting cultural programs that highlight the local culture. After a full day of sightseeing, visitors can unwind and recuperate on our lush green lawn.
//                         </p>

//                     </div>

//                     <div className="grid md:grid-cols-2 gap-8">
//                         {FormattedData?.mealPlans?.map((plan, idx) => (
//                             <div
//                                 key={idx}
//                                 className="bg-white rounded-xl shadow-md border border-orange-200 flex flex-col"
//                             >
//                                 <div className="p-6 pb-2">
//                                     <h2 className={`text-2xl font-semibold ${plan.color} mb-1 text-center`}>
//                                         {plan.title}
//                                     </h2>
//                                     <p className="text-center text-gray-500 mb-4">{plan.subtitle}</p>
//                                     <div className="overflow-x-auto rounded">
//                                         <table className="min-w-full border border-orange-300">
//                                             <thead>
//                                                 <tr className="bg-orange-500 text-white">
//                                                     <th className="px-4 py-2 text-left">Category</th>
//                                                     <th className="px-4 py-2 text-left">Double Occupancy</th>
//                                                     <th className="px-4 py-2 text-left">Extra Person</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {plan?.table?.map((item, i) => (
//                                                     <tr key={item.category} className={i % 2 === 1 ? "bg-orange-50" : ""}>
//                                                         <td className="px-4 py-2 font-medium">{item.category}</td>
//                                                         <td className="px-4 py-2">{item.double}</td>
//                                                         <td className="px-4 py-2">{item.extra}</td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     <div className="flex justify-center mt-6">
//                                         <button
//                                             className={`px-8 py-3 rounded-lg text-white font-semibold transition ${plan.buttonColor} shadow-md focus:outline-none focus:ring-2 focus:ring-green-400`}
//                                         >
//                                             Book Online
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//         )
//         }
    
        
//     );
// }


import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent";

export const StayInTentDropDownMealPlan = () => {
  const { StayInTentPath } = useParams();

  // Defensive: Ensure StayInTentPath is a string
  const FormattedPath =
    (StayInTentPath || "")
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const FormattedData = StayInTentDropDownData[FormattedPath];

  // If no data or no mealPlans, render nothing
  if (!FormattedData?.mealPlans || !Array.isArray(FormattedData.mealPlans) || FormattedData.mealPlans.length === 0) {
    return null;
  }

  return (
    <section className="w-full px-4 py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">

        <div className="heading">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-orange-600">
            Affordable Tour Packages For Soil to Soul Resort
          </h1>
          <p className="text-center text-gray-600 mb-1">
            Depending on how long your vacation is, you can choose 1 Night &amp; 2 Days Package with us. and below 6yr. Child Complimentary
          </p>
          <p className="text-center text-gray-500 mb-8">
            For all of our visitors, our Soil to Soul Resort Package also comes with interesting cultural programs that highlight the local culture. After a full day of sightseeing, visitors can unwind and recuperate on our lush green lawn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {FormattedData.mealPlans.map((plan, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md border border-orange-200 flex flex-col"
            >
              <div className="p-6 pb-2">
                <h2 className={`text-2xl font-semibold ${plan.color} mb-1 text-center`}>
                  {plan.title}
                </h2>
                <p className="text-center text-gray-500 mb-4">{plan.subtitle}</p>
                <div className="overflow-x-auto rounded">
                  <table className="min-w-full border border-orange-300">
                    <thead>
                      <tr className="bg-orange-500 text-white">
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Double Occupancy</th>
                        <th className="px-4 py-2 text-left">Extra Person</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plan?.table?.map((item, i) => (
                        <tr key={item.category} className={i % 2 === 1 ? "bg-orange-50" : ""}>
                          <td className="px-4 py-2 font-medium">{item.category}</td>
                          <td className="px-4 py-2">{item.double}</td>
                          <td className="px-4 py-2">{item.extra}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className={`px-8 py-3 rounded-lg text-white font-semibold transition ${plan.buttonColor} shadow-md focus:outline-none focus:ring-2 focus:ring-green-400`}
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