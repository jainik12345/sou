import { SouResortTicketBookingCards } from "../../../components/SouResortTicketBookingCards/SouResortTicketBookingCards";
import { SouResortCardData } from "../SouTicketsData";

export const SouResortTicketBooking = () => {

    return (

        <>

            <div className="SouResortTicketsBookingCards-section md:p-10 p-8 ">

                <h2 className="font-bold text-[1.3rem] text-orange-color text-center p-5 mb-5">SOU || 01 Night - 02Day and 02 Night - 03Day's Sightseeing || Stay + Tickets + E-Rickshaw + Breakfast & Dinner</h2>

                <div className="SouTicketsBookingCards-cont max-w-screen-xl mx-auto md:p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">

                    {SouResortCardData && SouResortCardData.map((Val, Idx) => {

                        return (

                            <SouResortTicketBookingCards key={Idx} CardTitle={Val.CardTitle} CardImg={Val.CardImg} PerAdultPrice={Val.PerAdultPrice} PerChildPrice={Val.PerChildPrice} notice={Val.notice} Idx={Idx} FaqData={Val.Faq} />
                        
                        )

                    })}

                </div>

            </div>

        </>

    )
}