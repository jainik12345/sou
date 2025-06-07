// import logo from "../../assets/images/sou-logo.webp";
// import { navLinks } from "../Header/HeaderData.js";
// import { NavLink } from "react-router-dom";
// import "./Footer.css";
// import { FaAnglesRight } from "react-icons/fa6";
// export const Footer = () => {
//   return (
//     <>
//       <footer>
//         <div className="footer-cont  flex items-center flex-col lg:flex-col xl:flex-row justify-around lg:py-20 py-10 gap-5  box-border max-w-screen-xl mx-auto">

//           <div className="footer-logo-cont gap-5 p-10 flex flex-col items-center">
//             {/* footer logo */}
//             <div className="footer-logo">
//               <img src={logo} alt="LOGO" className="md:h-15 h-13" />
//             </div>

//             {/* footer logo text */}
//             <div className="footer-logo-text w-50 text-center">
//               <p className="text-gray-400 text-medium ">
//                 We work with a passion of taking challenges afnd creating new
//                 ones in advertising sector.
//               </p>
//             </div>

//             {/* footer visits counts */}
//             <div className="footer-visits-counts ">
//               <p className="bg-orange-color text-white px-6 py-3 font-medium md:text-sm xl:text-1xl w-fit">
//                 Visits : 180468
//               </p>
//             </div>
//           </div>


//           <div className="navlinks grid lg:grid-cols-4 grid-cols-2  lg:w-full w-fit gap-5 px-5">
//             <div className="stay-in-tent-links flex flex-col  gap-3 px-2">
//               <div className="title ">
//                 <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] ">
//                   Stay In Tent
//                 </h2>
//               </div>

//               <ul className="links flex flex-col gap-2">
//                 {navLinks[2].dropdown.map((Val, Idx) => {
//                   return (
//                     <li key={Idx}>
//                       <NavLink
//                         to={Val.path}
//                         className={`text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 flex items-center gap-2 `}
//                       >
//                         <FaAnglesRight />

//                         {Val.label}
//                       </NavLink>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             <div className="gujarat-packages-links flex flex-col gap-2 px-2">
//               <div className="title ">
//                 <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] ">
//                   Gujarat Packages
//                 </h2>
//               </div>

//               <ul className="links flex flex-col gap-2">
//                 {navLinks[5].dropdown.map((Val, Idx) => {
//                   return (
//                     <li key={Idx}>
//                       <NavLink
//                         to={Val.path}
//                         className={`text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 flex items-center gap-2`}
//                       >
//                         <FaAnglesRight />
//                         {Val.label}
//                       </NavLink>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             <div className="useful-links flex flex-col gap-2 px-2">
//               <div className="title ">
//                 <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] ">Useful Links</h2>
//               </div>

//               <ul className="links  flex flex-col gap-2">
//                 {navLinks.map((Item, Idx) => {
//                   return (
//                     <li key={Idx}>
//                       <NavLink
//                         to={Item.path}
//                         className={`text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 flex items-center gap-2`}
//                       >
//                         <FaAnglesRight />
//                         {Item.label}
//                       </NavLink>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>

//             <div className="contact-cont flex flex-col gap-3 px-2">
//               <div className="title">
//                 <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] ">
//                   Contact Tour Experts
//                 </h2>
//               </div>

//               <div className="address">
//                 <p className="text-gray-400 font-medium max-w-50 ">
//                   <i className="fa-solid fa-location-dot text-orange-color mr-2"></i>
//                   B-701/702, Pntc, Radio Mirchi Road, Satellite, Ahmedabad
//                 </p>
//               </div>

//               <div className="contact-numb">
//                 <a
//                   className="text-gray-400 font-medium"
//                   href="https://wa.me/917069766966"
//                 >
//                   <i className="fa-solid fa-phone text-orange-color mr-2"></i>
//                   +91 7069766966
//                 </a>
//               </div>

//               <div className="email text-gray-400 font-medium">
//                 <a href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in">
//                   <i className="fa-solid fa-envelope text-orange-color mr-2"></i>
//                   booking@aalpine.in
//                 </a>
//               </div>

