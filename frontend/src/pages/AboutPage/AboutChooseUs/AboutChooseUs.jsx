// import { WhyChooseUs } from "../AboutData"

// export const AboutChooseUs = () => {
//     return (

//         <>
//             <div className="choose-us-section">

//                 <div className="choose-us-cont p-5 flex flex-col max-w-screen-xl mx-auto gap-7">

//                     <div className="choose-us-title text-center">

//                         <h2 className="text-orange-color font-semibold md:text-[2rem] text-[1.3rem]">Why should you Choose Us?</h2>

//                     </div>

//                     <div className="choose-us-details flex flex-col gap-5 ">

//                         {

//                             WhyChooseUs.map((Val, Idx) => {

//                                 return (

//                                     <p key={Idx} className="font-[500] lg:text-[1.1rem] text-[1rem] text-gray-500"><span className="font-[500] mr-2 text-orange-color lg:text-[1.3rem] text-[1.1rem]">{Val.Title}:</span>{Val.Para}</p>

//                                 )

//                             })

//                         }

//                     </div>

//                 </div>

//             </div>
            
//         </>

//     )
// }

import { WhyChooseUs } from "../AboutData";

export const AboutChooseUs = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col gap-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-orange-500 font-extrabold text-2xl sm:text-3xl mb-2">
            Why should you Choose Us?
          </h2>
          <div className="w-16 h-1 mx-auto bg-orange-300 rounded mb-2"></div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {WhyChooseUs.map((Val, Idx) => (
            <div
              key={Idx}
              className="flex items-start gap-3 bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="mt-1">
                <span className="text-orange-500 font-semibold text-xl">
                  {Val.Title}
                </span>
                <span className="text-gray-700 block font-medium text-base mt-1">
                  {Val.Para}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};