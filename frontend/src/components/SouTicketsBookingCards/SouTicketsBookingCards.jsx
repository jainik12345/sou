// import { BookOnline } from "../Buttons/BookOnline";

// export const SouTicketsBookingCards = ({ CardTitle, CardImg, PerAdultPrice, PerChildPrice, notice, Idx }) => {
//     return (

//         <>

//             <div className="Ticket-Card text-center rounded-2xl shadow-xl/30 flex flex-col p-5 gap-3 relative" key={Idx}>

//                 <h2 className="font-bold text-orange-color md:text-[1.2rem] text-[1rem]">{CardTitle}</h2>

//                 <div className="Card-Img flex justify-center items-center ">

//                     <img src={CardImg} alt="IMG" className="h-60 w-100" />

//                 </div>


//                 <div className="package-rates grid grid-col-2 gap-3 p-3">

//                     <h2 className="font-bold text-orange-color text-[1.2rem] text-center w-full col-span-2">Package Rates:</h2>

//                     <h2 className="font-bold text-gray-600 text-[1rem]">Per Adult :- {PerAdultPrice}</h2>

//                     <h2 className="font-bold text-gray-600 text-[1rem]">Per Child :- {PerChildPrice}</h2>

//                 </div>

//                 <BookOnline BookOnlineLink={""}/>

//                 {notice && (
//                     <p className={`font-semibold text-[1.1rem] text-red-600 text-justify absolute animate-gradient-text -top-1 left-[20%] ${notice ? 'block' : 'hidden'}`}>{notice}</p>
//                 )}

//             </div>

//         </>

//     )
// }


import { BookOnline } from "../Buttons/BookOnline";

export const SouTicketsBookingCards = ({
  CardTitle,
  CardImg,
  PerAdultPrice,
  PerChildPrice,
  notice,
  Idx,
}) => {
  return (
    <div
      key={Idx}
      className="relative  w-full max-w-screen-xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col group transition-all duration-300 hover:scale-[1.025]"
      style={{
        minHeight: 410,
        boxShadow: '0 6px 24px 0 rgba(16,30,54,0.13)',
        border: '1px solid #eee',
      }}
    >
      {/* Top Image with overlay */}
      <div className="relative">
        <img
          src={CardImg}
          alt={CardTitle}
          className="rounded-t-3xl w-full h-44 object-cover"
        />
        {/* Notice badge */}
        {notice && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow animate-pulse">
            {notice}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 pb-5 pt-4">
        <h2 className="text-center text-xl font-extrabold text-gray-900 tracking-tight mb-2">
          {CardTitle}
        </h2>

        {/* Divider */}
        <div className="w-12 border-b-2 border-orange-400 mx-auto mb-3" />

        {/* Price section */}
        <div className="flex justify-center gap-8 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase text-gray-400">Adult</span>
            <span className="text-xl font-bold text-orange-500">{PerAdultPrice}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs uppercase text-gray-400">Child</span>
            <span className="text-xl font-bold text-yellow-500">{PerChildPrice}</span>
          </div>
        </div>

        {/* Book button, floating from bottom */}
        <div className="flex justify-center mt-auto">
          <div className="relative w-full flex justify-center">
            <div className="absolute -bottom-7 w-full flex justify-center">
              <div className="drop-shadow-lg">
                <BookOnline BookOnlineLink="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Spacer for floating button */}
      <div style={{ height: 32 }} />
    </div>
  );
};