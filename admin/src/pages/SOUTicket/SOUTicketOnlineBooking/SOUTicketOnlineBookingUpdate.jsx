import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
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

const SOUTicketOnlineBookingUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  const [formData, setFormData] = useState({
    headiing: "",
    first_description: "",
    description: "",
    notes: "",
    data: [],
    id: "",
  });
  const [dataSteps, setDataSteps] = useState([{ heading: "", title: "" }]);
  const [errors, setErrors] = useState({
    headiing: false,
    first_description: false,
    description: false,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (bookingData) {
      setFormData({
        headiing: bookingData.headiing || "",
        first_description: bookingData.first_description || "",
        description: bookingData.description || "",
        notes: bookingData.notes || "",
        data: Array.isArray(bookingData.data) ? bookingData.data : [],
        id: bookingData.id,
      });
      setDataSteps(
        Array.isArray(bookingData.data) && bookingData.data.length > 0
          ? bookingData.data
          : [{ heading: "", title: "" }]
      );
    } else {
      navigate("/sou-ticket-online-booking");
    }
  }, [bookingData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...dataSteps];
    newSteps[index][field] = value;
    setDataSteps(newSteps);
  };

  const handleAddStep = () => {
    setDataSteps([...dataSteps, { heading: "", title: "" }]);
  };

  const handleRemoveStep = (index) => {
    if (dataSteps.length === 1) return;
    const newSteps = dataSteps.filter((_, i) => i !== index);
    setDataSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      headiing: formData.headiing.trim() === "",
      first_description: formData.first_description.trim() === "",
      description: formData.description.trim() === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val)) return;

    const payload = {
      headiing: formData.headiing,
      first_description: formData.first_description,
      description: formData.description,
      notes: formData.notes,
      data: JSON.stringify(dataSteps),
    };

    try {
      const res = await axios.put(
        `${BE_URL}/souTicketOnlineBooking/${formData.id}`,
        payload
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/sou-ticket-online-booking");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sou-ticket-online-booking");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update SOU Ticket Online Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Heading */}
          <BlueTextField
            label="Heading"
            name="headiing"
            value={formData.headiing}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.headiing}
            helperText={errors.headiing ? "Please enter a heading" : ""}
          />

          {/* First Description */}
          <BlueTextField
            label="First Description"
            name="first_description"
            value={formData.first_description}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.first_description}
            helperText={
              errors.first_description ? "Please enter first description" : ""
            }
            multiline
            rows={2}
          />

          {/* Description */}
          <BlueTextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.description}
            helperText={errors.description ? "Please enter description" : ""}
            multiline
            rows={2}
          />

          {/* Data Steps (JSON Array) */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Steps (Data)
            </label>
            {dataSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-2 mb-2 items-center"
              >
                <BlueTextField
                  label="Step Heading"
                  value={step.heading}
                  onChange={(e) =>
                    handleStepChange(idx, "heading", e.target.value)
                  }
                  fullWidth
                  size="small"
                />
                <BlueTextField
                  label="Step Description"
                  value={step.title}
                  onChange={(e) =>
                    handleStepChange(idx, "title", e.target.value)
                  }
                  fullWidth
                  size="small"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(idx)}
                  className="text-red-600 font-bold px-2"
                  disabled={dataSteps.length === 1}
                  title="Remove Step"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddStep}
              className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-semibold py-1 px-3 rounded mt-2"
            >
              + Add Step
            </button>
          </div>

          {/* Notes (Optional) */}
          <BlueTextField
            label="Notes (optional)"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
          />

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

export default SOUTicketOnlineBookingUpdate;
