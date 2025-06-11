import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
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

const BlogDataDetailsUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blogDataDetails = location.state?.blogDataDetails;

  const [formData, setFormData] = useState({
    blog_category_id: "",
    title: "",
    date: "",
    description: "",
    id: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [errors, setErrors] = useState({
    blog_category_id: false,
    image: false,
    title: false,
    date: false,
    description: false,
  });
  const [success, setSuccess] = useState(false);

  // For dynamic JSON fields (heading/content group)
  const [jsonFields, setJsonFields] = useState([{ heading: "", content: "" }]);

  useEffect(() => {
    axios
      .get(`${BE_URL}/blogCategoryName`)
      .then((res) => {
        if (res.data?.data) setCategoryOptions(res.data.data);
      })
      .catch((err) => {
        console.error("Category fetch failed:", err);
      });

    if (blogDataDetails) {
      setFormData({
        blog_category_id: blogDataDetails.blog_category_id,
        title: blogDataDetails.title || "",
        date: blogDataDetails.date || "",
        description: blogDataDetails.description || "",
        id: blogDataDetails.id,
      });
      setPreviewUrl(
        blogDataDetails.image
          ? `${BE_URL}/Images/Blog/BlogDataDetailsImages/${blogDataDetails.image}`
          : ""
      );
      // Parse JSON fields for heading/content
      if (blogDataDetails.data) {
        let parsed = [];
        try {
          parsed =
            typeof blogDataDetails.data === "string"
              ? JSON.parse(blogDataDetails.data)
              : blogDataDetails.data;
          if (!Array.isArray(parsed)) parsed = [];
        } catch {
          parsed = [];
        }
        setJsonFields(parsed.length ? parsed : [{ heading: "", content: "" }]);
      }
    } else {
      navigate("/blog-data-details");
    }
  }, [blogDataDetails, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      blog_category_id: formData.blog_category_id === "",
      image: !image && !previewUrl,
      title: formData.title.trim() === "",
      date: formData.date === "",
      description: formData.description.trim() === "",
      json:
        jsonFields.length === 0 || jsonFields.some((f) => !f.heading.trim()),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) return;

    try {
      const data = new FormData();
      data.append("blog_category_id", formData.blog_category_id);
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("description", formData.description);
      data.append("data", JSON.stringify(jsonFields));
      data.append("existingImage", previewUrl?.split("/").pop() || "");
      if (image) data.append("image", image);

      const res = await axios.put(
        `${BE_URL}/blogDataDetails/${formData.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/blog-data-details");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/blog-data-details");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Blog Data Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selector */}
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

          {/* Title */}
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

          {/* Date */}
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
                ? "Selected: " +
                  new Date(formData.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""
            }
          />

          {/* Description */}
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

          {/* Dynamic Heading/Content (JSON) */}
          <div>
            <label className="block text-blue-700 font-semibold mb-5">
              Details - Heading & Content
            </label>
            {jsonFields.map((field, idx) => (
              <div
                key={idx}
                className="mb-10 border border-blue-200 rounded-lg p-2"
              >
                {/* Heading Row */}
                <div className="flex items-center gap-2 mb-4">
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
                    sx={{ flex: 1 }}
                  />
                  <span>
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => removeJsonField(idx)}
                      disabled={jsonFields.length === 1}
                      style={{
                        background: "none",
                        border: "none",
                        cursor:
                          jsonFields.length === 1 ? "not-allowed" : "pointer",
                        fontSize: "1.25rem",
                        lineHeight: 1,
                      }}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </span>
                </div>
                {/* Content Row with ONLY 1 Scrollbar */}
                <div className="flex items-center gap-2">
                  <TextField
                    label="Content"
                    value={field.content}
                    onChange={(e) =>
                      handleJsonFieldChange(idx, "content", e.target.value)
                    }
                    multiline
                    minRows={4}
                    maxRows={8}
                    fullWidth
                    InputProps={{
                      style: {
                        maxHeight: 120,
                        overflowY: "auto",
                      },
                    }}
                  />
                  {/* Add button (only after last content) */}
                  {idx === jsonFields.length - 1 && (
                    <button
                      type="button"
                      className="text-blue-600"
                      onClick={addJsonField}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                        lineHeight: 1,
                      }}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  )}
                </div>
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
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {success && <UpdateData />}
    </div>
  );
};

export default BlogDataDetailsUpdate;
