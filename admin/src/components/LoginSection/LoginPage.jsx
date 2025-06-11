/* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   InputAdornment,
//   Link,
//   Paper,
//   Avatar,
//   Grid,
// } from "@mui/material";
// import { MdEmail, MdLock } from "react-icons/md";
// import { motion } from "framer-motion";
// import axios from "axios";
// import BE_URL from "../../config";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// // --- PREMIUM ORANGE THEME COLORS ---
// const PRIMARY_ORANGE = "#FF7F23";
// const SECONDARY_ORANGE = "#FFB547";
// const DARK_ORANGE = "#E66A00";
// const LIGHT_ORANGE = "#FFF4E6";
// const ORANGE_GRADIENT = "linear-gradient(90deg, #FF7F23 0%, #FFB547 100%)";

// const AnimatedLogo = () => (
//   <motion.div
//     initial={{ scale: 0, rotate: -45 }}
//     animate={{ scale: 1, rotate: 0 }}
//     transition={{ type: "spring", stiffness: 180, damping: 16 }}
//     style={{
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       marginBottom: 24,
//     }}
//   >
//     <Avatar
//       sx={{
//         width: 70,
//         height: 70,
//         boxShadow: `0 8px 24px 0 rgba(255,152,0,0.18)`,
//         background: `linear-gradient(135deg, ${PRIMARY_ORANGE} 60%, ${SECONDARY_ORANGE} 100%)`,
//         fontSize: 42,
//         fontWeight: 700,
//       }}
//     >
//       🧭
//     </Avatar>
//   </motion.div>
// );

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let hasError = false;
//     const newErrors = { email: "", password: "" };

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//       hasError = true;
//     }
//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//       hasError = true;
//     }

//     setErrors(newErrors);
//     if (!hasError) {
//       try {
//         const res = await axios.post(`${BE_URL}/admin/login`, {
//           email,
//           password,
//         });

//         if (res.status === 200) {
//           Swal.fire({
//             iconHtml: '<span style="font-size:2.5rem;">🧭</span>',
//             title: `<span style="font-size:2.5rem; color:${PRIMARY_ORANGE};">Login Successful</span>`,
//             html: `
//               <div style="font-size:1.15rem; margin-bottom:12px;">
//                 Welcome to <b style="color:${PRIMARY_ORANGE};">Statue of Unity Admin</b>!
//               </div>
//             `,
//             background: "#fff",
//             showConfirmButton: true,
//             confirmButtonText: "Start Exploring",
//             confirmButtonColor: PRIMARY_ORANGE,
//             customClass: {
//               popup: "swal2-border-radius",
//               confirmButton: "swal2-confirm-custom",
//             },
//             allowOutsideClick: false,
//             allowEscapeKey: true,
//             didClose: () => {
//               navigate("/home");
//             },
//           }).then(() => {
//             navigate("/home");
//           });
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: error?.response?.data?.message || "Something went wrong",
//         });
//       }
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100vw",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         position: "relative",
//         background: "linear-gradient(135deg, #ffe0b2 0%, #ff9800 100%)",
//       }}
//     >
//       <Container maxWidth={false} sx={{ px: { xs: 0, md: 2 } }}>
//         <Paper
//           elevation={10}
//           sx={{
//             borderRadius: 4,
//             bgcolor: "rgba(255,255,255,0.98)",
//             boxShadow: `0 8px 32px 0 ${PRIMARY_ORANGE}33`,
//             overflow: "hidden",
//             width: { xs: "100%", sm: 480, md: 900 },
//             mx: "auto",
//           }}
//         >
//           <Grid container>
          
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 background: `linear-gradient(135deg, ${PRIMARY_ORANGE} 0%, ${SECONDARY_ORANGE} 100%)`,
//                 px: { xs: 2, md: 1 },
//                 py: { xs: 4, md: 5 },
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 minHeight: 370,
//                 borderTopLeftRadius: 16,
//                 borderBottomLeftRadius: 16,
//                 boxSizing: "border-box",
//               }}
//             >
//               {/* First Div: Image */}
//               <Box
//                 sx={{
//                   width: "100%",
//                   px: 2,
//                   mb: 2,
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "flex-end",
//                 }}
//               >
//                 <img
//                   src="https://statueofunity.org.in/wp-content/uploads/2021/12/sou-cropped.png"
//                   alt="Statue of Unity"
//                   style={{
//                     width: "100%",
//                     maxWidth: 340,
//                     height: "auto",
//                     aspectRatio: "1/1",
//                     objectFit: "contain",
//                     borderRadius: 12,
//                     background: LIGHT_ORANGE,
//                     boxShadow: "0 6px 32px 0 rgba(0,0,0,0.11)",
//                     display: "block",
//                     margin: "0 auto",
//                   }}
//                 />
//               </Box>
//               {/* Second Div: Welcome Text */}
//               <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
//                 <Typography
//                   variant="h5"
//                   fontWeight="bold"
//                   color="#fff"
//                   sx={{ mb: 1 }}
//                 >
//                   Welcome Admin!
//                 </Typography>
//               </Box>
//             </Grid>

