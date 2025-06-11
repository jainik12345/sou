import React, { useState, useEffect } from "react";
import { TextField, MenuItem, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import { FaPlus, FaTrash } from "react-icons/fa";

const BlueTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const SOUPackageItinerarySectionInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_itinerary_id: "",
    heading: "",
    evenst: [{ value: "" }],
  });

  const [itineraryOptions, setItineraryOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageItineraryName`)
      .then((res) => setItineraryOptions(res.data.data))
      .catch((err) => console.error("Itinerary fetch failed:", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleEvenstChange = (idx, value) => {
    setFormData((prev) => {
      const updated = prev.evenst.map((item, i) =>
        i === idx ? { value } : item
      );
      return { ...prev, evenst: updated };
    });
    setErrors((prev) => ({ ...prev, evenst: false }));
  };

  const handleAddEvenst = () => {
    setFormData((prev) => ({
      ...prev,
      evenst: [...prev.evenst, { value: "" }],
    }));
  };

  const handleRemoveEvenst = (idx) => {
    setFormData((prev) => ({
      ...prev,
      evenst:
        prev.evenst.length > 1
          ? prev.evenst.filter((_, i) => i !== idx)
          : prev.evenst,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const evenstValid =
      formData.evenst.length > 0 &&
      formData.evenst.every((item) => item.value.trim() !== "");

    const newErrors = {
      sou_package_itinerary_id: formData.sou_package_itinerary_id === "",
      heading: formData.heading.trim() === "",
      evenst: !evenstValid,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = {
        sou_package_itinerary_id: formData.sou_package_itinerary_id,
        heading: formData.heading,
        evenst: JSON.stringify(formData.evenst.map((item) => item.value)),
      };

      const res = await axios.post(
        `${BE_URL}/souPackageItinerarySection`,
        data
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_itinerary_id: "",
          heading: "",
          evenst: [{ value: "" }],
        });
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
    navigate("/sou-package-itinerary-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Package Itinerary Section
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Itinerary Selector */}
          <div>
            <BlueTextField
              select
              label="Select Itinerary Name"
              name="sou_package_itinerary_id"
              value={formData.sou_package_itinerary_id}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.sou_package_itinerary_id}
              helperText={
                errors.sou_package_itinerary_id
                  ? "Please select an itinerary name"
                  : ""
              }
            >
              {itineraryOptions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.sou_package_itinerary_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Heading Input (Required) */}
          <div>
            <BlueTextField
              label="Heading"
              name="heading"
              value={formData.heading}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.heading}
              helperText={errors.heading ? "Please enter heading" : ""}
            />
          </div>

          {/* Evenst List (Minimum 1, Dynamic) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Events <span className="text-red-500">*</span>
            </label>
            {formData.evenst.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <BlueTextField
                  label={`Event ${idx + 1}`}
                  value={item.value}
                  onChange={(e) => handleEvenstChange(idx, e.target.value)}
                  fullWidth
                  required
                  error={errors.evenst && item.value.trim() === ""}
                  helperText={
                    errors.evenst && item.value.trim() === ""
                      ? "Please enter event"
                      : ""
                  }
                />
                <IconButton
                  aria-label="Remove event"
                  disabled={formData.evenst.length === 1}
                  onClick={() => handleRemoveEvenst(idx)}
                  size="small"
                >
                  <FaTrash />
                </IconButton>
                {idx === formData.evenst.length - 1 && (
                  <IconButton
                    aria-label="Add event"
                    color="primary"
                    onClick={handleAddEvenst}
                    size="small"
                  >
                    <FaPlus />
                  </IconButton>
                )}
              </div>
            ))}
            {errors.evenst && typeof errors.evenst === "boolean" && (
              <p className="text-red-600 text-xs mt-1">
                Please add at least one event and ensure none are empty
              </p>
            )}
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

export default SOUPackageItinerarySectionInsert;
