import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import axios from "axios";
import BE_URL from "../../../config";

const GujaratPackagesNameInsert = () => {
  const navigate = useNavigate();
  const [Nights, setNights] = useState("");
  const [Days, setDays] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Nights || !Days) {
      console.log("Validation failed: Nights and Days are required");
      return;
    }

    try {
      const res = await axios.post(`${BE_URL}/gujaratPackage`, {
        Nights,
        Days,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setNights("");
        setDays("");
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error("Error saving package:", err);
      alert("Failed to save package.");
    }
  };

  const handleCancel = () => {
    navigate("/gujarat-package-name/");
  };

  // Auto-hide success popup after 2.5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Gujarat Package
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
            <Submit type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {success && <SubmitData />}
    </div>
  );
};

export default GujaratPackagesNameInsert;
