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
    const [homeTestimonialImages, setHomeTestimonialImages] = useState([]); // Array of image file names

    // Fetching The API Here
    useEffect(() => {
        const fetchHomeTestimonial = async () => {
            try {
                const fetchResponse = await axios.get(`${BE_URL}/homeTestimonial`);
                // Defensive: Check response structure
                const images =
                    fetchResponse?.data?.data?.[0]?.images ?? [];
                if (fetchResponse.status === 200 && Array.isArray(images)) {
                    setHomeTestimonialImages(images);
                    setFetchError(null);
                } else {
                    setFetchError("Failed to load home slider images.");
                    console.warn("Unexpected response status or data:", fetchResponse.status, images);
                }
            } catch (error) {
                console.error(
                    "Unable To Fetch Data Of Home Page Testimonial Slider:- ",
                    error
                );
                setFetchError(
                    "An error occurred while loading home testimonial images."
                );
            }
        };

        fetchHomeTestimonial();
    }, []);

    // Cards per page logic
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1024) {
                setTestimonialCardsPerPage(2);
            } else {
                setTestimonialCardsPerPage(1);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalTestimonialSlides = Math.ceil(
        homeTestimonialImages.length / testimonialCardsPerPage
    );

    // Auto changing cards
    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            handleNextTestimonial();
        }, 5000);
        return () => clearInterval(testimonialInterval);
        // eslint-disable-next-line
    }, [testimonialCardsPerPage, homeTestimonialImages.length]);

    const handleNextTestimonial = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentTestimonialIdx((prev) => {
                return prev + testimonialCardsPerPage >= homeTestimonialImages.length
                    ? 0
                    : prev + testimonialCardsPerPage;
            });
            setFade(true);
        }, 200);
    };

    const handlePrevTestimonial = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentTestimonialIdx((prev) => {
                return prev - testimonialCardsPerPage < 0
                    ? (totalTestimonialSlides - 1) * testimonialCardsPerPage
                    : prev - testimonialCardsPerPage;
            });
            setFade(true);
        }, 200);
    };

    // Filtering Cards According The Per Pages
    const visibleTestimonialImages = homeTestimonialImages.slice(
        currentTestimonialIdx,
        currentTestimonialIdx + testimonialCardsPerPage
    );

    // Modern motion: fade and scale, slide in from the side depending on direction
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, x: 60 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.6, type: "spring", stiffness: 80 },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            x: -60,
            transition: { duration: 0.4, ease: "easeIn" },
        },
    };

    // Helper to get full image URL (assuming BE_URL is the base path for images)
    const getImageUrl = (fileName) => `${BE_URL}/Images/HomeImages/HomeTestimonial/${fileName}`;
    // Helper to get a user-friendly name from file name
    const getFriendlyName = (fileName) => fileName.replace(/\.[^/.]+$/, "");

    return (
        <div className="testimonial-section py-10">
            <div className="testimonial-cont flex flex-col gap-10 max-w-screen-xl mx-auto py-10">
                <div className="testimonial-heading">
                    <h3 className="text-orange-color font-bold text-[2rem] text-center">
                        Testimonial & Review by Customers
                    </h3>
                </div>

                <div className="testimonial-cards-cont flex overflow-visible justify-center items-center gap-2 max-w-screen-xl px-2 py-10 mx-auto relative">
                    {/* Prev Button */}
                    <button
                        className="absolute left-[-32px] md:left-[-48px] top-1/2 md:block hidden -translate-y-1/2 z-10  items-center justify-center w-10 h-10 bg-white text-orange-400 rounded-full shadow-lg hover:bg-orange-400 hover:text-white transition"
                        onClick={() => {
                            setFade(false);
                            setTimeout(() => {
                                handlePrevTestimonial();
                                setFade(true);
                            }, 200);
                        }}
                        aria-label="Previous testimonial"
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M13 16l-5-5 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </button>
                    {/* Testimonial Cards */}
                    <div className="flex gap-10 justify-center items-center w-full">
                        <AnimatePresence initial={false} mode="wait">
                            {visibleTestimonialImages.map((fileName, idx) => (
                                <motion.div
                                    className="testimonial-card shadow-xl ease-in bg-white rounded-lg p-4 "
                                    key={fileName + currentTestimonialIdx}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={fade ? "visible" : "hidden"}
                                    exit="exit"
                                    layout
                                >
                                    <LazyLoadImage
                                        src={getImageUrl(fileName)}
                                        alt={getFriendlyName(fileName)}
                                        className="w-[320px] md:w-[400px] lg:w-[550px] h-[180px] md:h-[220px] lg:h-[250px] flex-shrink-0 object-contain mx-auto"
                                    />
                                    {/* Show the file name as the "name" */}
                                    {/* <p className="text-center mt-3 font-semibold text-lg">
                    {getFriendlyName(fileName)}
                  </p> */}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {/* Next Button */}
                    <button
                        className="absolute right-[-32px] md:right-[-48px] top-1/2 md:block hidden -translate-y-1/2 z-10  items-center justify-center w-10 h-10 bg-white text-orange-400 rounded-full shadow-lg hover:bg-orange-400 hover:text-white transition"
                        onClick={() => {
                            setFade(false);
                            setTimeout(() => {
                                handleNextTestimonial();
                                setFade(true);
                            }, 200);
                        }}
                        aria-label="Next testimonial"
                    >
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M7 4l5 5-5 5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </button>
                </div>
                {fetchError && (
                    <div className="text-center text-red-500">{fetchError}</div>
                )}
            </div>
        </div>
    );
};