import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BE_URL from "../../../config";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const HomePageTestimonial = () => {
  const [fade, setFade] = useState(true);
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [testimonialCardsPerPage, setTestimonialCardsPerPage] = useState(2);
  const [fetchError, setFetchError] = useState(null);
  const [homeTestimonialImages, setHomeTestimonialImages] = useState([]);

  // Fetch testimonials
  useEffect(() => {
    const fetchHomeTestimonial = async () => {
      try {
        const fetchResponse = await axios.get(`${BE_URL}/homeTestimonial`);
        const images = fetchResponse?.data?.data?.[0]?.images ?? [];
        if (fetchResponse.status === 200 && Array.isArray(images)) {
          setHomeTestimonialImages(images);
          setFetchError(null);
        } else {
          setFetchError("Failed to load home slider images.");
          console.warn(
            "Unexpected response status or data:",
            fetchResponse.status,
            images
          );
        }
      } catch (error) {
        setFetchError(
          "An error occurred while loading home testimonial images."
        );
      }
    };
    fetchHomeTestimonial();
  }, []);

  // Cards per page responsive logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setTestimonialCardsPerPage(2);
      else setTestimonialCardsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalTestimonialSlides = Math.ceil(
    homeTestimonialImages.length / testimonialCardsPerPage
  );
  const currentSlide = Math.floor(
    currentTestimonialIdx / testimonialCardsPerPage
  );

  // Auto change cards
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      handleNextTestimonial();
    }, 5000);
    return () => clearInterval(testimonialInterval);
    // eslint-disable-next-line
  }, [
    testimonialCardsPerPage,
    currentTestimonialIdx,
    homeTestimonialImages.length,
  ]);

  const handleNextTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentTestimonialIdx((prev) =>
        prev + testimonialCardsPerPage >= homeTestimonialImages.length
          ? 0
          : prev + testimonialCardsPerPage
      );
      setFade(true);
    }, 350);
  };

  const handlePrevTestimonial = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentTestimonialIdx((prev) =>
        prev - testimonialCardsPerPage < 0
          ? Math.max(0, homeTestimonialImages.length - testimonialCardsPerPage)
          : prev - testimonialCardsPerPage
      );
      setFade(true);
    }, 350);
  };

  // Filter visible cards
  const visibleTestimonialImages = homeTestimonialImages.slice(
    currentTestimonialIdx,
    currentTestimonialIdx + testimonialCardsPerPage
  );

  // Simple motion: only fade in/out
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -24,
      transition: { duration: 0.35, ease: "easeInOut" },
    },
  };

  // Helper to get full image URL
  const getImageUrl = (fileName) =>
    `${BE_URL}/Images/HomeImages/HomeTestimonial/${fileName}`;

  return (
    <section className="testimonial-section py-10 bg-gray-50">
      <div className="testimonial-cont flex flex-col gap-10 max-w-screen-xl mx-auto py-10">
        <div className="testimonial-heading flex flex-col gap-2 items-center mb-6">
          <h3 className="text-orange-500 font-bold text-[2rem] md:text-4xl text-center tracking-tight drop-shadow-sm">
            What Our Customers Say
          </h3>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mt-2 text-base font-medium">
            Real reviews from real customers. Here’s what they think about us!
          </p>
        </div>
        <div className="testimonial-cards-cont relative flex overflow-visible justify-center items-center gap-2 max-w-screen-xl px-2 py-10 mx-auto w-full">
          {/* Prev Button - Positioned like the reference code */}
          <button
            className={`
                            absolute
                            top-1/2 -translate-y-1/2 z-10
                            bg-white shadow-lg rounded-full p-3
                            hover:bg-orange-100 transition disabled:opacity-40
                            left-2 md:left-[-1.5rem]
                        `}
            style={{
              left: "max(0.5rem, env(safe-area-inset-left, 0.5rem))",
            }}
            onClick={handlePrevTestimonial}
            disabled={currentTestimonialIdx === 0}
            aria-label="Previous testimonial"
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
          {/* Testimonial Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonialIdx}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              className="flex gap-8 overflow-hidden justify-center px-1 md:px-0 py-5 w-full"
              style={{ minHeight: 270 }}
            >
              {visibleTestimonialImages.map((fileName, idx) => (
                <div
                  className="testimonial-card shadow-xl bg-white rounded-2xl p-5  flex flex-col items-center  transition-all duration-300"
                  key={fileName + currentTestimonialIdx}
                >
                  <LazyLoadImage
                    src={getImageUrl(fileName)}
                    alt="Customer testimonial"
                    // className="w-[260px] md:w-[340px] lg:w-[440px] h-[150px] md:h-[190px] lg:h-[210px] flex-shrink-0 object-contain rounded-lg shadow-sm"
                    className="h-50 object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          {/* Next Button - Positioned like the reference code */}
          <button
            className={`
                            absolute
                            top-1/2 -translate-y-1/2 z-10
                            bg-white shadow-lg rounded-full p-3
                            hover:bg-orange-100 transition disabled:opacity-40
                            right-2 md:right-[-1.5rem]
                        `}
            style={{
              right: "max(0.5rem, env(safe-area-inset-right, 0.5rem))",
            }}
            onClick={handleNextTestimonial}
            aria-label="Next testimonial"
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
        {/* Dot Pagination */}
        <div className="flex justify-center items-center mt-7 gap-3">
          <div className="flex gap-2">
            {Array.from({ length: totalTestimonialSlides }).map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    setCurrentTestimonialIdx(idx * testimonialCardsPerPage);
                    setFade(true);
                  }, 300);
                }}
                className="relative flex items-center focus:outline-none"
                style={{ background: "none", border: "none", padding: 0 }}
                aria-label={`Go to testimonial slide ${idx + 1}`}
              >
                <motion.div
                  layout
                  initial={false}
                  animate={
                    idx === currentSlide
                      ? {
                          width: 32,
                          height: 8,
                          borderRadius: 8,
                          backgroundColor: "#EA580C",
                        }
                      : {
                          width: 12,
                          height: 8,
                          borderRadius: 8,
                          backgroundColor: "#F3F4F6",
                        }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  className="shadow border border-orange-200"
                  style={{
                    boxShadow:
                      idx === currentSlide ? "0 0 8px #fb923c55" : "none",
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>
        {fetchError && (
          <div className="text-center text-red-500 font-semibold">
            {fetchError}
          </div>
        )}
      </div>
    </section>
  );
};
