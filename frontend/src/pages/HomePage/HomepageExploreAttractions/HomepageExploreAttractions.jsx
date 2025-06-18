import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BE_URL from "../../../config.js";
import { ExploreCard } from "../../../components/ExploreCard/ExploreCard.jsx";

export const HomepageExploreAttractions = () => {
  // useStates
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [fade, setFade] = useState(true);
  const [FetchError, setFetchError] = useState(null);
  const [HomeExploreAttraction, setHomeExploreAttraction] = useState([]);

  // Fetching API Here
  useEffect(() => {
    const FetchHomeExploreAttraction = async () => {
      try {
        const FetchResponse = await axios.get(`${BE_URL}/homeNearAttractions`);
        const FetchFilteredResponse = FetchResponse.data.data;

        if (FetchResponse.status === 200) {
          setHomeExploreAttraction(FetchFilteredResponse);
          setFetchError(null);
        } else {
          setFetchError("Failed to load home explore attractions.");
          console.warn("Unexpected response status:", FetchResponse.status);
        }
      } catch (error) {
        console.error(
          "Unable To Fetch Data Of Home Page Explore Attraction:- ",
          error
        );
        setFetchError(
          "An error occurred while loading Home Page Explore Attraction."
        );
      }
    };

    FetchHomeExploreAttraction();
  }, []); // Only fetch once on mount!

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
    // eslint-disable-next-line
  }, [cardsPerPage, currentIndex, HomeExploreAttraction.length]);

  // Handling Next Button
  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev + cardsPerPage >= HomeExploreAttraction.length
          ? 0
          : prev + cardsPerPage
      );
      setFade(true);
    }, 350);
  };

  // Handling Previous Button
  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev - cardsPerPage < 0
          ? Math.max(0, HomeExploreAttraction.length - cardsPerPage)
          : prev - cardsPerPage
      );
      setFade(true);
    }, 350);
  };

  // Math for slider
  const totalSlides = Math.ceil(HomeExploreAttraction.length / cardsPerPage);
  const currentSlide = Math.floor(currentIndex / cardsPerPage);

  // Filtering Cards Per Page
  const visibleCards = HomeExploreAttraction.slice(
    currentIndex,
    currentIndex + cardsPerPage
  );

  return (
    <section className="explore-section  py-16">
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

        {/* Error */}
        {FetchError && (
          <div className="text-center text-red-500 py-2 font-semibold">{FetchError}</div>
        )}

        {/* Cards Slider */}
        <div className="relative flex items-center">
          {/* Prev Button */}
          <button
            className={`
              absolute
              top-1/2 -translate-y-1/2 z-10
              bg-white shadow-lg rounded-full p-3
              hover:bg-orange-100 transition disabled:opacity-40
              left-2 md:left-[-1.5rem]
            `}
            style={{
              left: "max(0.5rem, env(safe-area-inset-left, 0.5rem))"
            }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d="M13 16l-5-5 5-5"
                stroke="#EA580C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className={`flex gap-8 overflow-hidden justify-center px-1 md:px-0 w-full`}
              style={{ minHeight: 310 }}
            >
              <ExploreCard visibleCards={visibleCards} />
            </motion.div>
          </AnimatePresence>
          {/* Next Button */}
          <button
            className={`
              absolute
              top-1/2 -translate-y-1/2 z-10
              bg-white shadow-lg rounded-full p-3
              hover:bg-orange-100 transition disabled:opacity-40
              right-2 md:right-[-1.5rem]
            `}
            style={{
              right: "max(0.5rem, env(safe-area-inset-right, 0.5rem))"
            }}
            onClick={handleNext}
            aria-label="Next"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d="M7 4l5 5-5 5"
                stroke="#EA580C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center items-center mt-7 gap-3">
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentIndex(idx * cardsPerPage);
                    setFade(true);
                  }, 300);
                }}
                className="relative flex items-center focus:outline-none"
                style={{ background: "none", border: "none", padding: 0 }}
                aria-label={`Go to slide ${idx + 1}`}
              >
                <motion.div
                  layout
                  initial={false}
                  animate={
                    idx === currentSlide
                      ? { width: 32, height: 8, borderRadius: 8, backgroundColor: "#EA580C" }
                      : { width: 12, height: 8, borderRadius: 8, backgroundColor: "#F3F4F6" }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className="shadow border border-orange-200"
                  style={{
                    boxShadow: idx === currentSlide ? "0 0 8px #fb923c55" : "none"
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};