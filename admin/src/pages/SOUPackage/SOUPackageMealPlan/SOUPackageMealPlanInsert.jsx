// import React, { useState, useEffect } from "react";
// import { TextField, MenuItem } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from "react-router-dom";
// import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
// import axios from "axios";
// import Submit from "../../../components/Buttons/Submit";
// import Cancel from "../../../components/Buttons/Cancel";
// import SubmitData from "../../../components/Popup/SubmitData";
// import BE_URL from "../../../config";

// const BlueTextField = styled(TextField)({
//   "& label.Mui-focused": { color: "#1976d2" },
//   "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": { borderColor: "#1976d2" },
//     "&:hover fieldset": { borderColor: "#1565c0" },
//     "&.Mui-focused fieldset": { borderColor: "#1976d2" },
//   },
// });

// const weekOptions = [
//   { value: "Weekdays", label: "Weekdays" },
//   { value: "Weekend", label: "Weekend" },
// ];

// const foodPlanOptions = [
//   { value: "EP", label: "EP" },
//   { value: "CP", label: "CP" },
//   { value: "MAP", label: "MAP" },
//   { value: "AP", label: "AP" },
// ];

// const emptyEntry = { category: "", double_occupancyy: "", extra_person: "" };

// const SOUPackageMealPlanInsert = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     sou_package_id: "",
//     week: "",
//     food_plans: "",
//     data: [{ ...emptyEntry }],
//   });

//   const [packageOptions, setPackageOptions] = useState([]);
//   // eslint-disable-next-line no-unused-vars
//   const [errors, setErrors] = useState({});
//   const [entryErrors, setEntryErrors] = useState([{}]);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/souPackageName`)
//       .then((res) => setPackageOptions(res.data.data))
//       .catch((err) => console.error("Package fetch failed:", err));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: false }));
//   };

//   const handleEntryChange = (idx, e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       data: prev.data.map((entry, i) =>
//         i === idx ? { ...entry, [name]: value } : entry
//       ),
//     }));
//     setEntryErrors((prev) =>
//       prev.map((err, i) => (i === idx ? { ...err, [name]: false } : err))
//     );
//   };

//   // Add new entry
//   const handleAddEntry = () => {
//     setFormData((prev) => ({
//       ...prev,
//       data: [...prev.data, { ...emptyEntry }],
//     }));
//     setEntryErrors((prev) => [...prev, {}]);
//   };

//   // Remove entry
//   const handleRemoveEntry = (idx) => {
//     setFormData((prev) => ({
//       ...prev,
//       data: prev.data.filter((_, i) => i !== idx),
//     }));
//     setEntryErrors((prev) => prev.filter((_, i) => i !== idx));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate all data entries
//     const newEntryErrors = formData.data.map((entry) => ({
//       category: entry.category.trim() === "",
//       double_occupancyy: entry.double_occupancyy === "",
//       extra_person: entry.extra_person === "",
//     }));

//     setEntryErrors(newEntryErrors);

//     if (newEntryErrors.some((err) => Object.values(err).some(Boolean))) return;

//     try {
//       const data = {
//         sou_package_id: formData.sou_package_id,
//         week: formData.week,
//         food_plans: formData.food_plans,
//         data: formData.data,
//       };

//       const res = await axios.post(`${BE_URL}/souPackageMealPlan`, data);

//       if (res.data.status === "success") {
//         setSuccess(true);
//         setFormData({
//           sou_package_id: "",
//           week: "",
//           food_plans: "",
//           data: [{ ...emptyEntry }],
//         });
//         setEntryErrors([{}]);
//         setTimeout(() => setSuccess(false), 2500);
//       } else {
//         alert("Insert failed");
//       }
//     } catch (error) {
//       console.error("Insert error:", error);
//       alert("An error occurred");
//     }
//   };

//   const handleCancel = () => {
//     navigate("/sou-package-meal-plan");
//   };

