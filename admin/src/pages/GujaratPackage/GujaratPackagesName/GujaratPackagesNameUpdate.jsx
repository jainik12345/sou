import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const GujaratPackagesNameUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {};

  const [Nights, setNights] = useState(rowData?.Nights || "");
  const [Days, setDays] = useState(rowData?.Days || "");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!rowData) {
      // If accessed directly, redirect back.
      navigate("/gujarat-package-name");
    }
  }, [rowData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Nights || !Days) {
      alert("Both Nights and Days are required.");
      return;
    }

    try {
      const res = await axios.put(`${BE_URL}/gujaratPackage/${rowData.id}`, {
        Nights,
        Days,
      });

      if (res.data.status === "success") {
        setSuccess(true);
      } else {
        alert("Something went wrong while updating.");
      }
    } catch (err) {
      console.error("Error updating package:", err);
      alert("Failed to update package.");
    }
  };

  const handleCancel = () => {
    navigate("/gujarat-package-name");
  };

  // Auto-hide success popup after 2.5 seconds and redirect
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        navigate("/gujarat-package-name");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Gujarat Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nights Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Nights
            </label>
            <input
              type="number"
              value={Nights}
              onChange={(e) => setNights(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of nights"
              required
              min={1}
            />
          </div>
          {/* Days Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Days
            </label>
            <input
              type="number"
              value={Days}
              onChange={(e) => setDays(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of days"
              required
              min={1}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {success && <UpdateData />}
    </div>
  );
};

export default GujaratPackagesNameUpdate;
