// /**Main Header */

// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../../assets/images/sou-logo.webp";
// import { useState } from "react";
// import { FaChevronDown } from "react-icons/fa6";
// import { RxHamburgerMenu } from "react-icons/rx";

// export const Header = () => {
//   const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
//   const [isNavActive, setIsNavActive] = useState(false);
//   const navigate = useNavigate();

//   const toggleDropdown = (index) => {
//     setOpenDropdownIndex(openDropdownIndex === index ? null : index);
//   };

//   const IsNavBtnActive = () => {
//     setIsNavActive((prev) => !prev);
//   };

//   const navLinks = [
//     {
//       label: "Home",
//       path: "/",
//     },
//     {
//       label: "About Us",
//       path: "/about-us",
//       dropdown: [
//         { label: "Attraction", path: "/about-us/Attraction" },
//         { label: "Wedding", path: "/about-us/Wedding" },
//         { label: "Activities", path: "/about-us/Activities" },
//       ],
//     },
//     {
//       label: "Stay In Tent",
//       path: "/stay-in-tent",
//       dropdown: [
//         { label: "SoU Tent City 1", },
//         { label: "Soil to Soul Resort", },
//         { label: "Unity Village Resort", },
//         { label: "River View Tent Resort", },
//         { label: "Nirvana Resort Restaurant", },
//         { label: "Tent City Narmada 2", },
//         { label: "Sou Eco Camp", },
//         { label: "Villa Euphoria Resort", },
//       ],
//     },
//     {
//       label: "Gallery",
//       path: "/gallery",
//       dropdown: [
//         { label: "SoU Tent City 1", },
//         { label: "Soil to Soul Resort", },
//         { label: "Unity Village Resort", },
//         { label: "River View Tent Resort", },
//         { label: "Nirvana Resort Restaurant", },
//         { label: "Tent City Narmada 2", },
//         { label: "Sou Eco Camp", },
//         { label: "Villa Euphoria Resort", },
//       ],
//     },
//     {
//       label: "SOU Tickets",
//       path: "/sou-tickets",
//     },
//     {
//       label: "Gujarat Packages",
//       path: "/gujarat-packages",
//       dropdown: [
//         { label: "Gujarat Tour 3N 4D" },
//         { label: "Gujarat Tour 4N 5D" },
//         { label: "Gujarat Tour 5N 6D" },
//         { label: "Gujarat Tour 6N 7D" },
//         { label: "Gujarat Tour 7N 8D" },
//         { label: "Gujarat Tour 11N 12D" },
//       ],
//     },
//     {
//       label: "Contact",
//       path: "/contact",
//     },
//   ];

//   return (
//     <>
//       <header className="bg-orange-color z-50 sticky left-0 top-0">
//         <div className="max-w-screen-xl mx-auto">
//           <div className="flex lg:justify-between justify-center items-center px-12 py-4">
//             <div className="hidden lg:block">
//               <h2 className="text-white font-medium">Welcome to Statue of Unity</h2>
//             </div>
//             <div className="flex lg:flex-row flex-col">
//               <ul className="flex justify-center  items-center">
//                 <li className="lg:mr-10 mr-4">
//                   <a href="https://wa.me/917069766966" className="text-white font-semibold text-sm sm:text-base text-[.7rem] flex items-center">
//                     <i className="fa-solid fa-phone text-white sm:mr-3 mr-1 sm:text-[1rem] text-[.8rem]"></i>
//                     +917069766966
//                   </a>
//                 </li>
//                 <li className="lg:mr-10 mr-4">
//                   <a href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in" target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-sm sm:text-base flex items-center text-[.7rem]">
//                     <i className="fa-solid fa-envelope text-white sm:mr-3 mr-1 sm:text-[1rem] text-[.8rem]"></i>
//                     booking@aalpine.in
//                   </a>
//                 </li>
//                 <li className="lg:mr-10 mr-4">
//                   <a href="https://www.facebook.com/sou.182m/" target="_blank" rel="noopener noreferrer">
//                     <i className="fa-brands fa-facebook text-white sm:text-[1rem] text-[.8rem]"></i>
//                   </a>
//                 </li>
//                 <li className="lg:mr-10 mr-4">
//                   <a href="https://www.instagram.com/sou.india/#" target="_blank" rel="noopener noreferrer">
//                     <i className="fa-brands fa-instagram text-white sm:text-[1rem] text-[.8rem]"></i>
//                   </a>
//                 </li>
//               </ul>
//               {/* <div className="mt-6 lg:mt-0 flex justify-center lg:block">
//                 <NavLink to="/booknow" className="text-white border border-black lg:py-3 lg:px-6 px-20 py-2 bg-black sm:text-sm text-[.7rem]">
//                   Book Online
//                 </NavLink>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </header>

