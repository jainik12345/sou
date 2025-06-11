/* eslint-disable no-unused-vars */

// import React, { useState, useRef } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import BE_URL from "../../config";

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [verifying, setVerifying] = useState(false);
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [error, setError] = useState("");
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   const handleChange = (index, value) => {
//     if (/^\d?$/.test(value)) {
//       const updatedOtp = [...otp];
//       updatedOtp[index] = value;
//       setOtp(updatedOtp);
//       if (value && index < 5) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     }
//   };

//   const handleKeyDown = (index, event) => {
//     if (event.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     const pasteData = e.clipboardData.getData("Text").slice(0, 6);
//     if (/^\d{6}$/.test(pasteData)) {
//       const pasteOtp = pasteData.split("");
//       setOtp(pasteOtp);
//       inputRefs.current[5]?.focus();
//     }
//   };

//   const handleVerify = async () => {
//     const otpValue = otp.join("");
//     if (otpValue.length === 6) {
//       setVerifying(true);
//       try {
//         const response = await axios.post(`${BE_URL}/admin/verify-otp`, {
//           email: "sanatanidharma586@gmail.com",
//           otp: otpValue,
//         });

//         if (response.data.message === "OTP verified successfully") {
//           setShowSnackbar(true);
//           setTimeout(() => {
//             navigate("/reset-password", {
//               state: { email: "admin@example.com" },
//             });
//           }, 2000);
//         } else {
//           setError("Invalid OTP. Please try again.");
//         }
//       } catch (error) {
//         setError("Error verifying OTP. Please try again.");
//       } finally {
//         setVerifying(false);
//       }
//     } else {
//       setError("Please enter a 6-digit OTP");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         backgroundImage:
//           "url('https://admin.compasstourism.com/source/upload/banners/637921896094475779.png')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backdropFilter: "blur(2px)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ type: "spring", stiffness: 100 }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             px: 9,
//             py: 3,
//             borderRadius: 5,
//             backgroundColor: "rgba(255, 255, 255, 0.95)",
//             width: 600,
//             textAlign: "center",
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{ mb: 4, fontWeight: "bold", color: "#333" }}
//           >
//             Verify OTP
//           </Typography>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 2,
//               mb: 4,
//             }}
//             onPaste={handlePaste}
//           >
//             {otp.map((digit, index) => (
//               <TextField
//                 key={index}
//                 inputRef={(el) => (inputRefs.current[index] = el)}
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 inputProps={{
//                   maxLength: 1,
//                   style: {
//                     textAlign: "center",
//                     fontSize: "1.8rem",
//                     width: "3.5rem",
//                     height: "3rem",
//                     borderRadius: "100%",
//                   },
//                 }}
//               />
//             ))}
//           </Box>

//           {error && (
//             <Typography variant="body2" color="error" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           )}

//           <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//             <Button
//               variant="contained"
//               onClick={handleVerify}
//               disabled={verifying}
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontWeight: "bold",
//                 borderRadius: "30px",
//                 background: "linear-gradient(135deg, #1976d2, #42a5f5)",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #1565c0, #1e88e5)",
//                 },
//               }}
//             >
//               {verifying ? "Verifying..." : "VERIFY OTP"}
//             </Button>
//           </Box>
//         </Paper>
//       </motion.div>

//       {/* Snackbar popup */}
//       <AnimatePresence>
//         {showSnackbar && (
//           <motion.div
//             initial={{ y: -100, opacity: 0 }}
//             animate={{ y: 10, opacity: 1 }}
//             exit={{ y: -100, opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             style={{
//               position: "fixed",
//               top: 10,
//               left: "50%",
//               transform: "translateX(-50%)",
//             }}
//           >
//             <Snackbar
//               open={showSnackbar}
//               autoHideDuration={2000}
//               onClose={() => setShowSnackbar(false)}
//               anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//               <Alert
//                 severity="success"
//                 variant="filled"
//                 sx={{ whiteSpace: "nowrap" }}
//               >
//                 OTP Verified! Proceeding to Reset Password
//               </Alert>
//             </Snackbar>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// };

// export default VerifyOTP;


import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../config";

// Ultra-modern, minimal, cardless, orange-accent design
const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    if (/^\d{6}$/.test(pasteData)) {
      const pasteOtp = pasteData.split("");
      setOtp(pasteOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      setVerifying(true);
      setError("");
      try {
        const response = await axios.post(`${BE_URL}/admin/verify-otp`, {
          email: "sanatanidharma586@gmail.com",
          otp: otpValue,
        });

        if (response.data.message === "OTP verified successfully") {
          setShowSnackbar(true);
          setTimeout(() => {
            navigate("/reset-password", {
              state: { email: "admin@example.com" },
            });
          }, 1500);
        } else {
          setError("Invalid OTP. Please try again.");
        }
      } catch {
        setError("Error verifying OTP. Please try again.");
      } finally {
        setVerifying(false);
      }
    } else {
      setError("Please enter a 6-digit OTP");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
      {/* Orange blurred blobs for accent */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[38rem] h-40 bg-orange-200 opacity-40 blur-3xl rounded-full -z-1"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[22rem] h-32 bg-orange-300 opacity-30 blur-2xl rounded-full -z-1"></div>

      {/* Header, no card, just modern vertical stack */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
        className="w-full max-w-md flex flex-col items-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: 12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.1 }}
          className="mb-6"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-3xl md:text-4xl font-extrabold shadow-2xl border-4 border-white/70">
            <span>🔐</span>
          </div>
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-orange-500 tracking-tight text-center drop-shadow">
          Enter OTP
        </h1>
        <p className="text-gray-500 text-center mb-7 text-base md:text-lg">
          Enter the 6-digit code sent to your email<br />
          <span className="text-orange-400 text-xs">Code is valid for 15 minutes</span>
        </p>
        {/* OTP Input */}
        <form
          className="flex flex-col items-center w-full gap-7"
          onSubmit={e => {
            e.preventDefault();
            handleVerify();
          }}
          autoComplete="off"
        >
          <div
            className="flex justify-center gap-4 mb-2"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                maxLength={1}
                inputMode="numeric"
                className={`
                  w-14 h-14 md:w-16 md:h-16 text-2xl md:text-3xl text-center outline-none transition
                  font-bold tracking-wider
                  bg-white/90 border-2
                  ${error ? "border-red-400 focus:border-red-500" : "border-orange-300 focus:border-orange-400"}
                  shadow-md focus:shadow-xl
                  rounded-2xl
                  hover:scale-105 focus:scale-110
                  duration-200
                `}
                whileFocus={{ scale: 1.13 }}
                whileTap={{ scale: 0.96 }}
              />
            ))}
          </div>
          {error && (
            <span className="text-xs text-red-500 mb-2 block animate-pulse">
              {error}
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={verifying}
            className={`
              w-full py-3 rounded-xl font-bold text-white text-lg tracking-wide
              bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg
              hover:from-orange-500 hover:to-orange-600
              transition-all duration-150
              ${verifying ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {verifying ? "Verifying..." : "Verify OTP"}
          </motion.button>
        </form>
      </motion.div>
      {/* Snackbar popup */}
      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center px-6 py-3 rounded-lg shadow-lg text-white font-medium bg-gradient-to-r from-orange-400 to-orange-500">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              OTP Verified! Proceeding to Reset Password
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerifyOTP;