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
//         width: 90,
//         height: 90,
//         boxShadow: "0 8px 24px 0 rgba(30,136,229,0.20)",
//         background: "linear-gradient(135deg, #1976d2 60%, #42a5f5 100%)",
//         fontSize: 54,
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
//             title:
//               '<span style="font-size:2.5rem; color:#1976d2;">Login Successful</span>',
//             html: `
//               <div style="font-size:1.15rem; margin-bottom:12px;">
//                 Welcome to <b style="color:#1976d2;">Statue of Unity Admin</b>!
//               </div>
//             `,
//             background: "rgba(255,255,255) opcity:50 center/cover no-repeat",
//             showConfirmButton: true,
//             confirmButtonText: "Start Exploring",
//             confirmButtonColor: "#1976d2",
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
//         backgroundImage:
//           'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         overflow: "hidden",
//       }}
//     >
//       {/* Glass effect overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 1,
//           background:
//             "linear-gradient(115deg, rgba(25,118,210,0.70) 0%, rgba(66,165,245,0.62) 100%)",
//           backdropFilter: "blur(65px)",
//         }}
//       />
//       {/* Main Content */}
//       <motion.div
//         initial={{ y: 60, opacity: 0, scale: 0.97 }}
//         animate={{ y: 0, opacity: 1, scale: 1 }}
//         transition={{ type: "spring", stiffness: 100, damping: 16 }}
//         style={{
//           position: "relative",
//           zIndex: 2,
//           width: "100%",
//           maxWidth: 950,
//         }}
//       >
//         <Container maxWidth={false} sx={{ px: { xs: 0, md: 2 } }}>
//           <Paper
//             elevation={10}
//             sx={{
//               borderRadius: 5,
//               bgcolor: "rgba(255,255,255,0.96)",
//               boxShadow: "0 8px 32px 0 rgba(25,118,210,0.14)",
//               backdropFilter: "blur(6px)",
//               overflow: "hidden",
//             }}
//           >
//             <Grid container>
//               {/* Left side illustration or banner */}
//               <Grid
//                 item
//                 xs={0}
//                 md={6}
//                 sx={{
//                   display: { xs: "none", md: "flex" },
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background:
//                     "linear-gradient(120deg, #1976d2 60%, #42a5f5 100%)",
//                   minHeight: 500,
//                 }}
//               >
//                 <motion.div
//                   initial={{ opacity: 0, x: -80 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 1, type: "spring" }}
//                   style={{
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <img
//                     src="https://www.statueofunity.in/assets/images/statue/statue-of-unity.png"
//                     alt="Statue of Unity"
//                     style={{
//                       width: "70%",
//                       maxWidth: 260,
//                       filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.18))",
//                       marginBottom: 24,
//                     }}
//                   />
//                   <Typography
//                     variant="h4"
//                     align="center"
//                     sx={{
//                       color: "#fff",
//                       fontWeight: 700,
//                       letterSpacing: 1,
//                       textShadow: "2px 4px 16px rgba(0,0,0,0.10)",
//                       mb: 1,
//                     }}
//                   >
//                     Welcome Admin!
//                   </Typography>
//                   <Typography
//                     variant="subtitle1"
//                     align="center"
//                     sx={{
//                       color: "#e3f2fd",
//                       fontWeight: 400,
//                       px: 2,
//                     }}
//                   >
//                     Manage your bookings, users and reports with ease.
//                   </Typography>
//                 </motion.div>
//               </Grid>
//               {/* Right side - Login form */}
//               <Grid
//                 item
//                 xs={12}
//                 md={6}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   py: { xs: 5, md: 7 },
//                   px: { xs: 2, md: 6 },
//                   minHeight: 500,
//                 }}
//               >
//                 <Box sx={{ width: "100%", maxWidth: 400 }}>
//                   <AnimatedLogo />

//                   <Typography
//                     variant="h5"
//                     align="center"
//                     sx={{
//                       fontWeight: "bold",
//                       mb: 2,
//                       letterSpacing: 1,
//                       color: "#1976d2",
//                     }}
//                   >
//                     Statue of Unity Admin
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     align="center"
//                     sx={{ color: "#555", mb: 3, fontSize: 18 }}
//                   >
//                     Sign in to manage your journey
//                   </Typography>

