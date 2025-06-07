import { useEffect, useState } from "react";
import { ReviewTestimonial } from "../HomeData";


export const HomePageTestimonial = () => {

    const [Fade, setFade] = useState(true);

    // Review Testimonial logic

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


    const [CurrentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
    const [TestimonialCardsPerPage, setTestimonialCardsPerPage] = useState(2);


    const TotalTestimonialSlides = Math.ceil(ReviewTestimonial.length / TestimonialCardsPerPage);
    const CurrentTestimonialSlides = Math.floor(CurrentTestimonialIdx / TestimonialCardsPerPage)


    useEffect(() => {

        const TestiMonialInterval = setInterval(() => {

            HandleNextTestimonial();

        }, 5000);

        return () => clearInterval(TestiMonialInterval);

    }, [TestimonialCardsPerPage])

    const HandleNextTestimonial = () => {
        setFade(false); // Trigger fade-out

        setTimeout(() => {

            setCurrentTestimonialIdx((prev) => {

                return prev + TestimonialCardsPerPage >= ReviewTestimonial.length ? 0 : prev + TestimonialCardsPerPage;

            })
            setFade(true); // Trigger fade-in

        }, 200);

    }

    const VisibleTestimonialCards = ReviewTestimonial.slice(CurrentTestimonialIdx, CurrentTestimonialIdx + TestimonialCardsPerPage);



    return (

        <>

            <div className="testimonial-section py-10">
                <div className="testimonial-cont flex flex-col gap-10 max-w-screen-xl mx-auto py-10">
                    <div className="testimonial-heading">
                        <h3 className="text-orange-color font-bold text-[2rem] text-center">
                            Testimonial & Review by Customers
                        </h3>
                    </div>


                    <div className="testimonial-cards-cont flex  overflow-hidden justify-center items-center gap-10 max-w-screen-xl px-2 py-10 mx-auto">
                        {VisibleTestimonialCards.map((item, idx) => (
                            <div className="testimonial-card shadow-xl  ease-in" key={idx}>
                                <img
                                    src={item.ImgUrl}
                                    alt="IMG"
                                    className={`  w-[550px]  h-[250px] flex-shrink-0 object-contain transition-opacity duration-200  ${Fade ? "opacity-100" : "opacity-0"
                                        }`}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="ExploreCardDots flex justify-center items-center mt-6 gap-3 px-5">
                    {Array.from({ length: TotalTestimonialSlides }).map((_, idx) => {
                        const isActive = idx === CurrentTestimonialSlides;
                        return (
                            <div
                                key={idx}
                                className="cursor-pointer transition-all duration-300 flex items-center justify-center"
                                style={{
                                    height: "0.85rem",
                                    width: isActive ? "2.1rem" : "0.85rem",
                                    background: isActive ? "#ff8800" : "#fff",
                                    borderRadius: "999px",
                                    border: isActive ? "none" : "2px solid #ff8800",
                                    boxShadow: isActive ? "0 0 8px 0 #ff880088" : "0 0 0 0 transparent",
                                    transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
                                }}
                                onClick={() => {
                                    setFade(false);
                                    setTimeout(() => {
                                        setCurrentTestimonialIdx(idx * TestimonialCardsPerPage);
                                        setFade(true);
                                    }, 300);
                                }}
                            />
                        );
                    })}
                </div>
            </div>

        </>
    )
}



