// export const ExploreCard = ({ visibleCards }) => {

//     return (

//         <>
//             {
//                 visibleCards.map((Val, Idx) => {


//                     return (

//                         <div className="Explore-card group bg-white rounded-2xl shadow-md shadow-grey-text  p-5 max-w-[400px] max-h-fit my-5 flex flex-col  transition-all duration-500 ease-in-out " key={Idx}>




//                             <div className="Card-img mb-10">

//                                 <img src={Val.ImgUrl} alt="IMG" className="h-60 w-full object-cover rounded" />

//                             </div>





//                             <div className="Card-Title  text-center text-orange-color font-bold text-2xl relative">

//                                 <div className="animation-title z-0 bg-none h-full w-0 absolute group-hover:w-full group-hover:bg-orange-color transition-all duration-700"></div>

//                                 <h3 className="py-3 z-10 relative  group-hover:text-white">{Val.Title}</h3>

//                             </div>

//                             <div className="Card-Timing text-center font-semibold relative overflow-hidden rounded group bg-white">

//                                 <div className="absolute top-0 right-0 h-full w-0 bg-orange-color z-0 transition-all duration-700 origin-right group-hover:w-full"></div>


//                                 <h4 className="relative py-3 z-10 text-gray-600 group-hover:text-white transition-all duration-700">
//                                     {Val.Timing}
//                                 </h4>
//                             </div>
//                         </div>

//                     )

//                 })

//             }

//         </>

//     );

// }

export const ExploreCard = ({ visibleCards }) => {
  return (
    <>
      {visibleCards.map((item, index) => (
        <div
          key={index}
          className="Explore-card group bg-white rounded-2xl shadow-md shadow-grey-text p-5 max-w-[400px] my-5 flex flex-col transition-all duration-500 ease-in-out"
        >
          {/* Card Image */}
          <div className="Card-img mb-10">
            <img
              src={item.ImgUrl}
              alt={item.Title || "Image"}
              className="h-60 w-full object-cover rounded"
            />
          </div>

          {/* Title */}
          <div className="Card-Title text-center text-orange-color font-bold text-2xl relative">
            <div className="animation-title absolute inset-0 w-0 h-full bg-none z-0 group-hover:w-full group-hover:bg-orange-color transition-all duration-700"></div>
            <h3 className="relative z-10 py-3 group-hover:text-white">
              {item.Title}
            </h3>
          </div>

          {/* Timing */}
          <div className="Card-Timing relative text-center font-semibold overflow-hidden rounded group bg-white">
            <div className="absolute top-0 right-0 h-full w-0 bg-orange-color z-0 transition-all duration-700 origin-right group-hover:w-full"></div>
            <h4 className="relative z-10 py-3 text-gray-600 group-hover:text-white transition-all duration-700">
              {item.Timing}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};