//       <nav className="sticky lg:top-[3.5rem] top-[3.5rem] left-0 bg-white shadow-2xl z-50">
//         <div className="flex max-w-screen-xl mx-auto py-4 justify-between px-4">
//           <RxHamburgerMenu size={35} className="absolute right-10 top-6 cursor-pointer md:hidden" onClick={IsNavBtnActive} />
//           <div className="flex justify-center items-center">
//             <NavLink to="/">
//               <img src={logo} alt="Logo" className="h-11" />
//             </NavLink>
//           </div>

//           <ul className={`flex md:py-0 py-20 md:px-0 px-5 md:flex-row md:static md:h-auto md:justify-center justify-around md:w-auto w-70 h-[100vh] fixed left-0 top-[0rem] flex-col items-center bg-white transition-all duration-200 ease-in ${isNavActive ? "left-[0rem]" : "left-[-50rem]"}`}>
//             <div className="flex justify-center items-center md:hidden p-2">
//               <NavLink to="/">
//                 <img src={logo} alt="Logo" className="h-11" />
//               </NavLink>
//             </div>

//             {navLinks.map((NavVal, Idx) => {
//               const isOpen = openDropdownIndex === Idx;
//               const hasDropdown = !!NavVal.dropdown;
//               const isGujaratPackage = NavVal.label === "Gujarat Packages";
//               const isGallery = NavVal.label === "Gallery";
//               const isStayInTent = NavVal.label === "Stay In Tent";

//               return (
//                 <li key={Idx} className="group relative md:w-auto w-full border-b-1 md:border-none">
//                   <NavLink
//                     to={NavVal.path}
//                     className={({ isActive }) =>
//                       `group flex p-3 md:justify-center justify-between items-center font-semibold hover:text-orange-color lg:text-[15px] md:text-[11px] text-[15px] ${isActive ? "text-orange-color" : ""}`
//                     }

//                   >
//                     {NavVal.label}
//                     {hasDropdown && <FaChevronDown className="ml-1 group-hover:rotate-180 transition-all duration-200 ease-in md:text-[13px] text-[20px]" onClick={(e) => {
//                       if (hasDropdown && window.innerWidth < 768) {
//                         if (openDropdownIndex === Idx) {
//                           // Dropdown is already open, allow navigation
//                           setIsNavActive(false);
//                           setOpenDropdownIndex(null); // ❗ CLOSE DROPDOWN
//                         } else {
//                           e.preventDefault();
//                           toggleDropdown(Idx); // Open dropdown
//                         }
//                       } else {
//                         setIsNavActive(false); // Normal link
//                         setOpenDropdownIndex(null); // ❗ Always close dropdown
//                       }
//                     }} />}
//                   </NavLink>

//                   {hasDropdown && (
//                     <ul className={`flex flex-col bg-white transition-all duration-300 overflow-hidden md:absolute md:top-15 md:left-0 md:min-w-max md:shadow-lg md:rounded-md md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible ${isOpen ? "max-h-[500px] py-2 px-4" : "max-h-0"} md:max-h-max md:py-2 md:px-5 w-full`}>

//                       {NavVal.dropdown.map((drop, idx) => {
//                         const dynamicPath = `${isGujaratPackage ? "/gujarat-packages" : isGallery ? "/gallery" : isStayInTent ? "/stay-in-tent" : "" }/${drop.label.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
//                         return (
//                           <li key={idx} className="my-2 ps-1">

//                             {(isGujaratPackage || isGallery || isStayInTent) ? (

//                               <button
//                                 onClick={() => {
//                                   navigate(dynamicPath);
//                                   setIsNavActive(false);
//                                 }}
//                                 className="text-left w-full text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 lg:text-[1rem] text-[.9rem]"
//                               >
//                                 {drop.label}
//                               </button>

//                             ) : (

