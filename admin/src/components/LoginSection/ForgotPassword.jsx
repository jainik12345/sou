/* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   InputAdornment,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import { MdEmail } from "react-icons/md";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BE_URL from "../../config"

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/admin`)
//       .then((res) => {
//         if (res.data.data.length > 0) {
//           setEmail(res.data.data[0].admin_email_id);
//         }
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email.trim()) {
//       setError("Email is required");
//       return;
//     }

//     try {
//       setLoading(true);
//       await axios.post(`${BE_URL}/admin/send-otp`, { email });
//       setLoading(false);
//       setShowSnackbar(true);
//       setTimeout(() => {
//         navigate("/verify-otp", { state: { email } });
//       }, 2000);
//     } catch (err) {
//       setLoading(false);
//       setError("Failed to send OTP.");
//       console.error(err);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         backgroundImage: `url("https://admin.compasstourism.com/source/upload/banners/637921896094475779.png")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//       }}
//     >
//       {/* Overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 1,
//         }}
//       />

//       {/* Main Content */}
//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         style={{ width: "100%", maxWidth: 420, zIndex: 2 }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: "20px",
//             background: "rgba(255, 255, 255, 0.85)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
//           }}
//         >
//           <Typography
//             variant="h5"
//             align="center"
//             gutterBottom
//             sx={{ fontWeight: "bold", mb: 2 }}
//           >
//             Forgot Password
//           </Typography>
//           <Typography
//             variant="body2"
//             align="center"
//             sx={{ mb: 3, color: "gray" }}
//           >
//             Enter your email to receive an OTP
//           </Typography>

//           <form onSubmit={handleSendOtp}>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               value={email}
//               disabled
//               error={!!error}
//               helperText={error}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <MdEmail size={25} />
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={loading}
//                 sx={{
//                   px: 4,
//                   py: 1.5,
//                   fontWeight: "bold",
//                   background: "linear-gradient(135deg, #1976d2, #42a5f5)",
//                   color: "#fff",
//                   borderRadius: "30px",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//                   "&:hover": {
//                     background: "linear-gradient(135deg, #1565c0, #1e88e5)",
//                   },
//                 }}
//               >
//                 {loading ? (
//                   <>
//                     <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
//                     Sending...
//                   </>
//                 ) : (
//                   "Send OTP"
//                 )}
//               </Button>
//             </Box>
//           </form>
//         </Paper>
//       </motion.div>

//       {/* Snackbar Success Message */}
//       <AnimatePresence>
//         {showSnackbar && (
//           <motion.div
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 10 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 0.6 }}
//             style={{
//               position: "fixed",
//               top: "10px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               zIndex: 99,
//             }}
//           >
//             <Snackbar
//               open={showSnackbar}
//               anchorOrigin={{ vertical: "top", horizontal: "center" }}
//               autoHideDuration={2000}
//               onClose={() => setShowSnackbar(false)}
//             >
//               <Alert
//                 severity="success"
//                 variant="filled"
//                 sx={{ width: "100%", whiteSpace: "nowrap" }}
//               >
//                 OTP Sent Successfully!
//               </Alert>
//             </Snackbar>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </Box>
//   );
// };

// export default ForgotPassword;


import React, { useState, useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BE_URL from "../../config";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BE_URL}/admin`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setEmail(res.data.data[0].admin_email_id);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BE_URL}/admin/send-otp`, { email });
      setLoading(false);
      setShowSnackbar(true);
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError("Failed to send OTP.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 relative">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/80 rounded-2xl shadow-2xl backdrop-blur-lg p-8 flex flex-col gap-3 border border-orange-100">
          <h2 className="text-3xl font-semibold text-center  text-orange-600 drop-shadow">
            Forgot Password
          </h2>
          <p className="text-center text-gray-500 text-sm mb-4">
            Enter your email to receive an OTP
          </p>

          <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className={`w-full pl-12 pr-4 py-2 rounded-lg border ${
                    error
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-200 focus:border-orange-400"
                  } bg-white/90 outline-none transition duration-200 disabled:bg-gray-50`}
                  value={email}
                  disabled
                  placeholder="Enter your email"
                />
                <span className="absolute left-3 top-2.5 text-orange-400">
                  <MdEmail size={22} />
                </span>
              </div>
              {error && (
                <span className="text-xs text-red-500 mt-1 block">
                  {error}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-orange-400 to-orange-600 shadow-md hover:from-orange-500 hover:to-orange-700 transition-all duration-150 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Snackbar Success Message */}
      <AnimatePresence>
        {showSnackbar && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="flex items-center gap-2 bg-green-500 text-white font-semibold rounded-lg shadow-lg px-6 py-3">
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              OTP Sent Successfully!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPassword;