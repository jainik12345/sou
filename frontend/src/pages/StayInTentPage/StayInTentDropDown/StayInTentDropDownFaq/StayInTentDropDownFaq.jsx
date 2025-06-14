/* eslint-disable no-unused-vars */

// import { FiPlus, FiMinus } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { StayInTentDropDownData } from "../../StayInTent.js";

// export const StayInTentDropDownFaq = () => {
//   const { StayInTentPath } = useParams();
//   const FormattedPath = StayInTentPath.toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");
//   const FormattedData = StayInTentDropDownData[FormattedPath]?.Faq || [];
//   const [openIndex, setOpenIndex] = useState(null);

//   const HandleFAQClick = (Idx) => {
//     setOpenIndex((prev) => (prev === Idx ? null : Idx));
//   };

//   // Only render section if there are FAQs available
//   if (!Array.isArray(FormattedData) || FormattedData.length === 0) {
//     return null;
//   }

//   return (
//     <section className="w-full py-16 bg-white ">
//       <div className="max-w-screen-xl mx-auto px-4">
//         <div className="text-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
//             <span className="text-orange-500">Interesting Facts</span> About
//             Statue of Unity
//           </h2>
//           <p className="text-gray-600 text-lg font-medium">
//             Here are some interesting facts you should know about the Statue of
//             Unity.
//           </p>
//         </div>
//         <div className="flex flex-col gap-5 w-full">
//           {FormattedData.map((Val, Idx) => (
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
//                       <FiMinus
//                         size={24}
//                         className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm"
//                       />
//                     ) : (
//                       <FiPlus
//                         size={24}
//                         className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm"
//                       />
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

/* */

import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";

export const StayInTentDropDownFaq = () => {
  const { StayInTentPath } = useParams();
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Format the route param for matching
  const formattedPath = StayInTentPath.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setFaqs([]);
    setOpenIndex(null);

    // 1. Fetch all sou_package_name
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        const allPackages = res.data.data || [];
        // 2. Find package whose name matches formattedPath
        const found = allPackages.find(
          (pkg) =>
            pkg.sou_package_name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") === formattedPath
        );
        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        // 3. Fetch FAQs for that package
        return axios.get(`${BE_URL}/souPackageFaqs/package/${found.id}`);
      })
      .then((faqRes) => {
        if (faqRes && faqRes.data && faqRes.data.data) {
          setFaqs(faqRes.data.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [formattedPath]);

  const HandleFAQClick = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  if (loading) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <span className="text-lg">Loading...</span>
        </div>
      </section>
    );
  }
  if (notFound || !faqs.length) {
    return null;
  }

  return (
    <section className="w-full py-16 bg-white ">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            <span className="text-orange-500">Interesting Facts</span> About
            Statue of Unity
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Here are some interesting facts you should know about the Statue of
            Unity.
          </p>
        </div>
        <div className="flex flex-col gap-5 w-full">
          {faqs.map((faq, idx) => (
            <div
              key={faq.id}
              className={`relative transition-all duration-200 rounded-xl border border-gray-200 shadow-sm bg-gray-50 hover:shadow-lg cursor-pointer`}
              onClick={() => HandleFAQClick(idx)}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <span
                    className={`transition-transform duration-200 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  >
                    {openIndex === idx ? (
                      <FiMinus
                        size={24}
                        className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm"
                      />
                    ) : (
                      <FiPlus
                        size={24}
                        className="bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm"
                      />
                    )}
                  </span>
                  {faq.question}
                </h3>
              </div>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    key="faq-content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Accent vertical bar */}
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === idx ? "100%" : "0%",
                  opacity: openIndex === idx ? 1 : 0,
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
