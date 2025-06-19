// import axios from "axios";
// import { SouTicketsBookingCards } from "../../../components/SouTicketsBookingCards/SouTicketsBookingCards";
// import BE_URL from "../../../config";
// import { SouTicketsBookingCardsData } from "../SouTicketsData";

// export const SouTicketBooking = () => {
//   return (
//     <>
//       <div className="SouTicketsBookingCards-section md:p-10 p-5">
//         <h2 className="font-semibold text-[1.1rem] text-gray-600 text-center py-10">
//           You will receive all tickets with QR code within 24 Hours of your
//           booking or before your arrival time at SOU, which ever is early.
//         </h2>

//         <div className="SouTicketsBookingCards-cont max-w-screen-xl mx-auto md:p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
//           {SouTicketsBookingCardsData &&
//             SouTicketsBookingCardsData.map((Val, Idx) => {
//               return (
//                 <SouTicketsBookingCards
//                   CardTitle={Val.CardTitle}
//                   CardImg={Val.CardImg}
//                   PerAdultPrice={Val.PerAdultPrice}
//                   PerChildPrice={Val.PerChildPrice}
//                   notice={Val.notice}
//                   Idx={Idx}
//                 />
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

/* */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { SouTicketsBookingCards } from "../../../components/SouTicketsBookingCards/SouTicketsBookingCards";
import BE_URL from "../../../config"; 

export const SouTicketBooking = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${BE_URL}/souTicketInsideEventPrice`);
         
        if (res.data && res.data.status === "success") {
          setTickets(res.data.data);
        } else {
          setErr("Failed to fetch tickets.");
        }
      } catch (error) {
        setErr(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="SouTicketsBookingCards-section md:p-10 p-5">
      <h2 className="font-semibold text-[1.1rem] text-gray-600 text-center py-10">
        You will receive all tickets with QR code within 24 Hours of your
        booking or before your arrival time at SOU, whichever is early.
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading...</div>
      ) : err ? (
        <div className="text-center text-red-500 py-8">{err}</div>
      ) : (
        <div className="SouTicketsBookingCards-cont max-w-screen-xl mx-auto md:p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
          {tickets.length > 0 ? (
            tickets.map((Val, Idx) => (
              <SouTicketsBookingCards
                key={Val.id}
                CardTitle={Val.title}
                CardImg={
                  Val.image
                    ? `${BE_URL}/Images/SouTicket/SouTicketInsideEventPriceImages/${Val.image}`
                    : "/images/placeholder.jpg"
                }
                PerAdultPrice={`₹${Val.adult_price}`}
                PerChildPrice={`₹${Val.child_price}`}
                notice={Val.caution}
                Idx={Idx}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No tickets found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
