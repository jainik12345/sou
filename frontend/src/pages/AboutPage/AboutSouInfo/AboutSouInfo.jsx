import { AboutStatueInfo } from "../AboutData.js";
import { motion } from "framer-motion";


export const AboutSouInfo = () => {

    return (

        <>
            <div className="AboutStatueInfo-section bg-gray-300">

                {
                    AboutStatueInfo.map((Val, Idx) => {

                        return (

                            <div className="AboutStatueInfo-cont max-w-screen-xl mx-auto md:p-15 px-5 py-15 flex flex-col gap-5" key={Idx}>

                                <div className="AboutStatueInfo-header text-center">

                                    <h2 className="text-orange-color text-[2rem] font-semibold">About Statue of Unity</h2>

                                </div>

                                <div className="AboutStatueInfo-Desc md:px-4 px-0">

                                    <p className="text-justify text-base/7 font-[500] text-gray-700 ">{Val.ImgDesc}</p>

                                </div>

                                <div className="AboutStatueInfo-Imgs flex md:flex-row flex-col justify-around items-center  mt-5 ">

                                    {

                                        Val.StatueImgs.map((ValImg, ValIdx) => {

                                            return (

                                                <motion.div className="Statue-Img flex flex-col justify-center items-center text-center gap-3" key={ValIdx} initial={{ opacity: 0, x: -50 }}
                                                
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.6, delay: ValIdx * 0.2 }}
                                                    viewport={{ once: true }}>

                                                    <img src={ValImg.ImgUrl} alt="IMG" className="md:h-50 h-90" />

                                                    <h3 className="font-[700] text-orange-color xl:text-[1rem] lg:text-[.9rem] md:text-[.7rem] text-[1.5rem]">{ValImg.ImgTitle}</h3>

                                                    <h4 className="text-gray-600 font-[600] xl:text-[1rem] lg:text-[.9rem] md:text-[.7rem] text-[1.3rem]">{ValImg.Height}</h4>

                                                </motion.div>

                                            )

                                        })

                                    }

                                </div>

                            </div>

                        )

                    })

                }

            </div>

        </>

    )
}

