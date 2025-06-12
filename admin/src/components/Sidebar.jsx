/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaInfoCircle,
  FaLock,
  FaPhotoVideo,
  FaFileContract,
} from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { LuPackageOpen } from "react-icons/lu";
import { GoPackageDependents } from "react-icons/go";
import { SiBloglovin } from "react-icons/si";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState("");

  const sidebarVariants = {
    open: { width: "250px" },
    closed: { width: "80px" },
  };

  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FaInfoCircle />,
      children: [
        { path: "/home-image-slider", name: "Home Image Slider" },
        { path: "/home-sou-package", name: "Home Sou Package" },
        { path: "/home-near-attractions", name: "Home Near Attractions" },
        { path: "/home-testimonial", name: "Home Testimonial" },
        {
          path: "/home-online-booking-content",
          name: "Home Online Booking Content",
        },
        { path: "/home-certificate", name: "home Certificate" },
      ],
    },
    {
      path: "/about",
      name: "About",
      icon: <FaPhotoVideo />,
      children: [
        { path: "/about-hero-section", name: "About Hero Section" },
        { path: "/about-intresting-faqs", name: "About Intresting Faqs" },
        { path: "/about-why-choose-section", name: "About Why Choose Section" },
        {
          path: "/about-attractions-section",
          name: "About Attractions Section",
        },
        { path: "/about-activities-section", name: "About Activities Section" },
      ],
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <FaInfoCircle />,
      children: [
        { path: "/contact-page-section", name: "Contact Page Section" },
        { path: "/contact-form-details", name: "Contact Form Details" },
      ],
    },

    {
      path: "/gujarat-package",
      name: "Gujarat Package",
      icon: <GoPackageDependents />,
      children: [
        { path: "/gujarat-packages-name", name: "Gujarat Package Name" },
        { path: "/gujarat-Packages-data", name: "Gujarat Package Data" },
      ],
    },

    {
      path: "/sou-package",
      name: "SOU Package",
      icon: <LuPackageOpen />,
      children: [
        { path: "/sou-package-name", name: "SOU Package Name" },
        { path: "/sou-package-gallery", name: "SOU Package Gallery" },
        { path: "/sou-package-hero-section", name: "Sou Package Hero Section" },
        { path: "/sou-package-amenities", name: "Sou Package Amenities" },
        {
          path: "/sou-package-itinerary-name",
          name: "Sou Package Itinerary name",
        },
        {
          path: "/sou-package-itinerary-section",
          name: "Sou Package Itinerary Section",
        },
        { path: "/sou-package-notes-policy", name: "Sou Package Notes Policy" },
        { path: "/sou-package-faqs", name: "Sou Package Faqs" },
        { path: "/sou-package-paragrpah", name: "Sou Package Paragrpah" },
        { path: "/sou-package-meal-plan", name: "Sou Package Meal Plan" },
        { path: "/sou-package-lake-view", name: "Sou Package lake View" },
        { path: "/sou-package-resort", name: "Sou Package Resort" },
        { path: "/sou-package-book-layer", name: "Sou Package Book layer" },
        { path: "/sou-package-bg-image", name: "Sou Package Bg Image" },
        {
          path: "/sou-package-itinerary-price",
          name: "Sou Package Itinerary Price",
        },
      ],
    },

    {
      path: "/blog",
      name: "Blog",
      icon: <SiBloglovin />,
      children: [
        { path: "/blog-category-name", name: "Blog Category Name" },
        { path: "/blog-data-details", name: "Blog Data Details" },
      ],
    },

    { path: "/private-policy", name: "Private Policy", icon: <FaLock /> },

    {
      path: "/terms-conditions",
      name: "Terms & Conditions",
      icon: <FaFileContract />,
    },
  ];

  const handleToggle = (name) => {
    setExpandedMenu((prev) => (prev === name ? "" : name));
  };

  const isActive = (item) => {
    if (item.children && item.children.length > 0) {
      return item.children.some((child) =>
        location.pathname.startsWith(child.path)
      );
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="h-screen bg-gray-800 text-white flex flex-col fixed top-0 left-0 overflow-hidden shadow-lg z-50"
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 border-b-2 border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">{isOpen ? "Tourism" : "T"}</div>
        </div>
        <div className="cursor-pointer text-2xl" onClick={toggleSidebar}>
          {isOpen ? <IoClose /> : <IoMenu />}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItem.map((item, index) => {
          const hasChildren = item.children && item.children.length > 0;
          const active = isActive(item);
          const isExpanded = expandedMenu === item.name;

          if (hasChildren) {
            return (
              <div key={index}>
                {/* Parent menu item */}
                <div
                  className={`flex items-center justify-between p-2 rounded-[12px] cursor-pointer hover:bg-gray-700 ${
                    active ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleToggle(item.name)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{item.icon}</div>
                    {isOpen && <span>{item.name}</span>}
                  </div>

                  {isOpen && (
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: isExpanded ? 360 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg"
                    >
                      {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                    </motion.div>
                  )}
                </div>

                {/* Child links */}
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      isExpanded
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3 }}
                    className="pl-8 overflow-hidden"
                  >
                    {/* {item.children.map((child, i) => (
                      <Link
                        key={i}
                        to={child.path}
                        className={`block p-2 m-0.5 rounded-md text-sm hover:bg-gray-600 transition-all duration-200 ${
                          location.pathname === child.path ? "bg-gray-600" : ""
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))} */}

                    {item.children.map((child, i) => {
                      const isChildActive = location.pathname.startsWith(
                        child.path
                      );
                      return (
                        <Link
                          key={i}
                          to={child.path}
                          className={`block p-2 m-0.5 rounded-md text-sm hover:bg-gray-600 transition-all duration-200 ${
                            isChildActive ? "bg-gray-600" : ""
                          }`}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            );
          } else {
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center p-2 rounded-[12px] hover:bg-gray-700 ${
                  active ? "bg-gray-700" : ""
                }`}
              >
                <div className="text-xl">{item.icon}</div>
                {isOpen && <span className="ml-4">{item.name}</span>}
              </Link>
            );
          }
        })}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
