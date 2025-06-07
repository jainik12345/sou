import { ExploreTestimonialCards } from "../HomeData.js";
import { ExploreCard } from "../../../components/ExploreCard/ExploreCard.jsx";
import { useState , useEffect } from "react";

export const HomepageExploreAttractions = () => {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerPage, setCardsPerPage] = useState(3);
    const [Fade, setFade] = useState(true);

    const totalSlides = Math.ceil(ExploreTestimonialCards.length / cardsPerPage);
    const currentSlide = Math.floor(currentIndex / cardsPerPage);

    // 🔁 Responsive handler
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width >= 1024) {
                setCardsPerPage(3);
            } else if (width >= 768) {
                setCardsPerPage(2);
            } else {
                setCardsPerPage(1);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const ExploreCardInterval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(ExploreCardInterval);
    }, [cardsPerPage]);

    const handleNext = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prev) =>
                prev + cardsPerPage >= ExploreTestimonialCards.length ? 0 : prev + cardsPerPage
            );
            setFade(true);
        }, 300);
    };

    const visibleCards = ExploreTestimonialCards.slice(currentIndex, currentIndex + cardsPerPage);

    return (
        <>

            <div className="explore-section bg-section-background-color py-10">
                <div className="explore-cont max-w-screen mx-auto">
                    <div className="explore-title-cont flex justify-center items-center flex-col gap-2">
                        <h3 className="text-orange-color font-bold text-[2rem] text-center">
                            Explore Attractions near Statue of Unity
                        </h3>
                        <p className="text-grey-text font-bold text-center">
                            Explore various natural and architecture attraction in Ekta nagar.
                        </p>
                    </div>

                    <div className="explore-cards-section mt-10 relative">
                        <div
                            className={`explore-cards-cont flex gap-9 overflow-hidden max-w-screen-xl mx-auto transition-opacity duration-700 ${Fade ? "opacity-100" : "opacity-0"
                                } justify-center items-center`}
                        >
                            <ExploreCard visibleCards={visibleCards} />
                        </div>

                        <div className="ExploreCardDots flex justify-center items-center mt-6 gap-2">
                            {Array.from({ length: totalSlides }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-3 w-3  cursor-pointer transition-all duration-300 ${idx === currentSlide ? "bg-orange-color scale-110" : "bg-gray-300"
                                        }`}
                                    onClick={() => {
                                        setFade(false);
                                        setTimeout(() => {
                                            setCurrentIndex(idx * cardsPerPage);
                                            setFade(true);
                                        }, 300);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