//               <div className="social-media flex gap-5">
//                 <a
//                   href="https://www.facebook.com/sou.182m/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-facebook text-blue-600"></i>
//                 </a>

//                 <a
//                   href="https://www.instagram.com/sou.india/#"
//                   target="_blank"
//                   rel="noopener noreferrer" 
//                 >
//                   <i className="fa-brands fa-instagram text-orange-600"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// };


import logo from "../../assets/images/sou-logo.webp";
import { navLinks } from "../Header/HeaderData.js";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import { FaAnglesRight } from "react-icons/fa6";
export const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-cont  flex items-center flex-col lg:flex-col xl:flex-row justify-around lg:py-20 py-10 gap-5  box-border max-w-screen-xl mx-auto">

          <div className="footer-logo-cont gap-5 p-10 flex flex-col items-center">
            {/* footer logo */}
            <div className="footer-logo">
              <img src={logo} alt="LOGO" className="md:h-15 h-13" />
            </div>

            {/* footer logo text */}
            <div className="footer-logo-text w-50 text-center">
              <p className="text-gray-400 text-medium ">
                We work with a passion of taking challenges afnd creating new
                ones in advertising sector.
              </p>
            </div>

            {/* footer visits counts */}
            <div className="footer-visits-counts ">
              <p className="bg-orange-color text-white px-6 py-3 font-medium md:text-sm xl:text-1xl w-fit">
                Visits : 180468
              </p>
            </div>
          </div>


          <div className="navlinks grid lg:grid-cols-4 grid-cols-2  lg:w-full w-fit gap-5 px-5">
            <div className="stay-in-tent-links flex flex-col  gap-3 px-2">
              <div className="title ">
                <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] ">
                  Stay In Tent
                </h2>
              </div>

              <ul className="links flex flex-col gap-2">
                {navLinks[2].dropdown.map((Val, Idx) => {
                  return (
                    <li key={Idx}>
                      <NavLink
                        to={Val.path}
                        className={`text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 flex items-center gap-2 `}
                      >
                        <FaAnglesRight />

                        {Val.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="gujarat-packages-links flex flex-col gap-2 px-2">
              <div className="title ">
                <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] ">
                  Gujarat Packages
                </h2>
              </div>

              <ul className="links flex flex-col gap-2">
                {navLinks[5].dropdown.map((Val, Idx) => {
                  return (
                    <li key={Idx}>
                      <NavLink
                        to={Val.path}
                        className={`text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 flex items-center gap-2`}
                      >
                        <FaAnglesRight />
                        {Val.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="useful-links flex flex-col gap-2 px-2">
              <div className="title ">
                <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] ">Useful Links</h2>
              </div>

              <ul className="links  flex flex-col gap-2">
                {navLinks.map((Item, Idx) => {
                  return (
                    <li key={Idx}>
                      <NavLink
                        to={Item.path}
                        className={`text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 flex items-center gap-2`}
                      >
                        <FaAnglesRight />
                        {Item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="contact-cont flex flex-col gap-3 px-2">
              <div className="title">
                <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] text-[1rem]">
                  Contact Tour Experts
                </h2>
              </div>

              <div className="address">
                <p className="text-gray-400 font-medium max-w-50 ">
                  <i className="fa-solid fa-location-dot text-orange-color mr-2"></i>
                  B-701/702, Pntc, Radio Mirchi Road, Satellite, Ahmedabad
                </p>
              </div>

              <div className="contact-numb">
                <a
                  className="text-gray-400 font-medium"
                  href="https://wa.me/917069766966"
                >
                  <i className="fa-solid fa-phone text-orange-color mr-2"></i>
                  +91 7069766966
                </a>
              </div>

              <div className="email text-gray-400 font-medium">
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in" className="text-[.9rem]">
                  <i className="fa-solid fa-envelope text-orange-color mr-2"></i>
                  booking@aalpine.in
                </a>
              </div>

              <div className="social-media flex gap-5">
                <a
                  href="https://www.facebook.com/sou.182m/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook text-blue-600"></i>
                </a>

                <a
                  href="https://www.instagram.com/sou.india/#"
                  target="_blank"
                  rel="noopener noreferrer" 
                >
                  <i className="fa-brands fa-instagram text-orange-600"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
