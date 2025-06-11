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

const SOUPackageHeroSectionUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const heroSectionData = location.state?.heroSectionData;

  const [formData, setFormData] = useState({
    sou_package_id: "",
    heading: "",
    description: "",
    id: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [packageOptions, setPackageOptions] = useState([]);
  const [errors, setErrors] = useState({
    sou_package_id: false,
    heading: false,
    description: false,
    image: false,
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

    if (heroSectionData) {
      setFormData({
        sou_package_id: heroSectionData.sou_package_id,
        heading: heroSectionData.heading || "",
        description: heroSectionData.description || "",
        id: heroSectionData.id,
      });
      setPreviewUrl(
        heroSectionData.image
          ? `${BE_URL}/Images/SouPackage/SouPackageHeroSection/${heroSectionData.image}`
          : ""
      );
    } else {
      navigate("/sou-package-hero-section");
    }
  }, [heroSectionData, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      sou_package_id: formData.sou_package_id === "",
      heading: formData.heading.trim() === "",
      description: formData.description.trim() === "",
      image: !image && !previewUrl, // image required if not set
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) return;

    try {
      const data = new FormData();
      data.append("sou_package_id", formData.sou_package_id);
      data.append("heading", formData.heading);
      data.append("description", formData.description);
      data.append("existingImage", previewUrl?.split("/").pop() || "");
      if (image) data.append("image", image);

      const res = await axios.put(
        `${BE_URL}/souPackageHeroSection/${formData.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/sou-package-hero-section");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sou-package-hero-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update SOU Package Hero Section
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

          {/* Heading (required) */}
          <BlueTextField
            label="Heading"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.heading}
            helperText={errors.heading ? "Please enter a heading" : ""}
          />

          {/* Description (required) */}
          <BlueTextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            required
            multiline
            minRows={3}
            error={errors.description}
            helperText={errors.description ? "Please enter a description" : ""}
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
                className="mt-2 max-w-xs border w-35 h-35 rounded"
              />
            )}
            {errors.image && (
              <p className="text-red-600 text-xs mt-1">
                Please select an image
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

export default SOUPackageHeroSectionUpdate;
