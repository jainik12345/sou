import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cancel from "../../components/Buttons/Cancel";
import Update from "../../components/Buttons/Update";
import UpdateData from "../../components/Popup/UpdateData";
import BE_URL from "../../config";

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

const TermsConditionsUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rowData = location.state?.rowData;

  const [text, setText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (rowData) {
      setText(rowData.text || "");
    } else {
      // Optionally show error or redirect if no data
      navigate("/terms-conditions");
    }
  }, [rowData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please fill out this field.");
      return;
    }

    try {
      const response = await axios.put(
        `${BE_URL}/termsConditions/${rowData.id}`,
        { text }
      );

      if (response.status === 200 || response.data.status === "success") {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/terms-conditions");
        }, 2500);
      }
    } catch (error) {
      setError("Error updating terms & conditions.", error);
      alert("Some Thing went wrong terms & Condition.");
    }
  };

  const handleCancel = () => {
    navigate("/terms-conditions");
  };

  return (
    <div className="p-6">
      {showSuccess && <UpdateData onClose={() => setShowSuccess(false)} />}

      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Terms & Conditions
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
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TermsConditionsUpdate;