//                               (
//                                 <NavLink
//                                   to={drop.path}
//                                   className={({ isActive }) =>
//                                     `text-gray-400 font-medium hover:ml-2 hover:text-orange-color transition-all duration-300 lg:text-[1rem] text-[.9rem] ${isActive ? "text-orange-color" : ""}`
//                                   }
//                                   onClick={() => setIsNavActive(false)}
//                                 >
//                                   {drop.label}
//                                 </NavLink>
//                               )
//                             )}

//                           </li>
//                         );
//                       })}
//                     </ul>
//                   )
//                   }
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </nav >

//       {isNavActive && (
//         <div
//           className="fixed inset-0 z-40 backdrop-blur-[1px] md:hidden transition-opacity duration-300"
//           onClick={() => setIsNavActive(false)}
//         ></div>
//       )
//       }
//     </>
//   );
// };


import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/sou-logo.webp";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";

/**
 * Redesigned Header component with improved structure, styles, and mobile-friendly left-drawer navigation.
 */

export const Header = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isNavActive, setIsNavActive] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleNavToggle = () => {
    setIsNavActive((prev) => !prev);
    setOpenDropdownIndex(null);
  };

  const navLinks = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About Us",
      path: "/about-us",
      dropdown: [
        { label: "Attraction", path: "/about-us/Attraction" },
        { label: "Wedding", path: "/about-us/Wedding" },
        { label: "Activities", path: "/about-us/Activities" },
      ],
    },
    {
      label: "Stay In Tent",
      path: "/stay-in-tent",
      dropdown: [
        { label: "SoU Tent City 1" },
        { label: "Soil to Soul Resort" },
        { label: "Unity Village Resort" },
        { label: "River View Tent Resort" },
        { label: "Nirvana Resort Restaurant" },
        { label: "Tent City Narmada 2" },
        { label: "Sou Eco Camp" },
        { label: "Villa Euphoria Resort" },
      ],
    },
    {
      label: "Gallery",
      path: "/gallery",
      dropdown: [
        { label: "SoU Tent City 1" },
        { label: "Soil to Soul Resort" },
        { label: "Unity Village Resort" },
        { label: "River View Tent Resort" },
        { label: "Nirvana Resort Restaurant" },
        { label: "Tent City Narmada 2" },
        { label: "Sou Eco Camp" },
        { label: "Villa Euphoria Resort" },
      ],
    },
    {
      label: "SOU Tickets",
      path: "/sou-tickets",
    },
    {
      label: "Gujarat Packages",
      path: "/gujarat-packages",
      dropdown: [
        { label: "Gujarat Tour 3N 4D" },
        { label: "Gujarat Tour 4N 5D" },
        { label: "Gujarat Tour 5N 6D" },
        { label: "Gujarat Tour 6N 7D" },
        { label: "Gujarat Tour 7N 8D" },
        { label: "Gujarat Tour 11N 12D" },
      ],
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  // Helper function for dynamic dropdown path
  const getDropdownPath = (parentLabel, childLabel) => {
  if (parentLabel === "About Us") {
    // Use label as-is, to match the Route (case-sensitive!)
    return `/about-us/${childLabel}`;
  }
  const base =
    parentLabel === "Gujarat Packages"
      ? "/gujarat-packages"
      : parentLabel === "Gallery"
        ? "/gallery"
        : parentLabel === "Stay In Tent"
          ? "/stay-in-tent"
          : "";
  return `${base}/${childLabel
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")}`;
};
  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-orange-color z-50 sticky left-0 top-0">
        <div className="max-w-screen-xl mx-auto md:block hidden">
          <div className="flex lg:justify-between justify-center items-center px-4 md:px-12 py-2 md:py-4">
            <div className="hidden lg:block">
              <h2 className="text-white font-medium text-base">Welcome to Statue of Unity</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-0">
              <ul className="flex flex-wrap gap-3 items-center">
                <li>
                  <a href="https://wa.me/917069766966" className="text-white font-semibold text-xs md:text-base flex items-center gap-1">
                    <i className="fa-solid fa-phone text-white"></i>
                    +917069766966
                  </a>
                </li>
                <li>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in" target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-xs md:text-base flex items-center gap-1">
                    <i className="fa-solid fa-envelope text-white"></i>
                    booking@aalpine.in
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/sou.182m/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook text-white"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/sou.india/#" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram text-white"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="sticky bg-white shadow-2xl z-50 top-0 left-0">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
          {/* Hamburger Menu (mobile) */}
          <button
            className="block md:hidden text-orange-color focus:outline-none"
            aria-label="Open navigation menu"
            onClick={handleNavToggle}
          >
            <RxHamburgerMenu size={32} />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-11" />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-4 lg:gap-7">
            {navLinks.map((nav, idx) => {
              const hasDropdown = !!nav.dropdown;
              return (
                <li key={nav.label} className="relative group">
                  <NavLink
                    to={nav.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 font-semibold transition-colors duration-150 px-2 py-2 hover:text-orange-color ${isActive ? "text-orange-color" : "text-gray-800"}`
                    }
                  >
                    {nav.label}
                    {hasDropdown && <FaChevronDown className="transition-transform duration-200 group-hover:rotate-180" size={14} />}
                  </NavLink>
                  {hasDropdown && (
                    <ul className="absolute left-0 top-full bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible min-w-[180px] transition-all duration-200 z-30">
                      {nav.dropdown.map((drop, dropIdx) => (
                        <li key={drop.label} className="w-full">
                          <button
                            className="w-full text-left font-medium text-gray-700 hover:text-orange-color px-4 py-2 block text-sm"
                            onClick={() => {
                              navigate(getDropdownPath(nav.label, drop.label));
                            }}
                          >
                            {drop.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        {/* Mobile Drawer */}
        <div
          className={`fixed  z-50 transition-all duration-300 ${isNavActive ? "pointer-events-auto" : "pointer-events-none"
            }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isNavActive ? "opacity-100" : "opacity-0"
              }`}
            onClick={handleNavToggle}
          ></div>
          {/* Drawer */}
          <aside
            className={`fixed top-0 left-0 h-full w-[77vw] max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isNavActive ? "translate-x-0" : "-translate-x-full"
              }`}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <NavLink to="/" onClick={handleNavToggle}>
                <img src={logo} alt="Logo" className="h-11" />
              </NavLink>
              <button
                className="md:hidden text-orange-color text-2xl"
                onClick={handleNavToggle}
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>
            <ul className="flex flex-col gap-1 py-4 px-2">
              {navLinks.map((nav, idx) => {
                const hasDropdown = !!nav.dropdown;
                const isOpen = openDropdownIndex === idx;
                return (
                  <li key={nav.label} className="w-full">
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={nav.path}
                        className={({ isActive }) =>
                          `flex-1 px-3 py-2 font-semibold block rounded hover:bg-orange-50 transition-colors ${isActive ? "text-orange-color" : "text-gray-800"
                          }`
                        }
                        onClick={handleNavToggle}
                      >
                        {nav.label}
                      </NavLink>
                      {hasDropdown && (
                        <button
                          className="px-2"
                          onClick={() => toggleDropdown(idx)}
                          aria-label="Expand submenu"
                        >
                          <FaChevronDown
                            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                              }`}
                            size={16}
                          />
                        </button>
                      )}
                    </div>
                    {/* Dropdown */}
                    {hasDropdown && (
                      <ul
                        className={`overflow-hidden transition-all duration-300 bg-gray-50 rounded-md ${isOpen ? "max-h-96 py-1" : "max-h-0 py-0"
                          }`}
                      >
                        {nav.dropdown.map((drop) => (
                          <li key={drop.label}>
                            <button
                              className="w-full text-left block px-6 py-2 text-gray-700 hover:text-orange-color text-sm"
                              onClick={() => {
                                navigate(getDropdownPath(nav.label, drop.label));
                                setIsNavActive(false);
                                setOpenDropdownIndex(null);
                              }}
                            >
                              {drop.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* Mobile contact/social section */}
            <div className="border-t px-4 py-4 flex flex-col gap-2">
              <a href="https://wa.me/917069766966" className="flex items-center gap-2 text-orange-color font-semibold text-sm">
                <i className="fa-solid fa-phone"></i> +917069766966
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-color font-semibold text-sm">
                <i className="fa-solid fa-envelope"></i> booking@aalpine.in
              </a>
              <div className="flex gap-3 mt-1">
                <a href="https://www.facebook.com/sou.182m/" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-facebook text-orange-color text-lg"></i>
                </a>
                <a href="https://www.instagram.com/sou.india/#" target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-instagram text-orange-color text-lg"></i>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </nav>
    </>
  );
};
