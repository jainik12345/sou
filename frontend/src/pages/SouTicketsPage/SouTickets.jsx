import { Banner } from "../../components/Banner/Banner";
import { SouTicketBooking } from "./SouTicketBooking/SouTicketBooking";
import { SouResortTicketBooking } from "./SouResortTicketBooking/SouResortTicketBooking";
import {SouBookingInfo} from "./SouBookingInfo/SouBookingInfo"

export const SouTickets = () => {

        return (

                <>

                        <Banner Title={"Sou Tickets"} />

                        {/* Sou Tickets Cards Section */}

                        <SouTicketBooking />

                        {/* Sou Resort Ticket booking Sections */}

                        <SouResortTicketBooking />

                        {/* Sou Ticket Booking Guide */}

                        <SouBookingInfo />

                </>

        )

}