// import BE_URL from "../../../../config";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// export const StayInTentDropDownRiverViewBookNowPara = () => {
//   //useState Declarations

//   const [StayInTentBookNowPara, setStayInTentBookNowPara] = useState(null);
//   const [FetchError, setFetchError] = useState(null);
//   const { StayInTentPath } = useParams();

//   //Fetching API

//   useEffect(() => {

//     //Fetching Function Which Runs Only Once When The Page Gets Reload

//     const FetchStayInTentBookNowPara = async () => {

//       try {

//         //Fetching API Of Sou Packages Names

//         const FetchSouPackgesNames = await axios.get(`${BE_URL}/souPackageName`);

//         // Matching Routing Path With The Name Of The All Sou Packages Name And If Both Matches It Will Return That Purticular Matched Data

//         const FindId = FetchSouPackgesNames.data.data && FetchSouPackgesNames.data.data.find((Key) => {
//           return (
//             StayInTentPath === Key.sou_package_name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
//           );
//         });

//         //Fetching API Of StayInTent Book Now Para Section

//         const FetchStayInTentBookNowData = await axios.get(`${BE_URL}/souPackageParagraph/package/${FindId.id}`);

//         if (FetchStayInTentBookNowData.status === 200) {

//           setStayInTentBookNowPara(FetchStayInTentBookNowData.data.data);
//           setFetchError(null);

//         } else {

//           setFetchError("Failed To Load Stay In Tent Book Now Para Section Data.");
//           console.warn(
//             "Unexpected response status:",
//             FetchStayInTentBookNowData.status
//           );

//         }

//       } catch (error) {
//         console.error(
//           "Unable To Fetch Data Of Stay In Tent Book Now Para Section:- ",
//           error
//         );
//         setFetchError("An error occurred while loading Data.");
//       }

//     };

//     FetchStayInTentBookNowPara();
//   }, []);

//   return (
//     <section className="w-full py-14 px-4 bg-white">
//       <div className="max-w-screen-xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
//           Book a trip to{" "}
//           <span className="text-orange-600">River View Tent Resort Now</span>
//         </h2>
//         <p className="text-gray-700 text-lg mb-6 leading-relaxed text-center md:text-left">
//           Are you seeking lodging as you prepare to travel to Kevadia? You are
//           in luck since we welcome visitors from all over the nation and the
//           world in 16 elegant and well-appointed tents. For the comfort of the
//           visitors, River View Tent Resort tents are all fully furnished with
//           contemporary conveniences. We offer opulent accommodation close to the
//           Statue of Unity, all at a reasonable price. There is a swimming pool
//           here as well, where you may unwind after a long day or swim in the
//           morning to relax your senses.
//         </p>
//         <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
//           Make your
//           <span className="font-bold text-orange-700">
//             River View Tent Resort
//           </span>
//           reservation today to select the tent of your choice and take advantage
//           of some of our highly regarded services. By making River View Tent
//           Resort Online Booking in advance, you can rest easy knowing that you
//           will have a place to stay when you get to Kevadia and can enjoy the
//           scenic grandeur of the Narmada River, the Statue of Unity, and the
//           mountain ranges.
//         </p>
//       </div>
//     </section>
//   );
// };

// import BE_URL from "../../../../config";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// export const StayInTentDropDownRiverViewBookNowPara = () => {
//   const [StayInTentBookNowPara, setStayInTentBookNowPara] = useState(null);
//   const [FetchError, setFetchError] = useState(null);
//   const { StayInTentPath } = useParams();

