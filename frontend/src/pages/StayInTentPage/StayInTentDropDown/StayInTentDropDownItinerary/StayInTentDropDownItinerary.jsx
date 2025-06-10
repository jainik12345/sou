import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent";

const tabVariants = {
  active: { scale: 1.05, backgroundColor: "#f97316", color: "#fff" },
  inactive: { scale: 1, backgroundColor: "#fff", color: "#f97316" },
};

export const StayInTentDropDownItinerary = () => {
  const { StayInTentPath } = useParams();
  const FormattedPath = (StayInTentPath || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const FormattedData =
    StayInTentDropDownData[FormattedPath]?.itineraryData || [];

  const [selectedTab, setSelectedTab] = useState(0);

  // Don't render if no data
  if (!FormattedData || FormattedData.length === 0) {
    return null;
  }

  return (
    <section className="w-full  px-4 py-14 bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-screen-xl mx-auto rounded-3xl p-8 shadow-2xl bg-white/90">
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
        <div className="flex justify-center gap-10 mb-10">
          {FormattedData.map((tab, idx) => (
            <motion.button
              key={tab.label}
              className={`px-5 py-2 rounded-xl font-semibold border-2 border-orange-400 focus:outline-none transition-all md:text-[1rem] text-[.7rem]
                ${selectedTab === idx ? "shadow-lg" : ""}
              `}
              animate={selectedTab === idx ? "active" : "inactive"}
              variants={tabVariants}    
              whileHover={selectedTab !== idx ? { scale: 1.06 } : undefined}
              onClick={() => setSelectedTab(idx)}
            >
              {tab.label}
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
            {FormattedData[selectedTab]?.days.map((day, dayIdx) => (
              <div key={dayIdx}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="block w-2 h-2 rounded-full bg-orange-500" />
                  <h3 className="text-lg font-bold text-gray-800">
                    {day.title}
                  </h3>
                </div>
                <ul className="ml-5 list-none space-y-2">
                  {day.events.map((event, evtIdx) => (
                    <motion.li
                      key={evtIdx}
                      className="relative pl-7 text-gray-800 font-semibold"
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
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};