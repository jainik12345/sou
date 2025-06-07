import { AboutActivitiesCardsData } from "../../pages/AboutPage/AboutData";
import { useEffect, useState } from "react";

export const AboutActivitiesCards = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Track window resize to detect if it's mobile view
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <div className="about-activities-cont max-w-screen-xl mx-auto sm:px-10 px-5  space-y-10">
                {AboutActivitiesCardsData &&
                    AboutActivitiesCardsData.map((Val, Idx) => {
                        const isEven = Idx % 2 === 0;
                        return (
                            <div
                                key={Idx}
                                className={`Card-cont flex ${isMobile ? "flex-col" : isEven ? "flex-row" : "flex-row-reverse"
                                    } gap-5 sm:mt-20 mt-5`}
                            >   
                                <div className="Card-Img-cont md:w-1/2 w-full">
                                    <img src={Val.ImgUrl} alt="IMG" className="w-full h-full object-cover rounded-xl" />
                                </div>

                                <div className="Card-Desc-cont md:w-1/2 w-full flex flex-col gap-5 justify-center">
                                    <h2 className="text-orange-color font-semibold text-[1.5rem]">
                                        {Val.ImgTitle}
                                    </h2>
                                    <p className="leading-8 text-gray-600 text-justify">
                                        {Val.ImgDesc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};
