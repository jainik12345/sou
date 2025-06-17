import React, { useEffect, useState } from "react";
import { SouResortTicketBookingCards } from "../../../components/SouResortTicketBookingCards/SouResortTicketBookingCards";
import axios from "axios";
import BE_URL from "../../../config";

export const SouResortTicketBooking = () => {
  const [souResortCardData, setSouResortCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    axios
      .get(`${BE_URL}/souPackageName`)
      .then(async (res) => {
        const packages = res.data.data || [];
        const allPackagesData = await Promise.all(
          packages.map(async (pkg) => {
            try {
              const resp = await axios.get(
                `${BE_URL}/souTicketTourPackage/package/${pkg.id}`
              );
              return (resp.data.data || []).map((tour) => ({
                CardTitle: pkg.sou_package_name, // Only the package name
                NightsDays:
                  tour.nights && tour.days
                    ? `${tour.nights} Night - ${tour.days} Days`
                    : "",
                CardImg: tour.image
                  ? `${BE_URL}/Images/SouTicket/SouTicketTourPackageImages/${tour.image}`
                  : "/no-image.png",
                PerAdultPrice: tour.adult_price
                  ? `₹${Number(tour.adult_price).toLocaleString()}/-`
                  : "-",
                PerChildPrice: tour.child_price
                  ? `₹${Number(tour.child_price).toLocaleString()}/-`
                  : "-",
                notice: tour.caution || "",
                Idx: tour.id,
                Faq: parseFaqData(tour.faqs),
              }));
            } catch {
              return [];
            }
          })
        );
        if (isMounted) {
          setSouResortCardData(allPackagesData.flat());
          setLoading(false);
        }
      })
      .catch((err) => {
        setSouResortCardData([]);
        setLoading(false);
        console.error("Package or tour fetch failed:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to map FAQ data from API to expected Faq prop with indexed facts
  function parseFaqData(faqs) {
    let faqsArr = [];
    if (Array.isArray(faqs)) {
      faqsArr = faqs;
    } else if (typeof faqs === "string" && faqs.trim()) {
      try {
        faqsArr = JSON.parse(faqs);
      } catch {
        faqsArr = [];
      }
    }
    return faqsArr.length
      ? faqsArr.map((faq, idx) => ({
          FaqTitle: faq.q || faq.question || `Day ${idx + 1} Sightseeing`,
          FaqFact: parseFaqFacts(faq.a ?? faq.answer ?? ""),
        }))
      : [];
  }

  function parseFaqFacts(answer) {
    if (Array.isArray(answer)) {
      return answer.filter((a) => typeof a === "string" && a.trim());
    }
    if (typeof answer === "string" && answer.trim()) {
      if (answer.includes("*")) {
        return answer
          .split("*")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      return answer
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  }

  return (
    <>
      <div className="SouResortTicketsBookingCards-section md:p-10 p-8 ">
        <h2 className="font-bold text-[1.3rem] text-orange-color text-center p-5 mb-5">
          SOU || 01 Night - 02Day and 02 Night - 03Day's Sightseeing || Stay +
          Tickets + E-Rickshaw + Breakfast & Dinner
        </h2>
        {loading ? (
          <div className="text-center text-gray-500 text-lg p-10">
            Loading...
          </div>
        ) : (
          <div className="SouTicketsBookingCards-cont max-w-screen mx-auto md:p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
            {souResortCardData.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-16">
                No resort ticket packages found.
              </div>
            ) : (
              souResortCardData.map((Val, Idx) => (
                <SouResortTicketBookingCards
                  key={Val.Idx ?? Idx}
                  CardTitle={Val.CardTitle}
                  NightsDays={Val.NightsDays}
                  CardImg={Val.CardImg}
                  PerAdultPrice={Val.PerAdultPrice}
                  PerChildPrice={Val.PerChildPrice}
                  notice={Val.notice}
                  Idx={Val.Idx ?? Idx}
                  FaqData={Val.Faq}
                />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};
