import React, { useState, useEffect } from "react";
import { TextField, MenuItem, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import { FaPlus, FaTimes } from "react-icons/fa";
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

const BlogDataDetailsInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blog_category_id: "",
    title: "",
    image: null,
    date: "",
    description: "",
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // For dynamic JSON fields (heading, content)
  const [jsonFields, setJsonFields] = useState([{ heading: "", content: "" }]);

  // Fetch blog categories
  useEffect(() => {
    axios
      .get(`${BE_URL}/blogCategoryName`)
      .then((res) => setCategoryOptions(res.data.data))
      .catch((err) => console.error("Category fetch failed:", err));
  }, []);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // Handle JSON fields change
  const handleJsonFieldChange = (index, field, value) => {
    const updatedFields = [...jsonFields];
    updatedFields[index][field] = value;
    setJsonFields(updatedFields);
  };

  // Add new heading/content field
  const addJsonField = () => {
    setJsonFields([...jsonFields, { heading: "", content: "" }]);
  };

  // Remove a heading/content field
  const removeJsonField = (index) => {
    const updatedFields = [...jsonFields];
    updatedFields.splice(index, 1);
    setJsonFields(updatedFields);
  };

  // Format date as "May 15, 2025"
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      blog_category_id: formData.blog_category_id === "",
      image: !formData.image,
      title: formData.title.trim() === "",
      date: formData.date === "",
      description: formData.description.trim() === "",
      // Require at least one heading-content with non-empty heading
      json:
        jsonFields.length === 0 || jsonFields.some((f) => !f.heading.trim()),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = new FormData();
      data.append("blog_category_id", formData.blog_category_id);
      data.append("title", formData.title.trim());
      data.append("date", formData.date);
      data.append("description", formData.description.trim());
      data.append("data", JSON.stringify(jsonFields));
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(`${BE_URL}/blogDataDetails`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          blog_category_id: "",
          title: "",
          image: null,
          date: "",
          description: "",
        });
        setJsonFields([{ heading: "", content: "" }]);
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
    navigate("/blog-data-details");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Blog Data Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selector */}
          <div>
            <BlueTextField
              select
              label="Select Blog Category"
              name="blog_category_id"
              value={formData.blog_category_id}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.blog_category_id}
              helperText={
                errors.blog_category_id ? "Please select a category" : ""
              }
            >
              {categoryOptions.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.blog_category_name}
                </MenuItem>
              ))}
            </BlueTextField>
          </div>

          {/* Title */}
          <div>
            <BlueTextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              error={errors.title}
              helperText={errors.title ? "Title is required" : ""}
            />
          </div>

          {/* Date */}
          <div>
            <BlueTextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              error={errors.date}
              helperText={
                errors.date
                  ? "Date is required"
                  : formData.date
                  ? "Selected: " + formatDateDisplay(formData.date)
                  : ""
              }
            />
          </div>

          {/* Description */}
          <div>
            <BlueTextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              minRows={3}
              required
              error={errors.description}
              helperText={errors.description ? "Description is required" : ""}
            />
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
            />
            {errors.image && (
              <p className="text-red-600 text-xs mt-1">
                Please select an image
              </p>
            )}
          </div>

          {/* Dynamic Heading/Content (JSON) */}
          <div>
            <label className="block text-blue-700 font-semibold mb-2">
              Details (Heading & Content)
            </label>
            {jsonFields.map((field, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-3">
                <BlueTextField
                  label="Heading"
                  value={field.heading}
                  onChange={(e) =>
                    handleJsonFieldChange(idx, "heading", e.target.value)
                  }
                  required
                  error={errors.json && !field.heading.trim()}
                  helperText={
                    errors.json && !field.heading.trim()
                      ? "Heading required"
                      : ""
                  }
                  sx={{ minWidth: 180 }}
                />
                <BlueTextField
                  label="Content"
                  value={field.content}
                  onChange={(e) =>
                    handleJsonFieldChange(idx, "content", e.target.value)
                  }
                  sx={{ flex: 1 }}
                  multiline
                  minRows={1}
                />
                <Tooltip title="Remove">
                  <IconButton
                    color="error"
                    onClick={() => removeJsonField(idx)}
                    disabled={jsonFields.length === 1}
                  >
                    <FaTimes />
                  </IconButton>
                </Tooltip>
                {idx === jsonFields.length - 1 && (
                  <Tooltip title="Add More">
                    <IconButton color="primary" onClick={addJsonField}>
                      <FaPlus />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            ))}
            {errors.json && (
              <span className="text-red-600 text-xs">
                At least one valid heading is required.
              </span>
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

export default BlogDataDetailsInsert;