//                   <form
//                     style={{ width: "100%" }}
//                     onSubmit={handleSubmit}
//                     autoComplete="off"
//                   >
//                     <TextField
//                       fullWidth
//                       label="Email"
//                       variant="outlined"
//                       margin="normal"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       error={!!errors.email}
//                       helperText={errors.email}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <MdEmail size={22} color="#1976d2" />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         mb: 2,
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 3,
//                         },
//                       }}
//                     />

//                     <TextField
//                       fullWidth
//                       label="Password"
//                       type="password"
//                       variant="outlined"
//                       margin="normal"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       error={!!errors.password}
//                       helperText={errors.password}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <MdLock size={22} color="#1976d2" />
//                           </InputAdornment>
//                         ),
//                       }}
//                       sx={{
//                         mb: 1,
//                         "& .MuiOutlinedInput-root": {
//                           borderRadius: 3,
//                         },
//                       }}
//                     />

//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "flex-end",
//                         mt: 0.5,
//                         mb: 2,
//                       }}
//                     >
//                       <Link
//                         href="/forgot-password"
//                         underline="hover"
//                         sx={{
//                           color: "#e53935",
//                           fontSize: 15,
//                           fontWeight: 500,
//                           letterSpacing: 0.5,
//                         }}
//                       >
//                         Forgot password?
//                       </Link>
//                     </Box>

//                     <motion.div
//                       whileHover={{ scale: 1.04 }}
//                       whileTap={{ scale: 0.98 }}
//                       style={{ width: "100%" }}
//                     >
//                       <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         sx={{
//                           py: 1.7,
//                           fontWeight: "bold",
//                           fontSize: 19,
//                           letterSpacing: 1,
//                           background:
//                             "linear-gradient(90deg, #1976d2 40%, #42a5f5 100%)",
//                           borderRadius: 4,
//                           boxShadow: "0 4px 14px rgba(66,165,245,0.16)",
//                           transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
//                           "&:hover": {
//                             background:
//                               "linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)",
//                             boxShadow: "0 6px 24px rgba(25,118,210,0.15)",
//                           },
//                         }}
//                       >
//                         Sign In
//                       </Button>
//                     </motion.div>
//                   </form>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Container>
//       </motion.div>
//       {/* SweetAlert2 custom style overrides */}
//       <style>
//         {`
//           .swal2-border-radius {
//             border-radius: 18px !important;
//           }
//           .swal2-confirm-custom {
//             border-radius: 24px !important;
//             font-weight: bold !important;
//             font-size: 1.1rem !important;
//             padding: 10px 32px !important;
//             background: linear-gradient(90deg, #1976d2 70%, #42a5f5 100%) !important;
//           }
//         `}
//       </style>
//     </Box>
//   );
// };

// export default LoginPage;

/** */

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  Link,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import { MdEmail, MdLock } from "react-icons/md";
import { motion } from "framer-motion";
import axios from "axios";
import BE_URL from "../../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// --- PREMIUM ORANGE THEME COLORS ---
const PRIMARY_ORANGE = "#FF7F23";
const SECONDARY_ORANGE = "#FFB547";
const DARK_ORANGE = "#E66A00";
const LIGHT_ORANGE = "#FFF4E6";
const ORANGE_GRADIENT = "linear-gradient(90deg, #FF7F23 0%, #FFB547 100%)";

