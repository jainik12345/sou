// import { SouBookingInfoData } from "../SouTicketsData"

// export const SouBookingInfo = () => {
//     return (

//         <>

//             <div className="SouBookingInfo-Section">

//                 <div className="SouBookingInfo-Cont max-w-screen-xl mx-auto md:p-10 flex flex-col gap-5">

//                     <h2 className="text-orange-color font-bold text-center text-[2rem]">Statue Of Unity Tickets Online Booking</h2>


//                     {SouBookingInfoData && SouBookingInfoData.map((Val, Idx) => {

//                         return (

//                             <>
//                                 <div key={Idx} className="flex flex-col gap-5">
//                                     <div className="HeadPara">
//                                         <p className="text-justify font-semibold text-gray-500 ">{Val.HeadPara}</p>
//                                     </div>

//                                     <div className="HeadPara2">

//                                         {Val.HeadPara2 && Val.HeadPara2.map((HeadPara2Val, HeadPara2Idx) => {

//                                             return (

//                                                 <div className="flex flex-col gap-5 text-justify">

//                                                     <h2 className="font-bold text-gray-900 text-left text-[1.2rem]">{HeadPara2Val.HeadParaTitle}</h2>

//                                                     <div className="flex flex-col gap-5">{

//                                                        HeadPara2Val.HeadPara2Para && HeadPara2Val.HeadPara2Para.map((ParaVal, Index) => {

//                                                             return (

//                                                                 <p className="text-justify font-semibold text-gray-500 " key={Index}>{ParaVal}</p>

//                                                             )

//                                                         })

//                                                     }</div>

//                                                 </div>

//                                             )

//                                         })}

//                                     </div>

//                                     <div className="flex flex-col gap-5">

//                                         {Val.BookingInfo && Val.BookingInfo.map((BookingVal, BookingIdx) => {


//                                             return (
//                                                 <div className="Options-section flex flex-col gap-5">

//                                                     <h2 className=" text-gray-900 font-bold text-left text-[1.2rem]">{BookingVal.OptionTitle} {BookingVal.id}:</h2>

//                                                     <h2 className=" text-gray-900 font-bold text-left text-[1.2rem]">{BookingVal.OptionSubTitel}</h2>

//                                                     {

//                                                         BookingVal.OptionPara && BookingVal.OptionPara.map((OptionVal, OptionIdx) => {

//                                                             return (


//                                                                 <p className="text-justify font-semibold text-gray-500 " key={OptionIdx}>{OptionVal}</p>

//                                                             )

//                                                         })

//                                                     }
//                                                 </div>


//                                             )


//                                         })}

//                                     </div>

//                                     <div className="Booking Notice flex flex-col gap-5">

//                                         {

//                                             Val.BookingNotice && Val.BookingNotice.map((NoticeVal, NoticeIdx) => {

//                                                 return (

//                                                     <p className="text-justify font-bold text-gray-800 " key={NoticeIdx}>{NoticeVal}</p>

//                                                 )


//                                             })

//                                         }

//                                     </div>

//                                 </div>
//                             </>

//                         )

//                     })}



//                 </div>

//             </div>

//         </>

//     )
// }


import { SouBookingInfoData } from "../SouTicketsData";

/**
 * Modern, clean, and highly readable booking info section.
 * - Improved structure, spacing, and readable visual hierarchy.
 * - Uses cards and dividers for a premium content feel.
 */
export const SouBookingInfo = () => {
  return (
    <section className="SouBookingInfo-Section bg-gray-50 py-8">
      <div className="SouBookingInfo-Cont max-w-screen-xl mx-auto px-4 md:px-1 flex flex-col gap-8">
        <h2 className="text-orange-500 font-extrabold text-center text-3xl md:text-4xl mb-4">
          Statue Of Unity Tickets Online Booking
        </h2>

        {SouBookingInfoData?.map((Val, Idx) => (
          <article
            key={Idx}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-6"
          >
            {/* Lead paragraph */}
            {Val.HeadPara && (
              <p className="text-justify font-semibold text-gray-600 text-base mb-1">
                {Val.HeadPara}
              </p>
            )}

            {/* HeadPara2 Sections */}
            {Val.HeadPara2 && Val.HeadPara2.length > 0 && (
              <div className="flex flex-col gap-6">
                {Val.HeadPara2.map((HeadPara2Val, HeadPara2Idx) => (
                  <section key={HeadPara2Idx} className="flex flex-col gap-2">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {HeadPara2Val.HeadParaTitle}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {HeadPara2Val.HeadPara2Para &&
                        HeadPara2Val.HeadPara2Para.map((ParaVal, ParaIdx) => (
                          <p
                            key={ParaIdx}
                            className="text-justify font-medium text-gray-600"
                          >
                            {ParaVal}
                          </p>
                        ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Booking Options */}
            {Val.BookingInfo && Val.BookingInfo.length > 0 && (
              <div className="flex flex-col gap-6">
                {Val.BookingInfo.map((BookingVal, BookingIdx) => (
                  <section
                    key={BookingIdx}
                    className="Options-section flex flex-col gap-2 bg-gray-50 rounded-xl p-4 border border-orange-100"
                  >
                    <h4 className="text-gray-900 font-bold text-left text-base">
                      {BookingVal.OptionTitle} {BookingVal.id && <span className="text-orange-500">({BookingVal.id})</span>}
                    </h4>
                    {BookingVal.OptionSubTitel && (
                      <h5 className="text-gray-800 font-semibold text-left text-base mb-1">
                        {BookingVal.OptionSubTitel}
                      </h5>
                    )}
                    <div className="flex flex-col gap-1">
                      {BookingVal.OptionPara &&
                        BookingVal.OptionPara.map((OptionVal, OptionIdx) => (
                          <p
                            key={OptionIdx}
                            className="text-justify font-normal text-gray-600"
                          >
                            {OptionVal}
                          </p>
                        ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {/* Booking Notice */}
            {Val.BookingNotice && Val.BookingNotice.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                {Val.BookingNotice.map((NoticeVal, NoticeIdx) => (
                  <div
                    key={NoticeIdx}
                    className="px-4 py-2 bg-orange-50 border-l-4 border-orange-400 rounded text-orange-800 font-semibold text-sm"
                  >
                    {NoticeVal}
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};