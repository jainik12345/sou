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
//                 <h2 className="text-orange-color font-bold md:text-base xl:text-[1.3rem] text-[1rem]">
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
//                 <a href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in" className="text-[.9rem]">
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
import { FaAnglesRight } from "react-icons/fa6";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-orange-50 via-white to-orange-100 border-t border-orange-200">
      <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col gap-12">
        {/* Top Row: Logo + About + CTA */}
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center   gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-center  gap-4 text-center">
            <img src={logo} alt="Logo" className="h-16 drop-shadow-md" />
            <p className="text-base text-gray-600 text-center  max-w-xs">
              We work with a passion for taking challenges and creating new ones in the hospitality & travel sector.
            </p>
            <span className="inline-block bg-orange-400 text-white px-5 py-2 rounded-full font-semibold shadow mt-2 text-sm tracking-wider">
              Visits: <span className="font-bold">180468</span>
            </span>
          </div>
          {/* Call to Action */}
          
        </div>
        {/* Divider */}
        <div className="border-t border-orange-100" />
        {/* Bottom Grid: Navigation & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Stay In Tent */}
          <div>
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Stay In Tent</h4>
            <ul className="space-y-2">
              {navLinks[2].dropdown.map((Val, Idx) => (
                <li key={Idx}>
                  <NavLink
                    to={Val.path}
                    className="group flex items-center text-gray-600 hover:text-orange-500 transition font-medium"
                  >
                    <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
                    {Val.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Gujarat Packages */}
          <div>
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Gujarat Packages</h4>
            <ul className="space-y-2">
              {navLinks[5].dropdown.map((Val, Idx) => (
                <li key={Idx}>
                  <NavLink
                    to={Val.path}
                    className="group flex items-center text-gray-600 hover:text-orange-500 transition font-medium"
                  >
                    <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
                    {Val.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Useful Links */}
          <div>
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Useful Links</h4>
            <ul className="space-y-2">
              {navLinks.map((Item, Idx) => (
                <li key={Idx}>
                  <NavLink
                    to={Item.path}
                    className="group flex items-center text-gray-600 hover:text-orange-500 transition font-medium"
                  >
                    <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
                    {Item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Contact</h4>
            <p className="text-gray-600 text-base mb-2 flex items-start">
              <i className="fa-solid fa-location-dot text-orange-400 mr-2 mt-1"></i>
              B-701/702, Pntc, Radio Mirchi Road, Satellite, Ahmedabad
            </p>
            <a
              href="https://wa.me/917069766966"
              className="flex items-center text-gray-600 hover:text-orange-500 mb-2"
            >
              <i className="fa-solid fa-phone text-orange-400 mr-2"></i>
              +91 7069766966
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in"
              className="flex items-center text-gray-600 hover:text-orange-500 mb-2"
              target="_blank" rel="noopener noreferrer"
            >
              <i className="fa-solid fa-envelope text-orange-400 mr-2"></i>
              booking@aalpine.in
            </a>
            <div className="flex gap-3 mt-3">
              <a
                href="https://www.facebook.com/sou.182m/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 hover:bg-blue-200 rounded-full p-2 transition"
              >
                <FaFacebookF className="text-blue-500 text-lg" />
              </a>
              <a
                href="https://www.instagram.com/sou.india/#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-100 hover:bg-orange-200 rounded-full p-2 transition"
              >
                <FaInstagram className="text-orange-500 text-lg" />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="pt-8 text-center text-gray-500 text-sm border-t border-orange-100">
          &copy; {new Date().getFullYear()} Statue of Unity. All rights reserved.
        </div>
      </div>
    </footer>
  );
};