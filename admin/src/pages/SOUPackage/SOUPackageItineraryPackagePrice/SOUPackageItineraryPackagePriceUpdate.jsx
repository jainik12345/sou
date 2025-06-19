// import React, { useState, useEffect } from "react";
// import { TextField, MenuItem, IconButton } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate, useLocation } from "react-router-dom";
// import Update from "../../../components/Buttons/Update";
// import Cancel from "../../../components/Buttons/Cancel";
// import UpdateData from "../../../components/Popup/UpdateData";
// import axios from "axios";
// import { FaPlus, FaTimes } from "react-icons/fa";
// import BE_URL from "../../../config";

// const BlueTextField = styled(TextField)({
//   marginBottom: "1rem",
//   "& label.Mui-focused": { color: "#1976d2" },
//   "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": { borderColor: "#1976d2" },
//     "&:hover fieldset": { borderColor: "#1565c0" },
//     "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//   },
// });

// const staticOtherPriceNames = ["Tuesday to Saturday", "Sunday and Monday"];

// const defaultOtherPrice = () => ({
//   label: staticOtherPriceNames[0],
//   premium: "",
//   royal: "",
// });

// const SOUPackageItineraryPackagePriceUpdate = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const priceData = location.state?.itineraryPackagePriceData;

//   const [formData, setFormData] = useState({
//     sou_package_itinerary_id: "",
//     id: "",
//     package_start_price: "",
//   });
//   const [image, setImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [itineraryOptions, setItineraryOptions] = useState([]);
//   const [otherPrices, setOtherPrices] = useState([defaultOtherPrice()]);
//   const [errors, setErrors] = useState({
//     sou_package_itinerary_id: false,
//     image: false,
//     package_start_price: false,
//     otherPrices: false,
//   });
//   const [success, setSuccess] = useState(false);

//   // On mount: fetch options, set form
//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/souPackageItineraryName`)
//       .then((res) => {
//         if (res.data?.data) setItineraryOptions(res.data.data);
//       })
//       .catch((err) => {
//         console.error("Itinerary fetch failed:", err);
//       });

//     if (priceData) {
//       setFormData({
//         sou_package_itinerary_id: priceData.sou_package_itinerary_id,
//         id: priceData.id,
//         package_start_price: priceData.package_start_price || "",
//       });
//       setPreviewUrl(
//         priceData.image
//           ? `${BE_URL}/Images/SouPackage/SouPackageItineraryPackagePriceImages/${priceData.image}`
//           : ""
//       );
//       // Parse other_price if needed
//       let parsedOther = priceData.other_price;
//       if (typeof parsedOther === "string") {
//         try {
//           parsedOther = JSON.parse(parsedOther);
//         } catch {
//           parsedOther = [defaultOtherPrice()];
//         }
//       }
//       if (!Array.isArray(parsedOther) || parsedOther.length === 0)
//         parsedOther = [defaultOtherPrice()];
//       setOtherPrices(parsedOther);
//     } else {
//       navigate("/sou-package-itinerary-price");
//     }
//   }, [priceData, navigate]);

//   // Handlers
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (value.trim() !== "") setErrors((prev) => ({ ...prev, [name]: false }));
//   };

//   const handleOtherPriceChange = (idx, key, value) => {
//     setOtherPrices((prev) =>
//       prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row))
//     );
//   };

//   const handleAddOtherPrice = () => {
//     setOtherPrices((prev) => [...prev, defaultOtherPrice()]);
//   };

//   const handleRemoveOtherPrice = (idx) => {
//     setOtherPrices((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//     setErrors((prev) => ({ ...prev, image: false }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newErrors = {
//       sou_package_itinerary_id: formData.sou_package_itinerary_id === "",
//       image: !image && !previewUrl,
//       package_start_price: formData.package_start_price === "",
//       otherPrices: otherPrices.some(
//         (row) => row.label === "" || row.premium === "" || row.royal === ""
//       ),
//     };

//     setErrors(newErrors);

//     if (Object.values(newErrors).some(Boolean)) return;

