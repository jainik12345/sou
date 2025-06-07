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


// /* test design code */

import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { KnowMore } from "../Buttons/KnowMore";
import { BookOnline } from "../Buttons/BookOnline";
import * as motion from "motion/react-client";

// New color palette
const COLORS = {
  accent: "#9F7AEA", // purple
  accent2: "#FEE140", // yellow
  text: "#22223B",
  descBg: "rgba(159, 122, 234, 0.07)",
  cardShadow: "0 6px 24px 0 rgba(159, 122, 234, 0.09)",
  border: "#FEE140",
};

export const HomePageCard = ({ CardImgs }) => {
  return (
    <>
      {CardImgs.map((Val, Idx) => {
        const isLastCard = Val.CardName === "SOU Tickets";

        return (
          <motion.div
            key={Idx}
            className="card-cont flex flex-col justify-center items-center gap-7 p-6 w-fit rounded-3xl shadow-xl bg-white relative group"
            style={{
            
              minWidth: 330,
              maxWidth: 370,
              transition: "box-shadow 0.4s cubic-bezier(.4,2,.6,1)",
            }}
            // Card entrance and hover motion
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Idx * 0.1 }}>
            <motion.div
              className="card-img rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.4, type: "spring" }}
              style={{
                background: "#fff",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 180,
                maxHeight: 200,
                width: "100%",
              }}
            >
              <motion.img
                src={Val.UrlImg}
                alt="IMG"
                className="h-44 w-full object-cover rounded-xl"
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <div className="card-title text-center">
              <h3
                className="text-[1.25rem] font-extrabold tracking-wide"
                style={{ color: COLORS.accent, textShadow: "0 2px 12px #fee14033" }}
              >
                <NavLink to={Val.path}>{Val.CardName}</NavLink>
              </h3>
            </div>

            {isLastCard ? (
              <>
                <div
                  className="sou-ticket-features border-l-4 w-full ps-5 pb-3"
                  style={{ borderColor: COLORS.accent }}
                >
                  <ul className="list-none font-medium flex flex-col gap-4 relative text-[1rem] text-[#3a2c74]">
                    {[
                      "Viewing gallery (chest level by lift)",
                      "Jungle Safari by Golf Cart",
                      "Valley of Flowers",
                      "Sardar Sarovar Dam View Point",
                      "Projection Mapping (Laser Show)",
                      "Transportation by SOU Buses",
                    ].map((item, i) => (
                      <li key={i} className="relative pl-5">
                        <TfiLayoutLineSolid
                          className="absolute left-[-22px] top-[2px] text-[1.2rem]"
                          style={{ color: COLORS.accent }}
                        />
                        <motion.span
                          initial={{ opacity: 0, x: -12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.5, type: "spring" }}
                        >
                          {item}
                        </motion.span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div
                className="card-desc flex gap-5 border-l-4 w-full"
                style={{
                  background: COLORS.descBg,
                  borderColor: COLORS.accent,
                  borderRadius: 18,
                  padding: "1.1rem 0 1.1rem 1.2rem",
                }}
              >
                <div className="location-description flex flex-col gap-4 w-full">
                  <motion.div
                    className="Accommodation-cont flex flex-col gap-1 relative"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.09, duration: 0.4, type: "spring" }}
                  >
                    <TfiLayoutLineSolid className="absolute top-[5px] left-[-22px] text-[1.2rem]" style={{ color: COLORS.accent }} />
                    <h4 className="font-bold flex items-center gap-2 text-[1.07rem]" style={{ color: COLORS.text }}>
                      <FaHome className="bg-[#9F7AEA] text-[1.25rem] p-1 rounded-md text-white" />
                      Accommodation
                    </h4>
                    <p className="text-[#635985] text-[.92rem] font-[400] pl-10">{Val.Accommodation}</p>
                  </motion.div>
                  <motion.div
                    className="Package-cont flex flex-col gap-1 relative"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.17, duration: 0.4, type: "spring" }}
                  >
                    <TfiLayoutLineSolid className="absolute top-[5px] left-[-22px] text-[1.2rem]" style={{ color: COLORS.accent }} />
                    <h4 className="font-bold flex items-center gap-2 text-[1.07rem]" style={{ color: COLORS.text }}>
                      <CgNotes className="bg-[#FEE140] text-[1.25rem] p-1 rounded-md text-[#9F7AEA]" />
                      Package
                    </h4>
                    <p className="text-[#635985] text-[.92rem] font-[400] pl-10">{Val.Packages}</p>
                  </motion.div>
                  <motion.div
                    className="Location-cont flex flex-col gap-1 relative"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.4, type: "spring" }}
                  >
                    <TfiLayoutLineSolid className="absolute top-[5px] left-[-22px] text-[1.2rem]" style={{ color: COLORS.accent }} />
                    <h4 className="font-bold flex items-center gap-2 text-[1.07rem]" style={{ color: COLORS.text }}>
                      <FaLocationDot className="bg-[#9F7AEA] text-[1.25rem] p-1 rounded-md text-white" />
                      Location
                    </h4>
                    <p className="text-[#635985] text-[.92rem] font-[400] pl-10">{Val.Location}</p>
                  </motion.div>
                </div>
              </div>
            )}

            <motion.div
              className="card-btns flex gap-4 mt-2"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.21, duration: 0.4, type: "spring" }}
            >
              <KnowMore KnowMoreLink={Val.path} Text={"Know More"} />
              <BookOnline BookOnlineLink="#" />
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
};