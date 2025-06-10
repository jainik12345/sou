// import { useParams } from "react-router-dom";
// import { StayInTentDropDownData } from "../../StayInTent.js";
// import { BookOnline } from "../../../../components/Buttons/BookOnline.jsx";

// export const StayInTentDropDownBookOnlineCard = () => {

//     const { StayInTentPath } = useParams();

//     const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

//     const FormattedData = StayInTentDropDownData[FormattedPath]

//     return (

//         <>

//             <div className="SouTicketsBookingCards-section">

//                 {FormattedData.BookOnlineCard && FormattedData.BookOnlineCard.map((Val, Idx) => {

//                     return (

//                         <div className="SouTicketsBookingCards-cont mx-auto max-w-screen-xl flex flex-col py-20 px-10 gap-5" key={Idx}>

//                             <h2 className='font-bold text-[2rem] text-orange-color text-center '>{Val.CardHeading}</h2>

//                             {

//                                 Val.CardPara && Val.CardPara.map((ParaVal, ParaIdx) => {

//                                     return (

//                                         <p className="text-center text-[1rem] font-semibold text-gray-600" key={ParaIdx}>{ParaVal}</p>

//                                     )

//                                 })

//                             }

//                             <div className="SouTicketsBookingCards-cont grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 ">

//                                 {Val.CardData && Val.CardData.map((CardVal, CardIdx) => {

//                                     return (

//                                         <div className="Ticket-Card text-center rounded-2xl shadow-xl/30 flex flex-col p-5 gap-3 relative" key={CardIdx}>

//                                             <div className="Card-Img flex justify-center items-center hover:-translate-y-[10px] transition-all ease-in duration-300">

//                                                 <img src={CardVal.CardImg} alt="IMG" className="h-60 w-100" />

//                                             </div>


//                                             <div className="package-rates flex flex-col gap-3">

//                                                 <h2 className="font-bold text-orange-color text-[1.2rem] text-center">{CardVal.CardTitle}</h2>

//                                                 <h2 className="font-semibold text-gray-600 text-[1rem] text-center">{CardVal.CardPrice}</h2>

//                                             </div>

//                                             <BookOnline BookOnlineLink={""} />

//                                         </div>

//                                     )

//                                 })}

//                             </div>

//                         </div>
//                     )

//                 })}

//             </div >

//         </>

//     )
// }

import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent.js";
import { BookOnline } from "../../../../components/Buttons/BookOnline.jsx";

export const StayInTentDropDownBookOnlineCard = () => {
  const { StayInTentPath } = useParams();
  const FormattedPath = StayInTentPath
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const FormattedData = StayInTentDropDownData[FormattedPath];

  // If data or the BookOnlineCard array is missing or empty, don't render anything
  if (
    !FormattedData ||
    !Array.isArray(FormattedData.BookOnlineCard) ||
    FormattedData.BookOnlineCard.length === 0
  ) {
    return null;
  }

  return (
    <section className="w-full bg-white py-16">
      {FormattedData.BookOnlineCard.map((Val, Idx) => (
        <div
          key={Idx}
          className="mx-auto max-w-screen-xl flex flex-col gap-8 px-4 md:px-8 py-8"
        >
          <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-3 tracking-tight drop-shadow-sm">
            {Val.CardHeading}
          </h2>
          {Val.CardPara &&
            Val.CardPara.map((ParaVal, ParaIdx) => (
              <p
                className="text-center text-lg font-medium text-gray-600 mb-2"
                key={ParaIdx}
              >
                {ParaVal}
              </p>
            ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
            {Val.CardData &&
              Val.CardData.map((CardVal, CardIdx) => (
                <div
                  key={CardIdx}
                  className="relative group flex flex-col items-center bg-white/80 border border-orange-100 rounded-3xl shadow-xl hover:shadow-orange-300 hover:-translate-y-2 transition-all duration-300 p-6 pb-7 overflow-hidden backdrop-blur-lg"
                >
                  {/* Floating price badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-orange-500 text-white font-bold text-base px-4 py-1 rounded-full shadow-md">
                      {CardVal.CardPrice}
                    </span>
                  </div>
                  {/* Image */}
                  <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100 rounded-2xl mb-4 overflow-hidden">
                    <img
                      src={CardVal.CardImg}
                      alt={CardVal.CardTitle}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Title */}
                  <h3 className="font-extrabold text-xl text-gray-900 mb-1 text-center">
                    {CardVal.CardTitle}
                  </h3>
                  {/* CTA */}
                  <div className="w-full flex justify-center mt-3">
                    <BookOnline BookOnlineLink={CardVal.BookOnlineLink || ""} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </section>
  );
};