import { SouTicketsBookingCards } from "../../../components/SouTicketsBookingCards/SouTicketsBookingCards"
import { SouTicketsBookingCardsData } from "../SouTicketsData";

export const SouTicketBooking = () => {
    return (

        <>

            <div className="SouTicketsBookingCards-section md:p-10 p-5">

                <h2 className='font-semibold text-[1.1rem] text-gray-600 text-center py-10'>You will receive all tickets with QR code within 24 Hours of your booking or before your arrival time at SOU, which ever is early.</h2>

                <div className="SouTicketsBookingCards-cont max-w-screen-xl mx-auto md:p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">

                    {
                        SouTicketsBookingCardsData && SouTicketsBookingCardsData.map((Val, Idx) => {

                            return (

                                <SouTicketsBookingCards CardTitle={Val.CardTitle} CardImg={Val.CardImg} PerAdultPrice={Val.PerAdultPrice} PerChildPrice={Val.PerChildPrice} notice={Val.notice} Idx={Idx} />
                            )

                        })
                    }

                </div >

            </div >
        </>

    )
}