// import { useState, useEffect } from "react";
// import { Inquiry } from "../../components/Buttons/Inquiry";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiPlus, FiMinus } from "react-icons/fi";

// export const GujaratPackagesGuideCard = ({ Heading, Images, Title, Faq, TableData, Optional }) => {
//   const [currentIdx, setCurrentIdx] = useState(0);
//   const [fade, setFade] = useState(true);
//   const [openIndex, setOpenIndex] = useState(null);

//   const HandleFAQClick = (Idx) => {
//     setOpenIndex((prev) => (prev === Idx ? null : Idx));
//   };

//   useEffect(() => {
//     const TmpInterval = setInterval(() => {
//       setFade(false);

//       setTimeout(() => {
//         setCurrentIdx((prev) => (prev + 1) % Images.length);
//         setFade(true);
//       }, 200);
//     }, 3000);

//     return () => clearInterval(TmpInterval);
//   }, [Images.length]);

//   return (
//     <div className="GujaratPackagesGuideCard-cont p-5 grid gap-5">
//       <h2 className="text-[2rem] text-center font-bold text-orange-color">{Heading}</h2>

//       <div className="grid md:grid-cols-2 gap-5">
//         <div className={`testimonial overflow-hidden transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
//           {Images && Images.length > 0 && (
//             <img src={Images[currentIdx]} alt="IMG" className="w-full h-[400px] object-cover rounded-lg" />
//           )}
//         </div>

//         <div className="flex flex-col gap-5">
//           <div className="flex items-center justify-between">
//             <h2 className="text-[1.4rem] font-bold text-orange-color">{Title}</h2>
//             <Inquiry />
//           </div>

//           {

//             Faq && Faq.map((Val, Idx) => {

//               return (


//                 <div className="fact-cont relative border border-gray-400 p-5 select-none"
//                   key={Idx} onClick={() => { HandleFAQClick(Idx) }}>

//                   <motion.div
//                     initial={{ height: 0 }}
//                     animate={{ height: openIndex === Idx ? '100%' : 0 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                     className="absolute top-[-1px] left-[-1px] w-[4px] bg-orange-color rounded"
//                   />

//                   <div className="faq-title flex justify-between items-center transition-all duration-75 ease-in-out" >

//                     <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-4">{openIndex === Idx ? <FiMinus size={30} className="bg-gray-300 p-2 rounded-full" /> : <FiPlus size={30} className="bg-gray-300 p-2 rounded-full" />} {Val.FaqTitle}</h3>

//                   </div>

//                   <AnimatePresence>
//                     {openIndex === Idx && (
//                       <motion.div
//                         key="faq-content"
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3, ease: "easeInOut" }}
//                         className="overflow-hidden"
//                       >
//                         <div className="mt-4 text-gray-600 text-base p-2">
//                           {Val.FaqFact}
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>

//                 </div>


//               )

//             })

//           }
//         </div>
//       </div>

//       <div className="overflow-x-auto p-5">
//         <table className="min-w-full border-collapse border border-gray-300 text-center">



//           <thead className="bg-orange-color text-white">
//             <tr>

//               {

//                 TableData && TableData.map((TableVal, TableIdx) => {

//                   return (


//                     <th className="border border-gray-300 p-3 " key={TableIdx}>{TableVal.Head}</th>

//                   )

//                 })

//               }

//             </tr>
//           </thead>
//           <tbody className="text-gray-800">
//             <tr>

//               {
//                 TableData && TableData.map((Data, Idx) => {

//                   return (

//                     <td className={`border border-gray-300 p-3`} rowSpan={Idx === 0 ? 2 : 1}  key={Idx}>{Data.Value[0]}</td>

//                   )


//                 })
//               }
//             </tr>
//             <tr>

//               {
//                 TableData && TableData.map((Data, Idx) => {

//                   return (

