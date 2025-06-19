/* eslint-disable no-unused-vars */

import "./PageLoader.css";
import logo from "../../assets/images/sou-logo.png";
import { motion } from "framer-motion";

const WELCOME_TEXT = "Welcome to Statue of Unity Web Site.";

const letterVariants = {
  hidden: { opacity: 0, y: 30 },

  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  }),
};

const PageLoader = () => {
  return (
    <motion.div
      className="spinner-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="loader-content">
        <motion.img
          src={logo}
          alt="Statue of Unity Logo"
          className="company-logo"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
        <motion.h2
          className="welcome-text"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {WELCOME_TEXT.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default PageLoader;
