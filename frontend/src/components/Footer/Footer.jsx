// import logo from "../../assets/images/sou-logo.webp";
// import { NavLink, useLocation } from "react-router-dom";
// import { FaAnglesRight } from "react-icons/fa6";
// import { FaFacebookF, FaInstagram } from "react-icons/fa";
// import BE_URL from "../../config";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export const Footer = () => {
//   // useStates Definations
//   const [SouPackages, setSouPackages] = useState([]);
//   const [GujaratPackages, setGujaratPackages] = useState([]);
//   const [FetchError, setFetchError] = useState(null);

//   // Get current location for active NavLink
//   const location = useLocation();

//   // fetching data
//   useEffect(() => {
//     const FetchFooterDropdowns = async () => {
//       try {
//         const FetchSouPackagesResponse = await axios.get(`${BE_URL}/souPackageName`);
//         const FetchGujaratPackagesResponse = await axios.get(`${BE_URL}/gujaratPackage`);

//         // sou packages
//         if (FetchSouPackagesResponse.status === 200) {
//           setSouPackages(
//             FetchSouPackagesResponse.data.data &&
//               FetchSouPackagesResponse.data.data.map((pkg) => ({
//                 label: pkg.sou_package_name,
//               }))
//           );
//         } else {
//           setFetchError("Failed to load footer dropdown .");
//           console.warn("Unexpected response status:", FetchSouPackagesResponse.status);
//         }

//         // gujarat packages
//         if (FetchGujaratPackagesResponse.status === 200) {
//           setGujaratPackages(
//             FetchGujaratPackagesResponse.data.data &&
//               FetchGujaratPackagesResponse.data.data.map((pkg) => ({
//                 label: `Gujarat Tour ${pkg.Nights}N ${pkg.Days}D`,
//               }))
//           );
//         } else {
//           setFetchError("Failed to load footer dropdown .");
//           console.warn("Unexpected response status:", FetchGujaratPackagesResponse.status);
//         }
//       } catch (error) {
//         console.error("Unable To Fetch Data Of footer footer dropdown data:- ", error);
//         setFetchError("An error occurred while loading footer dropdown data.");
//       }
//     };

//     FetchFooterDropdowns();
//   }, []);

//   const FooterNavLinks = [
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
//       dropdown: SouPackages,
//     },
//     {
//       label: "Gallery",
//       path: "/gallery",
//       dropdown: SouPackages,
//     },
//     {
//       label: "SOU Tickets",
//       path: "/sou-tickets",
//     },
//     {
//       label: "Gujarat Packages",
//       path: "/gujarat-packages",
//       dropdown: GujaratPackages,
//     },
//     {
//       label: "Contact",
//       path: "/contact",
//     },
//     {
//       label: "Privacy Policy",
//       path: "/privacy-policy",
//     },
//     {
//       label: "Terms & Conditions",
//       path: "/terms-conditions",
//     },
//     {
//       label: "Blogs",
//       path: "/blogs",
//     },
//   ];

//   // Helper function to generate route for Stay In Tent and Gujarat Packages
//   const getSubRoute = (base, label) => {
//     return `/${base}/${label.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')}`;
//   };

//   // Helper function to check if current route is active for subroutes
//   const isSubRouteActive = (base, label) => {
//     const basePath = getSubRoute(base, label);
//     return location.pathname === basePath;
//   };

