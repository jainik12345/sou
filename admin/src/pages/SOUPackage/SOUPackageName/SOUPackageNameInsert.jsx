import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import axios from "axios";
import BE_URL from "../../../config";

const SOUPackageNameInsert = () => {
  const navigate = useNavigate();
  const [souPackageName, setSouPackageName] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!souPackageName.trim()) return alert("Package name is required");

    try {
      const res = await axios.post(`${BE_URL}/souPackageName`, {
        sou_package_name: souPackageName.trim(),
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setSouPackageName("");
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error("Error saving package:", err);
      alert("Failed to save package.");
    }
  };

  const handleCancel = () => navigate("/sou-package-name");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add SOU Package Name
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Name Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              SOU Package Name
            </label>
            <input
              type="text"
              value={souPackageName}
              onChange={(e) => setSouPackageName(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter SOU Package Name"
              required
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

export default SOUPackageNameInsert;