//     try {
//       const data = new FormData();
//       data.append(
//         "sou_package_itinerary_id",
//         formData.sou_package_itinerary_id
//       );
//       data.append("package_start_price", formData.package_start_price);
//       data.append("other_price", JSON.stringify(otherPrices));
//       data.append("existingImage", previewUrl?.split("/").pop() || "");
//       if (image) data.append("image", image);

//       const res = await axios.put(
//         `${BE_URL}/souPackageItineraryPackagePrice/${formData.id}`,
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (res.data.status === "success") {
//         setSuccess(true);
//         setTimeout(() => setSuccess(false), 2500);
//         navigate("/sou-package-itinerary-price");
//       } else {
//         console.error("Update failed");
//       }
//     } catch (err) {
//       console.error("Update error:", err);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/sou-package-itinerary-price");
//   };

//   return (
//     <div className="p-6">
//       <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
//         <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
//           Update SOU Package Itinerary Package Price
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Itinerary Selector */}
//           <div>
//             <BlueTextField
//               select
//               label="Select Itinerary"
//               name="sou_package_itinerary_id"
//               value={formData.sou_package_itinerary_id}
//               onChange={handleInputChange}
//               fullWidth
//               required
//               error={errors.sou_package_itinerary_id}
//               helperText={
//                 errors.sou_package_itinerary_id
//                   ? "Please select an itinerary"
//                   : ""
//               }
//             >
//               {itineraryOptions.map((pkg) => (
//                 <MenuItem key={pkg.id} value={pkg.id}>
//                   {pkg.sou_package_itinerary_name}
//                 </MenuItem>
//               ))}
//             </BlueTextField>
//           </div>

//           {/* Image Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Upload Image <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="mb-2"
//             />
//             {previewUrl && (
//               <img
//                 src={previewUrl}
//                 alt="Preview"
//                 className="mt-2 max-w-xs w-55 border rounded"
//               />
//             )}
//             {errors.image && (
//               <p className="text-red-600 text-xs mt-1">
//                 Please select an image
//               </p>
//             )}
//           </div>

//           {/* Package Start Price */}
//           <div>
//             <BlueTextField
//               label="Package Start Price"
//               name="package_start_price"
//               value={formData.package_start_price}
//               onChange={handleInputChange}
//               fullWidth
//               required
//               type="number"
//               error={errors.package_start_price}
//               helperText={
//                 errors.package_start_price ? "Please enter start price" : ""
//               }
//             />
//           </div>

//           {/* Other Price List */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Other Prices
//             </label>
//             <div className="space-y-4">
//               {otherPrices.map((row, idx) => (
//                 <div
//                   key={idx}
//                   className="flex flex-wrap gap-2 items-end border p-3 rounded relative"
//                   style={{ background: "#f9f9ff" }}
//                 >
//                   {/* Label Selector */}
//                   <div className="w-[210px]">
//                     <BlueTextField
//                       select
//                       label="Select Days"
//                       name="label"
//                       value={row.label}
//                       onChange={(e) =>
//                         handleOtherPriceChange(idx, "label", e.target.value)
//                       }
//                       fullWidth
//                       required
//                     >
//                       {staticOtherPriceNames.map((opt) => (
//                         <MenuItem key={opt} value={opt}>
//                           {opt}
//                         </MenuItem>
//                       ))}
//                     </BlueTextField>
//                   </div>
//                   {/* Premium Cottage */}
//                   <div className="w-[210px]">
//                     <BlueTextField
//                       label="Premium Cottages (Garden View)"
//                       name="premium"
//                       value={row.premium}
//                       onChange={(e) =>
//                         handleOtherPriceChange(idx, "premium", e.target.value)
//                       }
//                       fullWidth
//                       required
//                       type="number"
//                     />
//                   </div>
//                   {/* Royal Cottage */}
//                   <div className="w-[210px]">
//                     <BlueTextField
//                       label="Royal Cottages (River View)"
//                       name="royal"
//                       value={row.royal}
//                       onChange={(e) =>
//                         handleOtherPriceChange(idx, "royal", e.target.value)
//                       }
//                       fullWidth
//                       required
//                       type="number"
//                     />
//                   </div>
//                   {/* Remove Icon */}
//                   {otherPrices.length > 1 && (
//                     <IconButton
//                       size="small"
//                       color="error"
//                       onClick={() => handleRemoveOtherPrice(idx)}
//                       style={{ position: "absolute", right: 8, top: 8 }}
//                     >
//                       <FaTimes />
//                     </IconButton>
//                   )}
//                 </div>
//               ))}
//               {/* Add More Icon */}
//               <button
//                 type="button"
//                 className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2"
//                 onClick={handleAddOtherPrice}
//               >
//                 <FaPlus className="mr-2" /> Add More
//               </button>
//               {errors.otherPrices && (
//                 <p className="text-red-600 text-xs mt-1">
//                   Please fill all other price fields
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <Update type="submit" />
//             <Cancel onClick={handleCancel} />
//           </div>
//         </form>
//       </div>

