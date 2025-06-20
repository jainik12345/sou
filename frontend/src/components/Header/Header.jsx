// /* eslint-disable no-unused-vars */


// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import logo from "../../assets/images/sou-logo.webp";
// import { useState, useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa6";
// import { RxHamburgerMenu } from "react-icons/rx";
// import BE_URL from "../../config";
// import axios from "axios";
// import FloatingButtons from "../FloatingButtons/FloatingButtons";

// export const Header = () => {
//   const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
//   const [isNavActive, setIsNavActive] = useState(false);
//   const [FetchError, setFetchError] = useState(null);
//   const [SouDropdown, setSouDropdown] = useState(null);
//   const [GujaratDropdown, setGujaratDropdown] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchSouDropdown = async () => {
//       try {
//         const res = await axios.get(`${BE_URL}/souPackageName`);
//         const data = res.data.data;
//         if (res.status === 200) {
//           setSouDropdown(
//             data &&
//               data.map((pkg) => ({
//                 label: pkg.sou_package_name,
//               }))
//           );
//         }
//       } catch (error) {
//         setFetchError("An error occurred while loading Navbar Dropdown Data.");
//       }
//     };

    
//     const fetchGujaratDropdown = async () => {
//       try {
//         const res = await axios.get(`${BE_URL}/gujaratPackage`);
//         const data = res.data.data;
//         if (res.status === 200) {
//           setGujaratDropdown(
//             data &&
//               data.map((pkg) => ({
//                 label: `Gujarat Tour ${pkg.Nights}N ${pkg.Days}D`,
//               }))
//           );
//         }
//       } catch (error) {
//         setFetchError("An error occurred while loading Gujarat Packages Data.");
//       }
//     };

//     fetchSouDropdown();
//     fetchGujaratDropdown();
//   }, []);

  
//   const toggleDropdown = (index) => {
//     setOpenDropdownIndex(openDropdownIndex === index ? null : index);
//   };

  
//   const handleNavToggle = () => {
//     setIsNavActive((prev) => !prev);
//     setOpenDropdownIndex(null);
//   };

//   //navbar data
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
//       dropdown: SouDropdown,
//     },
//     {
//       label: "Gallery",
//       path: "/gallery",
//       dropdown: SouDropdown,
//     },
//     {
//       label: "SOU Tickets",
//       path: "/sou-tickets",
//     },
//     {
//       label: "Gujarat Packages",
//       path: "/gujarat-packages",
//       dropdown: GujaratDropdown,
//     },
//     {
//       label: "Contact",
//       path: "/contact",
//     },
//   ];

