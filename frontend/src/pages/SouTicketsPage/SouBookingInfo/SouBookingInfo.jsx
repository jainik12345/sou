import BE_URL from "../../../config";
import axios from "axios";
import { useState, useEffect } from "react";

export const SouBookingInfo = () => {
  const [SouTicketOnlineBookingData, setSouTicketOnlineBookingData] = useState(
    []
  );

  useEffect(() => {
    const fetchSouTicketOnlineBooking = async () => {
      try {
        const res = await axios.get(`${BE_URL}/souTicketOnlineBooking`);
        if (res.status === 200) {
          setSouTicketOnlineBookingData(res.data.data);
        } else {
          console.warn("Unexpected Status Code Returned: ", res.status);
        }
      } catch (error) {
        console.error(
          "Unable to fetch SOU Ticket Online Booking data: ",
          error
        );
      }
    };

    fetchSouTicketOnlineBooking();
  }, []);

  return (
    <section className="SouBookingInfo-Section bg-gray-50 py-8">
      <div className="SouBookingInfo-Cont max-w-screen-xl mx-auto px-4 md:px-1 flex flex-col gap-8">
        <h2 className="text-orange-500 font-extrabold text-center text-3xl md:text-4xl mb-4">
          Statue Of Unity Tickets Online Booking
        </h2>

        {SouTicketOnlineBookingData?.map((val, idx) => (
          <article
            key={idx}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-6"
          >
            {/* First Description */}
            {val.first_description && (
              <p className="text-justify font-semibold text-gray-600 text-base mb-1">
                {val.first_description}
              </p>
            )}

            {/* Heading */}
            {val.headiing && (
              <h3 className="font-bold text-gray-800 text-lg mb-2">
                {val.headiing}
              </h3>
            )}

            {/* Description */}
            {val.description && (
              <p className="text-justify font-medium text-gray-600 mb-2">
                {val.description}
              </p>
            )}

            {/* Data Steps - Optioned and Numbered */}
            {val.data && Array.isArray(val.data) && val.data.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-gray-700">How to Book:</h4>
                <div className="flex flex-col gap-5">
                  {val.data.map((step, i) => (
                    <div key={i} className="flex flex-col items-start gap-2">
                      {/* Option Number */}
                      <span className="inline-block bg-orange-500 text-white font-bold px-3 py-1.5 rounded-full  text-sm min-w-[100px] text-center">
                        Option {i + 1} :
                      </span>
                      <span className="text-gray-800">
                        {step.heading ? (
                          <strong>{step.heading} : </strong>
                        ) : null}
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {val.notes && (
              <div className="px-4 py-2 bg-orange-50 border-l-4 border-orange-400 rounded text-orange-800 font-semibold text-sm">
                {val.notes}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};
