import React, { useState, useEffect } from "react";
import { TextField, MenuItem, IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
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

const SOUTicketTourPackageUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tourPackageData = location.state?.tourPackageData;

  const [formData, setFormData] = useState({
    sou_package_id: "",
    nights: "",
    days: "",
    adult_price: "",
    child_price: "",
    caution: "",
    id: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [packageOptions, setPackageOptions] = useState([]);

  // FAQs State as array of { question, answer }
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [errors, setErrors] = useState({
    sou_package_id: false,
    nights: false,
    days: false,
    adult_price: false,
    child_price: false,
    image: false,
    faqs: false,
  });
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

    if (tourPackageData) {
      setFormData({
        sou_package_id: tourPackageData.sou_package_id || "",
        nights: tourPackageData.nights || "",
        days: tourPackageData.days || "",
        adult_price: tourPackageData.adult_price || "",
        child_price: tourPackageData.child_price || "",
        caution: tourPackageData.caution || "",
        id: tourPackageData.id,
      });

      setPreviewUrl(
        tourPackageData.image
          ? `${BE_URL}/Images/SouTicket/SouTicketTourPackageImages/${tourPackageData.image}`
          : ""
      );

      // Initialize FAQs
      let parsedFaqs = [];
      if (Array.isArray(tourPackageData.faqs)) {
        parsedFaqs = tourPackageData.faqs;
      } else if (
        typeof tourPackageData.faqs === "string" &&
        tourPackageData.faqs.trim() !== ""
      ) {
        try {
          parsedFaqs = JSON.parse(tourPackageData.faqs);
        } catch {
          parsedFaqs = [];
        }
      }
      // Normalize to { question, answer }
      parsedFaqs = parsedFaqs.map((faq) => ({
        question: faq.question || faq.q || "",
        answer: faq.answer || faq.a || "",
      }));
      setFaqs(
        parsedFaqs.length > 0 ? parsedFaqs : [{ question: "", answer: "" }]
      );
    } else {
      navigate("/sou-ticket-tour-package");
    }
  }, [tourPackageData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  // FAQ handlers
  const handleFaqChange = (idx, field, value) => {
    setFaqs((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
    setErrors((prev) => ({ ...prev, faqs: false }));
  };

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (idx) => {
    setFaqs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate FAQs (at least one, all filled)
    const faqsValid =
      faqs.length > 0 &&
      faqs.every((faq) => faq.question.trim() && faq.answer.trim());

    const newErrors = {
      sou_package_id: formData.sou_package_id === "",
      nights: formData.nights === "",
      days: formData.days === "",
      adult_price: formData.adult_price === "",
      child_price: formData.child_price === "",
      image: !image && !previewUrl,
      faqs: !faqsValid,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) return;

    try {
      const data = new FormData();
      data.append("sou_package_id", formData.sou_package_id);
      data.append("nights", formData.nights);
      data.append("days", formData.days);
      data.append("adult_price", formData.adult_price);
      data.append("child_price", formData.child_price);
      data.append("caution", formData.caution);
      data.append("existingImage", previewUrl?.split("/").pop() || "");
      data.append("faqs", JSON.stringify(faqs));

      if (image) data.append("image", image);

      const res = await axios.put(
        `${BE_URL}/souTicketTourPackage/${formData.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/sou-ticket-tour-package");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sou-ticket-tour-package");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update SOU Ticket Tour Package
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
            helperText={errors.nights ? "Please enter nights" : ""}
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
            helperText={errors.days ? "Please enter days" : ""}
          />

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
          />

          {/* Caution (optional) */}
          <BlueTextField
            label="Caution (optional)"
            name="caution"
            value={formData.caution}
            onChange={handleInputChange}
            fullWidth
            multiline
            minRows={2}
          />

          {/* Image Upload (Required if not set) */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-2 max-w-xs border rounded"
              />
            )}
            {errors.image && (
              <p className="text-red-600 text-xs mt-1">
                Please select an image
              </p>
            )}
          </div>

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
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default SOUTicketTourPackageUpdate;
