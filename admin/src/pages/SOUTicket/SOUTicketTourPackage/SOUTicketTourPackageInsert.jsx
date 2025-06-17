import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Add from "../../../components/Buttons/Add";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import { FaPlus, FaTimes } from "react-icons/fa";

const BlueTextField = styled(TextField)({
  marginBottom:"1.8rem",
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const SOUTicketTourPackageInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_id: "",
    nights: "",
    days: "",
    image: null,
    adult_price: "",
    child_price: "",
    caution: "",
  });

  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [packageOptions, setPackageOptions] = useState([]);
  const [errors, setErrors] = useState({});
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

  const handleFaqChange = (index, field, value) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    if (faqs.length > 1) {
      setFaqs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      sou_package_id: formData.sou_package_id === "",
      nights: formData.nights === "",
      days: formData.days === "",
      image: !formData.image,
      adult_price: formData.adult_price === "",
      child_price: formData.child_price === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    // Validate at least one FAQ
    if (
      faqs.length < 1 ||
      faqs.some((faq) => !faq.question.trim() || !faq.answer.trim())
    ) {
      setErrors((prev) => ({ ...prev, faqs: true }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, faqs: false }));
    }

    try {
      const data = new FormData();
      data.append("sou_package_id", formData.sou_package_id);
      data.append("nights", formData.nights);
      data.append("days", formData.days);
      data.append("adult_price", formData.adult_price);
      data.append("child_price", formData.child_price);
      data.append("caution", formData.caution);
      data.append("faqs", JSON.stringify(faqs));
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(`${BE_URL}/souTicketTourPackage`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_id: "",
          nights: "",
          days: "",
          image: null,
          adult_price: "",
          child_price: "",
          caution: "",
        });
        setFaqs([{ question: "", answer: "" }]);
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
    navigate("/sou-ticket-tour-package");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Ticket Tour Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Selector */}
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

          {/* Nights */}
          <BlueTextField
            label="Nights"
            name="nights"
            type="number"
            value={formData.nights}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.nights}
            helperText={errors.nights ? "Please enter number of nights" : ""}
            inputProps={{ min: 0 }}
          />

          {/* Days */}
          <BlueTextField
            label="Days"
            name="days"
            type="number"
            value={formData.days}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.days}
            helperText={errors.days ? "Please enter number of days" : ""}
            inputProps={{ min: 0 }}
          />

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

          {/* Adult Price */}
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

          {/* Child Price */}
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

          {/* Caution (Optional) */}
          <BlueTextField
            label="Caution (optional)"
            name="caution"
            value={formData.caution}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
          />

          {/* FAQs */}
          <div>
            <div className="flex items-center mb-2">
              <span className="font-semibold text-gray-700 mr-2">
                FAQs <span className="text-red-500">*</span>
              </span>
              <IconButton
                color="primary"
                onClick={handleAddFaq}
                size="small"
                aria-label="Add FAQ"
              >
                <FaPlus />
              </IconButton>
            </div>
            {faqs.map((faq, idx) => (
              <Box
                key={idx}
                className="mb-4 flex flex-col md:flex-row gap-2 items-start md:items-center"
              >
                <BlueTextField
                  label="Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(idx, "question", e.target.value)
                  }
                  required
                  fullWidth
                  error={errors.faqs && !faq.question.trim()}
                  helperText={
                    errors.faqs && !faq.question.trim()
                      ? "Please enter a question"
                      : ""
                  }
                />
                <BlueTextField
                  label="Answer"
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(idx, "answer", e.target.value)
                  }
                  required
                  fullWidth
                  error={errors.faqs && !faq.answer.trim()}
                  helperText={
                    errors.faqs && !faq.answer.trim()
                      ? "Please enter an answer"
                      : ""
                  }
                />
                {faqs.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveFaq(idx)}
                    size="small"
                    aria-label="Remove FAQ"
                  >
                    <FaTimes />
                  </IconButton>
                )}
              </Box>
            ))}
            {errors.faqs && (
              <p className="text-red-600 text-xs mt-1">
                Please fill all FAQ question and answer fields (minimum 1
                required)
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

export default SOUTicketTourPackageInsert;
