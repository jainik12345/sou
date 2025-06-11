import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
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

const HomeSouPackageInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_id: "",
    accommodation: "",
    package: "",
    location: "",
    image: null,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      sou_package_id: formData.sou_package_id === "",
      image: !formData.image,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = new FormData();
      data.append("sou_package_id", formData.sou_package_id);
      data.append("accommodation", formData.accommodation);
      data.append("package", formData.package);
      data.append("location", formData.location);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await axios.post(`${BE_URL}/homeSouPackage`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_id: "",
          accommodation: "",
          package: "",
          location: "",
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
    navigate("/home-sou-package");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Home SOU Package
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

          {/* Accommodation Input */}
          <div>
            <BlueTextField
              label="Accommodation"
              name="accommodation"
              value={formData.accommodation}
              onChange={handleInputChange}
              fullWidth
            />
          </div>

          {/* Package Text Input */}
          <div>
            <BlueTextField
              label="Package"
              name="package"
              value={formData.package}
              onChange={handleInputChange}
              fullWidth
            />
          </div>

          {/* Location Input */}
          <div>
            <BlueTextField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
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
                setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
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

export default HomeSouPackageInsert;