//   return (
//     <footer className="bg-gradient-to-br from-orange-50 via-white to-orange-100 border-t border-orange-200">
//       <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col gap-12">
//         {/* Top Row: Logo + About + CTA */}
//         <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center   gap-8">
//           {/* Logo and About */}
//           <div className="flex flex-col items-center md:items-center  gap-4 text-center">
//             <img src={logo} alt="Logo" className="h-16 drop-shadow-md" />
//             <p className="text-base text-gray-600 text-center  max-w-xs">
//               We work with a passion for taking challenges and creating new ones in the hospitality & travel sector.
//             </p>
//             {/* <span className="inline-block bg-orange-400 text-white px-5 py-2 rounded-full font-semibold shadow mt-2 text-sm tracking-wider">
//               Visits: <span className="font-bold">180468</span>
//             </span> */}
//           </div>
//         </div>
//         {/* Divider */}
//         <div className="border-t border-orange-100" />
//         {/* Bottom Grid: Navigation & Contact */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {/* Stay In Tent */}
//           <div>
//             <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Stay In Tent</h4>
//             <ul className="space-y-2">
//               {FooterNavLinks[2].dropdown.map((Val, Idx) => {
//                 const route = getSubRoute("stay-in-tent", Val.label);
//                 const isActive = location.pathname === route;
//                 return (
//                   <li key={Idx}>
//                     <NavLink
//                       to={route}
//                       className={({ isActive: navIsActive }) =>
//                         `group flex items-center font-medium transition ${
//                           navIsActive || isActive
//                             ? "text-orange-500"
//                             : "text-gray-600 hover:text-orange-500"
//                         }`
//                       }
//                     >
//                       <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
//                       {Val.label}
//                     </NavLink>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//           {/* Gujarat Packages */}
//           <div>
//             <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Gujarat Packages</h4>
//             <ul className="space-y-2">
//               {FooterNavLinks[5].dropdown.map((Val, Idx) => {
//                 const route = getSubRoute("gujarat-packages", Val.label);
//                 const isActive = location.pathname === route;
//                 return (
//                   <li key={Idx}>
//                     <NavLink
//                       to={route}
//                       className={({ isActive: navIsActive }) =>
//                         `group flex items-center font-medium transition ${
//                           navIsActive || isActive
//                             ? "text-orange-500"
//                             : "text-gray-600 hover:text-orange-500"
//                         }`
//                       }
//                     >
//                       <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
//                       {Val.label}
//                     </NavLink>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//           {/* Useful Links */}
//           <div>
//             <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Useful Links</h4>
//             <ul className="space-y-2">
//               {FooterNavLinks.map((Item, Idx) => (
//                 <li key={Idx}>
//                   <NavLink
//                     to={Item.path}
//                     className={({ isActive }) =>
//                       `group flex items-center font-medium transition ${
//                         isActive
//                           ? "text-orange-500"
//                           : "text-gray-600 hover:text-orange-500"
//                       }`
//                     }
//                   >
//                     <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
//                     {Item.label}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {/* Contact */}
//           <div>
//             <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">Contact</h4>
//             <p className="text-gray-600 text-base mb-2 flex items-start">
//               <i className="fa-solid fa-location-dot text-orange-400 mr-2 mt-1"></i>
//              301, KALING Behind Bata Showroom Opp. Mount Carmel Convent school Ashram Road - 380009
//             </p>
//             <a
//               href="https://wa.me/918347622244"
//               className="flex items-center text-gray-600 hover:text-orange-500 mb-2"
//             >
//               <i className="fa-solid fa-phone text-orange-400 mr-2"></i>
//               +91 8347622244
//             </a>
//             <a
//               href="https://mail.google.com/mail/?view=cm&fs=1&to=compassInfo@gmail.com"
//               className="flex items-center text-gray-600 hover:text-orange-500 mb-2"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fa-solid fa-envelope text-orange-400 mr-2"></i>
//               compassInfo@gmail.com
//             </a>
//             <div className="flex gap-3 mt-3">
//               <a
//                 href="https://www.facebook.com/sou.182m/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-100 hover:bg-blue-200 rounded-full p-2 transition"
//               >
//                 <FaFacebookF className="text-blue-500 text-lg" />
//               </a>
//               <a
//                 href="https://www.instagram.com/sou.india/#"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-orange-100 hover:bg-orange-200 rounded-full p-2 transition"
//               >
//                 <FaInstagram className="text-orange-500 text-lg" />
//               </a>
//             </div>
//           </div>
//         </div>
//         {/* Bottom bar */}
//         <div className="pt-8 text-center text-gray-500 text-sm border-t border-orange-100">
//           &copy; {new Date().getFullYear()} Statue of Unity. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

/* Remove Dropdown Name :  */

import logo from "../../assets/images/sou-logo.png";
import { NavLink, useLocation } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import BE_URL from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";

