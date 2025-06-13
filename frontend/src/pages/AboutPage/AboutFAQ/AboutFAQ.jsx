// import { FiPlus, FiMinus } from "react-icons/fi";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FAQ } from "../AboutData";

// export const AboutFAQ = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const HandleFAQClick = (Idx) => {
//     setOpenIndex((prev) => (prev === Idx ? null : Idx));
//   };

//   // Only render section if there are FAQs available
//   if (!Array.isArray(FAQ) || FAQ.length === 0) {
//     return null;
//   }

//   return (
//     <section className="w-full py-16 bg-white">
//       <div className="max-w-screen-xl mx-auto px-4">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
//             <span className="text-orange-500">Interesting Facts</span> About Statue of Unity
//           </h2>
//           <p className="text-gray-600 text-lg font-medium">
//             Here are some interesting facts you should know about the Statue of Unity.
//           </p>
//         </div>
//         <div className="flex flex-col gap-5 w-full">
//           {FAQ.map((Val, Idx) => (
//             <div
//               key={Idx}
//               className={`relative transition-all duration-200 rounded-xl border border-gray-200 shadow-sm bg-gray-50 hover:shadow-lg cursor-pointer`}
//               onClick={() => HandleFAQClick(Idx)}
//             >
//               <div className="flex items-center justify-between px-6 py-5">
//                 <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-3">
//                   <span
//                     className={`transition-transform duration-200 ${
//                       openIndex === Idx ? "rotate-180" : ""
//                     }`}
//                   >
//                     {openIndex === Idx ? (
//                       <FiMinus size={24} className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm" />
//                     ) : (
//                       <FiPlus size={24} className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm" />
//                     )}
//                   </span>
//                   {Val.FaqTitle}
//                 </h3>
//               </div>
//               <AnimatePresence>
//                 {openIndex === Idx && (
//                   <motion.div
//                     key="faq-content"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.25, ease: "easeInOut" }}
//                     className="overflow-hidden"
//                   >
//                     <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
//                       {Val.FaqFact}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//               {/* Accent vertical bar */}
//               <motion.div
//                 initial={false}
//                 animate={{
//                   height: openIndex === Idx ? "100%" : "0%",
//                   opacity: openIndex === Idx ? 1 : 0,
//                 }}
//                 transition={{ duration: 0.25 }}
//                 className="absolute left-0 top-0 w-1 bg-orange-500 rounded-tl-xl rounded-bl-xl"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };





import { FiPlus, FiMinus } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "../AboutData";
import BE_URL from "../../../config";
import axios from "axios";

export const AboutFAQ = () => {

  //useState Declarations

  const [openIndex, setOpenIndex] = useState(null);
  const [FetchError, setFetchError] = useState(null);
  const [AboutFaq, setAboutFaq] = useState(null);


  // Handling Faq On Click Logic

  const HandleFAQClick = (Idx) => {
    setOpenIndex((prev) => (prev === Idx ? null : Idx));
  };

  // Only render section if there are FAQs available
  if (!Array.isArray(FAQ) || FAQ.length === 0) {
    return null;
  }

  //fetching api here

  useEffect(() => {

    const FetchAboutFaq = async () => {

      try {

        const FetchResponse = await axios.get(`${BE_URL}/aboutIntrestingFaqs`);

        if (FetchResponse.status === 200) {

          setAboutFaq(FetchResponse.data.data);

        } else {

          console.error("unexpected api status code received:- ", FetchResponse.status);

        }


      } catch (error) {

        console.error("Unable To Fetch The About Faq Section:- ", error);
        setFetchError("Unable To Load The Data ");

      }
    }

    FetchAboutFaq();

  }, []);

  return (


    <section className="w-full bg-white">

      {FetchError && (
        <div className="text-center text-red-600 font-semibold text-lg py-10">
          {FetchError}
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            <span className="text-orange-500">Interesting Facts</span> About Statue of Unity
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Here are some interesting facts you should know about the Statue of Unity.
          </p>
        </div>
        <div className="flex flex-col gap-5 w-full">
          {AboutFaq?.map((Val, Idx) => (
            <div
              key={Idx}
              className={`relative transition-all duration-200 rounded-xl border border-gray-200 shadow-sm bg-gray-50 hover:shadow-lg cursor-pointer`}
              onClick={() => HandleFAQClick(Idx)}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <span
                    className={`transition-transform duration-200 ${openIndex === Idx ? "rotate-180" : ""
                      }`}
                  >
                    {openIndex === Idx ? (
                      <FiMinus size={24} className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm" />
                    ) : (
                      <FiPlus size={24} className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm" />
                    )}
                  </span>
                  {Val.questions}
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
                      {Val.answer}
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