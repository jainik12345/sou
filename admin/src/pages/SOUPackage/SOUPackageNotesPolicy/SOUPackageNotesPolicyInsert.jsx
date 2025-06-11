import React, { useState, useEffect } from "react";
import { TextField, MenuItem, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import { FaPlus, FaTrash } from "react-icons/fa";

const BlueTextField = styled(TextField)({
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const SOUPackageNotesPolicyInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sou_package_id: "",
    notes: [{ value: "" }],
    refund_policy: [{ value: "" }],
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

  // Notes Handlers
  const handleNotesChange = (idx, value) => {
    setFormData((prev) => {
      const updated = prev.notes.map((item, i) =>
        i === idx ? { value } : item
      );
      return { ...prev, notes: updated };
    });
    setErrors((prev) => ({ ...prev, notes: false }));
  };

  const handleAddNote = () => {
    setFormData((prev) => ({
      ...prev,
      notes: [...prev.notes, { value: "" }],
    }));
  };

  const handleRemoveNote = (idx) => {
    setFormData((prev) => ({
      ...prev,
      notes:
        prev.notes.length > 1
          ? prev.notes.filter((_, i) => i !== idx)
          : prev.notes,
    }));
  };

  // Refund Policy Handlers
  const handleRefundChange = (idx, value) => {
    setFormData((prev) => {
      const updated = prev.refund_policy.map((item, i) =>
        i === idx ? { value } : item
      );
      return { ...prev, refund_policy: updated };
    });
    setErrors((prev) => ({ ...prev, refund_policy: false }));
  };

  const handleAddRefund = () => {
    setFormData((prev) => ({
      ...prev,
      refund_policy: [...prev.refund_policy, { value: "" }],
    }));
  };

  const handleRemoveRefund = (idx) => {
    setFormData((prev) => ({
      ...prev,
      refund_policy:
        prev.refund_policy.length > 1
          ? prev.refund_policy.filter((_, i) => i !== idx)
          : prev.refund_policy,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notesValid =
      formData.notes.length > 0 &&
      formData.notes.every((item) => item.value.trim() !== "");
    const refundValid =
      formData.refund_policy.length > 0 &&
      formData.refund_policy.every((item) => item.value.trim() !== "");

    const newErrors = {
      sou_package_id: formData.sou_package_id === "",
      notes: !notesValid,
      refund_policy: !refundValid,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const data = {
        sou_package_id: formData.sou_package_id,
        notes: JSON.stringify(formData.notes.map((item) => item.value)),
        refund_policy: JSON.stringify(
          formData.refund_policy.map((item) => item.value)
        ),
      };

      const res = await axios.post(`${BE_URL}/souPackageNotesPolicy`, data);

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          sou_package_id: "",
          notes: [{ value: "" }],
          refund_policy: [{ value: "" }],
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
    navigate("/sou-package-notes-policy");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Package Notes & Policy
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

          {/* Notes List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes <span className="text-red-500">*</span>
            </label>
            {formData.notes.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <BlueTextField
                  label={`Note ${idx + 1}`}
                  value={item.value}
                  onChange={(e) => handleNotesChange(idx, e.target.value)}
                  fullWidth
                  required
                  error={errors.notes && item.value.trim() === ""}
                  helperText={
                    errors.notes && item.value.trim() === ""
                      ? "Please enter note"
                      : ""
                  }
                />
                <IconButton
                  aria-label="Remove note"
                  disabled={formData.notes.length === 1}
                  onClick={() => handleRemoveNote(idx)}
                  size="small"
                >
                  <FaTrash />
                </IconButton>
                {idx === formData.notes.length - 1 && (
                  <IconButton
                    aria-label="Add note"
                    color="primary"
                    onClick={handleAddNote}
                    size="small"
                  >
                    <FaPlus />
                  </IconButton>
                )}
              </div>
            ))}
            {errors.notes && typeof errors.notes === "boolean" && (
              <p className="text-red-600 text-xs mt-1">
                Please add at least one note and ensure none are empty
              </p>
            )}
          </div>

          {/* Refund Policy List */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cancellation and Refund Policy{" "}
              <span className="text-red-500">*</span>
            </label>
            {formData.refund_policy.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <BlueTextField
                  label={`Policy ${idx + 1}`}
                  value={item.value}
                  onChange={(e) => handleRefundChange(idx, e.target.value)}
                  fullWidth
                  required
                  error={errors.refund_policy && item.value.trim() === ""}
                  helperText={
                    errors.refund_policy && item.value.trim() === ""
                      ? "Please enter policy"
                      : ""
                  }
                />
                <IconButton
                  aria-label="Remove policy"
                  disabled={formData.refund_policy.length === 1}
                  onClick={() => handleRemoveRefund(idx)}
                  size="small"
                >
                  <FaTrash />
                </IconButton>
                {idx === formData.refund_policy.length - 1 && (
                  <IconButton
                    aria-label="Add policy"
                    color="primary"
                    onClick={handleAddRefund}
                    size="small"
                  >
                    <FaPlus />
                  </IconButton>
                )}
              </div>
            ))}
            {errors.refund_policy &&
              typeof errors.refund_policy === "boolean" && (
                <p className="text-red-600 text-xs mt-1">
                  Please add at least one policy and ensure none are empty
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

export default SOUPackageNotesPolicyInsert;