const AnimatedLogo = () => (
  <motion.div
    initial={{ scale: 0, rotate: -45 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 180, damping: 16 }}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    }}
  >
    <Avatar
      sx={{
        width: 70,
        height: 70,
        boxShadow: `0 8px 24px 0 rgba(255,152,0,0.18)`,
        background: `linear-gradient(135deg, ${PRIMARY_ORANGE} 60%, ${SECONDARY_ORANGE} 100%)`,
        fontSize: 42,
        fontWeight: 700,
      }}
    >
      🧭
    </Avatar>
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
            title: `<span style="font-size:2.5rem; color:${PRIMARY_ORANGE};">Login Successful</span>`,
            html: `
              <div style="font-size:1.15rem; margin-bottom:12px;">
                Welcome to <b style="color:${PRIMARY_ORANGE};">Statue of Unity Admin</b>!
              </div>
            `,
            background: "#fff",
            showConfirmButton: true,
            confirmButtonText: "Start Exploring",
            confirmButtonColor: PRIMARY_ORANGE,
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
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "linear-gradient(135deg, #ffe0b2 0%, #ff9800 100%)",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 0, md: 2 } }}>
        <Paper
          elevation={10}
          sx={{
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,0.98)",
            boxShadow: `0 8px 32px 0 ${PRIMARY_ORANGE}33`,
            overflow: "hidden",
            width: { xs: "100%", sm: 480, md: 900 },
            mx: "auto",
          }}
        >
          <Grid container>
            {/* One Row, Two Columns */}

            {/* <Grid
              item
              xs={6}
              md={6} 
              sx={{
                background: `linear-gradient(135deg, ${PRIMARY_ORANGE} 0%, ${SECONDARY_ORANGE} 100%)`,
                px: { xs: 2, md: 4 },
                py: { xs: 3, md: 7 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 370,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            >
              
              <Box sx={{ width: "100%" }}>
                <img
                  src="https://statueofunity.org.in/wp-content/uploads/2021/12/sou-cropped.png"
                  alt="Statue of Unity"
                  style={{
                    width: 350,
                    height: 350,
                    objectFit: "contain",
                    justifyContentc: "center",
                    borderRadius: 10,
                    marginBottom: 16,
                    background: LIGHT_ORANGE,
                    display: "block",
                  }}
                />
              </Box>
              
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#fff"
                  style={{ textAlign: "center" }}
                  sx={{ mb: 1 }}
                >
                  Welcome Admin!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#fffde7",
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Manage your bookings, users and reports with ease.
                </Typography>
              </Box>
            </Grid> */}

            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: `linear-gradient(135deg, ${PRIMARY_ORANGE} 0%, ${SECONDARY_ORANGE} 100%)`,
                px: { xs: 2, md: 1 },
                py: { xs: 4, md: 5 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 370,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                boxSizing: "border-box",
              }}
            >
              {/* First Div: Image */}
              <Box
                sx={{
                  width: "100%",
                  px: 2,
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <img
                  src="https://statueofunity.org.in/wp-content/uploads/2021/12/sou-cropped.png"
                  alt="Statue of Unity"
                  style={{
                    width: "100%",
                    maxWidth: 340,
                    height: "auto",
                    aspectRatio: "1/1",
                    objectFit: "contain",
                    borderRadius: 12,
                    background: LIGHT_ORANGE,
                    boxShadow: "0 6px 32px 0 rgba(0,0,0,0.11)",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </Box>
              {/* Second Div: Welcome Text */}
              <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="#fff"
                  sx={{ mb: 1 }}
                >
                  Welcome Admin!
                </Typography>
              </Box>
            </Grid>

            {/* Login Form Content */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 4, md: 7 },
                px: { xs: 2, md: 5 },
                minHeight: 370,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 360, mx: "auto" }}>
                <AnimatedLogo />

                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    letterSpacing: 1,
                    color: PRIMARY_ORANGE,
                  }}
                >
                  Statue of Unity Admin
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ color: "#555", mb: 2, fontSize: 16 }}
                >
                  Sign in to manage your journey
                </Typography>

                <form
                  style={{ width: "100%" }}
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MdEmail size={20} color={PRIMARY_ORANGE} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                      "& label.Mui-focused": {
                        color: PRIMARY_ORANGE,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: PRIMARY_ORANGE,
                        },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <MdLock size={20} color={PRIMARY_ORANGE} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                      "& label.Mui-focused": {
                        color: PRIMARY_ORANGE,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: PRIMARY_ORANGE,
                        },
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 0.5,
                      mb: 2,
                    }}
                  >
                    <Link
                      href="/forgot-password"
                      underline="hover"
                      sx={{
                        color: DARK_ORANGE,
                        fontSize: 15,
                        fontWeight: 500,
                        letterSpacing: 0.5,
                      }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ width: "100%" }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        py: 1.5,
                        fontWeight: "bold",
                        fontSize: 17,
                        letterSpacing: 1,
                        background: `linear-gradient(90deg, ${PRIMARY_ORANGE} 40%, ${SECONDARY_ORANGE} 100%)`,
                        borderRadius: 3,
                        boxShadow: `0 4px 14px ${PRIMARY_ORANGE}2a`,
                        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
                        "&:hover": {
                          background: `linear-gradient(90deg, ${DARK_ORANGE} 60%, ${SECONDARY_ORANGE} 100%)`,
                          boxShadow: `0 6px 24px ${PRIMARY_ORANGE}26`,
                        },
                      }}
                    >
                      SIGN IN
                    </Button>
                  </motion.div>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      {/* SweetAlert2 custom style overrides */}
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
            background: linear-gradient(90deg, ${PRIMARY_ORANGE} 70%, ${SECONDARY_ORANGE} 100%) !important;
          }
        `}
      </style>
    </Box>
  );
};

export default LoginPage;
