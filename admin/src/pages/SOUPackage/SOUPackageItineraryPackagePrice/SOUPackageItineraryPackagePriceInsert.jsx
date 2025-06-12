// import React from 'react'

// const SOUPackageItineraryPackagePriceInsert = () => {
//   return (
//     <div>
//       SOUPackageItineraryPackagePrice Insert
//     </div>
//   )
// }

// export default SOUPackageItineraryPackagePriceInsert

/** */

import React, { useState, useEffect } from "react";
import { TextField, MenuItem, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
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

const staticOtherPriceNames = ["Tuesday to Saturday", "Sunday and Monday"];

const defaultOtherPrice = () => ({
  label: staticOtherPriceNames[0],
  premium: "",
  royal: "",
});

const SOUPackageItineraryPackagePriceInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_itinerary_id: "",
    image: null,
    package_start_price: "",
  });

  const [packageOptions, setPackageOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Array of { label, premium, royal }
  const [otherPrices, setOtherPrices] = useState([defaultOtherPrice()]);

  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageItineraryName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Itinerary fetch failed:", err));
  }, []);

  // Handle input for main form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // Handle other price change
  const handleOtherPriceChange = (idx, key, value) => {
    setOtherPrices((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row))
    );
  };

  // Handle add other price row
  const handleAddOtherPrice = () => {
    setOtherPrices((prev) => [...prev, defaultOtherPrice()]);
  };

  // Handle remove other price row
  const handleRemoveOtherPrice = (idx) => {
    setOtherPrices((prev) => prev.filter((_, i) => i !== idx));
  };

  // Handle image
  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    setErrors((prev) => ({ ...prev, image: false }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      sou_package_itinerary_id: formData.sou_package_itinerary_id === "",
      image: !formData.image,
      package_start_price: formData.package_start_price === "",
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
      data.append("image", formData.image);
      data.append("package_start_price", formData.package_start_price);
      data.append("other_price", JSON.stringify(otherPrices));

      const res = await axios.post(
        `${BE_URL}/souPackageItineraryPackagePrice`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_itinerary_id: "",
          image: null,
          package_start_price: "",
        });
        setOtherPrices([defaultOtherPrice()]);
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
    navigate("/sou-package-itinerary-price");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Package Itinerary Package Price
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
              {packageOptions.map((pkg) => (
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
              required
              onChange={handleImageChange}
            />
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
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <SubmitData />}
    </div>
  );
};

export default SOUPackageItineraryPackagePriceInsert;
