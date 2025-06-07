import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "../AboutData";

export const AboutFAQ = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const HandleFAQClick = (Idx) => {

        setOpenIndex((prev) => {


            return (prev === Idx ? null : Idx);

        })

    }

    return (

        <>

            <div className="AboutFAQ-section">


                <div className="AboutFAQ-cont max-w-screen-xl mx-auto md:p-20 px-5  py-20 flex flex-col gap-5">

                    <div className="FAQ-heading flex flex-col gap-5 text-center">

                        <h2 className="text-orange-color lg:text-[2.5rem] md:text-[2rem] sm:text-[1.5rem] text-[1.2rem] font-bold flex justify-center items-center relative">Intresting Facts About Statue of Unity </h2>

                        <p className="text-gray-600 text-[1.2rem] font-semibold">Here are some intresting facts which you should know about Statue of Unity.</p>

                    </div>

                    <div className="FAQ-cont gap-5 flex flex-col">

                        {

                            FAQ.map((Val, Idx) => {

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


            </div>

        </>

    )
}