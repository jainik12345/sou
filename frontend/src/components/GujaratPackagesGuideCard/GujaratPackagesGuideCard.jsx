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

export const GujaratPackagesGuideCard = ({ Heading, Images, Title, Faq, TableData, Optional }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const HandleFAQClick = (Idx) => {
    setOpenIndex((prev) => (prev === Idx ? null : Idx));
  };

  useEffect(() => {
    const TmpInterval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % Images.length);
        setFade(true);
      }, 200);
    }, 3000);

    return () => clearInterval(TmpInterval);
  }, [Images.length]);

  return (
    <div className="GujaratPackagesGuideCard-cont p-5 grid gap-5">
      <h2 className="text-[2rem] text-center font-bold text-orange-color">{Heading}</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <div className={`testimonial overflow-hidden transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
          {Images && Images.length > 0 && (
            <img src={Images[currentIdx]} alt="IMG" className="w-full h-[400px] object-cover rounded-lg" />
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.4rem] font-bold text-orange-color">{Title}</h2>
            <Inquiry />
          </div>

          {

            Faq && Faq.map((Val, Idx) => {

              return (


                <div className="fact-cont relative border border-gray-400 p-5 select-none"
                  key={Idx} onClick={() => { HandleFAQClick(Idx) }}>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: openIndex === Idx ? '100%' : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute top-[-1px] left-[-1px] w-[4px] bg-orange-color rounded"
                  />

                  <div className="faq-title flex justify-between items-center transition-all duration-75 ease-in-out" >

                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-4">{openIndex === Idx ? <FiMinus size={30} className="bg-gray-300 p-2 rounded-full" /> : <FiPlus size={30} className="bg-gray-300 p-2 rounded-full" />} {Val.FaqTitle}</h3>

                  </div>

                  <AnimatePresence>
                    {openIndex === Idx && (
                      <motion.div
                        key="faq-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-gray-600 text-base p-2">
                          {Val.FaqFact}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>


              )

            })

          }
        </div>
      </div>

      <div className="overflow-x-auto p-5">
        <table className="min-w-full border-collapse border border-gray-300 text-center">



          <thead className="bg-orange-color text-white">
            <tr>

              {

                TableData && TableData.map((TableVal, TableIdx) => {

                  return (


                    <th className="border border-gray-300 p-3 " key={TableIdx}>{TableVal.Head}</th>

                  )

                })

              }

            </tr>
          </thead>
          <tbody className="text-gray-800">
            <tr>

              {
                TableData && TableData.map((Data, Idx) => {

                  return (

                    <td className={`border border-gray-300 p-3`} rowSpan={Idx === 0 ? 2 : 1}  key={Idx}>{Data.Value[0]}</td>

                  )


                })
              }
            </tr>
            <tr>

              {
                TableData && TableData.map((Data, Idx) => {

                  return (

                    <td className={`border border-gray-300 p-3 ${Idx === 0 ? "hidden" : ""}`}   key={Idx}>{Data.Value[1]}</td>

                  )


                })
              }
            </tr>
            <tr>


              {

                TableData && TableData.map((val, idx) => {

                  <td className="border border-gray-300 p-3" key={idx}>{val}</td>


                })

              }


            </tr>

            <tr >

              {Optional && Optional.map((OptionalVal, OptionalIdx) => {
                return (
                  <td className={`border border-gray-300 p-3 `}colSpan={OptionalIdx === 0 ? 2 : 5}  key={OptionalIdx}>{OptionalVal}</td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
};