//       {success && <UpdateData />}
//     </div>
//   );
// };

// export default SOUPackageItineraryPackagePriceUpdate;

/* */

import React, { useState, useEffect } from "react";
import { TextField, MenuItem, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import BE_URL from "../../../config";

const BlueTextField = styled(TextField)({
  marginBottom: "1rem",
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const staticOtherPriceNames = ["Tuesday to Saturday", "Sunday and Monday"];

const defaultOtherPrice = () => ({
  label: staticOtherPriceNames[0],
  premium: "",
  royal: "",
});

const SOUPackageItineraryPackagePriceUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const priceData = location.state?.itineraryPackagePriceData;

  const [formData, setFormData] = useState({
    sou_package_itinerary_id: "",
    id: "",
    package_start_price: "",
    from_date: "",
    to_date: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [itineraryOptions, setItineraryOptions] = useState([]);
  const [otherPrices, setOtherPrices] = useState([defaultOtherPrice()]);
  const [errors, setErrors] = useState({
    sou_package_itinerary_id: false,
    image: false,
    package_start_price: false,
    from_date: false,
    to_date: false,
    otherPrices: false,
  });
  const [success, setSuccess] = useState(false);

  // On mount: fetch options, set form
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageItineraryName`)
      .then((res) => {
        if (res.data?.data) setItineraryOptions(res.data.data);
      })
      .catch((err) => {
        console.error("Itinerary fetch failed:", err);
      });

    if (priceData) {
      setFormData({
        sou_package_itinerary_id: priceData.sou_package_itinerary_id,
        id: priceData.id,
        package_start_price: priceData.package_start_price || "",
        from_date: priceData.from_date ? priceData.from_date.slice(0, 10) : "",
        to_date: priceData.to_date ? priceData.to_date.slice(0, 10) : "",
      });
      setPreviewUrl(
        priceData.image
          ? `${BE_URL}/Images/SouPackage/SouPackageItineraryPackagePriceImages/${priceData.image}`
          : ""
      );
      // Parse other_price if needed
      let parsedOther = priceData.other_price;
      if (typeof parsedOther === "string") {
        try {
          parsedOther = JSON.parse(parsedOther);
        } catch {
          parsedOther = [defaultOtherPrice()];
        }
      }
      if (!Array.isArray(parsedOther) || parsedOther.length === 0)
        parsedOther = [defaultOtherPrice()];
      setOtherPrices(parsedOther);
    } else {
      navigate("/sou-package-itinerary-price");
    }
  }, [priceData, navigate]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleOtherPriceChange = (idx, key, value) => {
    setOtherPrices((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row))
    );
  };

  const handleAddOtherPrice = () => {
    setOtherPrices((prev) => [...prev, defaultOtherPrice()]);
  };

  const handleRemoveOtherPrice = (idx) => {
    setOtherPrices((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
    setErrors((prev) => ({ ...prev, image: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      sou_package_itinerary_id: formData.sou_package_itinerary_id === "",
      image: !image && !previewUrl,
      package_start_price: formData.package_start_price === "",
      from_date: formData.from_date === "",
      to_date: formData.to_date === "",
      otherPrices: otherPrices.some(
        (row) => row.label === "" || row.premium === "" || row.royal === ""
      ),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = new FormData();
      data.append(
        "sou_package_itinerary_id",
        formData.sou_package_itinerary_id
      );
      data.append("package_start_price", formData.package_start_price);
      data.append("from_date", formData.from_date);
      data.append("to_date", formData.to_date);
      data.append("other_price", JSON.stringify(otherPrices));
      data.append("existingImage", previewUrl?.split("/").pop() || "");
      if (image) data.append("image", image);

      const res = await axios.put(
        `${BE_URL}/souPackageItineraryPackagePrice/${formData.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/sou-package-itinerary-price");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sou-package-itinerary-price");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update SOU Package Itinerary Package Price
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Itinerary Selector */}
          <div>
            <BlueTextField
              select
              label="Select Itinerary"
              name="sou_package_itinerary_id"
              value={formData.sou_package_itinerary_id}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.sou_package_itinerary_id}
              helperText={
                errors.sou_package_itinerary_id
                  ? "Please select an itinerary"
                  : ""
              }
            >
              {itineraryOptions.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.sou_package_itinerary_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 max-w-xs w-55 border rounded"
              />
            )}
            {errors.image && (
              <p className="text-red-600 text-xs mt-1">
                Please select an image
              </p>
            )}
          </div>

          {/* Package Start Price */}
          <div>
            <BlueTextField
              label="Package Start Price"
              name="package_start_price"
              value={formData.package_start_price}
              onChange={handleInputChange}
              fullWidth
              required
              type="number"
              error={errors.package_start_price}
              helperText={
                errors.package_start_price ? "Please enter start price" : ""
              }
            />
          </div>

          {/* From Date */}
          <div>
            <BlueTextField
              label="From Date"
              name="from_date"
              type="date"
              value={formData.from_date}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={errors.from_date}
              helperText={errors.from_date ? "Please select from date" : ""}
            />
          </div>

          {/* To Date */}
          <div>
            <BlueTextField
              label="To Date"
              name="to_date"
              type="date"
              value={formData.to_date}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={errors.to_date}
              helperText={errors.to_date ? "Please select to date" : ""}
            />
          </div>

          {/* Other Price List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Prices
            </label>
            <div className="space-y-4">
              {otherPrices.map((row, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap gap-2 items-end border p-3 rounded relative"
                  style={{ background: "#f9f9ff" }}
                >
                  {/* Label Selector */}
                  <div className="w-[210px]">
                    <BlueTextField
                      select
                      label="Select Days"
                      name="label"
                      value={row.label}
                      onChange={(e) =>
                        handleOtherPriceChange(idx, "label", e.target.value)
                      }
                      fullWidth
                      required
                    >
                      {staticOtherPriceNames.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </BlueTextField>
                  </div>
                  {/* Premium Cottage */}
                  <div className="w-[210px]">
                    <BlueTextField
                      label="Premium Cottages (Garden View)"
                      name="premium"
                      value={row.premium}
                      onChange={(e) =>
                        handleOtherPriceChange(idx, "premium", e.target.value)
                      }
                      fullWidth
                      required
                      type="number"
                    />
                  </div>
                  {/* Royal Cottage */}
                  <div className="w-[210px]">
                    <BlueTextField
                      label="Royal Cottages (River View)"
                      name="royal"
                      value={row.royal}
                      onChange={(e) =>
                        handleOtherPriceChange(idx, "royal", e.target.value)
                      }
                      fullWidth
                      required
                      type="number"
                    />
                  </div>
                  {/* Remove Icon */}
                  {otherPrices.length > 1 && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveOtherPrice(idx)}
                      style={{ position: "absolute", right: 8, top: 8 }}
                    >
                      <FaTimes />
                    </IconButton>
                  )}
                </div>
              ))}
              {/* Add More Icon */}
              <button
                type="button"
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2"
                onClick={handleAddOtherPrice}
              >
                <FaPlus className="mr-2" /> Add More
              </button>
              {errors.otherPrices && (
                <p className="text-red-600 text-xs mt-1">
                  Please fill all other price fields
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default SOUPackageItineraryPackagePriceUpdate;
