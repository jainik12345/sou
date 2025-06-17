// import { SouResortTicketBookingCards } from "../../../components/SouResortTicketBookingCards/SouResortTicketBookingCards";
// import { SouResortCardData } from "../SouTicketsData";

// export const SouResortTicketBooking = () => {
//   return (
//     <>
//       <div className="SouResortTicketsBookingCards-section md:p-10 p-8 ">
//         <h2 className="font-bold text-[1.3rem] text-orange-color text-center p-5 mb-5">
//           SOU || 01 Night - 02Day and 02 Night - 03Day's Sightseeing || Stay +
//           Tickets + E-Rickshaw + Breakfast & Dinner
//         </h2>

//         <div className="SouTicketsBookingCards-cont max-w-screen mx-auto md:p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
//           {SouResortCardData &&
//             SouResortCardData.map((Val, Idx) => {
//               return (
//                 <SouResortTicketBookingCards
//                   key={Idx}
//                   CardTitle={Val.CardTitle}
//                   CardImg={Val.CardImg}
//                   PerAdultPrice={Val.PerAdultPrice}
//                   PerChildPrice={Val.PerChildPrice}
//                   notice={Val.notice}
//                   Idx={Idx}
//                   FaqData={Val.Faq}
//                 />
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

/* */

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import BE_URL from "../../../config";
// import { useNavigate } from "react-router-dom";

// /**
//  * This page renders all souPackageName ticket tour packages as wide modern cards without section headings,
//  * in a clean responsive grid exactly like your screenshot (image1).
//  * - No package headings.
//  * - Each card: Resort Name, Nights/Days, Image, Price (adult/child), Book Now, FAQ accordion (Sightseeing), Caution.
//  */
// export const SouResortTicketBooking = () => {
//   const [allTourPackages, setAllTourPackages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all souTicketTourPackages for all packages
//   useEffect(() => {
//     let isMounted = true;

//     // First, fetch all package names
//     axios
//       .get(`${BE_URL}/souPackageName`)
//       .then(async (res) => {
//         const packages = res.data.data || [];
//         // For each package, fetch ticket tour packages
//         const allPackagesData = await Promise.all(
//           packages.map(async (pkg) => {
//             try {
//               const resp = await axios.get(
//                 `${BE_URL}/souTicketTourPackage/package/${pkg.id}`
//               );
//               return (resp.data.data || []).map((tp) => ({
//                 ...tp,
//                 sou_package_name: pkg.sou_package_name,
//               }));
//             } catch {
//               return [];
//             }
//           })
//         );
//         if (isMounted) {
//           // Flatten all cards into one array
//           setAllTourPackages(allPackagesData.flat());
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         setAllTourPackages([]);
//         setLoading(false);
//         console.error("Package or tour fetch failed:", err);
//       });

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // FAQ Accordion state
//   const [openIndexes, setOpenIndexes] = useState({});

//   const handleFaqClick = (cardIdx, faqIdx) => {
//     setOpenIndexes((prev) => ({
//       ...prev,
//       [cardIdx]: prev[cardIdx] === faqIdx ? null : faqIdx,
//     }));
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="md:p-10 p-4 bg-[#fafbfc] min-h-screen">
//       <h2 className="font-bold text-[1.3rem] text-orange-500 text-center p-5 mb-8">
//         SOU || 01 Night - 02Day and 02 Night - 03Day's Sightseeing || Stay +
//         Tickets + E-Rickshaw + Breakfast & Dinner
//       </h2>
//       {loading ? (
//         <div className="text-center text-gray-500 text-lg p-10">Loading...</div>
//       ) : allTourPackages.length === 0 ? (
//         <div className="text-center text-gray-500 text-lg p-10">
//           No packages found.
//         </div>
//       ) : (
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-screen-xl mx-auto">
//           {allTourPackages.map((Val, Idx) => {
//             // Parse FAQ data for each card
//             let faqsArr = [];
//             if (Array.isArray(Val.faqs)) {
//               faqsArr = Val.faqs;
//             } else if (typeof Val.faqs === "string" && Val.faqs.trim()) {
//               try {
//                 faqsArr = JSON.parse(Val.faqs);
//               } catch {
//                 faqsArr = [];
//               }
//             }
//             // FAQs for each day (Day 1, Day 2, Day 3...)
//             // If your FAQ data is different, adjust this logic.
//             const sightseeingFaqs =
//               faqsArr.length > 0
//                 ? faqsArr.map((faq, idx) => ({
//                     title:
//                       faq.q || faq.question || `Day ${idx + 1} Sightseeing`,
//                     answer: Array.isArray(faq.a || faq.answer)
//                       ? (faq.a || faq.answer).join("\n")
//                       : faq.a || faq.answer || "",
//                   }))
//                 : [];