//   useEffect(() => {
//     const FetchStayInTentBookNowPara = async () => {
//       try {
//         const FetchSouPackgesNames = await axios.get(
//           `${BE_URL}/souPackageName`
//         );
//         const FindId =
//           FetchSouPackgesNames.data.data &&
//           FetchSouPackgesNames.data.data.find((Key) => {
//             return (
//               StayInTentPath ===
//               Key.sou_package_name
//                 .toLowerCase()
//                 .replace(/\s+/g, "-")
//                 .replace(/[^a-z0-9-]/g, "")
//             );
//           });
//         if (!FindId) {
//           setFetchError("No matching package found.");
//           setStayInTentBookNowPara(null);
//           return;
//         }
//         const FetchStayInTentBookNowData = await axios.get(
//           `${BE_URL}/souPackageParagraph/package/${FindId.id}`
//         );
//         if (FetchStayInTentBookNowData.status === 200) {
//           setStayInTentBookNowPara(FetchStayInTentBookNowData.data.data);
//           setFetchError(null);
//         } else {
//           setFetchError(
//             "Failed To Load Stay In Tent Book Now Para Section Data."
//           );
//           setStayInTentBookNowPara(null);
//         }
//       } catch (error) {
//         setFetchError("An error occurred while loading Data.");
//         setStayInTentBookNowPara(null);
//         console.error(error);
//       }
//     };
//     FetchStayInTentBookNowPara();
//   }, [StayInTentPath]);

//   if (!StayInTentBookNowPara || StayInTentBookNowPara.length === 0) {
//     return null;
//   }

//   // Get the first item if array, else null

//   const para =
//     StayInTentBookNowPara && Array.isArray(StayInTentBookNowPara)
//       ? StayInTentBookNowPara[0]
//       : StayInTentBookNowPara;

//   if (FetchError) {
//     return (
//       <section className="w-full py-14 px-4 bg-white">
//         <div className="max-w-screen-xl mx-auto">
//           <div className="text-red-600 text-center mb-4">{FetchError}</div>
//         </div>
//       </section>
//     );
//   }

//   if (!para) {
//     // Optionally render a loader here, or just nothing
//     return null;
//   }

//   return (
//     <section className="w-full py-14 px-4 bg-white">
//       <div className="max-w-screen-xl mx-auto">
//         {para.heading && (
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
//             Book a trip to{" "}
//             <span className="text-orange-600">{para.heading}</span>
//           </h2>
//         )}
//         {para.description &&
//           para.description.split("\n").map((desc, idx) => (
//             <p
//               key={idx}
//               className="text-gray-700 text-lg mb-6 leading-relaxed text-justify md:text-left"
//             >
//               {desc}
//             </p>
//           ))}
//       </div>
//     </section>
//   );
// };

/* */

import BE_URL from "../../../../config";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const StayInTentDropDownRiverViewBookNowPara = () => {
  const [StayInTentBookNowPara, setStayInTentBookNowPara] = useState(null);
  const { StayInTentPath } = useParams();

  useEffect(() => {
    const FetchStayInTentBookNowPara = async () => {
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
          setStayInTentBookNowPara(null);
          return;
        }
        const FetchStayInTentBookNowData = await axios.get(
          `${BE_URL}/souPackageParagraph/package/${FindId.id}`
        );
        if (
          FetchStayInTentBookNowData.status === 200 &&
          FetchStayInTentBookNowData.data.data &&
          Array.isArray(FetchStayInTentBookNowData.data.data) &&
          FetchStayInTentBookNowData.data.data.length > 0
        ) {
          setStayInTentBookNowPara(FetchStayInTentBookNowData.data.data);
        } else {
          setStayInTentBookNowPara(null);
        }
      } catch (error) {
        setStayInTentBookNowPara(null);
        console.error(error);
      }
    };
    FetchStayInTentBookNowPara();
  }, [StayInTentPath]);

  if (!StayInTentBookNowPara || StayInTentBookNowPara.length === 0) {
    return null;
  }

  const para =
    StayInTentBookNowPara && Array.isArray(StayInTentBookNowPara)
      ? StayInTentBookNowPara[0]
      : StayInTentBookNowPara;

  if (!para || (!para.heading && !para.description)) {
    return null;
  }

  return (
    <section className="w-full py-14 px-4  bg-white">
      <div className="max-w-screen-xl mx-auto">
        {para.heading && (
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
            Book a trip to{" "}
            <span className="text-orange-600">{para.heading}</span>
          </h2>
        )}
        {para.description &&
          para.description.split("\n").map((desc, idx) => (
            <p
              key={idx}
              className="text-gray-700 text-lg mb-6 leading-relaxed text-justify md:text-left"
            >
              {desc}
            </p>
          ))}
      </div>
    </section>
  );
};
