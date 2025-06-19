// import { AboutWeddingsData } from "../../../AboutData.js"
// import { FiChevronsRight } from "react-icons/fi";
// import { ClickHere } from "../../../../../components/Buttons/ClickHere.jsx"

// export const AboutWeddingsInfo = () => {
//     return (

//         <>
//             <div className="AboutWeddings-info-section bg-gray-200">

//                 {
//                     AboutWeddingsData && AboutWeddingsData.map((Val, Idx) => {

//                         return (

//                             <div className="AboutWeddings-cont py-10 relative  max-w-screen-xl mx-auto flex flex-col lg:items-start items-center px-5" key={Idx}>

//                                 <div>

//                                     <img src={Val.ImgUrl} alt="IMG" className="h-150 object-cover" />

//                                 </div>

//                                 <div className="AboutWeddings-info-cont flex flex-col  gap-5 p-5 lg:absolute relative lg:right-0  lg:top-40 bg-white rounded-se-3xl rounded-es-3xl lg:w-fit w-[100%]">

//                                     {

//                                         Val.ImgDescLists && Val.ImgDescLists.map((List, Index) => {

//                                             return (

//                                                 <div className="md:text-[1rem] text-[.8rem] flex font-semibold" key={Index}><FiChevronsRight size={20} className="mr-5 text-orange-color" />{List}</div>

//                                             )

//                                         })

//                                     }

//                                     <div className="AboutWedding-info-btn w-fit ps-5">

//                                         <ClickHere ButtonText={"Click Here"} />

//                                     </div>


//                                 </div>

//                             </div>
//                         )

//                     })

//                 }


//             </div>

//         </>
//     )
// }


import { AboutWeddingsData } from "../../../AboutData.js";
import { FiChevronsRight } from "react-icons/fi";
import { ClickHere } from "../../../../../components/Buttons/ClickHere.jsx";

export const AboutWeddingsInfo = () => {
  return (
    <section className="w-full min-h-screen bg-gray-100 py-24">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 flex flex-col gap-20">
        {AboutWeddingsData?.map((Val, Idx) => (
          <div
            key={Idx}
            className={`flex flex-col-reverse lg:flex-row ${
              Idx % 2 === 0
                ? "lg:items-center"
                : "lg:flex-row-reverse lg:items-center"
            } gap-10`}
          >
            {/* Info Card */}
            <div className="flex-1 flex flex-col justify-center bg-white/90 rounded-2xl shadow-2xl p-5 backdrop-blur-md border border-orange-200">
              <h3 className="text-2xl font-extrabold text-orange-700 mb-6 tracking-tight drop-shadow-sm">
                {Val.Title || "A Wedding to Remember"}
              </h3>
              <ul className="flex flex-col gap-4">
                {Val.ImgDescLists?.map((List, Index) => (
                  <li
                    className="flex items-start  md:text-md text-sm font-medium text-gray-700"
                    key={Index}
                  >
                    <span className="mt-1 mr-3 text-orange-400">
                      <FiChevronsRight size={22} />
                    </span>
                    {List}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ClickHere ButtonText={"Click Here"} />
              </div>
            </div>

            {/* Image with overlay and effect */}
            <div className="flex-1 flex justify-center items-center relative">
              <div className="relative w-full max-w-lg group rounded-2xl overflow-hidden">
                <img
                  src={Val.ImgUrl}
                  alt="Wedding venue"
                  className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-80 group-hover:opacity-60 transition duration-500"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 rounded-xl px-4 py-2 shadow-md text-sm font-semibold text-orange-700 backdrop-blur">
                  {Val.ImgCaption || "Statue of Unity Venue"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};