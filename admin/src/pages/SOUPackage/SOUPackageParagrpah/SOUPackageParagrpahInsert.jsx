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

const SOUPackageParagrpahInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_id: "",
    heading: "",
    description: "",
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
      heading: formData.heading.trim() === "",
      description: formData.description.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = {
        sou_package_id: formData.sou_package_id,
        heading: formData.heading,
        description: formData.description,
      };

      const res = await axios.post(`${BE_URL}/souPackageParagraph`, data);

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_id: "",
          heading: "",
          description: "",
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
    navigate("/sou-package-paragrpah");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Package Paragraph
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

          {/* Heading Input */}
          <div>
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
          </div>

          {/* Description Input */}
          <div>
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
              helperText={
                errors.description ? "Please enter a description" : ""
              }
            />
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

export default SOUPackageParagrpahInsert;
