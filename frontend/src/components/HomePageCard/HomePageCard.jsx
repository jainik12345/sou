// import { NavLink } from "react-router-dom";
// import { FaHome } from "react-icons/fa";
// import { CgNotes } from "react-icons/cg";
// import { FaLocationDot } from "react-icons/fa6";
// import { TfiLayoutLineSolid } from "react-icons/tfi";
// import { KnowMore } from "../Buttons/KnowMore";
// import { BookOnline } from "../Buttons/BookOnline";
// import * as motion from "motion/react-client";


// export const HomePageCard = ({ CardImgs }) => {
//   return (
//     <>
//       {CardImgs.map((Val, Idx) => {
//         const isLastCard = Val.CardName === "SOU Tickets";

//         return (
//           <div
//             className="card-cont flex flex-col justify-center items-center gap-5 p-5 w-fit rounded-2xl  shadow-xl"
//             key={Idx}
//           >
//             {isLastCard ? (
//               <>
//                 <div className="card-img">
//                   <motion.img
//                     src={Val.UrlImg}
//                     alt="IMG"
//                     className="h-50 w-90"
//                     whileHover={{ scale: 0.95 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </div>

//                 <div className="card-title text-center">
//                   <h3 className="text-orange-color text-[1.2rem] font-[500]">
//                     <NavLink to={Val.path}>{Val.CardName}</NavLink>
//                   </h3>
//                 </div>

//                 {/* Your list of facilities for SOU Tickets */}
//                 <div className="sou-ticket-features border-l-4 border-orange-color w-full ps-5">
//                   <ul className="list-none font-[500] flex  flex-col gap-5 relative">
//                     <li>
//                       <TfiLayoutLineSolid className="absolute top-[1px] left-[-20px] text-[1.4rem] text-orange-color" />
//                       Viewing gallery (chest level by lift)
//                     </li>
//                     <li>
//                       <TfiLayoutLineSolid className="absolute top-[2.8rem] left-[-20px] text-[1.4rem] text-orange-color" />
//                       Jungle Safari by Golf Cart
//                     </li>
//                     <li>
//                       <TfiLayoutLineSolid className="absolute top-[5.6rem] left-[-20px] text-[1.4rem] text-orange-color" />
//                       Valley of Flowers
//                     </li>
//                     <li>
//                       <TfiLayoutLineSolid className="absolute top-[8.3rem] left-[-20px] text-[1.4rem] text-orange-color" />
//                       Sardar Sarovar Dam View Point
//                     </li>
//                     <li>
//                       <TfiLayoutLineSolid className="absolute top-[11.1rem] left-[-20px] text-[1.4rem] text-orange-color" />
//                       Projection Mapping (Laser Show)
//                     </li>
//                     <li>
//                       <TfiLayoutLineSolid className="absolute top-[13.8rem] left-[-20px] text-[1.4rem] text-orange-color" />
//                       Transportation by SOU Buses
//                     </li>
//                   </ul>
//                 </div>

//                 <div className="card-btns flex gap-5">
//                   <KnowMore KnowMoreLink={Val.path} Text={"Know More"}/>
//                   <BookOnline BookOnlineLink="#" />
//                 </div>
//               </>
//             ) : (
//               // -- DEFAULT DESIGN FOR ALL OTHER CARDS --

//               <>
//                 <div className="card-img">
//                   <motion.img
//                     src={Val.UrlImg}
//                     alt="IMG"
//                     className="h-50 w-90"
//                     whileHover={{ scale: 0.95 }} // Shrink a little bit when hover
//                     transition={{ duration: 0.3 }}
//                   />
//                   {/* <img src={Val.UrlImg} alt="IMG" className="h-50 w-90" /> */}
//                 </div>

//                 <div className="card-title text-center">
//                   <h3 className="text-orange-color text-[1.2rem] font-[500]">
//                     <NavLink to={Val.path}>{Val.CardName}</NavLink>
//                   </h3>
//                 </div>

//                 <div className="card-desc flex gap-5 border-l-4 border-orange-color">
//                   <div className="desc-icons flex flex-col justify-around text-white "></div>

//                   <div className="location-description flex  flex-col gap-5">
//                     <div className="Accommodation-cont flex flex-col gap-2 relative">
//                       <TfiLayoutLineSolid className="absolute top-[1px] left-[26px] text-[1.4rem] text-orange-color" />
//                       <TfiLayoutLineSolid className="absolute top-[0px] left-[-20px] text-[1.5rem] text-orange-color" />

//                       <h4 className="font-[500] flex gap-5">
//                         <FaHome className="bg-orange-color text-[1.7rem] p-1 rounded-md text-white relative" />
//                         Accommodation
//                       </h4>
//                       <p className="text-grey-text text-[.9rem] font-[400] pl-12">
//                         {Val.Accommodation}
//                       </p>
//                     </div>

