/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";

// Utility to slugify
const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const tabVariants = {
  active: { scale: 1.05, backgroundColor: "#f97316", color: "#fff" },
  inactive: { scale: 1, backgroundColor: "#fff", color: "#f97316" },
};

export const StayInTentDropDownItinerary = () => {
  const { StayInTentPath } = useParams();
  const formattedPath = slugify(StayInTentPath);
  const [itineraries, setItineraries] = useState([]); // Array of names [{id, sou_package_itinerary_name}]
  const [sections, setSections] = useState({}); // id: [section, ...]
  const [selectedTab, setSelectedTab] = useState(0);
  const [loadingNames, setLoadingNames] = useState(true);
  const [loadingSections, setLoadingSections] = useState(false);

  // Fetch itinerary names when path changes
  useEffect(() => {
    setLoadingNames(true);
    setItineraries([]);
    setSections({});
    setSelectedTab(0);

    // 1. Fetch all packages and find the matching ID
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        const allPackages = res.data.data || [];
        const found = allPackages.find(
          (pkg) => slugify(pkg.sou_package_name) === formattedPath
        );
        if (!found) {
          setLoadingNames(false);
          return;
        }
        // 2. Fetch all itinerary names for this package id
        return axios.get(
          `${BE_URL}/souPackageItineraryName/package/${found.id}`
        );
      })
      .then((itRes) => {
        if (!itRes || !itRes.data || !Array.isArray(itRes.data.data)) {
          setLoadingNames(false);
          return;
        }
        setItineraries(itRes.data.data);
        setLoadingNames(false);
      })
      .catch(() => {
        setLoadingNames(false);
      });
  }, [formattedPath]);

  // Fetch sections for the selected itinerary tab
  useEffect(() => {
    if (!itineraries.length) return;
    const current = itineraries[selectedTab];
    if (!current || sections[current.id]) return; // already loaded

    setLoadingSections(true);
    axios
      .get(`${BE_URL}/souPackageItinerarySection/itinerary/${current.id}`)
      .then((res) => {
        setSections((prev) => ({
          ...prev,
          [current.id]: res.data.data || [],
        }));
        setLoadingSections(false);
      })
      .catch(() => setLoadingSections(false));
  }, [selectedTab, itineraries, sections]);

  if (loadingNames)
    return (
      <section className="w-full px-4 py-14 bg-gradient-to-br from-orange-50 to-white text-center">
        <span className="text-lg">Loading itinerary...</span>
      </section>
    );

  if (!itineraries.length) return null;

  const currentSections = sections[itineraries[selectedTab]?.id] || [];

  return (
    <section className="w-full px-2 py-14 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-screen-xl mx-auto rounded-3xl p-3 md:p-5 shadow-2xl bg-white/90">
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-700 mb-2 tracking-tight">
            Itinerary of Statue of Unity Tent City 1
          </h2>
          <p className="text-gray-500 text-base sm:text-lg">
            Explore each day of your unique Tent City experience. Select your
            stay duration to see the plan!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {itineraries.map((tab, idx) => (
            <motion.button
              key={tab.id}
              className={`px-5 py-2 rounded-xl font-semibold border-2 border-orange-400 focus:outline-none transition-all md:text-[1rem] text-[.7rem]
                ${selectedTab === idx ? "shadow-lg" : ""}
              `}
              animate={selectedTab === idx ? "active" : "inactive"}
              variants={tabVariants}
              whileHover={selectedTab !== idx ? { scale: 1.06 } : undefined}
              onClick={() => setSelectedTab(idx)}
            >
              {tab.sou_package_itinerary_name}
            </motion.button>
          ))}
        </div>

        {/* Itinerary Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 120 }}
            className="space-y-7"
          >
            {loadingSections ? (
              <div className="text-center text-orange-600 py-8">
                Loading itinerary details...
              </div>
            ) : currentSections.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No itinerary details found.
              </div>
            ) : (
              currentSections.map((section, idx) => {
                let events = [];
                try {
                  events = Array.isArray(section.evenst)
                    ? section.evenst
                    : JSON.parse(section.evenst);
                } catch {
                  if (section.evenst && typeof section.evenst === "string")
                    events = [section.evenst];
                  else events = [];
                }
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="block w-2 h-2 rounded-full bg-orange-500" />
                      <h3 className="text-lg font-bold text-gray-800">
                        {section.heading}
                      </h3>
                    </div>
                    <ul className="ml-5 list-none space-y-2">
                      {events.map((event, evtIdx) => (
                        <motion.li
                          key={evtIdx}
                          className="relative pl-7 text-gray-800 text-sm text-justify md:text-left  md:text-md font-semibold"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 + evtIdx * 0.07 }}
                        >
                          <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-orange-300 group-hover:bg-orange-500 transition" />
                          {event}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