//                     <td className={`border border-gray-300 p-3 ${Idx === 0 ? "hidden" : ""}`}   key={Idx}>{Data.Value[1]}</td>

//                   )


//                 })
//               }
//             </tr>
//             <tr>


//               {

//                 TableData && TableData.map((val, idx) => {

//                   <td className="border border-gray-300 p-3" key={idx}>{val}</td>


//                 })

//               }


//             </tr>

//             <tr >

//               {Optional && Optional.map((OptionalVal, OptionalIdx) => {
//                 return (
//                   <td className={`border border-gray-300 p-3 `}colSpan={OptionalIdx === 0 ? 2 : 5}  key={OptionalIdx}>{OptionalVal}</td>
//                 )
//               })}
//             </tr>
//           </tbody>
//         </table>
//       </div>


//     </div>
//   );
// };

import { useState, useEffect } from "react";
import { Inquiry } from "../../components/Buttons/Inquiry";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

export const GujaratPackagesGuideCard = ({
  Heading,
  Images = [],
  Title,
  Faq = [],
  TableData = [],
  Optional = [],
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const handleFAQClick = (Idx) => {
    setOpenIndex((prev) => (prev === Idx ? null : Idx));
  };

  // Image slider w/ fade
  useEffect(() => {
    if (!Images.length) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % Images.length);
        setFade(true);
      }, 200);
    }, 3500);
    return () => clearInterval(interval);
  }, [Images.length]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 grid gap-8 max-w-screen-xl mx-auto">
      <h2 className="text-3xl sm:text-4xl text-center font-extrabold text-orange-500 tracking-tight">{Heading}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className={`overflow-hidden rounded-2xl transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          {Images.length > 0 && (
            <img
              src={Images[currentIdx]}
              alt={Title || "Image"}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-500">{Title}</h2>
            <Inquiry />
          </div>
          <div className="flex flex-col gap-3">
            {Faq.map((val, idx) => (
              <div
                className={`relative border border-gray-200 rounded-xl bg-gray-50 transition-all shadow-sm hover:shadow-md cursor-pointer`}
                key={idx}
                onClick={() => handleFAQClick(idx)}
              >
                {/* Accent bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: openIndex === idx ? "100%" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-1 bg-orange-500 rounded-tl-xl rounded-bl-xl"
                />
                <div className="flex justify-between items-center gap-4 px-5 py-4">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    {openIndex === idx ? (
                      <FiMinus size={22} className="bg-gray-200 p-1 rounded-full" />
                    ) : (
                      <FiPlus size={22} className="bg-gray-200 p-1 rounded-full" />
                    )}
                    
                    {val.FaqTitle}
                  </h3>
                </div>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      key="faq-content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden px-5 pb-4"
                    >
                      <div className="text-gray-600 text-base">{val.FaqFact}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      {TableData.length > 0 && (
        <div className="overflow-x-auto rounded-2xl shadow-inner bg-white">
          <table className="min-w-full border-collapse text-center">
            <thead>
              <tr className="bg-orange-500 text-white">
                {TableData.map((col, idx) => (
                  <th className="border border-gray-300 p-3 font-semibold" key={idx}>
                    {col.Head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {/* Render each row based on max .Value array length */}
              {(() => {
                const rows = [];
                const maxRows = Math.max(...TableData.map((col) => col.Value.length));
                for (let row = 0; row < maxRows; row++) {
                  rows.push(
                    <tr key={row}>
                      {TableData.map((col, idx) => (
                        <td className="border border-gray-300 p-3" key={idx}>
                          {col.Value[row] ?? ""}
                        </td>
                      ))}
                    </tr>
                  );
                }
                return rows;
              })()}
              {/* Optional row */}
              {Optional.length > 0 && (
                <tr>
                  <td
                    className="border border-gray-300 p-3 font-medium text-orange-600 bg-orange-50"
                    colSpan={TableData.length}
                  >
                    {Optional.join(" / ")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};