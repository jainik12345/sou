import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";

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

const weekOptions = [
  { value: "Weekday", label: "Weekday" },
  { value: "Weekend", label: "Weekend" },
];

const planOptions = [
  { value: "EP", label: "EP" },
  { value: "MAP", label: "MAP" },
  { value: "AP", label: "AP" },
];

const emptyEntry = {
  plans: "",
  night1days2: "",
  night2days3: "",
};

const SOUPackageLakeViewUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lakeViewData = location.state?.lakeViewData;

  const [formData, setFormData] = useState({
    sou_package_id: "",
    week: "",
    id: "",
    data: [{ ...emptyEntry }],
  });
  const [packageOptions, setPackageOptions] = useState([]);
  const [entryErrors, setEntryErrors] = useState([{}]);
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

    if (lakeViewData) {
      let safeData = [];
      if (typeof lakeViewData.data === "string") {
        try {
          safeData = JSON.parse(lakeViewData.data);
        } catch {
          safeData = [{ ...emptyEntry }];
        }
      } else if (Array.isArray(lakeViewData.data)) {
        safeData = lakeViewData.data;
      } else {
        safeData = [{ ...emptyEntry }];
      }

      setFormData({
        sou_package_id: lakeViewData.sou_package_id,
        week: lakeViewData.week || "",
        id: lakeViewData.id,
        data: safeData.length > 0 ? safeData : [{ ...emptyEntry }],
      });
      setEntryErrors(
        safeData.map(() => ({})) // one error object per entry
      );
    } else {
      navigate("/sou-package-lake-view");
    }
  }, [lakeViewData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEntryChange = (idx, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      data: prev.data.map((entry, i) =>
        i === idx ? { ...entry, [name]: value } : entry
      ),
    }));
    setEntryErrors((prev) =>
      prev.map((err, i) => (i === idx ? { ...err, [name]: false } : err))
    );
  };

  const handleAddEntry = () => {
    setFormData((prev) => ({
      ...prev,
      data: [...prev.data, { ...emptyEntry }],
    }));
    setEntryErrors((prev) => [...prev, {}]);
  };

  const handleRemoveEntry = (idx) => {
    setFormData((prev) => ({
      ...prev,
      data: prev.data.filter((_, i) => i !== idx),
    }));
    setEntryErrors((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all data entries
    const newEntryErrors = formData.data.map((entry) => ({
      plans: entry.plans === "",
      night1days2: entry.night1days2 === "",
      night2days3: entry.night2days3 === "",
    }));

    setEntryErrors(newEntryErrors);

    if (newEntryErrors.some((err) => Object.values(err).some(Boolean))) return;

    try {
      const data = {
        sou_package_id: formData.sou_package_id,
        week: formData.week,
        data: formData.data,
      };

      const res = await axios.put(
        `${BE_URL}/souPackageLakeView/${formData.id}`,
        data
      );

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        navigate("/sou-package-lake-view");
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleCancel = () => {
    navigate("/sou-package-lake-view");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update SOU Package Lake View
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Selector */}
          <BlueTextField
            select
            label="Select Package"
            name="sou_package_id"
            value={formData.sou_package_id}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {packageOptions.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.sou_package_name}
              </MenuItem>
            ))}
          </BlueTextField>

          {/* Week Selector */}
          <BlueTextField
            select
            label="Week"
            name="week"
            value={formData.week}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {weekOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </BlueTextField>

          {/* Dynamic Data Section */}
          <div>
            <div className="flex items-center mb-2">
              <span className="font-semibold text-blue-700">
                Lake View Plan Details
              </span>
              <button
                type="button"
                onClick={handleAddEntry}
                className="ml-2 text-blue-600 hover:text-blue-900"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaPlusCircle size={24} />
              </button>
            </div>
            {formData.data.map((entry, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-end gap-4 mb-4 border-b pb-4 relative"
              >
                <BlueTextField
                  select
                  label="Plans"
                  name="plans"
                  value={entry.plans}
                  onChange={(e) => handleEntryChange(idx, e)}
                  fullWidth
                  required
                  error={entryErrors[idx]?.plans}
                  helperText={
                    entryErrors[idx]?.plans ? "Please select a plan" : ""
                  }
                >
                  {planOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </BlueTextField>
                <BlueTextField
                  label="1 Night & 2 Days (Per Person)"
                  name="night1days2"
                  type="number"
                  value={entry.night1days2}
                  onChange={(e) => handleEntryChange(idx, e)}
                  fullWidth
                  required
                  error={entryErrors[idx]?.night1days2}
                  helperText={
                    entryErrors[idx]?.night1days2
                      ? "Please enter 1 Night & 2 Days rate"
                      : ""
                  }
                  inputProps={{ min: 0 }}
                />
                <BlueTextField
                  label="2 Night & 3 Days (Per Person)"
                  name="night2days3"
                  type="number"
                  value={entry.night2days3}
                  onChange={(e) => handleEntryChange(idx, e)}
                  fullWidth
                  required
                  error={entryErrors[idx]?.night2days3}
                  helperText={
                    entryErrors[idx]?.night2days3
                      ? "Please enter 2 Night & 3 Days rate"
                      : ""
                  }
                  inputProps={{ min: 0 }}
                />
                {formData.data.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEntry(idx)}
                    className="text-red-600 hover:text-red-900"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      alignSelf: "center",
                    }}
                  >
                    <FaTimesCircle size={24} />
                  </button>
                )}
              </div>
            ))}
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

export default SOUPackageLakeViewUpdate;
