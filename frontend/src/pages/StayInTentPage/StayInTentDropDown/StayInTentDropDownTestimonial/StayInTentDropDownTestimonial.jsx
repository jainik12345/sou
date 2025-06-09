import { useParams } from "react-router-dom"
import { StayInTentDropDownData } from "../../StayInTent";
import { BookOnline } from "../../../../components/Buttons/BookOnline";
import { useEffect, useState } from "react";

export const StayInTentDropDownTestimonial = () => {

    const { StayInTentPath } = useParams();

    const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const FormattedData = StayInTentDropDownData[FormattedPath]?.Testimonial || [];

    const ReviewTestimonial = FormattedData?.TestimonialData || [];

    const [Fade, setFade] = useState(true);

    // Review Testimonial logic

    const [CurrentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
    const [TestimonialCardsPerPage, setTestimonialCardsPerPage] = useState(1);

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
            setFade(true);

        }, 200);

    }

    const VisibleTestimonialCards = ReviewTestimonial.slice(CurrentTestimonialIdx, CurrentTestimonialIdx + TestimonialCardsPerPage);

    return (

        <>
            <div className="testimonial-section">

                {FormattedData?.TestimonialHeader || FormattedData?.TestimonialPara ? (

                    <div className="header flex flex-col gap-5 max-w-screen-xl mx-auto py-20">

                        {FormattedData.TestimonialHeader && (

                            <h1 className="text-[2rem]  text-center text-orange-color font-(family-name:--font-layer-font)">{FormattedData.TestimonialHeader}</h1>
                        )}

                        {FormattedData.TestimonialPara && (

                            <h2 className="text-[1.5rem] font-semibold text-center text-gray-700">{FormattedData.TestimonialPara}</h2>
                        )}

                    </div>

                ) : (null)}


                {FormattedData?.TestimonialData ? (

                    <div className="testimonial-cont max-w-screen-xl mx-auto flex flex-row overflow-x-auto ">

                        {VisibleTestimonialCards && VisibleTestimonialCards.map((Val, Idx) => {

                            return (

                                <div className={`testimonial-card flex md:flex-row flex-col w-full relative md:px-10 px-5 md:py-20 py-10 transition-opacity duration-300 items-center ${Fade ? "opacity-100" : "opacity-0"
                                    }`} key={Idx}>

                                    <img src={Val.TestimonialCardImg} alt="IMG" className="md:w-1/2 h-100  object-fill" />
                                    
                                    <div className="testimonial-card-content px-5 justify-center  py-10 flex flex-col gap-7  md:absolute md:right-10 right-0 md:bottom-25 bottom-0 bg-white h-70  md:w-1/2 shadow-[0px_0px_20px_10px_rgba(0,0,0,0.1)] rounded-tr-2xl rounded-bl-2xl">

                                        <h1 className="text-[1.5rem]  text-orange-color font-(family-name:--font-layer-font)">{Val.TestimonialCardTitle}</h1>


                                        <div className="flex flex-col gap-5">
                                            {Val.TestimonialCardPara && Val.TestimonialCardPara.map((Val, Idx) => {

                                                return (

                                                    <p className="text-gray-700 font-medium text-[1.1rem]">{Val}</p>

                                                )

                                            })}

                                        </div>

                                        <div>

                                            <BookOnline text={Val.TestimonialCardButton} />

                                        </div>

                                    </div>

                                </div>
                            )

                        })

                        }

                    </div>

                ) : null};

            </div>

        </>

    );
};