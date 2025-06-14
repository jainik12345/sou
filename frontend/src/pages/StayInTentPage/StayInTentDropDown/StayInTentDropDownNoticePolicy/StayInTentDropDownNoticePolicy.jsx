/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import BE_URL from "../../../../config";

export const StayInTentDropDownNoticePolicy = () => {
  const { StayInTentPath } = useParams();
  const [notes, setNotes] = useState([]);
  const [refundPolicies, setRefundPolicies] = useState([]);
  const [headerNotice] = useState("Notice");
  const [headerPolicy] = useState("Refund Policy");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const formattedPath = StayInTentPath.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setNotes([]);
    setRefundPolicies([]);
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        const allPackages = res.data.data || [];
        const found = allPackages.find(
          (pkg) =>
            pkg.sou_package_name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") === formattedPath
        );
        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        return axios.get(`${BE_URL}/souPackageNotesPolicy/package/${found.id}`);
      })
      .then((notesPolicyRes) => {
        if (
          notesPolicyRes &&
          notesPolicyRes.data &&
          Array.isArray(notesPolicyRes.data.data)
        ) {
          const data = notesPolicyRes.data.data;
          if (data.length > 0) {
            const item = data[0];
            setNotes(Array.isArray(item.notes) ? item.notes : []);
            setRefundPolicies(
              Array.isArray(item.refund_policy) ? item.refund_policy : []
            );
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [formattedPath]);

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto py-12 px-4 text-center">
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  if (notFound || (notes.length === 0 && refundPolicies.length === 0)) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.17, 0.67, 0.83, 0.67],
        staggerChildren: 0.12,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.09,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -32, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 350,
        damping: 28,
      },
    },
    exit: { opacity: 0, x: -32, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="max-w-screen-xl mx-auto py-12 px-4 grid md:grid-cols-2 grid-cols-1 gap-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Notice Section */}
      {notes.length > 0 && (
        <motion.section
          className="bg-orange-50 shadow-lg rounded-xl p-8 flex flex-col gap-6 border-t-4 border-orange-400"
          variants={sectionVariants}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="w-10 h-10 flex items-center justify-center bg-orange-400 rounded-full text-white text-2xl shadow"
              whileHover={{ scale: 1.13, rotate: 8 }}
              whileTap={{ scale: 0.98, rotate: -8 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <FaAnglesRight />
            </motion.div>
            <motion.h2
              className="text-2xl font-bold text-orange-700 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {headerNotice}
            </motion.h2>
          </div>
          <AnimatePresence>
            <motion.ul
              className="flex flex-col gap-4 pl-3"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {notes.map((note, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-3"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.span
                    className="w-6 h-6 flex items-center justify-center text-orange-600 text-lg"
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    whileTap={{ scale: 0.95, rotate: -12 }}
                  >
                    <FaAnglesRight />
                  </motion.span>
                  <motion.span
                    className="text-gray-800 text-base font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * idx }}
                  >
                    {note}
                  </motion.span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </motion.section>
      )}

      {/* Policy Section */}
      {refundPolicies.length > 0 && (
        <motion.section
          className="bg-blue-50 shadow-lg rounded-xl p-8 flex flex-col gap-6 border-t-4 border-blue-400"
          variants={sectionVariants}
        >
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full text-white text-2xl shadow"
              whileHover={{ scale: 1.13, rotate: 8 }}
              whileTap={{ scale: 0.98, rotate: -8 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <FaAnglesRight />
            </motion.div>
            <motion.h2
              className="text-2xl font-bold text-blue-700 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.22, duration: 0.6 }}
            >
              {headerPolicy}
            </motion.h2>
          </div>
          <AnimatePresence>
            <motion.ul
              className="flex flex-col gap-4 pl-3"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {refundPolicies.map((policy, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-3"
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.span
                    className="w-6 h-6 flex items-center justify-center text-blue-600 text-lg"
                    whileHover={{ scale: 1.2, rotate: 12 }}
                    whileTap={{ scale: 0.95, rotate: -12 }}
                  >
                    <FaAnglesRight />
                  </motion.span>
                  <motion.span
                    className="text-gray-800 text-base font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * idx }}
                  >
                    {policy}
                  </motion.span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </motion.section>
      )}
    </motion.div>
  );
};
