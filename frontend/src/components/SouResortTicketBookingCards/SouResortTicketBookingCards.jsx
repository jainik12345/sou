import { BookOnline } from "../Buttons/BookOnline";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronsRight } from "react-icons/fi";


export const SouResortTicketBookingCards = ({ FaqData, CardTitle, CardImg, PerAdultPrice, PerChildPrice, notice, Idx }) => {


    const [openIndex, setOpenIndex] = useState(null);

    const HandleFAQClick = (Idx) => {

        setOpenIndex((prev) => {


            return (prev === Idx ? null : Idx);

        })

    }

    return (

        <>
            <div className="Ticket-Card text-center rounded-2xl shadow-xl/30 flex flex-col p-5 gap-3 relative h-[100%]" key={Idx}>
        
                <h2 className="font-bold text-orange-color md:text-[1.2rem] text-[1rem]">{CardTitle}</h2>

                <div className="Card-Img flex justify-center items-center ">

                    <img src={CardImg} alt="IMG" className="h-60 w-100" />

                </div>


                <div className="package-rates grid grid-col-2 gap-3 p-3">

                    <h2 className="font-bold text-orange-color text-[1.2rem] text-center w-full col-span-2">Package Rates:</h2>

                    <h2 className="font-bold text-gray-600 text-[1rem]">Per Adult :- {PerAdultPrice}</h2>

                    <h2 className="font-bold text-gray-600 text-[1rem]">Per Child :- {PerChildPrice}</h2>

                </div>

                {

                    FaqData && FaqData.map((FaqVal, Index) => {


                        return (


                            <div className="fact-cont relative border border-gray-400 p-3 select-none"
                                key={Index} onClick={() => { HandleFAQClick(Index) }}>

                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: openIndex === Index ? '100%' : 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute top-[-1px] left-[-1px] w-[4px] bg-orange-color rounded"
                                />

                                <div className="faq-title flex justify-between items-center transition-all duration-75 ease-in-out" >

                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-4">{openIndex === Index ? <FiMinus size={30} className="bg-gray-300 p-2 rounded-full" /> : <FiPlus size={30} className="bg-gray-300 p-2 rounded-full" />} {FaqVal.FaqTitle}</h3>

                                </div>

                                <AnimatePresence>
                                    {openIndex === Index && (
                                        <motion.div
                                            key="faq-content"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-4 text-gray-600 text-base p-2 flex flex-col items-start gap-2">

                                                {FaqVal.FaqFact && FaqVal.FaqFact.map((FactVal, FactIdx) => {

                                                    return (<li key={FactIdx} className="text-[1rem] font-semibold flex items-center justify-between"><FiChevronsRight className="text-orange-color mr-1" />{FactVal}</li>)

                                                })}

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                        )


                    })

                }

                <BookOnline BookOnlineLink={""} />

                {notice && (
                    <p className={`font-semibold text-[1.1rem] text-red-600 text-justify absolute animate-gradient-text -top-1 left-[20%] ${notice ? 'block' : 'hidden'}`}>{notice}</p>
                )}

            </div>

        </>

    )
}
