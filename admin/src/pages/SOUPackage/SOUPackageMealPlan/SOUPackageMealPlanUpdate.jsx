import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";

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

const SOUPackageMealPlanUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mealPlanData = location.state?.mealPlanData;

  const [formData, setFormData] = useState({
    sou_package_id: "",
    week: "",
    food_plans: "",
    id: "",
    data: [{ ...emptyEntry }],
  });
  const [packageOptions, setPackageOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [entryErrors, setEntryErrors] = useState([{}]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        if (res.data?.data) setPackageOptions(res.data.data);
      })
      .catch((err) => {
        console.error("Package fetch failed:", err);
      });

    if (mealPlanData) {
      let safeData = [];
      if (typeof mealPlanData.data === "string") {
        try {
          safeData = JSON.parse(mealPlanData.data);
        } catch {
          safeData = [{ ...emptyEntry }];
        }
      } else if (Array.isArray(mealPlanData.data)) {
        safeData = mealPlanData.data;
      } else {
        safeData = [{ ...emptyEntry }];
      }

      setFormData({
        sou_package_id: mealPlanData.sou_package_id,
        week: mealPlanData.week || "",
        food_plans: mealPlanData.food_plans || "",
        id: mealPlanData.id,
        data: safeData.length > 0 ? safeData : [{ ...emptyEntry }],
      });
      setEntryErrors(
        safeData.map(() => ({})) // one error object per entry
      );
    } else {
      navigate("/sou-package-meal-plan");
    }
  }, [mealPlanData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // Handle change for data entries (array of category/double_occupancyy/extra_person)
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

    // Validate all data entries
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
        week: formData.week,
        food_plans: formData.food_plans,
        data: formData.data,
      };

      const res = await axios.put(
        `${BE_URL}/souPackageMealPlan/${formData.id}`,
        data
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/sou-package-meal-plan");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sou-package-meal-plan");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update SOU Package Meal Plan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package */}
          <BlueTextField
            select
            label="Select Package"
            name="sou_package_id"
            value={formData.sou_package_id}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.sou_package_id}
            helperText={errors.sou_package_id ? "Please select a package" : ""}
          >
            {packageOptions.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.sou_package_name}
              </MenuItem>
            ))}
          </BlueTextField>

          {/* Week */}
          {/* <BlueTextField
            select
            label="Week"
            name="week"
            value={formData.week}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.week}
            helperText={errors.week ? "Please select week" : ""}
          >
            {weekOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </BlueTextField> */}

          <BlueTextField
            select
            label="Week"
            name="week"
            value={formData.week}
            onChange={handleInputChange}
            fullWidth
            // DO NOT set required or error/helperText for week
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

          {/* Food Plans */}
          <BlueTextField
            select
            label="Food Plans"
            name="food_plans"
            value={formData.food_plans}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.food_plans}
            helperText={errors.food_plans ? "Please select food plan" : ""}
          >
            {foodPlanOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </BlueTextField>

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
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
      {success && <UpdateData />}
    </div>
  );
};

export default SOUPackageMealPlanUpdate;