//   // Helper function for dynamic dropdown path
//   const getDropdownPath = (parentLabel, childLabel) => {
//     if (parentLabel === "About Us") {
//       return `/about-us/${childLabel}`;
//     }
//     const base =
//       parentLabel === "Gujarat Packages"
//         ? "/gujarat-packages"
//         : parentLabel === "Gallery"
//         ? "/gallery"
//         : parentLabel === "Stay In Tent"
//         ? "/stay-in-tent"
//         : "";
//     return `${base}/${childLabel
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "")}`;
//   };

//   // Helper: Check if dropdown item is active (for red color)
//   const isDropdownItemActive = (parentLabel, dropdownPath, childLabel) => {
//     if (parentLabel === "About Us") {
//       return location.pathname === `/about-us/${childLabel}`;
//     }
//     if (parentLabel === "Stay In Tent") {
//       return (
//         location.pathname.startsWith("/stay-in-tent/") &&
//         location.pathname === getDropdownPath(parentLabel, childLabel)
//       );
//     }
//     if (parentLabel === "Gallery") {
//       return (
//         location.pathname.startsWith("/gallery/") &&
//         location.pathname === getDropdownPath(parentLabel, childLabel)
//       );
//     }
//     // Gujarat Packages
//     if (parentLabel === "Gujarat Packages") {
//       return (
//         location.pathname.startsWith("/gujarat-packages/") &&
//         location.pathname === getDropdownPath(parentLabel, childLabel)
//       );
//     }
//     return false;
//   };

//   // Helper: Check if parent dropdown should be active if any of its children is active
//   const isParentDropdownActive = (nav) => {
//     if (!nav.dropdown) return false;
//     return nav.dropdown.some((drop) =>
//       isDropdownItemActive(nav.label, drop.path, drop.label)
//     );
//   };

//   return (
//     <>
//       {/* Top Header Bar */}
//       <header className="bg-orange-color z-50 sticky left-0 top-0">
//         <div className="max-w-screen-xl mx-auto md:block hidden">
//           <div className="flex lg:justify-between justify-center items-center px-4 md:px-12 py-2 md:py-4">
//             <div className="hidden lg:block">
//               <h2 className="text-white font-medium text-base">
//                 Welcome to Statue of Unity
//               </h2>
//             </div>
//             <div className="flex flex-col lg:flex-row gap-1 lg:gap-0">
//               <ul className="flex flex-wrap gap-3 items-center">
//                 <li>
//                   <a
//                     href="https://wa.me/918347622244"
//                     className="text-white font-semibold text-xs md:text-base flex items-center gap-1"
//                   >
//                     <i className="fa-solid fa-phone text-white"></i>
//                     +918347622244
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://mail.google.com/mail/?view=cm&fs=1&to=compassInfo@gmail.com"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-white font-semibold text-xs md:text-base flex items-center gap-1"
//                   >
//                     <i className="fa-solid fa-envelope text-white"></i>
//                     compassInfo@gmail.com
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://www.facebook.com/sou.182m/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <i className="fa-brands fa-facebook text-white"></i>
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://www.instagram.com/sou.india/#"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <i className="fa-brands fa-instagram text-white"></i>
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation Bar */}
//       <nav className="sticky bg-white shadow-2xl z-50 top-0 left-0">
//         <div className="max-w-screen-xl mx-auto flex items-center justify-between py-3 px-4 md:px-8">
//           {/* Hamburger Menu (mobile) */}
//           <button
//             className="block md:hidden text-orange-color focus:outline-none"
//             aria-label="Open navigation menu"
//             onClick={handleNavToggle}
//           >
//             <RxHamburgerMenu size={32} />
//           </button>

//           {/* Logo */}
//           <div className="flex items-center">
//             <NavLink to="/" className="flex items-center">
//               <img src={logo} alt="Logo" className="h-11" />
//             </NavLink>
//           </div>

//           {/* Desktop Nav */}
//           <ul className="hidden md:flex items-center gap-4 lg:gap-7">
//             {navLinks.map((nav, idx) => {
//               const hasDropdown = !!nav.dropdown;
//               const parentActive = isParentDropdownActive(nav);

//               return (
//                 <li key={nav.label} className="relative group">
//                   <NavLink
//                     to={nav.path}
//                     className={({ isActive }) =>
//                       `flex items-center gap-1 font-semibold transition-colors duration-150 px-2 py-2 hover:text-orange-color ${
//                         isActive || parentActive
//                           ? "text-orange-600"
//                           : "text-gray-800"
//                       }`
//                     }
//                   >
//                     {nav.label}
//                     {hasDropdown && (
//                       <FaChevronDown
//                         className="transition-transform duration-200 group-hover:rotate-180"
//                         size={14}
//                       />
//                     )}
//                   </NavLink>
//                   {hasDropdown && (
//                     <ul className="absolute left-0 top-full bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible min-w-[180px] transition-all duration-200 z-30">
//                       {nav.dropdown &&
//                         nav.dropdown.map((drop, dropIdx) => (
//                           <li key={drop.label} className="w-full">
//                             <button
//                               className={`w-full text-left font-medium px-4 py-2 block text-sm
//                               ${
//                                 isDropdownItemActive(
//                                   nav.label,
//                                   drop.path,
//                                   drop.label
//                                 )
//                                   ? "text-red-600 font-bold"
//                                   : "text-gray-700 hover:text-orange-color"
//                               }
//                             `}
//                               onClick={() => {
//                                 navigate(
//                                   getDropdownPath(nav.label, drop.label)
//                                 );
//                               }}
//                             >
//                               {drop.label}
//                             </button>
//                           </li>
//                         ))}
//                     </ul>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//         {/* Mobile Drawer */}
//         <div
//           className={`fixed  z-50 transition-all duration-300 ${
//             isNavActive ? "pointer-events-auto" : "pointer-events-none"
//           }`}
//         >
//           {/* Backdrop */}
//           <div
//             className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
//               isNavActive ? "opacity-100" : "opacity-0"
//             }`}
//             onClick={handleNavToggle}
//           ></div>
//           {/* Drawer */}
//           <aside
//             className={`fixed top-0 left-0 h-full w-[77vw] max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
//               isNavActive ? "translate-x-0" : "-translate-x-full"
//             }`}
//           >
//             <div className="flex justify-between items-center px-4 py-2 border-b">
//               <NavLink to="/" onClick={handleNavToggle}>
//                 <img src={logo} alt="Logo" className="h-11" />
//               </NavLink>
//               <button
//                 className="md:hidden text-orange-color text-2xl"
//                 onClick={handleNavToggle}
//                 aria-label="Close menu"
//               >
//                 &times;
//               </button>
//             </div>
//             <ul className="flex flex-col gap-1 py-4 px-2">
//               {navLinks.map((nav, idx) => {
//                 const hasDropdown = !!nav.dropdown;
//                 const isOpen = openDropdownIndex === idx;
//                 const parentActive = isParentDropdownActive(nav);
//                 return (
//                   <li key={nav.label} className="w-full">
//                     <div className="flex items-center justify-between">
//                       <NavLink
//                         to={nav.path}
//                         className={({ isActive }) =>
//                           `flex-1 px-3 py-2 font-semibold block rounded hover:bg-orange-50 transition-colors ${
//                             isActive || parentActive
//                               ? "text-orange-600"
//                               : "text-gray-800"
//                           }`
//                         }
//                         onClick={handleNavToggle}
//                       >
//                         {nav.label}
//                       </NavLink>
//                       {hasDropdown && (
//                         <button
//                           className="px-2"
//                           onClick={() => toggleDropdown(idx)}
//                           aria-label="Expand submenu"
//                         >
//                           <FaChevronDown
//                             className={`transition-transform duration-200 ${
//                               isOpen ? "rotate-180" : ""
//                             }`}
//                             size={16}
//                           />
//                         </button>
//                       )}
//                     </div>
//                     {/* Dropdown */}
//                     {hasDropdown && (
//                       <ul
//                         className={`overflow-hidden transition-all duration-300 bg-gray-50 rounded-md ${
//                           isOpen ? "max-h-96 py-1" : "max-h-0 py-0"
//                         }`}
//                       >
//                         {nav.dropdown &&
//                           nav.dropdown.map((drop) => (
//                             <li key={drop.label}>
//                               <button
//                                 className={`w-full text-left block px-6 py-2 text-sm
//                                 ${
//                                   isDropdownItemActive(
//                                     nav.label,
//                                     drop.path,
//                                     drop.label
//                                   )
//                                     ? "text-red-600 font-bold"
//                                     : "text-gray-700 hover:text-orange-color"
//                                 }
//                               `}
//                                 onClick={() => {
//                                   navigate(
//                                     getDropdownPath(nav.label, drop.label)
//                                   );
//                                   setIsNavActive(false);
//                                   setOpenDropdownIndex(null);
//                                 }}
//                               >
//                                 {drop.label}
//                               </button>
//                             </li>
//                           ))}
//                       </ul>
//                     )}
//                   </li>
//                 );
//               })}
//             </ul>
//             {/* Mobile contact/social section */}
//             <div className="border-t px-4 py-4 flex flex-col gap-2">
//               <a
//                 href="https://wa.me/918347622244"
//                 className="flex items-center gap-2 text-orange-color font-semibold text-sm"
//               >
//                 <i className="fa-solid fa-phone"></i> +918347622244
//               </a>
//               <a
//                 href="https://mail.google.com/mail/?view=cm&fs=1&to=booking@aalpine.in"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-orange-color font-semibold text-sm"
//               >
//                 <i className="fa-solid fa-envelope"></i> booking@aalpine.in
//               </a>
//               <div className="flex gap-3 mt-1">
//                 <a
//                   href="https://www.facebook.com/sou.182m/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-facebook text-orange-color text-lg"></i>
//                 </a>
//                 <a
//                   href="https://www.instagram.com/sou.india/#"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <i className="fa-brands fa-instagram text-orange-color text-lg"></i>
//                 </a>
//               </div>
//             </div>
//           </aside>
//         </div>
//         <FloatingButtons/>
//       </nav>
//     </>
//   );
// };



/* eslint-disable no-unused-vars */

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/sou-logo.png";
import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import BE_URL from "../../config";
import axios from "axios";
import FloatingButtons from "../FloatingButtons/FloatingButtons";

export const Header = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isNavActive, setIsNavActive] = useState(false);
  const [FetchError, setFetchError] = useState(null);
  const [SouDropdown, setSouDropdown] = useState(null);
  const [GujaratDropdown, setGujaratDropdown] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchSouDropdown = async () => {
      try {
        const res = await axios.get(`${BE_URL}/souPackageName`);
        const data = res.data.data;
        if (res.status === 200) {
          setSouDropdown(
            data &&
              data.map((pkg) => ({
                label: pkg.sou_package_name,
              }))
          );
        }
      } catch (error) {
        setFetchError("An error occurred while loading Navbar Dropdown Data.");
      }
    };

    const fetchGujaratDropdown = async () => {
      try {
        const res = await axios.get(`${BE_URL}/gujaratPackage`);
        const data = res.data.data;
        if (res.status === 200) {
          setGujaratDropdown(
            data &&
              data.map((pkg) => ({
                label: `Gujarat Tour ${pkg.Nights}N ${pkg.Days}D`,
              }))
          );
        }
      } catch (error) {
        setFetchError("An error occurred while loading Gujarat Packages Data.");
      }
    };

    fetchSouDropdown();
    fetchGujaratDropdown();
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleNavToggle = () => {
    setIsNavActive((prev) => !prev);
    setOpenDropdownIndex(null);
  };

  // Helper function for dynamic dropdown path
  const getDropdownPath = (parentLabel, childLabel) => {
    if (parentLabel === "About Us") {
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

  // Helper: Check if dropdown item is active (for red color)
  const isDropdownItemActive = (parentLabel, dropdownPath, childLabel) => {
    if (parentLabel === "About Us") {
      return location.pathname === `/about-us/${childLabel}`;
    }
    if (parentLabel === "Stay In Tent") {
      return (
        location.pathname.startsWith("/stay-in-tent/") &&
        location.pathname === getDropdownPath(parentLabel, childLabel)
      );
    }
    if (parentLabel === "Gallery") {
      return (
        location.pathname.startsWith("/gallery/") &&
        location.pathname === getDropdownPath(parentLabel, childLabel)
      );
    }
    // Gujarat Packages
    if (parentLabel === "Gujarat Packages") {
      return (
        location.pathname.startsWith("/gujarat-packages/") &&
        location.pathname === getDropdownPath(parentLabel, childLabel)
      );
    }
    return false;
  };

  // Helper: Check if parent dropdown should be active if any of its children is active
  const isParentDropdownActive = (nav) => {
    if (!nav.dropdown) return false;
    return nav.dropdown.some((drop) =>
      isDropdownItemActive(nav.label, drop.path, drop.label)
    );
  };

  //navbar data
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
      dropdown: SouDropdown,
    },
    {
      label: "Gallery",
      path: "/gallery",
      dropdown: SouDropdown,
    },
    // {
    //   label: "SOU Tickets",
    //   path: "/sou-tickets",
    // },
    {
      label: "Gujarat Packages",
      path: "/gujarat-packages",
      dropdown: GujaratDropdown,
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ];

  // === Main Returns ===
  return (
    <>
      {/* Top Header Bar */}
      <header className="bg-orange-color z-50 sticky left-0 top-0">
        <div className="max-w-screen-xl mx-auto md:block hidden">
          <div className="flex lg:justify-between justify-center items-center px-4 md:px-12 py-1.5 md:py-2.5">
            <div className="hidden lg:block">
              <h2 className="text-white font-medium text-base">
                Welcome to Statue of Unity
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-0">
              <ul className="flex flex-wrap gap-3 items-center">
                <li>
                  <a
                    href="https://wa.me/917600230525"
                    className="text-white font-semibold text-xs md:text-base flex items-center gap-1"
                  >
                    <i className="fa-solid fa-phone text-white"></i>
                    +917600230525
                  </a>
                </li>
                <li>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=bookings@thenarmadatentcity.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-semibold text-xs md:text-base flex items-center gap-1"
                  >
                    <i className="fa-solid fa-envelope text-white"></i>
                    bookings@thenarmadatentcity.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/sou.182m/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook text-white"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/sou.india/#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
        <div className="max-w-screen-xl mx-auto flex items-center justify-between py-1 px-4 md:px-8">
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
              <img src={logo} alt="Logo" className="h-20" />
            </NavLink>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-5">
            {navLinks.map((nav, idx) => {
              const hasDropdown = !!nav.dropdown;
              const parentActive = isParentDropdownActive(nav);

              // Gallery NavLink: override click to redirect to first dropdown
              if (nav.label === "Gallery") {
                return (
                  <li key={nav.label} className="relative group">
                    <button
                      type="button"
                      className={`flex text-[12px] lg:text-[15px] items-center gap-1 font-semibold transition-colors duration-150 px-0 md:px-2 py-2 hover:text-orange-color bg-transparent border-0 outline-none ${
                        location.pathname.startsWith("/gallery/")
                          ? "text-orange-600"
                          : "text-gray-800"
                      }`}
                      onClick={() => {
                        if (SouDropdown && SouDropdown.length > 0) {
                          navigate(getDropdownPath("Gallery", SouDropdown[0].label));
                        }
                      }}
                    >
                      {nav.label}
                      {hasDropdown && (
                        <FaChevronDown
                          className="transition-transform duration-200 group-hover:rotate-180"
                          size={14}
                        />
                      )}
                    </button>
                    {hasDropdown && (
                      <ul className="absolute left-0 top-full bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible min-w-[180px] transition-all duration-200 z-30">
                        {nav.dropdown &&
                          nav.dropdown.map((drop, dropIdx) => (
                            <li key={drop.label} className="w-full">
                              <button
                                className={`w-full text-[12px] lg:text-[15px] text-left font-medium px-4 py-2 block text-sm
                                ${
                                  isDropdownItemActive(
                                    nav.label,
                                    drop.path,
                                    drop.label
                                  )
                                    ? "text-red-600 font-bold"
                                    : "text-gray-700 hover:text-orange-color"
                                }
                              `}
                                onClick={() => {
                                  navigate(
                                    getDropdownPath(nav.label, drop.label)
                                  );
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
              }

              return (
                <li key={nav.label} className="relative group">
                  <NavLink
                    to={nav.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-[12px] lg:text-[15px] font-semibold transition-colors duration-150 px-2 py-2 hover:text-orange-color ${
                        isActive || parentActive
                          ? "text-orange-600"
                          : "text-gray-800"
                      }`
                    }
                  >
                    {nav.label}
                    {hasDropdown && (
                      <FaChevronDown
                        className="transition-transform duration-200 group-hover:rotate-180"
                        size={14}
                      />
                    )}
                  </NavLink>
                  {hasDropdown && (
                    <ul className="absolute left-0 top-full bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible min-w-[180px] transition-all duration-200 z-30">
                      {nav.dropdown &&
                        nav.dropdown.map((drop, dropIdx) => (
                          <li key={drop.label} className="w-full">
                            <button
                              className={`w-full text-left font-medium px-4 py-2 block text-sm
                              ${
                                isDropdownItemActive(
                                  nav.label,
                                  drop.path,
                                  drop.label
                                )
                                  ? "text-red-600 font-bold"
                                  : "text-gray-700 hover:text-orange-color"
                              }
                            `}
                              onClick={() => {
                                navigate(
                                  getDropdownPath(nav.label, drop.label)
                                );
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
          className={`fixed  z-50 transition-all duration-300 ${
            isNavActive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
              isNavActive ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleNavToggle}
          ></div>
          {/* Drawer */}
          <aside
            className={`fixed top-0 left-0 h-full w-[77vw] max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
              isNavActive ? "translate-x-0" : "-translate-x-full"
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
                const parentActive = isParentDropdownActive(nav);

                // Gallery: mobile - override click
                if (nav.label === "Gallery") {
                  return (
                    <li key={nav.label} className="w-full">
                      <div className="flex items-center justify-between">
                        <button
                          className={`flex-1 px-3 py-2 text-left font-semibold block rounded hover:bg-orange-50 transition-colors ${
                            location.pathname.startsWith("/gallery/")
                              ? "text-orange-600"
                              : "text-gray-800"
                          }`}
                          onClick={() => {
                            if (SouDropdown && SouDropdown.length > 0) {
                              navigate(getDropdownPath("Gallery", SouDropdown[0].label));
                            }
                            setIsNavActive(false);
                            setOpenDropdownIndex(null);
                          }}
                        >
                          {nav.label}
                        </button>
                        {hasDropdown && (
                          <button
                            className="px-2"
                            onClick={() => toggleDropdown(idx)}
                            aria-label="Expand submenu"
                          >
                            <FaChevronDown
                              className={`transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              size={16}
                            />
                          </button>
                        )}
                      </div>
                      {/* Dropdown */}
                      {hasDropdown && (
                        <ul
                          className={`overflow-hidden transition-all duration-300 bg-gray-50 rounded-md ${
                            isOpen ? "max-h-96 py-1" : "max-h-0 py-0"
                          }`}
                        >
                          {nav.dropdown &&
                            nav.dropdown.map((drop) => (
                              <li key={drop.label}>
                                <button
                                  className={`w-full text-left block px-6 py-2 text-sm
                                ${
                                  isDropdownItemActive(
                                    nav.label,
                                    drop.path,
                                    drop.label
                                  )
                                    ? "text-red-600 font-bold"
                                    : "text-gray-700 hover:text-orange-color"
                                }
                              `}
                                  onClick={() => {
                                    navigate(
                                      getDropdownPath(nav.label, drop.label)
                                    );
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
                }

                return (
                  <li key={nav.label} className="w-full">
                    <div className="flex items-center justify-between">
                      <NavLink
                        to={nav.path}
                        className={({ isActive }) =>
                          `flex-1 px-3 py-2 font-semibold block rounded hover:bg-orange-50 transition-colors ${
                            isActive || parentActive
                              ? "text-orange-600"
                              : "text-gray-800"
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
                            className={`transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            size={16}
                          />
                        </button>
                      )}
                    </div>
                    {/* Dropdown */}
                    {hasDropdown && (
                      <ul
                        className={`overflow-hidden transition-all duration-300 bg-gray-50 rounded-md ${
                          isOpen ? "max-h-96 py-1" : "max-h-0 py-0"
                        }`}
                      >
                        {nav.dropdown &&
                          nav.dropdown.map((drop) => (
                            <li key={drop.label}>
                              <button
                                className={`w-full text-left block px-6 py-2 text-sm
                                ${
                                  isDropdownItemActive(
                                    nav.label,
                                    drop.path,
                                    drop.label
                                  )
                                    ? "text-red-600 font-bold"
                                    : "text-gray-700 hover:text-orange-color"
                                }
                              `}
                                onClick={() => {
                                  navigate(
                                    getDropdownPath(nav.label, drop.label)
                                  );
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
              <a
                href="https://wa.me/917600230525"
                className="flex items-center gap-2 text-orange-color font-semibold text-sm"
              >
                <i className="fa-solid fa-phone"></i> +917600230525
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=bookings@thenarmadatentcity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-color font-semibold text-sm"
              >
                <i className="fa-solid fa-envelope"></i>bookings@thenarmadatentcity.com
              </a>
              <div className="flex gap-3 mt-1">
                <a
                  href="https://www.facebook.com/sou.182m/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook text-orange-color text-lg"></i>
                </a>
                <a
                  href="https://www.instagram.com/sou.india/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram text-orange-color text-lg"></i>
                </a>
              </div>
            </div>
          </aside>
        </div>
        <FloatingButtons/>
      </nav>
    </>
  );
};