//                     <div className="Package-cont  flex flex-col gap-2 relative">
//                       <TfiLayoutLineSolid className="absolute top-[1px] left-[26px] text-[1.4rem] text-orange-color" />
//                       <TfiLayoutLineSolid className="absolute top-[0px] left-[-20px] text-[1.5rem] text-orange-color" />

//                       <h4 className="font-[500] flex gap-5">
//                         <CgNotes className="bg-orange-color text-[1.7rem] p-1 rounded-md text-white" />
//                         Package
//                       </h4>
//                       <p className="text-grey-text text-[.9rem] font-[400] pl-12">
//                         {Val.Packages}
//                       </p>
//                     </div>

//                     <div className="Location-cont  flex flex-col gap-2 relative">
//                       <TfiLayoutLineSolid className="absolute top-[1px] left-[26px] text-[1.4rem] text-orange-color" />
//                       <TfiLayoutLineSolid className="absolute top-[0px] left-[-20px] text-[1.5rem] text-orange-color" />

//                       <h4 className="font-[500] flex gap-5">
//                         <FaLocationDot className="bg-orange-color text-[1.7rem] p-1 rounded-md text-white" />
//                         Location
//                       </h4>
//                       <p className="text-grey-text text-[.9rem] font-[400] pl-12">
//                         {Val.Location}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="card-btns flex gap-5 ">
//                   <KnowMore KnowMoreLink={Val.path}  Text={"Know More"}/>
//                   <BookOnline BookOnlineLink="#" />
//                 </div>
//               </>
//             )}
//           </div>
//         );
//       })}
//     </>
//   );
// };



import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { KnowMore } from "../Buttons/KnowMore";
import { BookOnline } from "../Buttons/BookOnline";
import * as motion from "motion/react-client";

export const HomePageCard = ({ CardImgs }) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {CardImgs.map((Val, Idx) => {
        const isLastCard = Val.CardName === "SOU Tickets";

        return (
          <motion.div
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)" }}
            transition={{ duration: 0.3 }}
            className={`relative bg-white/80 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-2xl p-7 flex flex-col items-center gap-6 w-[340px] md:w-[370px] hover:border-orange-400 transition-all duration-300 ${isLastCard
                ? "border-2 border-gradient-to-br from-orange-400 via-yellow-400 to-pink-400 "
                : ""
              }`}
            key={Idx}>

            <div className="card-img w-full flex justify-center">
              <motion.img
                src={Val.UrlImg}
                alt="IMG"
                className="rounded-xl shadow-lg object-cover h-44 w-full transition-transform"
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="card-title text-center">
              <h3 className="text-orange-500 text-xl font-semibold tracking-wide">
                <NavLink to={Val.path} className="hover:underline hover:text-orange-600 transition">{Val.CardName}</NavLink>
              </h3>
            </div>

            {isLastCard ? (
              // SOU TICKETS CARD
              <div className="sou-ticket-features w-full">
                <ul className="flex flex-col gap-4">
                  {[
                    "Viewing gallery (chest level by lift)",
                    "Jungle Safari by Golf Cart",
                    "Valley of Flowers",
                    "Sardar Sarovar Dam View Point",
                    "Projection Mapping (Laser Show)",
                    "Transportation by SOU Buses",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-base text-neutral-800">
                      <TfiLayoutLineSolid className="text-orange-500 text-xl mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // DEFAULT CARDS
              <div className="card-desc flex flex-col gap-5 w-full">
                <div className="flex items-start gap-3 rounded-lg bg-orange-50/60 p-3 shadow-sm">
                  <FaHome className="bg-orange-400 text-white text-2xl p-1 rounded-full" />
                  <div>
                    <h4 className="font-semibold text-neutral-800">Accommodation</h4>
                    <p className="text-neutral-500 text-sm mt-1">{Val.Accommodation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-orange-50/60 p-3 shadow-sm">
                  <CgNotes className="bg-orange-400 text-white text-2xl p-1 rounded-full" />
                  <div>
                    <h4 className="font-semibold text-neutral-800">Package</h4>
                    <p className="text-neutral-500 text-sm mt-1">{Val.Packages}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-orange-50/60 p-3 shadow-sm">
                  <FaLocationDot className="bg-orange-400 text-white text-2xl p-1 rounded-full" />
                  <div>
                    <h4 className="font-semibold text-neutral-800">Location</h4>
                    <p className="text-neutral-500 text-sm mt-1">{Val.Location}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="card-btns flex gap-4 mt-2 w-full justify-center">
              <KnowMore KnowMoreLink={Val.path} Text={"Know More"} />
              <BookOnline BookOnlineLink="#" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};