//             {/* Login Form Content */}
//             <Grid
//               item
//               xs={12}
//               md={6}
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 py: { xs: 4, md: 7 },
//                 px: { xs: 2, md: 5 },
//                 minHeight: 370,
//                 borderTopRightRadius: 16,
//                 borderBottomRightRadius: 16,
//               }}
//             >
//               <Box sx={{ width: "100%", maxWidth: 360, mx: "auto" }}>
//                 <AnimatedLogo />

//                 <Typography
//                   variant="h6"
//                   align="center"
//                   sx={{
//                     fontWeight: "bold",
//                     mb: 1,
//                     letterSpacing: 1,
//                     color: PRIMARY_ORANGE,
//                   }}
//                 >
//                   Statue of Unity Admin
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   align="center"
//                   sx={{ color: "#555", mb: 2, fontSize: 16 }}
//                 >
//                   Sign in to manage your journey
//                 </Typography>

//                 <form
//                   style={{ width: "100%" }}
//                   onSubmit={handleSubmit}
//                   autoComplete="off"
//                 >
//                   <TextField
//                     fullWidth
//                     label="Email"
//                     variant="outlined"
//                     margin="normal"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     error={!!errors.email}
//                     helperText={errors.email}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <MdEmail size={20} color={PRIMARY_ORANGE} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       mb: 2,
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 3,
//                       },
//                       "& label.Mui-focused": {
//                         color: PRIMARY_ORANGE,
//                       },
//                       "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                         {
//                           borderColor: PRIMARY_ORANGE,
//                         },
//                     }}
//                   />

//                   <TextField
//                     fullWidth
//                     label="Password"
//                     type="password"
//                     variant="outlined"
//                     margin="normal"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     error={!!errors.password}
//                     helperText={errors.password}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <MdLock size={20} color={PRIMARY_ORANGE} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     sx={{
//                       mb: 1,
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 3,
//                       },
//                       "& label.Mui-focused": {
//                         color: PRIMARY_ORANGE,
//                       },
//                       "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
//                         {
//                           borderColor: PRIMARY_ORANGE,
//                         },
//                     }}
//                   />

//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       mt: 0.5,
//                       mb: 2,
//                     }}
//                   >
//                     <Link
//                       href="/forgot-password"
//                       underline="hover"
//                       sx={{
//                         color: DARK_ORANGE,
//                         fontSize: 15,
//                         fontWeight: 500,
//                         letterSpacing: 0.5,
//                       }}
//                     >
//                       Forgot password?
//                     </Link>
//                   </Box>

//                   <motion.div
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.97 }}
//                     style={{ width: "100%" }}
//                   >
//                     <Button
//                       type="submit"
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         py: 1.5,
//                         fontWeight: "bold",
//                         fontSize: 17,
//                         letterSpacing: 1,
//                         background: `linear-gradient(90deg, ${PRIMARY_ORANGE} 40%, ${SECONDARY_ORANGE} 100%)`,
//                         borderRadius: 3,
//                         boxShadow: `0 4px 14px ${PRIMARY_ORANGE}2a`,
//                         transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
//                         "&:hover": {
//                           background: `linear-gradient(90deg, ${DARK_ORANGE} 60%, ${SECONDARY_ORANGE} 100%)`,
//                           boxShadow: `0 6px 24px ${PRIMARY_ORANGE}26`,
//                         },
//                       }}
//                     >
//                       SIGN IN
//                     </Button>
//                   </motion.div>
//                 </form>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       </Container>
//       {/* SweetAlert2 custom style overrides */}
//       <style>
//         {`
//           .swal2-border-radius {
//             border-radius: 16px !important;
//           }
//           .swal2-confirm-custom {
//             border-radius: 24px !important;
//             font-weight: bold !important;
//             font-size: 1.1rem !important;
//             padding: 10px 32px !important;
//             background: linear-gradient(90deg, ${PRIMARY_ORANGE} 70%, ${SECONDARY_ORANGE} 100%) !important;
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default LoginPage;
import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import BE_URL from "../../config";
import Swal from "sweetalert2";
import { useNavigate, Link as RouterLink } from "react-router-dom";

