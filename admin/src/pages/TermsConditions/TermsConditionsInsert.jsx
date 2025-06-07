import React, { useState } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Submit from "../../components/Buttons/Submit";
import Cancel from "../../components/Buttons/Cancel";
import SubmitData from "../../components/Popup/SubmitData";
import BE_URL from "../../config";
import axios from "axios";

const BlueTextField = styled(TextField)(() => ({
  "& label.Mui-focused": {
    color: "#1976d2",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#1976d2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1976d2",
    },
    "&:hover fieldset": {
      borderColor: "#1565c0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
}));

const TermsConditionsInsert = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please fill out this field.");
      return;
    }
    try {
      const response = await axios.post(`${BE_URL}/termsConditions`, {
        text,
      });
      if (response.status === 200 || response.data.status === "success") {
        setShowPopup(true);
        setText("");
        setError("");
      } else {
        setError("Failed to add terms & conditions.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("❌ Failed to add terms & conditions.");
    }
  };

  const handleCancel = () => {
    navigate("/terms-conditions");
  };

  return (
    <div className="p-6">
      {showPopup && <SubmitData onClose={() => setShowPopup(false)} />}
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Terms & Conditions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <BlueTextField
              label="Terms & Conditions Text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError("");
              }}
              fullWidth
              multiline
              minRows={5}
              error={!!error}
              helperText={error}
              placeholder="Enter terms & conditions text"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermsConditionsInsert;