//   return (
//     <div className="p-6">
//       <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
//         <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
//           Add SOU Package Meal Plan
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Package Selector */}
//           <div>
//             <BlueTextField
//               select
//               label="Select Package"
//               name="sou_package_id"
//               value={formData.sou_package_id}
//               onChange={handleInputChange}
//               fullWidth
//               required
//             >
//               {packageOptions.map((pkg) => (
//                 <MenuItem key={pkg.id} value={pkg.id}>
//                   {pkg.sou_package_name}
//                 </MenuItem>
//               ))}
//             </BlueTextField>
//           </div>

//           {/* Week Selector */}
//           <div>
//             <BlueTextField
//               select
//               label="Week"
//               name="week"
//               value={formData.week}
//               onChange={handleInputChange}
//               fullWidth
//               required
//             >
//               {weekOptions.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </BlueTextField>
//           </div>

//           {/* Food Plans Selector */}
//           <div>
//             <BlueTextField
//               select
//               label="Food Plans"
//               name="food_plans"
//               value={formData.food_plans}
//               onChange={handleInputChange}
//               fullWidth
//               required
//             >
//               {foodPlanOptions.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </BlueTextField>
//           </div>

//           {/* Dynamic Data Section */}
//           <div>
//             <div className="flex items-center mb-2">
//               <span className="font-semibold text-blue-700">
//                 Meal Plan Details
//               </span>
//               <button
//                 type="button"
//                 onClick={handleAddEntry}
//                 className="ml-2 text-blue-600 hover:text-blue-900"
//                 style={{
//                   background: "none",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 <FaPlusCircle size={24} />
//               </button>
//             </div>
//             {formData.data.map((entry, idx) => (
//               <div
//                 key={idx}
//                 className="flex flex-col md:flex-row md:items-end gap-4 mb-4 border-b pb-4 relative"
//               >
//                 <BlueTextField
//                   label="Category"
//                   name="category"
//                   value={entry.category}
//                   onChange={(e) => handleEntryChange(idx, e)}
//                   fullWidth
//                   required
//                   error={entryErrors[idx]?.category}
//                   helperText={
//                     entryErrors[idx]?.category ? "Please enter a category" : ""
//                   }
//                 />
//                 <BlueTextField
//                   label="Double Occupancy"
//                   name="double_occupancyy"
//                   type="number"
//                   value={entry.double_occupancyy}
//                   onChange={(e) => handleEntryChange(idx, e)}
//                   fullWidth
//                   required
//                   error={entryErrors[idx]?.double_occupancyy}
//                   helperText={
//                     entryErrors[idx]?.double_occupancyy
//                       ? "Please enter double occupancy"
//                       : ""
//                   }
//                   inputProps={{ min: 0 }}
//                 />
//                 <BlueTextField
//                   label="Extra Person"
//                   name="extra_person"
//                   type="number"
//                   value={entry.extra_person}
//                   onChange={(e) => handleEntryChange(idx, e)}
//                   fullWidth
//                   required
//                   error={entryErrors[idx]?.extra_person}
//                   helperText={
//                     entryErrors[idx]?.extra_person
//                       ? "Please enter extra person"
//                       : ""
//                   }
//                   inputProps={{ min: 0 }}
//                 />
//                 {formData.data.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveEntry(idx)}
//                     className="text-red-600 hover:text-red-900"
//                     style={{
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       alignSelf: "center",
//                     }}
//                   >
//                     <FaTimesCircle size={24} />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <Submit type="submit" />
//             <Cancel onClick={handleCancel} />
//           </div>
//         </form>
//       </div>
//       {success && <SubmitData />}
//     </div>
//   );
// };

// export default SOUPackageMealPlanInsert;

/* */

import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

const BlueTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const weekOptions = [
  { value: "Weekdays", label: "Weekdays" },
  { value: "Weekend", label: "Weekend" },
];

const foodPlanOptions = [
  { value: "EP", label: "EP" },
  { value: "CP", label: "CP" },
  { value: "MAP", label: "MAP" },
  { value: "AP", label: "AP" },
];

const emptyEntry = { category: "", double_occupancyy: "", extra_person: "" };

const SOUPackageMealPlanInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_id: "",
    week: "", // Keep week field, let it be empty if not selected
    food_plans: "",
    data: [{ ...emptyEntry }],
  });

  const [packageOptions, setPackageOptions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [entryErrors, setEntryErrors] = useState([{}]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleEntryChange = (idx, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      data: prev.data.map((entry, i) =>
        i === idx ? { ...entry, [name]: value } : entry
      ),
    }));
    setEntryErrors((prev) =>
      prev.map((err, i) => (i === idx ? { ...err, [name]: false } : err))
    );
  };

  // Add new entry
  const handleAddEntry = () => {
    setFormData((prev) => ({
      ...prev,
      data: [...prev.data, { ...emptyEntry }],
    }));
    setEntryErrors((prev) => [...prev, {}]);
  };

  // Remove entry
  const handleRemoveEntry = (idx) => {
    setFormData((prev) => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== idx),
    }));
    setEntryErrors((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only validate data array, not week
    const newEntryErrors = formData.data.map((entry) => ({
      category: entry.category.trim() === "",
      double_occupancyy: entry.double_occupancyy === "",
      extra_person: entry.extra_person === "",
    }));

    setEntryErrors(newEntryErrors);

    if (newEntryErrors.some((err) => Object.values(err).some(Boolean))) return;

    try {
      const data = {
        sou_package_id: formData.sou_package_id,
        week: formData.week, // this can be empty string!
        food_plans: formData.food_plans,
        data: formData.data,
      };

      const res = await axios.post(`${BE_URL}/souPackageMealPlan`, data);

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_id: "",
          week: "",
          food_plans: "",
          data: [{ ...emptyEntry }],
        });
        setEntryErrors([{}]);
        setTimeout(() => setSuccess(false), 2500);
      } else {
        alert("Insert failed");
      }
    } catch (error) {
      console.error("Insert error:", error);
      alert("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/sou-package-meal-plan");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Package Meal Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Selector */}
          <div>
            <BlueTextField
              select
              label="Select Package"
              name="sou_package_id"
              value={formData.sou_package_id}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {packageOptions.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.sou_package_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Week Selector (NOT required!) */}
          <div>
            <BlueTextField
              select
              label="Week"
              name="week"
              value={formData.week}
              onChange={handleInputChange}
              fullWidth
              // DO NOT add required here!
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {weekOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Food Plans Selector */}
          <div>
            <BlueTextField
              select
              label="Food Plans"
              name="food_plans"
              value={formData.food_plans}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {foodPlanOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Dynamic Data Section */}
          <div>
            <div className="flex items-center mb-2">
              <span className="font-semibold text-blue-700">
                Meal Plan Details
              </span>
              <button
                type="button"
                onClick={handleAddEntry}
                className="ml-2 text-blue-600 hover:text-blue-900"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaPlusCircle size={24} />
              </button>
            </div>
            {formData.data.map((entry, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-end gap-4 mb-4 border-b pb-4 relative"
              >
                <BlueTextField
                  label="Category"
                  name="category"
                  value={entry.category}
                  onChange={(e) => handleEntryChange(idx, e)}
                  fullWidth
                  required
                  error={entryErrors[idx]?.category}
                  helperText={
                    entryErrors[idx]?.category ? "Please enter a category" : ""
                  }
                />
                <BlueTextField
                  label="Double Occupancy"
                  name="double_occupancyy"
                  type="number"
                  value={entry.double_occupancyy}
                  onChange={(e) => handleEntryChange(idx, e)}
                  fullWidth
                  required
                  error={entryErrors[idx]?.double_occupancyy}
                  helperText={
                    entryErrors[idx]?.double_occupancyy
                      ? "Please enter double occupancy"
                      : ""
                  }
                  inputProps={{ min: 0 }}
                />
                <BlueTextField
                  label="Extra Person"
                  name="extra_person"
                  type="number"
                  value={entry.extra_person}
                  onChange={(e) => handleEntryChange(idx, e)}
                  fullWidth
                  required
                  error={entryErrors[idx]?.extra_person}
                  helperText={
                    entryErrors[idx]?.extra_person
                      ? "Please enter extra person"
                      : ""
                  }
                  inputProps={{ min: 0 }}
                />
                {formData.data.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEntry(idx)}
                    className="text-red-600 hover:text-red-900"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "center",
                    }}
                  >
                    <FaTimesCircle size={24} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
      {success && <SubmitData />}
    </div>
  );
};

export default SOUPackageMealPlanInsert;
