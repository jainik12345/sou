// import { useParams } from "react-router-dom";
// import { StayInTentDropDownData } from "../../StayInTent.js";
// import { BookOnline } from "../../../../components/Buttons/BookOnline.jsx";

// export const StayInTentDropDownBookOnlineCard = () => {
//   const { StayInTentPath } = useParams();
//   const FormattedPath = StayInTentPath
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");
//   const FormattedData = StayInTentDropDownData[FormattedPath];

//   // If data or the BookOnlineCard array is missing or empty, don't render anything
//   if (
//     !FormattedData ||
//     !Array.isArray(FormattedData.BookOnlineCard) ||
//     FormattedData.BookOnlineCard.length === 0
//   ) {
//     return null;
//   }

//   return (
//     <section className="w-full bg-white py-16">
//       {FormattedData.BookOnlineCard.map((Val, Idx) => (
//         <div
//           key={Idx}
//           className="mx-auto max-w-screen-xl flex flex-col gap-8 px-4 md:px-8 py-8"
//         >
//           <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-3 tracking-tight drop-shadow-sm">
//             {Val.CardHeading}
//           </h2>
//           {Val.CardPara &&
//             Val.CardPara.map((ParaVal, ParaIdx) => (
//               <p
//                 className="text-center text-lg font-medium text-gray-600 mb-2"
//                 key={ParaIdx}
//               >
//                 {ParaVal}
//               </p>
//             ))}

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
//             {Val.CardData &&
//               Val.CardData.map((CardVal, CardIdx) => (
//                 <div
//                   key={CardIdx}
//                   className="relative group flex flex-col items-center bg-white/80 border border-orange-100 rounded-3xl shadow-xl hover:shadow-orange-300 hover:-translate-y-2 transition-all duration-300  overflow-hidden backdrop-blur-lg"
//                 >
//                   {/* Floating price badge */}
//                   <div className="absolute top-4 right-4 z-10">
//                     <span className="bg-orange-500 text-white font-bold text-base px-4 py-1 rounded-full shadow-md">
//                       {CardVal.CardPrice}
//                     </span>
//                   </div>
//                   {/* Image */}
//                   <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100 rounded-2xl mb-4 overflow-hidden">
//                     <img
//                       src={CardVal.CardImg}
//                       alt={CardVal.CardTitle}
//                       className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   {/* Title */}

//                   <div className="p-5 flex flex-col gap-5">
//                     <h3 className="font-extrabold text-xl text-gray-900 mb-1 text-center">
//                       {CardVal.CardTitle}
//                     </h3>
//                     {/* CTA */}
//                     <div className="w-full flex justify-center mt-3">
//                       <BookOnline BookOnlineLink={CardVal.BookOnlineLink || ""} />
//                     </div>
//                   </div>

//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };




// fetching code


import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent.js";
import { BookOnline } from "../../../../components/Buttons/BookOnline.jsx";
import { useEffect, useState } from "react";
import BE_URL from "../../../../config.js";
import axios from "axios";


export const StayInTentDropDownBookOnlineCard = () => {

  //useState Definations

  const [StayInTentBookCard, setStayInTentBookCard] = useState(null);
  const [FetchError, setFetchError] = useState(null);

  //routing definations 

  const { StayInTentPath } = useParams();
  const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const FormattedData = StayInTentDropDownData[FormattedPath];

  // If data or the BookOnlineCard array is missing or empty, don't render anything
  if (
    !FormattedData ||
    !Array.isArray(FormattedData.BookOnlineCard) ||
    FormattedData.BookOnlineCard.length === 0
  ) {
    return null;
  }

  //Fetch API 

  useEffect(() => {

    const FetchStayInTentDropDownCards = async () => {

      try {

        const FetchSouPackgesNames = await axios.get(`${BE_URL}/souPackageName`);

        // Matching Routing Path With The Name Of The All Sou Packages Name And If Both Matches It Will Return That Purticular Matched Data

        const FindId = FetchSouPackgesNames.data.data && FetchSouPackgesNames.data.data.find((Key) => {
          return (
            StayInTentPath === Key.sou_package_name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
          );
        });

        //Fetching API Of SouPackages Hero Section

        const FetchStayInTentBookOnlineCard = await axios.get(`${BE_URL}/souPackageResort/package/${FindId.id}`);

        if (FetchStayInTentBookOnlineCard.status === 200) {

          setStayInTentBookCard(FetchStayInTentBookOnlineCard.data.data);
          setFetchError(null);

        } else {

          console.warn("Unexpected response status:", FetchHeroSectionResponse.status);
          setFetchError("Failed To Load Stay In Tent Hero Section Data.");

        }

      } catch (error) {
        console.error(
          "Unable To Fetch Data Of Stay In Tent Book Online Card Section:- ",
          error
        );
        setFetchError("An error occurred while loading Data.");
      }

    };

    FetchStayInTentDropDownCards();

  }, [StayInTentPath]);


  console.log(StayInTentBookCard);

  return (
    <section className="w-full bg-white py-16">
      <div
        className="mx-auto max-w-screen-xl flex flex-col gap-8 px-4 md:px-8 py-8"
      >
        <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-3 tracking-tight drop-shadow-sm">
          Affordable Tour Packages For Soil to Soul Resort
        </h2>

        <p className="text-center text-lg font-medium text-gray-600 mb-2" >
          Depending on how long your vacation is, you can choose 1 Night & 2 Days Package  with us. and below 6yr. Child Complimentary <br />
          For all of our visitors, our Soil to Soul Resort Package also comes with interesting cultural programs that highlight the local culture. After a full day of sightseeing, visitors can unwind and recuperate on our lush green lawn.
        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
          {StayInTentBookCard && StayInTentBookCard?.map((CardVal, CardIdx) => (
            <div
              key={CardIdx}
              className="relative group flex flex-col items-center bg-white/80 border border-orange-100 rounded-3xl shadow-xl hover:shadow-orange-300 hover:-translate-y-2 transition-all duration-300  overflow-hidden backdrop-blur-lg"
            >
              {/* Floating price badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-orange-500 text-white font-bold text-base px-4 py-1 rounded-full shadow-md">
                  Per Couple {CardVal.per_couple}/-
                </span>
              </div>
              {/* Image */}
              <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                <img
                  src={`${BE_URL}/Images/SouPackage/SouPackageResortImages/${CardVal.image}`}
                  alt={CardVal.CardTitle}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Title */}

              <div className="p-5 flex flex-col gap-5">
                <h3 className="font-extrabold text-xl text-gray-900 mb-1 text-center">
                  {CardVal.type_room_name}
                </h3>
                {/* CTA */}
                <div className="w-full flex justify-center mt-3">
                  <BookOnline BookOnlineLink={CardVal.BookOnlineLink || ""} />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};