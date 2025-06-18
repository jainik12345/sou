// // import { ClickHere } from "../../components/Buttons/ClickHere.jsx";
// // import BE_URL from "../../config.js";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { LazyLoadImage } from 'react-lazy-load-image-component';
// // import 'react-lazy-load-image-component/src/effects/blur.css';

// // export const AboutCards = () => {
// //     const [AboutAttractionsCard, setAboutAttractionsCard] = useState([]);
// //     const [FetchError, setFetchError] = useState(null);

// //     useEffect(() => {
// //         const FetchResponse = async () => {
// //             try {
// //                 const FetchResponse = await axios.get(`${BE_URL}/aboutAttractionsSection`);
// //                 if (FetchResponse.status === 200) {
// //                     setAboutAttractionsCard(FetchResponse.data.data);
// //                 } else {
// //                     console.error("unexpected api status code received:- ", FetchResponse.status);
// //                 }
// //             } catch (error) {
// //                 console.error("Unable To Fetch The About Why Choose Us Section:- ", error);
// //                 setFetchError("Unable To Load The Data ");
// //             }
// //         };
// //         FetchResponse();
// //     }, []);

// //     return (
// //         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-screen-xl mx-auto px-4 py-12">
// //             {FetchError && (
// //                 <div className="text-center text-red-600 font-semibold text-lg py-10">
// //                     {FetchError}
// //                 </div>
// //             )}
// //             {AboutAttractionsCard && AboutAttractionsCard.map((Val, Idx) => (
// //                 <div
// //                     key={Idx}
// //                     className="bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
// //                     style={{ minHeight: 430 }}
// //                 >
// //                     <div className="relative">
// //                         {/* Badge logic: if Val.badge exists, show badge. */}
// //                         {Val.badge && (
// //                             <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow">
// //                                 {Val.badge}
// //                             </span>
// //                         )}
// //                         <LazyLoadImage
// //                             src={`${BE_URL}/Images/AboutImages/Attractions/${Val.image}`}
// //                             alt={Val.heading}
// //                             effect="blur"
// //                             className="w-full h-full object-cover"
// //                         />
// //                     </div>
// //                     <div className="flex flex-col items-center px-6 py-6 flex-1">
// //                         <h2 className="font-extrabold text-xl text-gray-800 text-center mb-1">
// //                             {Val.heading}
// //                         </h2>
// //                         <div className="w-15 h-1 bg-orange-500 rounded-full my-2"></div>

// //                         {/* Show description if wanted, else hide as per image1 */}
// //                         {Val.description && (
// //                             <p className="text-gray-600 text-sm text-justify mb-4">{Val.description}</p>
// //                         )}
// //                         <div className="mt-auto w-full flex justify-center">
// //                             <ClickHere
// //                                 ButtonDirection={Val.buttonUrl || "/sou-tickets"}
// //                                 ButtonText={Val.buttonText || "Book Online"}
// //                                 className="w-full"
// //                                 style={{ minWidth: 120 }}
// //                             />
// //                         </div>
// //                     </div>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// import { ClickHere } from "../../components/Buttons/ClickHere.jsx";
// import BE_URL from "../../config.js";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// export const AboutCards = () => {
//   const [AboutAttractionsCard, setAboutAttractionsCard] = useState([]);
//   const [FetchError, setFetchError] = useState(null);

//   useEffect(() => {
//     const FetchResponse = async () => {
//       try {
//         const FetchResponse = await axios.get(
//           `${BE_URL}/aboutAttractionsSection`
//         );
//         if (FetchResponse.status === 200) {
//           setAboutAttractionsCard(FetchResponse.data.data);
//         } else {
//           console.error(
//             "unexpected api status code received:- ",
//             FetchResponse.status
//           );
//         }
//       } catch (error) {
//         console.error(
//           "Unable To Fetch The About Why Choose Us Section:- ",
//           error
//         );
//         setFetchError("Unable To Load The Data ");
//       }
//     };
//     FetchResponse();
//   }, []);