//             return (
//               <div
//                 key={Idx}
//                 className="relative w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col transition-transform duration-300 hover:-translate-y-1"
//                 style={{
//                   boxShadow: "0 2px 16px rgba(40,40,40,0.08)",
//                   minHeight: "520px",
//                 }}
//               >
//                 {/* Resort/Package Title and Nights/Days */}
//                 <div className="text-center pt-6 pb-1">
//                   <div className="text-xl font-bold text-orange-600 mb-1">
//                     {Val.sou_package_name}
//                   </div>
//                   <div className="text-base font-bold text-gray-800 mb-2">
//                     {Val.nights}Night - {Val.days}Days
//                   </div>
//                 </div>
//                 {/* Image */}
//                 <div className="flex justify-center items-center mb-3 mt-1 rounded-xl overflow-hidden shadow-sm bg-gray-50 min-h-[110px]">
//                   <img
//                     src={
//                       Val.image
//                         ? `${BE_URL}/Images/SouTicket/SouTicketTourPackageImages/${Val.image}`
//                         : "/no-image.png"
//                     }
//                     alt={Val.sou_package_name}
//                     className="w-full max-w-[220px] h-[90px] object-cover"
//                   />
//                 </div>
//                 {/* Price */}
//                 <div className="text-left px-6 mb-2">
//                   <div className="text-[1rem] font-semibold text-orange-500">
//                     Package Rates:
//                   </div>
//                   <div className="text-[1rem] font-medium text-gray-800">
//                     Per Adult –{" "}
//                     {Val.adult_price
//                       ? Number(Val.adult_price).toLocaleString()
//                       : "-"}
//                     <span className="font-bold">/-</span>
//                   </div>
//                   <div className="text-[1rem] font-medium text-gray-800">
//                     Per Child –{" "}
//                     {Val.child_price
//                       ? Number(Val.child_price).toLocaleString()
//                       : "-"}
//                     <span className="font-bold">/-</span>
//                   </div>
//                 </div>
//                 {/* Book Now */}
//                 <div className="flex justify-center mb-2">
//                   <button
//                     className="bg-orange-500 text-white font-semibold px-8 py-2 rounded-md shadow transition hover:bg-orange-600 focus:outline-none"
//                     onClick={() => {
//                       // Add your booking link logic here
//                       navigate("#");
//                     }}
//                   >
//                     Book Now
//                   </button>
//                 </div>
//                 {/* FAQ Accordion - Sightseeing Days */}
//                 {sightseeingFaqs.length > 0 && (
//                   <div className="mb-2 px-0">
//                     <div className="flex flex-col gap-0">
//                       {sightseeingFaqs.map((faq, faqIdx) => (
//                         <div
//                           key={faqIdx}
//                           className={`rounded-none border-t border-b border-orange-200 bg-orange-500/90 text-white font-medium cursor-pointer`}
//                           onClick={() => handleFaqClick(Idx, faqIdx)}
//                         >
//                           <div className="flex items-center justify-between px-5 py-2">
//                             <span className="text-base">
//                               {openIndexes[Idx] === faqIdx ? "–" : "+"}{" "}
//                               {faq.title}
//                             </span>
//                           </div>
//                           {openIndexes[Idx] === faqIdx && (
//                             <div className="bg-white text-gray-800 px-5 py-3 text-sm animate-fadeIn">
//                               {faq.answer.split("\n").map((line, i) => (
//                                 <div key={i}>{line}</div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//                 {/* Caution / Max Person */}
//                 {Val.caution && (
//                   <div className="text-center text-base font-bold text-gray-800 pb-4 pt-2">
//                     {Val.caution}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

/* */

// import React, { useEffect, useState } from "react";
// import { SouResortTicketBookingCards } from "../../../components/SouResortTicketBookingCards/SouResortTicketBookingCards";
// import axios from "axios";
// import BE_URL from "../../../config";

