import React, { useState } from "react";
import { TextField } from "@mui/material";
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

const SOUTicketInsideEventPriceInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    adult_price: "",
    child_price: "",
    caution: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: formData.title.trim() === "",
      adult_price: formData.adult_price === "",
      child_price: formData.child_price === "",
      image: !formData.image,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("adult_price", formData.adult_price);
      data.append("child_price", formData.child_price);
      data.append("caution", formData.caution);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(
        `${BE_URL}/souTicketInsideEventPrice`,
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
          title: "",
          adult_price: "",
          child_price: "",
          caution: "",
          image: null,
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
    navigate("/sou-ticket-inside-event-price");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Ticket Inside Event Price
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div>
            <BlueTextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.title}
              helperText={errors.title ? "Please enter a title" : ""}
            />
          </div>

          {/* Adult Price */}
          <div>
            <BlueTextField
              label="Adult Price"
              name="adult_price"
              type="number"
              value={formData.adult_price}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.adult_price}
              helperText={errors.adult_price ? "Please enter adult price" : ""}
              inputProps={{ min: 0, step: "0.01" }}
            />
          </div>

          {/* Child Price */}
          <div>
            <BlueTextField
              label="Child Price"
              name="child_price"
              type="number"
              value={formData.child_price}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.child_price}
              helperText={errors.child_price ? "Please enter child price" : ""}
              inputProps={{ min: 0, step: "0.01" }}
            />
          </div>

          {/* Caution (Optional) */}
          <div>
            <BlueTextField
              label="Caution (optional)"
              name="caution"
              value={formData.caution}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
            />
          </div>

          {/* Image Upload (Required) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
            />
            {errors.image && (
              <p className="text-red-600 text-xs mt-1">
                Please select an image
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

export default SOUTicketInsideEventPriceInsert;
