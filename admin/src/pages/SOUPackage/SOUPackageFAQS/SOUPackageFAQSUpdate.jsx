import React, { useState, useEffect } from "react";
import { TextField, MenuItem, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";
import { FaPlus, FaTrash } from "react-icons/fa";

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

const SOUPackageFAQSUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const faqData = location.state?.faqData;

  const [formData, setFormData] = useState({
    sou_package_id: "",
    faqs: [{ question: "", answer: "", id: "" }],
  });
  const [packageOptions, setPackageOptions] = useState([]);
  const [errors, setErrors] = useState({
    sou_package_id: false,
    faqs: false,
  });
  const [success, setSuccess] = useState(false);

  // Fetch package options and FAQ data on mount
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        if (res.data?.data) setPackageOptions(res.data.data);
      })
      .catch((err) => {
        console.error("Package fetch failed:", err);
      });

    if (faqData) {
      setFormData({
        sou_package_id: faqData.sou_package_id,
        faqs: [
          {
            question: faqData.question || "",
            answer: faqData.answer || "",
            id: faqData.id,
          },
        ],
      });
    } else {
      navigate("/sou-package-faqs");
    }
  }, [faqData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // FAQS Handlers
  const handleFaqChange = (idx, field, value) => {
    setFormData((prev) => {
      const updated = prev.faqs.map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      );
      return { ...prev, faqs: updated };
    });
    setErrors((prev) => ({ ...prev, faqs: false }));
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "", id: "" }],
    }));
  };

  const handleRemoveFaq = (idx) => {
    setFormData((prev) => ({
      ...prev,
      faqs:
        prev.faqs.length > 1
          ? prev.faqs.filter((_, i) => i !== idx)
          : prev.faqs,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const faqsValid =
      formData.faqs.length > 0 &&
      formData.faqs.every(
        (item) => item.question.trim() !== "" && item.answer.trim() !== ""
      );

    const newErrors = {
      sou_package_id: formData.sou_package_id === "",
      faqs: !faqsValid,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      // Update each FAQ (if your backend supports batch, otherwise update one by one)
      for (let faq of formData.faqs) {
        await axios.put(`${BE_URL}/souPackageFaqs/${faq.id || faqData.id}`, {
          sou_package_id: formData.sou_package_id,
          question: faq.question,
          answer: faq.answer,
        });
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      navigate("/sou-package-faqs");
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/sou-package-faqs");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update SOU Package FAQS
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
              error={errors.sou_package_id}
              helperText={
                errors.sou_package_id ? "Please select a package" : ""
              }
            >
              {packageOptions.map((pkg) => (
                <MenuItem key={pkg.id} value={pkg.id}>
                  {pkg.sou_package_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* FAQS List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              FAQS <span className="text-red-500">*</span>
            </label>
            {formData.faqs.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 mb-4 border p-3 rounded-md bg-blue-50 relative"
              >
                <div className="flex items-center gap-2">
                  <BlueTextField
                    label={`Question ${idx + 1}`}
                    value={item.question}
                    onChange={(e) =>
                      handleFaqChange(idx, "question", e.target.value)
                    }
                    fullWidth
                    required
                    error={errors.faqs && item.question.trim() === ""}
                    helperText={
                      errors.faqs && item.question.trim() === ""
                        ? "Please enter question"
                        : ""
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <BlueTextField
                    label={`Answer ${idx + 1}`}
                    value={item.answer}
                    onChange={(e) =>
                      handleFaqChange(idx, "answer", e.target.value)
                    }
                    fullWidth
                    required
                    error={errors.faqs && item.answer.trim() === ""}
                    helperText={
                      errors.faqs && item.answer.trim() === ""
                        ? "Please enter answer"
                        : ""
                    }
                  />
                  <IconButton
                    aria-label="Remove faq"
                    disabled={formData.faqs.length === 1}
                    onClick={() => handleRemoveFaq(idx)}
                    size="small"
                  >
                    <FaTrash />
                  </IconButton>
                  {idx === formData.faqs.length - 1 && (
                    <IconButton
                      aria-label="Add faq"
                      color="primary"
                      onClick={handleAddFaq}
                      size="small"
                    >
                      <FaPlus />
                    </IconButton>
                  )}
                </div>
              </div>
            ))}
            {errors.faqs && typeof errors.faqs === "boolean" && (
              <p className="text-red-600 text-xs mt-1">
                Please add at least one FAQ and ensure all questions and answers
                are filled
              </p>
            )}
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

export default SOUPackageFAQSUpdate;