// /**
//  * Fetch all souPackageName, then fetch all tour packages for each,
//  * flatten into a single array, and map to your existing UI/UX cards.
//  * Do not change the SouResortTicketBookingCards props/UI.
//  */
// export const SouResortTicketBooking = () => {
//   const [souResortCardData, setSouResortCardData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;
//     setLoading(true);
//     // Step 1: Fetch all packages
//     axios
//       .get(`${BE_URL}/souPackageName`)
//       .then(async (res) => {
//         const packages = res.data.data || [];
//         // Step 2: For each package, fetch its ticket tour packages
//         const allPackagesData = await Promise.all(
//           packages.map(async (pkg) => {
//             try {
//               const resp = await axios.get(
//                 `${BE_URL}/souTicketTourPackage/package/${pkg.id}`
//               );
//               // Map each tour package to a card config
//               return (resp.data.data || []).map((tour) => ({
//                 CardTitle:
//                   pkg.sou_package_name +
//                   " " +
//                   (tour.nights && tour.days
//                     ? `${tour.nights}Night - ${tour.days}Days`
//                     : ""),
//                 CardImg: tour.image
//                   ? `${BE_URL}/Images/SouTicket/SouTicketTourPackageImages/${tour.image}`
//                   : "/no-image.png",
//                 PerAdultPrice: tour.adult_price
//                   ? `₹${Number(tour.adult_price).toLocaleString()}/-`
//                   : "-",
//                 PerChildPrice: tour.child_price
//                   ? `₹${Number(tour.child_price).toLocaleString()}/-`
//                   : "-",
//                 notice: tour.caution || "",
//                 Idx: tour.id,
//                 Faq: parseFaqData(tour.faqs),
//               }));
//             } catch {
//               return [];
//             }
//           })
//         );
//         if (isMounted) {
//           // Flatten all cards into one array
//           setSouResortCardData(allPackagesData.flat());
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         setSouResortCardData([]);
//         setLoading(false);
//         console.error("Package or tour fetch failed:", err);
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   // Helper to map FAQ data from API to expected Faq prop
//   function parseFaqData(faqs) {
//     let faqsArr = [];
//     if (Array.isArray(faqs)) {
//       faqsArr = faqs;
//     } else if (typeof faqs === "string" && faqs.trim()) {
//       try {
//         faqsArr = JSON.parse(faqs);
//       } catch {
//         faqsArr = [];
//       }
//     }
//     // Convert to your UI format: [{FaqTitle, FaqFact: []}]
//     return faqsArr.length
//       ? faqsArr.map((faq, idx) => ({
//           FaqTitle: faq.q || faq.question || `Day ${idx + 1} Sightseeing`,
//           FaqFact: faq.a
//             ? Array.isArray(faq.a)
//               ? faq.a
//               : [faq.a]
//             : faq.answer
//             ? Array.isArray(faq.answer)
//               ? faq.answer
//               : [faq.answer]
//             : [],
//         }))
//       : [];
//   }

//   return (
//     <>
//       <div className="SouResortTicketsBookingCards-section md:p-10 p-8 ">
//         <h2 className="font-bold text-[1.3rem] text-orange-color text-center p-5 mb-5">
//           SOU || 01 Night - 02Day and 02 Night - 03Day's Sightseeing || Stay +
//           Tickets + E-Rickshaw + Breakfast & Dinner
//         </h2>
//         {loading ? (
//           <div className="text-center text-gray-500 text-lg p-10">
//             Loading...
//           </div>
//         ) : (
//           <div className="SouTicketsBookingCards-cont max-w-screen mx-auto md:p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 ">
//             {souResortCardData.length === 0 ? (
//               <div className="col-span-full text-center text-gray-500 py-16">
//                 No resort ticket packages found.
//               </div>
//             ) : (
//               souResortCardData.map((Val, Idx) => (
//                 <SouResortTicketBookingCards
//                   key={Val.Idx ?? Idx}
//                   CardTitle={Val.CardTitle}
//                   CardImg={Val.CardImg}
//                   PerAdultPrice={Val.PerAdultPrice}
//                   PerChildPrice={Val.PerChildPrice}
//                   notice={Val.notice}
//                   Idx={Val.Idx ?? Idx}
//                   FaqData={Val.Faq}
//                 />
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

/* */

import React, { useEffect, useState } from "react";
import { SouResortTicketBookingCards } from "../../../components/SouResortTicketBookingCards/SouResortTicketBookingCards";
import axios from "axios";
import BE_URL from "../../../config";

/**
 * Fetch all souPackageName, then fetch all tour packages for each,
 * flatten into a single array, and map to your existing UI/UX cards.
 * Do not change the SouResortTicketBookingCards props/UI.
 *
 * FAQ answers are split into arrays by "*" or newline and indexed for UI.
 */
export const SouResortTicketBooking = () => {
  const [souResortCardData, setSouResortCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    // Step 1: Fetch all packages
    axios
      .get(`${BE_URL}/souPackageName`)
      .then(async (res) => {
        const packages = res.data.data || [];
        // Step 2: For each package, fetch its ticket tour packages
        const allPackagesData = await Promise.all(
          packages.map(async (pkg) => {
            try {
              const resp = await axios.get(
                `${BE_URL}/souTicketTourPackage/package/${pkg.id}`
              );
              // Map each tour package to a card config
              return (resp.data.data || []).map((tour) => ({
                CardTitle:
                  pkg.sou_package_name +
                  " " +
                  (tour.nights && tour.days
                    ? `${tour.nights}Night - ${tour.days}Days`
                    : ""),
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
          // Flatten all cards into one array
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
    // Convert to your UI format: [{FaqTitle, FaqFact: []}]
    return faqsArr.length
      ? faqsArr.map((faq, idx) => ({
          FaqTitle: faq.q || faq.question || `Day ${idx + 1} Sightseeing`,
          FaqFact: parseFaqFacts(faq.a ?? faq.answer ?? ""),
        }))
      : [];
  }

  // Split string by "*" or newline, trim, and filter
  function parseFaqFacts(answer) {
    if (Array.isArray(answer)) {
      return answer.filter((a) => typeof a === "string" && a.trim());
    }
    if (typeof answer === "string" && answer.trim()) {
      // If already separated by *, split into trimmed items
      if (answer.includes("*")) {
        // Remove extra spaces, empty, and asterisk at start
        return answer
          .split("*")
          .map((s) => s.trim())
          .filter(Boolean);
      }
      // Otherwise, split by newline
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