// Orange theme colors
const PRIMARY = "#fb923c"; 
const SECONDARY = "#f97316";  

const AnimatedLogo = () => (
  <motion.div
    initial={{ scale: 0.7, rotate: -20 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 170, damping: 18 }}
    className="flex items-center justify-center mb-8"
  >
    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white/40 text-5xl font-bold backdrop-blur-md">
      <span role="img" aria-label="Logo">🧭</span>
    </div>
  </motion.div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);
    if (!hasError) {
      try {
        const res = await axios.post(`${BE_URL}/admin/login`, {
          email,
          password,
        });

        if (res.status === 200) {
          Swal.fire({
            iconHtml: '<span style="font-size:2.5rem;">🧭</span>',
            title: `<span style="font-size:2.5rem; color:${PRIMARY};">Login Successful</span>`,
            html: `
              <div style="font-size:1.15rem; margin-bottom:12px;">
                Welcome to <b style="color:${PRIMARY};">Admin Portal</b>!
              </div>
            `,
            background: "#fff",
            showConfirmButton: true,
            confirmButtonText: "Go to Dashboard",
            confirmButtonColor: PRIMARY,
            customClass: {
              popup: "swal2-border-radius",
              confirmButton: "swal2-confirm-custom",
            },
            allowOutsideClick: false,
            allowEscapeKey: true,
            didClose: () => {
              navigate("/home");
            },
          }).then(() => {
            navigate("/home");
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error?.response?.data?.message || "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-100 via-white to-orange-200 overflow-hidden">
      {/* Glassy blobs for modern effect */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-200 rounded-full opacity-40 blur-3xl z-0"></div>
      <div className="absolute -bottom-48 right-0 w-[34rem] h-[34rem] bg-orange-300 rounded-full opacity-40 blur-3xl z-0"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[25rem] h-[8rem] bg-white/60 rounded-2xl opacity-60 blur-2xl z-0"></div>

      <div className="relative z-10 w-full max-w-md mx-auto bg-white/80 border border-orange-200 shadow-2xl rounded-3xl px-8 py-12 backdrop-blur-2xl flex flex-col items-center">
        <AnimatedLogo />
        <h2 className="text-2xl font-extrabold text-center mb-1 tracking-tight text-orange-500 drop-shadow">
          Admin Portal
        </h2>
        <p className="text-center text-gray-500 text-base mb-8">
          Sign in to your account
        </p>
        <form className="w-full flex flex-col gap-7" onSubmit={handleSubmit} autoComplete="off">
          {/* Email */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MdEmail className="text-orange-400" size={20} />
              <label className="block font-semibold text-gray-700">Email</label>
            </div>
            <input
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-orange-100 focus:border-orange-400"
              } bg-white/95 outline-none text-base transition duration-200 shadow-sm focus:shadow-lg`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.email}
              </span>
            )}
          </div>
          {/* Password */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MdLock className="text-orange-400" size={20} />
              <label className="block font-semibold text-gray-700">Password</label>
            </div>
            <input
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.password
                  ? "border-red-400 focus:border-red-500"
                  : "border-orange-100 focus:border-orange-400"
              } bg-white/95 outline-none text-base transition duration-200 shadow-sm focus:shadow-lg`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-1 block">
                {errors.password}
              </span>
            )}
          </div>
          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <RouterLink
              to="/forgot-password"
              className="text-orange-600 hover:text-orange-700 font-semibold text-[15px] transition"
            >
              Forgot password?
            </RouterLink>
          </div>
          {/* Sign In Button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <button
              type="submit"
              className="w-full py-3 rounded-2xl font-bold text-white text-lg tracking-wide bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-150"
            >
              SIGN IN
            </button>
          </motion.div>
        </form>
      </div>
      <style>
        {`
          .swal2-border-radius {
            border-radius: 16px !important;
          }
          .swal2-confirm-custom {
            border-radius: 24px !important;
            font-weight: bold !important;
            font-size: 1.1rem !important;
            padding: 10px 32px !important;
            background: linear-gradient(90deg, ${PRIMARY} 70%, ${SECONDARY} 100%) !important;
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;