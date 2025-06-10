// import { useEffect, useState } from "react";
// import { ReviewTestimonial } from "../HomeData";


// export const HomePageTestimonial = () => {

//     const [Fade, setFade] = useState(true);

//     // Review Testimonial logic

//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth;

//             if (width >= 1024) {
//                 setTestimonialCardsPerPage(2);
//             } else {

//                 setTestimonialCardsPerPage(1);

//             }
//         };

//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);


//     const [CurrentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
//     const [TestimonialCardsPerPage, setTestimonialCardsPerPage] = useState(2);


//     const TotalTestimonialSlides = Math.ceil(ReviewTestimonial.length / TestimonialCardsPerPage);
//     const CurrentTestimonialSlides = Math.floor(CurrentTestimonialIdx / TestimonialCardsPerPage)


//     useEffect(() => {

//         const TestiMonialInterval = setInterval(() => {

//             HandleNextTestimonial();

//         }, 5000);

//         return () => clearInterval(TestiMonialInterval);

//     }, [TestimonialCardsPerPage])

//     const HandleNextTestimonial = () => {
//         setFade(false); // Trigger fade-out

//         setTimeout(() => {

//             setCurrentTestimonialIdx((prev) => {

//                 return prev + TestimonialCardsPerPage >= ReviewTestimonial.length ? 0 : prev + TestimonialCardsPerPage;

//             })
//             setFade(true); // Trigger fade-in

//         }, 200);

//     }

//     const VisibleTestimonialCards = ReviewTestimonial.slice(CurrentTestimonialIdx, CurrentTestimonialIdx + TestimonialCardsPerPage);



//     return (

//         <>

//             <div className="testimonial-section py-10">
//                 <div className="testimonial-cont flex flex-col gap-10 max-w-screen-xl mx-auto py-10">
//                     <div className="testimonial-heading">
//                         <h3 className="text-orange-color font-bold text-[2rem] text-center">
//                             Testimonial & Review by Customers
//                         </h3>
//                     </div>


//                     <div className="testimonial-cards-cont flex  overflow-hidden justify-center items-center gap-10 max-w-screen-xl px-2 py-10 mx-auto">
//                         {VisibleTestimonialCards.map((item, idx) => (
//                             <div className="testimonial-card shadow-xl  ease-in" key={idx}>
//                                 <img
//                                     src={item.ImgUrl}
//                                     alt="IMG"
//                                     className={`  w-[550px]  h-[250px] flex-shrink-0 object-contain transition-opacity duration-200  ${Fade ? "opacity-100" : "opacity-0"
//                                         }`}
//                                 />
//                             </div>

//                         ))}
//                     </div>
//                 </div>

//                 <div className="ExploreCardDots flex justify-center items-center mt-6 gap-2 px-5">

//                     {Array.from({ length: TotalTestimonialSlides }).map((_, idx) => (
//                         <div
//                             key={idx}
//                             className={`h-3 w-3 cursor-pointer transition-all duration-300 ${idx === CurrentTestimonialSlides ? "bg-orange-color scale-110" : "bg-gray-300"
//                                 }`} 
//                             onClick={() => {
//                                 setFade(false);
//                                 setTimeout(() => {
//                                     setCurrentTestimonialIdx(idx * TestimonialCardsPerPage);
//                                     setFade(true);
//                                 }, 300);
//                             }}
//                         />
//                     ))}
//                 </div>
//             </div>

//         </>
//     )
// }


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewTestimonial } from "../HomeData";

export const HomePageTestimonial = () => {
    const [fade, setFade] = useState(true);
    const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
    const [testimonialCardsPerPage, setTestimonialCardsPerPage] = useState(2);

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

    const totalTestimonialSlides = Math.ceil(ReviewTestimonial.length / testimonialCardsPerPage);

    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            handleNextTestimonial();
        }, 5000);
        return () => clearInterval(testimonialInterval);
    }, [testimonialCardsPerPage]);

    const handleNextTestimonial = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentTestimonialIdx((prev) => {
                return prev + testimonialCardsPerPage >= ReviewTestimonial.length ? 0 : prev + testimonialCardsPerPage;
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

    const visibleTestimonialCards = ReviewTestimonial.slice(
        currentTestimonialIdx,
        currentTestimonialIdx + testimonialCardsPerPage
    );

    // Modern motion: fade and scale, slide in from the side depending on direction
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, x: 60 },
        visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.6, type: "spring", stiffness: 80 } },
        exit: { opacity: 0, scale: 0.95, x: -60, transition: { duration: 0.4, ease: "easeIn" } }
    };

    return (
        <div className="testimonial-section py-10">
            <div className="testimonial-cont flex flex-col gap-10 max-w-screen-xl mx-auto py-10">
                <div className="testimonial-heading">
                    <h3 className="text-orange-color font-bold text-[2rem] text-center">
                        Testimonial & Review by Customers
                    </h3>
                </div>

                <div className="testimonial-cards-cont flex overflow-visible justify-center items-center gap-2 max-w-screen-xl px-2 py-10 mx-auto relative">
                    {/* Prev Button - Left Side */}
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
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M13 16l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                    </button>
                    {/* Testimonial Cards */}
                    <div className="flex gap-10 justify-center items-center w-full">
                        <AnimatePresence initial={false} mode="wait">
                            {visibleTestimonialCards.map((item, idx) => (
                                <motion.div
                                    className="testimonial-card shadow-xl ease-in bg-white rounded-lg p-4 "
                                    key={item.ImgUrl + currentTestimonialIdx}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate={fade ? "visible" : "hidden"}
                                    exit="exit"
                                    layout
                                >
                                    <img
                                        src={item.ImgUrl}
                                        alt="IMG"
                                        className="w-[320px] md:w-[400px] lg:w-[550px] h-[180px] md:h-[220px] lg:h-[250px] flex-shrink-0 object-contain mx-auto"
                                    />
                                    {/* Add additional testimonial content here if needed */}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {/* Next Button - Right Side */}
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
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};