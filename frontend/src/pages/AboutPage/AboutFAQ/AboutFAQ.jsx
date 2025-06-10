// import { FiPlus } from "react-icons/fi";
// import { FiMinus } from "react-icons/fi";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FAQ } from "../AboutData";

// export const AboutFAQ = () => {

//     const [openIndex, setOpenIndex] = useState(null);

//     const HandleFAQClick = (Idx) => {

//         setOpenIndex((prev) => {


//             return (prev === Idx ? null : Idx);

//         })

//     }

//     return (

//         <>

//             <div className="AboutFAQ-section">


//                 <div className="AboutFAQ-cont max-w-screen-xl mx-auto md:p-20 px-5  py-20 flex flex-col gap-5">

//                     <div className="FAQ-heading flex flex-col gap-5 text-center">

//                         <h2 className="text-orange-color lg:text-[2.5rem] md:text-[2rem] sm:text-[1.5rem] text-[1.2rem] font-bold flex justify-center items-center relative">Intresting Facts About Statue of Unity </h2>

//                         <p className="text-gray-600 text-[1.2rem] font-semibold">Here are some intresting facts which you should know about Statue of Unity.</p>

//                     </div>

//                     <div className="FAQ-cont gap-5 flex flex-col">

//                         {

//                             FAQ.map((Val, Idx) => {

//                                 return (



//                                     <div className="fact-cont relative border border-gray-400 p-3 select-none"
//                                         key={Idx} onClick={() => { HandleFAQClick(Idx) }}>

//                                         <motion.div
//                                             initial={{ height: 0 }}
//                                             animate={{ height: openIndex === Idx ? '100%' : 0 }}
//                                             transition={{ duration: 0.3, ease: "easeInOut" }}
//                                             className="absolute top-[-1px] left-[-1px] w-[4px] bg-orange-color rounded"
//                                         />

//                                         <div className="faq-title flex justify-between items-center transition-all duration-75 ease-in-out" >

//                                             <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-4">{openIndex === Idx ? <FiMinus size={30} className="bg-gray-300 p-2 rounded-full" /> : <FiPlus size={30} className="bg-gray-300 p-2 rounded-full" />} {Val.FaqTitle}</h3>

//                                         </div>

//                                         <AnimatePresence>
//                                             {openIndex === Idx && (
//                                                 <motion.div
//                                                     key="faq-content"
//                                                     initial={{ opacity: 0, height: 0 }}
//                                                     animate={{ opacity: 1, height: "auto" }}
//                                                     exit={{ opacity: 0, height: 0 }}
//                                                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                                                     className="overflow-hidden"
//                                                 >
//                                                     <div className="mt-4 text-gray-600 text-base p-2">
//                                                         {Val.FaqFact}
//                                                     </div>
//                                                 </motion.div>
//                                             )}
//                                         </AnimatePresence>

//                                     </div>



//                                 )

//                             })

//                         }

//                     </div>

//                 </div>


//             </div>

//         </>

//     )
// }


import { FiPlus, FiMinus } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "../AboutData";

export const AboutFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const HandleFAQClick = (Idx) => {
    setOpenIndex((prev) => (prev === Idx ? null : Idx));
  };

  // Only render section if there are FAQs available
  if (!Array.isArray(FAQ) || FAQ.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            <span className="text-orange-500">Interesting Facts</span> About Statue of Unity
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Here are some interesting facts you should know about the Statue of Unity.
          </p>
        </div>
        <div className="flex flex-col gap-5 w-full">
          {FAQ.map((Val, Idx) => (
            <div
              key={Idx}
              className={`relative transition-all duration-200 rounded-xl border border-gray-200 shadow-sm bg-gray-50 hover:shadow-lg cursor-pointer`}
              onClick={() => HandleFAQClick(Idx)}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <span
                    className={`transition-transform duration-200 ${
                      openIndex === Idx ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === Idx ? (
                      <FiMinus size={24} className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm" />
                    ) : (
                      <FiPlus size={24} className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm" />
                    )}
                  </span>
                  {Val.FaqTitle}
                </h3>
              </div>
              <AnimatePresence>
                {openIndex === Idx && (
                  <motion.div
                    key="faq-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
                      {Val.FaqFact}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Accent vertical bar */}
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === Idx ? "100%" : "0%",
                  opacity: openIndex === Idx ? 1 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="absolute left-0 top-0 w-1 bg-orange-500 rounded-tl-xl rounded-bl-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};