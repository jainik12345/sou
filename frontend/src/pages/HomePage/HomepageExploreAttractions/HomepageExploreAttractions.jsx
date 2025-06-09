// import { ExploreTestimonialCards } from "../HomeData.js";
// import { ExploreCard } from "../../../components/ExploreCard/ExploreCard.jsx";
// import { useState , useEffect } from "react";

// export const HomepageExploreAttractions = () => {


//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [cardsPerPage, setCardsPerPage] = useState(3);
//     const [Fade, setFade] = useState(true);

//     const totalSlides = Math.ceil(ExploreTestimonialCards.length / cardsPerPage);
//     const currentSlide = Math.floor(currentIndex / cardsPerPage);

//     // 🔁 Responsive handler
//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth;

//             if (width >= 1024) {
//                 setCardsPerPage(3);
//             } else if (width >= 768) {
//                 setCardsPerPage(2);
//             } else {
//                 setCardsPerPage(1);
//             }
//         };

//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     useEffect(() => {
//         const ExploreCardInterval = setInterval(() => {
//             handleNext();
//         }, 5000);
//         return () => clearInterval(ExploreCardInterval);
//     }, [cardsPerPage]);

//     const handleNext = () => {
//         setFade(false);
//         setTimeout(() => {
//             setCurrentIndex((prev) =>
//                 prev + cardsPerPage >= ExploreTestimonialCards.length ? 0 : prev + cardsPerPage
//             );
//             setFade(true);
//         }, 300);
//     };

//     const visibleCards = ExploreTestimonialCards.slice(currentIndex, currentIndex + cardsPerPage);

//     return (
//         <>

//             <div className="explore-section bg-section-background-color py-10">
//                 <div className="explore-cont max-w-screen mx-auto">
//                     <div className="explore-title-cont flex justify-center items-center flex-col gap-2">
//                         <h3 className="text-orange-color font-bold text-[2rem] text-center">
//                             Explore Attractions near Statue of Unity
//                         </h3>
//                         <p className="text-grey-text font-bold text-center">
//                             Explore various natural and architecture attraction in Ekta nagar.
//                         </p>
//                     </div>

//                     <div className="explore-cards-section mt-10 relative">
//                         <div
//                             className={`explore-cards-cont flex gap-9 overflow-hidden max-w-screen-xl mx-auto transition-opacity duration-700 ${Fade ? "opacity-100" : "opacity-0"
//                                 } justify-center items-center`}
//                         >
//                             <ExploreCard visibleCards={visibleCards} />
//                         </div>

//                         <div className="ExploreCardDots flex justify-center items-center mt-6 gap-2">
//                             {Array.from({ length: totalSlides }).map((_, idx) => (
//                                 <div
//                                     key={idx}
//                                     className={`h-3 w-3  cursor-pointer transition-all duration-300 ${idx === currentSlide ? "bg-orange-color scale-110" : "bg-gray-300"
//                                         }`}
//                                     onClick={() => {
//                                         setFade(false);
//                                         setTimeout(() => {
//                                             setCurrentIndex(idx * cardsPerPage);
//                                             setFade(true);
//                                         }, 300);
//                                     }}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>
//     )
// }



import { ExploreTestimonialCards } from "../HomeData.js";
import { ExploreCard } from "../../../components/ExploreCard/ExploreCard.jsx";
import { useState, useEffect } from "react";

export const HomepageExploreAttractions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [fade, setFade] = useState(true);

  const totalSlides = Math.ceil(ExploreTestimonialCards.length / cardsPerPage);
  const currentSlide = Math.floor(currentIndex / cardsPerPage);

  // Responsive handler
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

  // Autoplay
  useEffect(() => {
    const ExploreCardInterval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(ExploreCardInterval);
  }, [cardsPerPage, currentIndex]);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev + cardsPerPage >= ExploreTestimonialCards.length ? 0 : prev + cardsPerPage
      );
      setFade(true);
    }, 350);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev - cardsPerPage < 0
          ? Math.max(
              0,
              ExploreTestimonialCards.length - cardsPerPage
            )
          : prev - cardsPerPage
      );
      setFade(true);
    }, 350);
  };

  const visibleCards = ExploreTestimonialCards.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <section className="explore-section bg-gray-50 py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title and subtitle */}
        <div className="flex flex-col gap-2 items-center mb-10">
          <h3 className="text-orange-500 font-extrabold text-3xl md:text-4xl text-center drop-shadow-sm">
            Explore Attractions Near Statue of Unity
          </h3>
          <p className="text-gray-500 font-medium text-lg md:text-xl text-center max-w-2xl">
            Explore various natural and architectural attractions in Ekta Nagar.
          </p>
        </div>

        {/* Cards Slider */}
        <div className="relative">
          {/* Prev Button */}
          <button
            className="absolute md:left-[-2.2rem] left-[.5rem] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-orange-100 transition disabled:opacity-40"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M13 16l-5-5 5-5" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Cards */}
          <div
            className={`flex gap-8 overflow-hidden justify-center transition-opacity duration-500 px-1 md:px-0 ${fade ? "opacity-100" : "opacity-0"}`}
            style={{ minHeight: 310 }}
          >
            <ExploreCard visibleCards={visibleCards} />
          </div>
          {/* Next Button */}
          <button
            className="absolute md:right-[-2.2rem] right-[.5rem] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-orange-100 transition disabled:opacity-40"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M7 4l5 5-5 5" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center mt-7 gap-3">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <span
              key={idx}
              className={`h-3 w-3 rounded-full cursor-pointer border border-orange-200 transition-all duration-300 shadow ${
                idx === currentSlide
                  ? "bg-orange-500 scale-125 shadow-orange-200"
                  : "bg-gray-300"
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
    </section>
  );
};