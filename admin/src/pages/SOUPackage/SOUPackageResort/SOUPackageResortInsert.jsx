import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
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
  { value: "", label: "Select Week" },
  { value: "Weekday", label: "Weekday" },
  { value: "Weekend", label: "Weekend" },
];

const foodPlanOptions = [
  { value: "", label: "Select Food Plan" },
  { value: "EP", label: "EP" },
  { value: "CP", label: "CP" },
  { value: "MAP", label: "MAP" },
  { value: "AP", label: "AP" },
];

const SOUPackageResortInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_id: "",
    image: null,
    type_room_name: "",
    week: "",
    food_plans: "",
    per_couple: "",
  });

  const [packageOptions, setPackageOptions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    sou_package_id: false,
    image: false,
    per_couple: false,
  });

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

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    setErrors((prev) => ({ ...prev, image: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Select Package, Image, Per Couple (Price) required
    const newErrors = {
      sou_package_id: formData.sou_package_id === "",
      image: !formData.image,
      per_couple: formData.per_couple === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = new FormData();
      data.append("sou_package_id", formData.sou_package_id);
      data.append("image", formData.image);
      data.append("type_room_name", formData.type_room_name);
      data.append("week", formData.week);
      data.append("food_plans", formData.food_plans);
      data.append("per_couple", formData.per_couple);

      const res = await axios.post(`${BE_URL}/souPackageResort`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_id: "",
          image: null,
          type_room_name: "",
          week: "",
          food_plans: "",
          per_couple: "",
        });
        setTimeout(() => setSuccess(false), 2500);
      }
    } catch (error) {
      console.error("Insert error:", error);
    }
  };

  const handleCancel = () => {
    navigate("/sou-package-resort");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Package Resort
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
              error={errors.sou_package_id}
              helperText={
                errors.sou_package_id ? "Please select a package" : ""
              }
              fullWidth
              required
            >
              <MenuItem value="">Select Package</MenuItem>
              {packageOptions.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.sou_package_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select One Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {errors.image && (
              <p className="text-red-600 text-xs mt-1">
                Please select an image
              </p>
            )}
          </div>

          {/* Type Room Name */}
          <div>
            <BlueTextField
              label="Type Room Name"
              name="type_room_name"
              value={formData.type_room_name}
              onChange={handleInputChange}
              fullWidth
            />
          </div>

          {/* Week Selector */}
          <div>
            <BlueTextField
              select
              label="Week"
              name="week"
              value={formData.week}
              onChange={handleInputChange}
              fullWidth
            >
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
            >
              {foodPlanOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Per Couple */}
          <div>
            <BlueTextField
              label="Per Couple (Price)"
              name="per_couple"
              type="number"
              value={formData.per_couple}
              onChange={handleInputChange}
              error={errors.per_couple}
              helperText={
                errors.per_couple ? "Please enter price per couple" : ""
              }
              fullWidth
              required
            />
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

export default SOUPackageResortInsert;
