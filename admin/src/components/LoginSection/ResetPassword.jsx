// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BE_URL from "../../config";

// const ResetPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     if (!password || !confirmPassword) {
//       setErrorMessage("Please fill in both password fields.");
//       setOpenSnackbar(true);
//       return;
//     }

//     if (password !== confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//       setOpenSnackbar(true);
//       return;
//     }

//     try {
//       const response = await axios.post(`${BE_URL}/admin/reset-password`, {
//         newPassword: password,
//       });

//       setErrorMessage(response.data.message);
//       setSuccess(true);
//       setOpenSnackbar(true);

//       setTimeout(() => {
//         navigate("/admin");
//       }, 2000);
//     } catch (error) {
//       setErrorMessage(
//         error.response?.data?.message || "Error updating password"
//       );
//       setSuccess(false);
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundImage: `url("https://admin.compasstourism.com/source/upload/banners/637921896094475779.png")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setOpenSnackbar(false)}
//           severity={success ? "success" : "error"}
//           sx={{ width: "100%" }}
//         >
//           {errorMessage}
//         </Alert>
//       </Snackbar>

//       <motion.div
//         initial={{ opacity: 0, y: -40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ type: "spring", stiffness: 80 }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: 5,
//             width: 600,
//             backgroundColor: "#fff",
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
//             Reset Password
//           </Typography>

//           <TextField
//             fullWidth
//             label="New Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             variant="outlined"
//             margin="normal"
//           />

//           <TextField
//             fullWidth
//             label="Confirm Password"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             variant="outlined"
//             margin="normal"
//           />

//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               sx={{
//                 px: 4,
//                 py: 1.5,
//                 fontWeight: "bold",
//                 borderRadius: "30px",
//                 background: "linear-gradient(to right, #00c6ff, #0072ff)",
//                 boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
//                 "&:hover": {
//                   background: "linear-gradient(to right, #0072ff, #005bea)",
//                 },
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Paper>
//       </motion.div>
//     </Box>
//   );
// };

// export default ResetPassword;


import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BE_URL from "../../config";

// Completely new, modern, orange-themed glassmorphism design with Tailwind CSS
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      setSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccess(false);
      setOpenSnackbar(true);
      return;
    }
    try {
      const response = await axios.post(`${BE_URL}/admin/reset-password`, {
        newPassword: password,
      });
      setErrorMessage(response.data.message);
      setSuccess(true);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error updating password"
      );
      setSuccess(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 overflow-hidden">
      {/* Glassmorphism blobs */}
      <div className="absolute -top-28 -left-24 w-80 h-80 bg-orange-200 opacity-50 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300 opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-40 bg-white/60 rounded-2xl opacity-70 blur-2xl"></div>
      
      {/* Snackbar */}
      {openSnackbar && (
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className={`flex items-center px-6 py-3 rounded-lg shadow-lg text-white font-medium
            ${success ? "bg-gradient-to-r from-orange-400 to-orange-500" : "bg-red-500"}`}>
            {success ? (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            )}
            {errorMessage}
          </div>
        </motion.div>
      )}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 13 }}
        className="relative z-10 bg-white/80 border border-orange-200 shadow-2xl rounded-3xl w-full max-w-md px-8 py-10 backdrop-blur-2xl flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: 8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 130, damping: 10, delay: 0.1 }}
          className="mb-6"
        >
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-3xl shadow-lg border-2 border-orange-100">
            <MdLockOutline />
          </div>
        </motion.div>
        <h1 className="text-2xl font-extrabold text-orange-500 mb-2 text-center tracking-tight">
          Create New Password
        </h1>
        <p className="text-gray-500 text-center mb-7 text-base">
          Please enter and confirm your new password below.
        </p>

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">New Password</label>
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:border-orange-400 bg-white/95 outline-none text-base transition duration-200 shadow-sm focus:shadow-lg"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Confirm Password</label>
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-orange-100 focus:border-orange-400 bg-white/95 outline-none text-base transition duration-200 shadow-sm focus:shadow-lg"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
          </div>
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="mt-2 w-full py-3 rounded-2xl font-bold text-white text-lg tracking-wide bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-150"
          >
            Reset Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;