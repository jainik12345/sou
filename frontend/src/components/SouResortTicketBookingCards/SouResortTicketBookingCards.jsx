// import { BookOnline } from "../Buttons/BookOnline";
// import { FiPlus } from "react-icons/fi";
// import { FiMinus } from "react-icons/fi";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiChevronsRight } from "react-icons/fi";


// export const SouResortTicketBookingCards = ({ FaqData, CardTitle, CardImg, PerAdultPrice, PerChildPrice, notice, Idx }) => {


//     const [openIndex, setOpenIndex] = useState(null);

//     const HandleFAQClick = (Idx) => {

//         setOpenIndex((prev) => {


//             return (prev === Idx ? null : Idx);

//         })

//     }

//     return (

//         <>
//             <div className="Ticket-Card text-center rounded-2xl shadow-xl/30 flex flex-col p-5 gap-3 relative h-[100%]" key={Idx}>
        
//                 <h2 className="font-bold text-orange-color md:text-[1.2rem] text-[1rem]">{CardTitle}</h2>

//                 <div className="Card-Img flex justify-center items-center ">

//                     <img src={CardImg} alt="IMG" className="h-60 w-100" />

//                 </div>


//                 <div className="package-rates grid grid-col-2 gap-3 p-3">

//                     <h2 className="font-bold text-orange-color text-[1.2rem] text-center w-full col-span-2">Package Rates:</h2>

//                     <h2 className="font-bold text-gray-600 text-[1rem]">Per Adult :- {PerAdultPrice}</h2>

//                     <h2 className="font-bold text-gray-600 text-[1rem]">Per Child :- {PerChildPrice}</h2>

//                 </div>

//                 {

//                     FaqData && FaqData.map((FaqVal, Index) => {


//                         return (


//                             <div className="fact-cont relative border border-gray-400 p-3 select-none"
//                                 key={Index} onClick={() => { HandleFAQClick(Index) }}>

//                                 <motion.div
//                                     initial={{ height: 0 }}
//                                     animate={{ height: openIndex === Index ? '100%' : 0 }}
//                                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                                     className="absolute top-[-1px] left-[-1px] w-[4px] bg-orange-color rounded"
//                                 />

//                                 <div className="faq-title flex justify-between items-center transition-all duration-75 ease-in-out" >

//                                     <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-4">{openIndex === Index ? <FiMinus size={30} className="bg-gray-300 p-2 rounded-full" /> : <FiPlus size={30} className="bg-gray-300 p-2 rounded-full" />} {FaqVal.FaqTitle}</h3>

//                                 </div>

//                                 <AnimatePresence>
//                                     {openIndex === Index && (
//                                         <motion.div
//                                             key="faq-content"
//                                             initial={{ opacity: 0, height: 0 }}
//                                             animate={{ opacity: 1, height: "auto" }}
//                                             exit={{ opacity: 0, height: 0 }}
//                                             transition={{ duration: 0.3, ease: "easeInOut" }}
//                                             className="overflow-hidden"
//                                         >
//                                             <div className="mt-4 text-gray-600 text-base p-2 flex flex-col items-start gap-2">

//                                                 {FaqVal.FaqFact && FaqVal.FaqFact.map((FactVal, FactIdx) => {

//                                                     return (<li key={FactIdx} className="text-[1rem] font-semibold flex items-center justify-between"><FiChevronsRight className="text-orange-color mr-1" />{FactVal}</li>)

//                                                 })}

//                                             </div>
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>

//                             </div>

//                         )


//                     })

//                 }

//                 <BookOnline BookOnlineLink={""} />

//                 {notice && (
//                     <p className={`font-semibold text-[1.1rem] text-red-600 text-justify absolute animate-gradient-text -top-1 left-[20%] ${notice ? 'block' : 'hidden'}`}>{notice}</p>
//                 )}

//             </div>

//         </>

//     )
// }



import { BookOnline } from "../Buttons/BookOnline";
import { FiPlus, FiMinus, FiChevronsRight } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Modern, elegant, wide card-style Resort Ticket Booking Card with FAQ accordion.
 * - Increased card width for a premium, substantial feel.
 * - Clean separation of image, details, FAQ, and CTA.
 * - No hover background color; subtle shadow lift only.
 * - Neutral background and crisp accent colors.
 */
export const SouResortTicketBookingCards = ({
  FaqData,
  CardTitle,
  CardImg,
  PerAdultPrice,
  PerChildPrice,
  notice,
  Idx,
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const HandleFAQClick = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      key={Idx}
      className="relative w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col transition-transform duration-300 hover:-translate-y-1"
      style={{
        minHeight: 580,
        boxShadow: "0 2px 16px rgba(40,40,40,0.08)",
      }}
    >
      {/* Notice badge */}
      {notice && (
        <span className="absolute top-5 left-5 bg-gradient-to-r from-red-500 to-orange-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow animate-pulse z-10">
          {notice}
        </span>
      )}

      {/* Card image */}
      <div className="flex justify-center items-center mb-4 rounded-2xl overflow-hidden shadow-sm bg-gray-50">
        <img
          src={CardImg}
          alt={CardTitle}
          className="w-full max-w-[600px] h-56 object-cover"
        />
      </div>

      {/* Card Title */}
      <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
        {CardTitle}
      </h2>

      {/* Divider */}
      <div className="w-16 border-b-2 border-orange-400 mx-auto mb-4" />

      {/* Price section */}
      <div className="flex justify-center gap-16 mb-6">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase text-gray-400">Adult</span>
          <span className="text-2xl font-bold text-orange-500">{PerAdultPrice}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase text-gray-400">Child</span>
          <span className="text-2xl font-bold text-yellow-500">{PerChildPrice}</span>
        </div>
      </div>

      {/* FAQ Accordion */}
      {FaqData && FaqData.length > 0 && (
        <div className="mb-6 px-2">
          <div className="flex flex-col gap-3">
            {FaqData.map((FaqVal, index) => (
              <div
                key={index}
                className={`relative rounded-xl border border-orange-100 bg-white shadow-sm transition cursor-pointer px-4 py-3 ${
                  openIndex === index ? "ring-2 ring-orange-300" : ""
                }`}
                onClick={() => HandleFAQClick(index)}
              >
                <div className="faq-title flex justify-between items-center">
                  <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    {openIndex === index ? (
                      <FiMinus size={22} className="bg-gray-200 p-1 rounded-full text-orange-500" />
                    ) : (
                      <FiPlus size={22} className="bg-gray-200 p-1 rounded-full text-orange-500" />
                    )}
                    {FaqVal.FaqTitle}
                  </h4>
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="faq-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-2 ml-2 text-gray-700 text-base flex flex-col gap-2 pl-3">
                        {FaqVal.FaqFact &&
                          FaqVal.FaqFact.map((FactVal, FactIdx) => (
                            <li
                              key={FactIdx}
                              className="flex items-start gap-2 font-medium"
                            >
                              <FiChevronsRight className="mt-1 text-orange-500 shrink-0" />
                              {FactVal}
                            </li>
                          ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      <div className="mt-auto flex justify-center pb-6">
        <BookOnline BookOnlineLink="" />
      </div>
    </div>
  );
};