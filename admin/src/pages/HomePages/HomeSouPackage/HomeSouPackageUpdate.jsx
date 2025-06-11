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

const HomeSouPackageUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const homeSouPackageData = location.state?.homeSouPackageData;

  const [formData, setFormData] = useState({
    sou_package_id: "",
    accommodation: "",
    package: "",
    location: "",
    id: "",
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [packageOptions, setPackageOptions] = useState([]);
  const [errors, setErrors] = useState({
    sou_package_id: false,
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

    if (homeSouPackageData) {
      setFormData({
        sou_package_id: homeSouPackageData.sou_package_id,
        accommodation: homeSouPackageData.accommodation || "",
        package: homeSouPackageData.package || "",
        location: homeSouPackageData.location || "",
        id: homeSouPackageData.id,
      });
      setPreviewUrl(
        homeSouPackageData.image
          ? `${BE_URL}/Images/HomeImages/HomeSouPackage/${homeSouPackageData.image}`
          : ""
      );
    } else {
      navigate("/home-sou-package");
    }
  }, [homeSouPackageData, navigate]);

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
      image: !image && !previewUrl,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) return;

    try {
      const data = new FormData();
      data.append("sou_package_id", formData.sou_package_id);
      data.append("accommodation", formData.accommodation);
      data.append("package", formData.package);
      data.append("location", formData.location);
      data.append("existingImage", previewUrl?.split("/").pop() || "");
      if (image) data.append("image", image);

      const res = await axios.put(
        `${BE_URL}/homeSouPackage/${formData.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/home-sou-package");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/home-sou-package");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Home SOU Package
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

          {/* Accommodation */}
          <BlueTextField
            label="Accommodation"
            name="accommodation"
            value={formData.accommodation}
            onChange={handleInputChange}
            fullWidth
          />

          {/* Package Text */}
          <BlueTextField
            label="Package"
            name="package"
            value={formData.package}
            onChange={handleInputChange}
            fullWidth
          />

          {/* Location */}
          <BlueTextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
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
                className="mt-2 h-40 w-40 max-w-xs border rounded"
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

export default HomeSouPackageUpdate;
