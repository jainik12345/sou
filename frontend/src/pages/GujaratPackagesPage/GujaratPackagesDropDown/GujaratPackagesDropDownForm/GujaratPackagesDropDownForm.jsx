// import { TextField, MenuItem, Button } from "@mui/material";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export const GujaratPackagesDropDownForm = () => {
//   const { GujaratPath } = useParams();

//   if (!GujaratPath) {
//     return <h1 className="text-xl text-red-600">Invalid Gujarat Package</h1>;
//   }

//   const formattedTitle = GujaratPath.replace(/-/g, " ").replace(
//     /\b\w/g,
//     (char) => char.toUpperCase()
//   );

//   const [FormData, setFormData] = useState({
//     Name: "",
//     Email: "",
//     Number: "",
//     Date: "",
//     Package: "",
//     Message: "",
//   });

//   const [FormErrors, setFormErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};

//     if (!FormData.Name.trim()) errors.Name = "Name is required.";
//     if (!FormData.Email.trim()) errors.Email = "Email is required.";
//     if (!FormData.Number.trim()) errors.Number = "Phone number is required.";
//     if (!FormData.Date) errors.Date = "Date is required.";
//     if (!FormData.Package) errors.PackageData = "Please select a Package.";

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const HandleOnSubmit = (event) => {
//     event.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     console.log("Form submitted", FormData);
//     HandleOnReset();
//   };

//   const HandleOnReset = () => {
//     setFormData({
//       Name: "",
//       Email: "",
//       Number: "",
//       Date: "",
//       Package: "",
//       Message: "",
//     });
//   };

//   const PackageData = [
//     {
//       name: "Statue of Unity Tent City - 1",
//     },

//     {
//       name: "Villa Euphoria Resort",
//     },
//     {
//       name: "Tent City Narmada",
//     },

//     {
//       name: "River View Tent Resort",
//     },
//     {
//       name: "Unity Village Resort",
//     },
//     {
//       name: "Gujarat Tour 3N / 4D",
//     },
//     {
//       name: "Gujarat Tour 4N / 5D",
//     },
//     {
//       name: "Gujarat Tour 5N / 6D",
//     },
//     {
//       name: "Gujarat Tour 6N / 7D",
//     },
//     {
//       name: "Gujarat Tour 7N / 8D",
//     },
//     {
//       name: "Gujarat Tour 11N / 12D",
//     },
//   ];

//   return (
//     <>
//       <div className="gujarat-packages-section p-10">
//         <h2 className="text-center font-semibold text-orange-color text-[2rem]">
//           Plan Your Trip to {formattedTitle}
//         </h2>

//         <div className="form-cont max-w-screen-lg mx-auto md:p-10 p-5 white shadow-xl shadow-black/50 ">
//           <form action="#" className="grid md:grid-cols-2 grid-cols-1 gap-4 ">
//             <TextField
//               id="filled-basic"
//               label="Enter Your Name"
//               variant="filled"
//               name="Name"
//               required
//               autoComplete="name"
//               error={Boolean(FormErrors.Name)}
//               helperText={FormErrors.Name}
//               sx={{
//                 "& label.Mui-focused": {
//                   color: "var(--color-orange-color)",
//                   fontSize: "1rem",
//                 },
//                 "& .MuiFilledInput-underline:after": {
//                   borderBottomColor: "var(--color-orange-color)",
//                 },
//                 "& .MuiFilledInput-root.Mui-focused": {
//                   backgroundColor: "#fff",
//                 },
//                 "& label": {
//                   fontSize: ".9rem",
//                 },
//               }}
//               value={FormData.Name}
//               onChange={(event) => {
//                 setFormData({ ...FormData, Name: event.target.value });
//               }}
//             />

//             <TextField
//               id="filled-email-input"
//               label="Email"
//               type="email"
//               autoComplete="email"
//               required
//               variant="filled"
//               name="email"
//               error={Boolean(FormErrors.Email)}
//               helperText={FormErrors.Email}
//               sx={{
//                 "& label.Mui-focused": {
//                   color: "var(--color-orange-color)",
//                   fontSize: "1rem",
//                 },
//                 "& .MuiFilledInput-underline:after": {
//                   borderBottomColor: "var(--color-orange-color)",
//                 },
//                 "& .MuiFilledInput-root.Mui-focused": {
//                   backgroundColor: "#fff", // optional
//                 },
//                 "& label": {
//                   fontSize: ".9rem",
//                 },
//               }}
//               value={FormData.Email}
//               onChange={(event) => {
//                 setFormData({ ...FormData, Email: event.target.value });
//               }}
//             />

//             <TextField
//               id="filled-number-input"
//               label="Phone Number"
//               type="number"
//               inputMode="numeric"
//               autoComplete="number"
//               required
//               variant="filled"
//               error={Boolean(FormErrors.Number)}
//               helperText={FormErrors.Number}
//               name="number"
//               sx={{
//                 "& label.Mui-focused": {
//                   color: "var(--color-orange-color)",
//                   fontSize: "1rem",
//                 },
//                 "& .MuiFilledInput-underline:after": {
//                   borderBottomColor: "var(--color-orange-color)",
//                 },
//                 "& .MuiFilledInput-root.Mui-focused": {
//                   backgroundColor: "#fff", // optional
//                 },
//                 "& label": {
//                   fontSize: ".9rem",
//                 },
//               }}
//               value={FormData.Number}
//               onChange={(event) => {
//                 setFormData({ ...FormData, Number: event.target.value });
//               }}
//             />

//             <TextField
//               id="filled-date-input"
//               label="Select Date"
//               type="date"
//               name="date"
//               variant="filled"
//               error={Boolean(FormErrors.Date)}
//               helperText={FormErrors.Date}
//               InputLabelProps={{
//                 shrink: true, // Keeps the label visible when a date is selected
//               }}
//               required
//               value={FormData.Date}
//               onChange={(event) => {
//                 setFormData({ ...FormData, Date: event.target.value });
//               }}
//             />

//             <TextField
//               id="filled-Package-input"
//               label="Select Package"
//               required
//               select
//               autoComplete="on"
//               error={Boolean(FormErrors.Package)}
//               helperText={FormErrors.Package}
//               variant="filled"
//               className="md:md:col-span-2"
//               sx={{
//                 "& label.Mui-focused": {
//                   color: "var(--color-orange-color)",
//                   fontSize: "1rem",
//                 },
//                 "& .MuiFilledInput-underline:after": {
//                   borderBottomColor: "var(--color-orange-color)",
//                 },
//                 "& .MuiFilledInput-root.Mui-focused": {
//                   backgroundColor: "#fff", // optional
//                 },
//                 "& label": {
//                   fontSize: ".9rem",
//                 },
//               }}
//               value={FormData.Package}
//               onChange={(event) => {
//                 setFormData({ ...FormData, Package: event.target.value });
//               }}
//             >
//               {PackageData.map((Item, Idx) => {
//                 return (
//                   <MenuItem key={Idx} value={Item.name}>
//                     {Item.name}
//                   </MenuItem>
//                 );
//               })}
//             </TextField>

//             <TextField
//               className="md:col-span-2"
//               id="filled-message-input"
//               label="Type Message"
//               type="text"
//               variant="filled"
//               multiline
//               minRows={5}
//               maxRows={7}
//               name="message"
//               sx={{
//                 "& label.Mui-focused": {
//                   color: "var(--color-orange-color)",
//                   fontSize: "1rem",
//                 },
//                 "& .MuiFilledInput-underline:after": {
//                   borderBottomColor: "var(--color-orange-color)",
//                 },
//                 "& .MuiFilledInput-root.Mui-focused": {
//                   backgroundColor: "#fff", // optional
//                 },
//                 "& label": {
//                   fontSize: ".9rem",
//                 },
//               }}
//               value={FormData.Message}
//               onChange={(event) => {
//                 setFormData({ ...FormData, Message: event.target.value });
//               }}
//             />

//             <Button
//               variant="outlined"
//               type="submit"
//               sx={{
//                 fontWeight: 600,
//                 fontFamily: "var(--font-footer-font)",
//                 backgroundColor: "var(--color-orange-color)",
//                 color: "white",
//                 border: "none",
//                 height: "50px",
//               }}
//               onClick={(event) => {
//                 HandleOnSubmit(event);
//               }}
//             >
//               Submit
//             </Button>

//             <Button
//               variant="outlined"
//               type="button"
//               sx={{
//                 fontFamily: "var(--font-footer-font)",
//                 fontWeight: 600,
//                 backgroundColor: "var(--color-orange-color)",
//                 color: "white",
//                 border: "none",
//                 height: "50px",
//               }}
//               onClick={(event) => {
//                 HandleOnReset(event);
//               }}
//             >
//               Reset
//             </Button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

/* */

// import { TextField, MenuItem, Button } from "@mui/material";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import BE_URL from "../../../../config";

// export const GujaratPackagesDropDownForm = () => {
//   const { GujaratPath } = useParams();

//   const [FormData, setFormData] = useState({
//     Name: "",
//     Email: "",
//     Number: "",
//     Date: "",
//     Package: "",
//     Message: "",
//   });

//   const [FormErrors, setFormErrors] = useState({});
//   const [PackageOptions, setPackageOptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Submit UI states
//   const [submitting, setSubmitting] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");

//   // Format title for display (from route)
//   const formattedTitle = GujaratPath
//     ? GujaratPath.replace(/-/g, " ").replace(/\b\w/g, (char) =>
//         char.toUpperCase()
//       )
//     : "";

//   // Fetch package options for dropdown
//   useEffect(() => {
//     let nights = null;
//     let days = null;
//     setLoading(true);
//     if (GujaratPath) {
//       const match = GujaratPath.match(/(\d+)n-(\d+)d/i);
//       if (match) {
//         nights = parseInt(match[1], 10);
//         days = parseInt(match[2], 10);
//       }
//     }

//     const fetchSelectorData = async () => {
//       try {
//         const pkgRes = await axios.get(`${BE_URL}/gujaratPackage`);
//         const allPackages = pkgRes.data?.data || [];
//         const matched = allPackages.find(
//           (pkg) => Number(pkg.Nights) === nights && Number(pkg.Days) === days
//         );
//         if (!matched) {
//           setPackageOptions([]);
//           setLoading(false);
//           return;
//         }
//         const packageId = matched.id;

//         const res = await axios.get(
//           `${BE_URL}/gujaratPackageData/by-package/${packageId}`
//         );
//         if (res.data.status === "success") {
//           setPackageOptions(res.data.data || []);
//         } else {
//           setPackageOptions([]);
//         }
//       } catch (err) {
//         setPackageOptions([]);
//         console.error("Error fetching package data:", err);
//       }
//       setLoading(false);
//     };

//     if (nights && days) fetchSelectorData();
//     else {
//       setPackageOptions([]);
//       setLoading(false);
//     }
//   }, [GujaratPath]);

//   // Auto-select if only one package option
//   useEffect(() => {
//     if (
//       !FormData.Package &&
//       PackageOptions.length === 1 &&
//       PackageOptions[0].heading
//     ) {
//       setFormData((prev) => ({
//         ...prev,
//         Package: PackageOptions[0].heading,
//       }));
//     }
//   }, [PackageOptions, FormData.Package]);

//   const validateForm = () => {
//     const errors = {};
//     if (!FormData.Name.trim()) errors.Name = "Name is required.";
//     if (!FormData.Email.trim()) errors.Email = "Email is required.";
//     if (!FormData.Number.trim()) errors.Number = "Phone number is required.";
//     if (!FormData.Date) errors.Date = "Date is required.";
//     if (!FormData.Package) errors.Package = "Please select a Package.";
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // --- UPDATE: Ensures keys match your backend/database ---
//   const HandleOnSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateForm()) return;

//     setSubmitting(true);
//     setSuccessMsg(""); // Reset on submit

//     try {
//       // Call the gujaratPackageForm API with correct keys
//       await axios.post(`${BE_URL}/gujaratPackageForm`, {
//         name: FormData.Name,
//         email: FormData.Email,
//         number: FormData.Number,
//         date: FormData.Date,
//         gujarat_package_name: FormData.Package,
//         message: FormData.Message,
//       });

//       setSuccessMsg("Form is Successfully Sent!");
//       setFormData({
//         Name: "",
//         Email: "",
//         Number: "",
//         Date: "",
//         Package: "",
//         Message: "",
//       });
//       setFormErrors({});
//       setTimeout(() => setSuccessMsg(""), 2500);
//     } catch (err) {
//       setSuccessMsg("");
//       setFormErrors({ submit: "There was an error submitting the form." });
//       console.error("Error is :", err);
//     }
//     setSubmitting(false);
//   };

//   const HandleOnReset = () => {
//     setFormData({
//       Name: "",
//       Email: "",
//       Number: "",
//       Date: "",
//       Package: "",
//       Message: "",
//     });
//     setFormErrors({});
//   };

//   if (loading) {
//     return (
//       <div className="text-center text-lg font-semibold text-orange-500 py-10">
//         Loading Packages...
//       </div>
//     );
//   }

//   if (!PackageOptions.length) {
//     return (
//       <h1 className="text-xl text-black text-center p-5">
//         No Gujarat Packages Found.
//       </h1>
//     );
//   }

//   return (
//     <div className="gujarat-packages-section p-10">
//       <h2 className="text-center font-semibold text-orange-color text-[2rem]">
//         Plan Your Trip to {formattedTitle}
//       </h2>

//       <div className="form-cont max-w-screen-lg mx-auto md:p-10 p-5 white shadow-xl shadow-black/50">
//         {successMsg && (
//           <div className="mb-5 text-green-600 bg-green-100 rounded py-2 px-4 text-center font-semibold animate-fade-in">
//             {successMsg}
//           </div>
//         )}
//         {FormErrors.submit && (
//           <div className="mb-5 text-red-600 bg-red-100 rounded py-2 px-4 text-center font-semibold">
//             {FormErrors.submit}
//           </div>
//         )}
//         <form
//           onSubmit={HandleOnSubmit}
//           className="grid md:grid-cols-2 grid-cols-1 gap-4"
//         >
//           <TextField
//             id="filled-basic"
//             label="Enter Your Name"
//             variant="filled"
//             name="Name"
//             required
//             autoComplete="name"
//             error={Boolean(FormErrors.Name)}
//             helperText={FormErrors.Name}
//             sx={{
//               "& label.Mui-focused": {
//                 color: "var(--color-orange-color)",
//                 fontSize: "1rem",
//               },
//               "& .MuiFilledInput-underline:after": {
//                 borderBottomColor: "var(--color-orange-color)",
//               },
//               "& .MuiFilledInput-root.Mui-focused": {
//                 backgroundColor: "#fff",
//               },
//               "& label": {
//                 fontSize: ".9rem",
//               },
//             }}
//             value={FormData.Name}
//             onChange={(event) => {
//               setFormData({ ...FormData, Name: event.target.value });
//             }}
//             disabled={submitting}
//           />

//           <TextField
//             id="filled-email-input"
//             label="Email"
//             type="email"
//             autoComplete="email"
//             required
//             variant="filled"
//             name="Email"
//             error={Boolean(FormErrors.Email)}
//             helperText={FormErrors.Email}
//             sx={{
//               "& label.Mui-focused": {
//                 color: "var(--color-orange-color)",
//                 fontSize: "1rem",
//               },
//               "& .MuiFilledInput-underline:after": {
//                 borderBottomColor: "var(--color-orange-color)",
//               },
//               "& .MuiFilledInput-root.Mui-focused": {
//                 backgroundColor: "#fff",
//               },
//               "& label": {
//                 fontSize: ".9rem",
//               },
//             }}
//             value={FormData.Email}
//             onChange={(event) => {
//               setFormData({ ...FormData, Email: event.target.value });
//             }}
//             disabled={submitting}
//           />

//           <TextField
//             id="filled-number-input"
//             label="Phone Number"
//             type="number"
//             inputMode="numeric"
//             autoComplete="number"
//             required
//             variant="filled"
//             error={Boolean(FormErrors.Number)}
//             helperText={FormErrors.Number}
//             name="Number"
//             sx={{
//               "& label.Mui-focused": {
//                 color: "var(--color-orange-color)",
//                 fontSize: "1rem",
//               },
//               "& .MuiFilledInput-underline:after": {
//                 borderBottomColor: "var(--color-orange-color)",
//               },
//               "& .MuiFilledInput-root.Mui-focused": {
//                 backgroundColor: "#fff",
//               },
//               "& label": {
//                 fontSize: ".9rem",
//               },
//             }}
//             value={FormData.Number}
//             onChange={(event) => {
//               setFormData({ ...FormData, Number: event.target.value });
//             }}
//             disabled={submitting}
//           />

//           <TextField
//             id="filled-date-input"
//             label="Select Date"
//             type="date"
//             name="Date"
//             variant="filled"
//             error={Boolean(FormErrors.Date)}
//             helperText={FormErrors.Date}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             required
//             value={FormData.Date}
//             onChange={(event) => {
//               setFormData({ ...FormData, Date: event.target.value });
//             }}
//             disabled={submitting}
//           />

//           <TextField
//             id="filled-Package-input"
//             label="Select Package"
//             required
//             select
//             error={Boolean(FormErrors.Package)}
//             helperText={FormErrors.Package}
//             variant="filled"
//             className="md:col-span-2"
//             value={FormData.Package}
//             onChange={(event) => {
//               setFormData({ ...FormData, Package: event.target.value });
//             }}
//             sx={{
//               "& label.Mui-focused": {
//                 color: "var(--color-orange-color)",
//                 fontSize: "1rem",
//               },
//               "& .MuiFilledInput-underline:after": {
//                 borderBottomColor: "var(--color-orange-color)",
//               },
//               "& .MuiFilledInput-root.Mui-focused": {
//                 backgroundColor: "#fff",
//               },
//               "& label": {
//                 fontSize: ".9rem",
//               },
//             }}
//             disabled={submitting}
//           >
//             {PackageOptions.map((item, idx) =>
//               item.heading ? (
//                 <MenuItem key={item.id || idx} value={item.heading}>
//                   {item.heading}
//                 </MenuItem>
//               ) : null
//             )}
//           </TextField>

//           <TextField
//             className="md:col-span-2"
//             id="filled-message-input"
//             label="Type Message"
//             type="text"
//             variant="filled"
//             multiline
//             minRows={5}
//             maxRows={7}
//             name="Message"
//             sx={{
//               "& label.Mui-focused": {
//                 color: "var(--color-orange-color)",
//                 fontSize: "1rem",
//               },
//               "& .MuiFilledInput-underline:after": {
//                 borderBottomColor: "var(--color-orange-color)",
//               },
//               "& .MuiFilledInput-root.Mui-focused": {
//                 backgroundColor: "#fff",
//               },
//               "& label": {
//                 fontSize: ".9rem",
//               },
//             }}
//             value={FormData.Message}
//             onChange={(event) => {
//               setFormData({ ...FormData, Message: event.target.value });
//             }}
//             disabled={submitting}
//           />

//           <Button
//             variant="outlined"
//             type="submit"
//             sx={{
//               fontWeight: 600,
//               fontFamily: "var(--font-footer-font)",
//               backgroundColor: "var(--color-orange-color)",
//               color: "white",
//               border: "none",
//               height: "50px",
//             }}
//             disabled={submitting}
//           >
//             {submitting ? "Submitting..." : "Submit"}
//           </Button>

//           <Button
//             variant="outlined"
//             type="button"
//             sx={{
//               fontFamily: "var(--font-footer-font)",
//               fontWeight: 600,
//               backgroundColor: "var(--color-orange-color)",
//               color: "white",
//               border: "none",
//               height: "50px",
//             }}
//             onClick={HandleOnReset}
//             disabled={submitting}
//           >
//             Reset
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

/* */

import { TextField, MenuItem, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";

// MUI X DatePicker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

export const GujaratPackagesDropDownForm = () => {
  const { GujaratPath } = useParams();

  const [FormData, setFormData] = useState({
    Name: "",
    Email: "",
    Number: "",
    Date: null, // Store as Date object for DatePicker
    Package: "",
    Message: "",
  });

  const [FormErrors, setFormErrors] = useState({});
  const [PackageOptions, setPackageOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Format title for display (from route)
  const formattedTitle = GujaratPath
    ? GujaratPath.replace(/-/g, " ").replace(/\b\w/g, (char) =>
        char.toUpperCase()
      )
    : "";

  // Fetch package options for dropdown
  useEffect(() => {
    let nights = null;
    let days = null;
    setLoading(true);
    if (GujaratPath) {
      const match = GujaratPath.match(/(\d+)n-(\d+)d/i);
      if (match) {
        nights = parseInt(match[1], 10);
        days = parseInt(match[2], 10);
      }
    }

    const fetchSelectorData = async () => {
      try {
        const pkgRes = await axios.get(`${BE_URL}/gujaratPackage`);
        const allPackages = pkgRes.data?.data || [];
        const matched = allPackages.find(
          (pkg) => Number(pkg.Nights) === nights && Number(pkg.Days) === days
        );
        if (!matched) {
          setPackageOptions([]);
          setLoading(false);
          return;
        }
        const packageId = matched.id;

        const res = await axios.get(
          `${BE_URL}/gujaratPackageData/by-package/${packageId}`
        );
        if (res.data.status === "success") {
          setPackageOptions(res.data.data || []);
        } else {
          setPackageOptions([]);
        }
      } catch (err) {
        setPackageOptions([]);
        console.error("Error fetching package data:", err);
      }
      setLoading(false);
    };

    if (nights && days) fetchSelectorData();
    else {
      setPackageOptions([]);
      setLoading(false);
    }
  }, [GujaratPath]);

  // Auto-select if only one package option
  useEffect(() => {
    if (
      !FormData.Package &&
      PackageOptions.length === 1 &&
      PackageOptions[0].heading
    ) {
      setFormData((prev) => ({
        ...prev,
        Package: PackageOptions[0].heading,
      }));
    }
  }, [PackageOptions, FormData.Package]);

  const validateForm = () => {
    const errors = {};
    if (!FormData.Name.trim()) errors.Name = "Name is required.";
    if (!FormData.Email.trim()) errors.Email = "Email is required.";
    if (!FormData.Number.trim()) errors.Number = "Phone number is required.";
    if (!FormData.Date) errors.Date = "Date is required.";
    if (!FormData.Package) errors.Package = "Please select a Package.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const HandleOnSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSuccessMsg(""); // Reset on submit

    try {
      // Format date as YYYY-MM-DD for backend
      const formattedDate = FormData.Date
        ? format(FormData.Date, "yyyy-MM-dd")
        : "";

      await axios.post(`${BE_URL}/gujaratPackageForm`, {
        name: FormData.Name,
        email: FormData.Email,
        number: FormData.Number,
        date: formattedDate,
        gujarat_package_name: FormData.Package,
        message: FormData.Message,
      });

      setSuccessMsg("Form is Successfully Sent!");
      setFormData({
        Name: "",
        Email: "",
        Number: "",
        Date: null,
        Package: "",
        Message: "",
      });
      setFormErrors({});
      setTimeout(() => setSuccessMsg(""), 2500);
    } catch (err) {
      setSuccessMsg("");
      setFormErrors({ submit: "There was an error submitting the form." });
      console.error("Error is :", err);
    }
    setSubmitting(false);
  };

  const HandleOnReset = () => {
    setFormData({
      Name: "",
      Email: "",
      Number: "",
      Date: null,
      Package: "",
      Message: "",
    });
    setFormErrors({});
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-orange-500 py-10">
        Loading Packages...
      </div>
    );
  }

  if (!PackageOptions.length) {
    return (
      <h1 className="text-xl text-black text-center p-5">
        No Gujarat Packages Found.
      </h1>
    );
  }

  return (
    <div className="gujarat-packages-section px-5 py-10">
      <h2 className="text-center font-semibold text-orange-color md:text-2xl text-lg">
        Plan Your Trip to {formattedTitle}
      </h2>

      <div className="form-cont max-w-screen-lg mx-auto md:p-10 p-5 white shadow-xl shadow-black/50">
        {successMsg && (
          <div className="mb-5 text-green-600 bg-green-100 rounded py-2 px-4 text-center font-semibold animate-fade-in">
            {successMsg}
          </div>
        )}
        {FormErrors.submit && (
          <div className="mb-5 text-red-600 bg-red-100 rounded py-2 px-4 text-center font-semibold">
            {FormErrors.submit}
          </div>
        )}
        <form
          onSubmit={HandleOnSubmit}
          className="grid md:grid-cols-2 grid-cols-1 gap-4"
        >
          <TextField
            id="filled-basic"
            label="Enter Your Name"
            variant="filled"
            name="Name"
            required
            autoComplete="name"
            error={Boolean(FormErrors.Name)}
            helperText={FormErrors.Name}
            sx={{
              "& label.Mui-focused": {
                color: "var(--color-orange-color)",
                fontSize: "1rem",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "var(--color-orange-color)",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                backgroundColor: "#fff",
              },
              "& label": {
                fontSize: ".9rem",
              },
            }}
            value={FormData.Name}
            onChange={(event) => {
              setFormData({ ...FormData, Name: event.target.value });
            }}
            disabled={submitting}
          />

          <TextField
            id="filled-email-input"
            label="Email"
            type="email"
            autoComplete="email"
            required
            variant="filled"
            name="Email"
            error={Boolean(FormErrors.Email)}
            helperText={FormErrors.Email}
            sx={{
              "& label.Mui-focused": {
                color: "var(--color-orange-color)",
                fontSize: "1rem",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "var(--color-orange-color)",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                backgroundColor: "#fff",
              },
              "& label": {
                fontSize: ".9rem",
              },
            }}
            value={FormData.Email}
            onChange={(event) => {
              setFormData({ ...FormData, Email: event.target.value });
            }}
            disabled={submitting}
          />

          <TextField
            id="filled-number-input"
            label="Phone Number"
            type="number"
            inputMode="numeric"
            autoComplete="number"
            required
            variant="filled"
            error={Boolean(FormErrors.Number)}
            helperText={FormErrors.Number}
            name="Number"
            sx={{
              "& label.Mui-focused": {
                color: "var(--color-orange-color)",
                fontSize: "1rem",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "var(--color-orange-color)",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                backgroundColor: "#fff",
              },
              "& label": {
                fontSize: ".9rem",
              },
            }}
            value={FormData.Number}
            onChange={(event) => {
              setFormData({ ...FormData, Number: event.target.value });
            }}
            disabled={submitting}
          />

          {/* Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select Date"
              value={FormData.Date}
              onChange={(newValue) => {
                setFormData({ ...FormData, Date: newValue });
              }}
              format="dd/MM/yyyy"
              disablePast
              slotProps={{
                textField: {
                  variant: "filled",
                  required: true,
                  error: Boolean(FormErrors.Date),
                  helperText: FormErrors.Date,
                  sx: {
                    "& label.Mui-focused": {
                      color: "var(--color-orange-color)",
                      fontSize: "1rem",
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "var(--color-orange-color)",
                    },
                    "& .MuiFilledInput-root.Mui-focused": {
                      backgroundColor: "#fff",
                    },
                    "& label": {
                      fontSize: ".9rem",
                    },
                  },
                  disabled: submitting,
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            id="filled-Package-input"
            label="Select Package"
            required
            select
            error={Boolean(FormErrors.Package)}
            helperText={FormErrors.Package}
            variant="filled"
            className="md:col-span-2"
            value={FormData.Package}
            onChange={(event) => {
              setFormData({ ...FormData, Package: event.target.value });
            }}
            sx={{
              "& label.Mui-focused": {
                color: "var(--color-orange-color)",
                fontSize: "1rem",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "var(--color-orange-color)",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                backgroundColor: "#fff",
              },
              "& label": {
                fontSize: ".9rem",
              },
            }}
            disabled={submitting}
          >
            {PackageOptions.map((item, idx) =>
              item.heading ? (
                <MenuItem key={item.id || idx} value={item.heading}>
                  {item.heading}
                </MenuItem>
              ) : null
            )}
          </TextField>

          <TextField
            className="md:col-span-2"
            id="filled-message-input"
            label="Type Message"
            type="text"
            variant="filled"
            multiline
            minRows={5}
            maxRows={7}
            name="Message"
            sx={{
              "& label.Mui-focused": {
                color: "var(--color-orange-color)",
                fontSize: "1rem",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "var(--color-orange-color)",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                backgroundColor: "#fff",
              },
              "& label": {
                fontSize: ".9rem",
              },
            }}
            value={FormData.Message}
            onChange={(event) => {
              setFormData({ ...FormData, Message: event.target.value });
            }}
            disabled={submitting}
          />

          <Button
            variant="outlined"
            type="submit"
            sx={{
              fontWeight: 600,
              fontFamily: "var(--font-footer-font)",
              backgroundColor: "var(--color-orange-color)",
              color: "white",
              border: "none",
              height: "50px",
            }}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>

          <Button
            variant="outlined"
            type="button"
            sx={{
              fontFamily: "var(--font-footer-font)",
              fontWeight: 600,
              backgroundColor: "var(--color-orange-color)",
              color: "white",
              border: "none",
              height: "50px",
            }}
            onClick={HandleOnReset}
            disabled={submitting}
          >
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
};