//   return (
//     <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-screen-xl mx-auto px-4 py-12">
//       {FetchError && (
//         <div className="text-center text-red-600 font-semibold text-lg py-10">
//           {FetchError}
//         </div>
//       )}
//       {AboutAttractionsCard &&
//         AboutAttractionsCard.map((Val, Idx) => (
//           <div
//             key={Idx}
//             className="bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
//             style={{ minHeight: 430 }}
//           >
//             <div className="relative">
//               {Val.badge && (
//                 <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow">
//                   {Val.badge}
//                 </span>
//               )}
//               <LazyLoadImage
//                 src={`${BE_URL}/Images/AboutImages/Attractions/${Val.image}`}
//                 alt={Val.heading}
//                 effect="blur"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="flex flex-col items-center px-6 py-6 flex-1">
//               <h2 className="font-extrabold text-xl text-gray-800 text-center mb-1">
//                 {Val.heading}
//               </h2>
//               <div className="w-15 h-1 bg-orange-500 rounded-full my-2"></div>
//               {Val.description && (
//                 <div className=" mb-4 w-full  max-h-[220px] min-h-[220px] flex items-center overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{scrollbarWidth:"thin"}}>
//                   <p className="text-gray-600 text-sm text-justify  flex items-center p-2">
//                     {Val.description}
//                   </p>
//                 </div>
//               )}
//               <div className="mt-auto w-full flex justify-center">
//                 <ClickHere
//                   ButtonDirection={Val.buttonUrl || "/sou-tickets"}
//                   ButtonText={Val.buttonText || "Book Online"}
//                   className="w-full"
//                   style={{ minWidth: 120 }}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };



import { ClickHere } from "../../components/Buttons/ClickHere.jsx";
import BE_URL from "../../config.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const AboutCards = () => {
  const [AboutAttractionsCard, setAboutAttractionsCard] = useState([]);
  const [FetchError, setFetchError] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const FetchResponse = async () => {
      try {
        const FetchResponse = await axios.get(
          `${BE_URL}/aboutAttractionsSection`
        );
        if (FetchResponse.status === 200) {
          setAboutAttractionsCard(FetchResponse.data.data);
        } else {
          console.error(
            "unexpected api status code received:- ",
            FetchResponse.status
          );
        }
      } catch (error) {
        console.error(
          "Unable To Fetch The About Why Choose Us Section:- ",
          error
        );
        setFetchError("Unable To Load The Data ");
      }
    };
    FetchResponse();
  }, []);

  const APPROX_CHAR_LIMIT = 500;

  const handleReadMore = (idx) => {
    setExpandedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-screen-xl mx-auto px-4 py-12">
      {FetchError && (
        <div className="text-center text-red-600 font-semibold text-lg py-10">
          {FetchError}
        </div>
      )}
      {AboutAttractionsCard &&
        AboutAttractionsCard.map((Val, Idx) => {
          const isExpanded = expandedCards[Idx];
          const needsReadMore =
            Val.description && Val.description.length > APPROX_CHAR_LIMIT;
          const displayText =
            !isExpanded && needsReadMore
              ? Val.description.slice(0, APPROX_CHAR_LIMIT) + "..."
              : Val.description;

          return (
            <div
              key={Idx}
              className="bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
              style={{ minHeight: 430 }}
            >
              <div className="relative">
                {Val.badge && (
                  <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow">
                    {Val.badge}
                  </span>
                )}
                <LazyLoadImage
                  src={`${BE_URL}/Images/AboutImages/Attractions/${Val.image}`}
                  alt={Val.heading}
                  effect="blur"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center px-6 py-6 flex-1">
                <h2 className="font-extrabold text-xl text-gray-800 text-center mb-1">
                  {Val.heading}
                </h2>
                <div className="w-15 h-1 bg-orange-500 rounded-full my-2"></div>
                {Val.description && (
                  <div
                    className={
                      isExpanded && needsReadMore
                        ? "mb-4 w-full max-h-[220px] overflow-y-auto transition-all duration-300 pr-2"
                        : "mb-4 w-full"
                    }
                    style={{scrollbarWidth:"thin"}}
                  >
                    <p className="text-gray-600 text-sm text-justify flex items-center p-2">
                      {displayText}
                    </p>
                  </div>
                )}
                {/* Read More button */}
                {needsReadMore && (
                  <button
                    className="text-blue-500 underline mb-3 w-fit"
                    onClick={() => handleReadMore(Idx)}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                )}
                <div className="mt-auto w-full flex justify-center">
                  <ClickHere
                    ButtonDirection={Val.buttonUrl || "/sou-tickets"}
                    ButtonText={Val.buttonText || "Book Online"}
                    className="w-full"
                    style={{ minWidth: 120 }}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};