export const Footer = () => {
  // useStates Definations
  const [SouPackages, setSouPackages] = useState([]);
  const [GujaratPackages, setGujaratPackages] = useState([]);
  const [FetchError, setFetchError] = useState(null);

  // Get current location for active NavLink
  const location = useLocation();

  // fetching data
  useEffect(() => {
    const FetchFooterDropdowns = async () => {
      try {
        const FetchSouPackagesResponse = await axios.get(
          `${BE_URL}/souPackageName`
        );
        const FetchGujaratPackagesResponse = await axios.get(
          `${BE_URL}/gujaratPackage`
        );

        // sou packages
        if (FetchSouPackagesResponse.status === 200) {
          setSouPackages(
            FetchSouPackagesResponse.data.data &&
              FetchSouPackagesResponse.data.data.map((pkg) => ({
                label: pkg.sou_package_name,
              }))
          );
        } else {
          setFetchError("Failed to load footer dropdown .");
          console.warn(
            "Unexpected response status:",
            FetchSouPackagesResponse.status
          );
        }

        // gujarat packages
        if (FetchGujaratPackagesResponse.status === 200) {
          setGujaratPackages(
            FetchGujaratPackagesResponse.data.data &&
              FetchGujaratPackagesResponse.data.data.map((pkg) => ({
                label: `Gujarat Tour ${pkg.Nights}N ${pkg.Days}D`,
              }))
          );
        } else {
          setFetchError("Failed to load footer dropdown .");
          console.warn(
            "Unexpected response status:",
            FetchGujaratPackagesResponse.status
          );
        }
      } catch (error) {
        console.error(
          "Unable To Fetch Data Of footer footer dropdown data:- ",
          error
        );
        setFetchError("An error occurred while loading footer dropdown data.");
      }
    };

    FetchFooterDropdowns();
  }, []);

  const FooterNavLinks = [
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
      dropdown: SouPackages,
    },
    {
      label: "Gallery",
      path: "/gallery",
      dropdown: SouPackages,
    },
    {
      label: "SOU Tickets",
      path: "/sou-tickets",
    },
    {
      label: "Gujarat Packages",
      path: "/gujarat-packages",
      dropdown: GujaratPackages,
    },
    {
      label: "Contact",
      path: "/contact",
    },
    {
      label: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      path: "/terms-conditions",
    },
    {
      label: "Blogs",
      path: "/blogs",
    },
  ];

  // Helper function to generate route for Stay In Tent and Gujarat Packages
  const getSubRoute = (base, label) => {
    return `/${base}/${label
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "")}`;
  };

  // Filter out Gallery, Stay In Tent, SOU Tickets, Gujarat Packages from Useful Links
  const UsefulLinks = FooterNavLinks.filter(
    (item) =>
      !["Gallery", "Stay In Tent", "SOU Tickets", "Gujarat Packages"].includes(
        item.label
      )
  );

  return (
    <footer className="bg-gradient-to-br from-orange-50 via-white to-orange-100 border-t border-orange-200">
      <div className="max-w-screen-xl mx-auto px-6 py-12 flex flex-col gap-12">
        {/* Top Row: Logo + About + CTA */}
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center   gap-8">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-center  gap-4 text-center">
            <img
              src={logo}
              alt="Logo"
              className="h-20 cursor-pointer drop-shadow-md"
            />
            <p className="text-base text-gray-600 text-center  max-w-xs">
              We work with a passion for taking challenges and creating new ones
              in the hospitality & travel sector.
            </p>
            {/* <span className="inline-block bg-orange-400 text-white px-5 py-2 rounded-full font-semibold shadow mt-2 text-sm tracking-wider">
              Visits: <span className="font-bold">180468</span>
            </span> */}
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-orange-100" />
        {/* Bottom Grid: Navigation & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Stay In Tent */}
          <div>
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">
              Stay In Tent
            </h4>
            <ul className="space-y-2">
              {FooterNavLinks[2].dropdown.map((Val, Idx) => {
                const route = getSubRoute("stay-in-tent", Val.label);
                const isActive = location.pathname === route;
                return (
                  <li key={Idx}>
                    <NavLink
                      to={route}
                      className={({ isActive: navIsActive }) =>
                        `group flex items-center font-medium transition ${
                          navIsActive || isActive
                            ? "text-orange-500"
                            : "text-gray-600 hover:text-orange-500"
                        }`
                      }
                    >
                      <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
                      {Val.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Gujarat Packages */}
          <div>
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">
              Gujarat Packages
            </h4>
            <ul className="space-y-2">
              {FooterNavLinks[5].dropdown.map((Val, Idx) => {
                const route = getSubRoute("gujarat-packages", Val.label);
                const isActive = location.pathname === route;
                return (
                  <li key={Idx}>
                    <NavLink
                      to={route}
                      className={({ isActive: navIsActive }) =>
                        `group flex items-center font-medium transition ${
                          navIsActive || isActive
                            ? "text-orange-500"
                            : "text-gray-600 hover:text-orange-500"
                        }`
                      }
                    >
                      <FaAnglesRight className="mr-2 opacity-60 group-hover:translate-x-1 transition" />
                      {Val.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Useful Links */}
          <div>
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">
              Useful Links
            </h4>
            <ul className="space-y-2">
              {UsefulLinks.map((Item, Idx) => (
                <li key={Idx}>
                  <NavLink
                    to={Item.path}
                    className={({ isActive }) =>
                      `group flex items-center font-medium transition ${
                        isActive
                          ? "text-orange-500"
                          : "text-gray-600 hover:text-orange-500"
                      }`
                    }
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
            <h4 className="text-orange-500 font-bold mb-2 text-lg tracking-wide">
              Contact
            </h4>
            <p className="text-gray-600 text-base mb-2 flex items-start">
              <i className="fa-solid fa-location-dot text-orange-400 mr-2 mt-1"></i>
              301, KALING Behind Bata Showroom Opp. Mount Carmel Convent school
              Ashram Road - 380009
            </p>
            <a
              href="https://wa.me/917600230525"
              className="flex items-center text-gray-600 hover:text-orange-500 mb-2"
            >
              <i className="fa-solid fa-phone text-orange-400 mr-2"></i>
              +91 7600230525
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=bookings@thenarmadatentcity.com"
              className="flex text-[13px] lg:text-[16px] items-center text-gray-600 hover:text-orange-500 mb-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-solid fa-envelope text-orange-400 mr-2"></i>
              bookings@thenarmadatentcity.com
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
          &copy; {new Date().getFullYear()} Statue of Unity. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};
