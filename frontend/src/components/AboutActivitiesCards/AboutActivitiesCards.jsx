import { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../config.js";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";

export const AboutActivitiesCards = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [AboutActivities, setAboutActivities] = useState(null);
    const [FetchError, setFetchError] = useState(null);

    useEffect(() => {
        const FetchAboutActivities = async () => {
            try {
                const FetchResponse = await axios.get(`${BE_URL}/aboutActivitiesSection`);
                if (FetchResponse.status === 200) {
                    setAboutActivities(FetchResponse.data.data);
                    setFetchError(null);
                } else {
                    console.error("unexpected api status code received:- ", FetchResponse.status);
                }
            } catch (error) {
                console.error("Unable To Fetch The About Activities Section:- ", error);
                setFetchError("Unable To Load The Data ");
            }
        };
        FetchAboutActivities();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Down-to-up variant for framer-motion
    const downToUpVariant = {
        hidden: { opacity: 0, y: 80 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, type: "spring" }
        }
    };

    return (
        <>
            <div className="about-activities-cont max-w-screen-xl mx-auto sm:px-10 px-5 space-y-10">
                {FetchError && (
                    <div className="text-center text-red-600 font-semibold text-lg py-10">
                        {FetchError}
                    </div>
                )}

                {AboutActivities &&
                    AboutActivities.map((Val, Idx) => {
                        const isEven = Idx % 2 === 0;
                        return (
                            <motion.div
                                key={Idx}
                                className={`Card-cont flex ${isMobile ? "flex-col" : isEven ? "flex-row" : "flex-row-reverse"} gap-5 sm:mt-20 mt-5`}
                                variants={downToUpVariant}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <motion.div
                                    className="Card-Img-cont md:w-1/2 w-full"
                                    variants={downToUpVariant}
                                >
                                    <LazyLoadImage
                                        src={`${BE_URL}/Images/AboutImages/Activities/${Val.image}`}
                                        alt="IMG"
                                        className="w-full h-full object-cover rounded-xl"
                                        effect="blur"
                                    />
                                </motion.div>
                                <motion.div
                                    className="Card-Desc-cont md:w-1/2 w-full flex flex-col gap-5 justify-center"
                                    variants={downToUpVariant}
                                >
                                    <h2 className="text-orange-color font-semibold text-[1.5rem]">
                                        {Val.heading}
                                    </h2>
                                    <p className="leading-8 text-gray-600 text-justify">
                                        {Val.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
            </div>
        </>
    );
};