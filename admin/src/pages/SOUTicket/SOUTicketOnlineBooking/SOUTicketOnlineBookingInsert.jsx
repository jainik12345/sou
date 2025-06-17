import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

const BlueTextField = styled(TextField)({
  marginBottom:"1.8rem",
  "& label.Mui-focused": { color: "#1976d2" },
  "& .MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#1976d2" },
    "&:hover fieldset": { borderColor: "#1565c0" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
  },
});

const SOUTicketOnlineBookingInsert = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_description: "",
    headiing: "",
    description: "",
    notes: "",
    data: [{ heading: "", title: "" }],
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleDataChange = (index, field, value) => {
    const newData = [...formData.data];
    newData[index][field] = value;
    setFormData((prev) => ({ ...prev, data: newData }));
  };

  const addDataRow = () => {
    setFormData((prev) => ({
      ...prev,
      data: [...prev.data, { heading: "", title: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      first_description: !formData.first_description.trim(),
      headiing: !formData.headiing.trim(),
      description: !formData.description.trim(),
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const payload = {
        ...formData,
        data: JSON.stringify(formData.data),
      };

      const res = await axios.post(`${BE_URL}/souTicketOnlineBooking`, payload);

      if (res.data.status === "success") {
        setSuccess(true);
        setFormData({
          first_description: "",
          headiing: "",
          description: "",
          notes: "",
          data: [{ heading: "", title: "" }],
        });
        setTimeout(() => setSuccess(false), 2500);
      } else {
        alert("Insert failed");
      }
    } catch (err) {
      console.error("Insert error:", err);
      alert("An error occurred");
    }
  };

  const handleCancel = () => {
    navigate("/sou-ticket-online-booking");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Ticket Online Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <BlueTextField
            label="First Description"
            name="first_description"
            value={formData.first_description}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.first_description}
            helperText={errors.first_description ? "Required" : ""}
          />

          <BlueTextField
            label="Heading"
            name="headiing"
            value={formData.headiing}
            onChange={handleInputChange}
            fullWidth
            required
            error={errors.headiing}
            helperText={errors.headiing ? "Required" : ""}
          />

          <BlueTextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            required
            multiline
            rows={3}
            error={errors.description}
            helperText={errors.description ? "Required" : ""}
          />

          <BlueTextField
            label="Notes (optional)"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
          />

          {/* JSON Dynamic Data */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Add JSON Data</p>
              <IconButton onClick={addDataRow} size="small" color="primary">
                <FiPlus />
              </IconButton>
            </div>

            {formData.data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
              >
                <BlueTextField
                  label="Heading"
                  value={item.heading}
                  onChange={(e) =>
                    handleDataChange(index, "heading", e.target.value)
                  }
                  fullWidth
                />
                <BlueTextField
                  label="Title"
                  value={item.title}
                  onChange={(e) =>
                    handleDataChange(index, "title", e.target.value)
                  }
                  fullWidth
                />
              </div>
            ))}
          </div>

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

export default SOUTicketOnlineBookingInsert;
