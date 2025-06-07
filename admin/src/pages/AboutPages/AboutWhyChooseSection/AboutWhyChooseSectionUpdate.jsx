import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const AboutWhyChooseSectionUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData } = location.state || {};

  const [heading, setHeading] = useState(rowData?.heading || "");
  const [title, setTitle] = useState(rowData?.title || "");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading.trim()) {
      setError("Heading field is required.");
      return;
    }
    if (!title.trim()) {
      setError("Title field is required.");
      return;
    }

    try {
      await axios.put(`${BE_URL}/aboutWhyChooseSection/${rowData.id}`, {
        heading,
        title,
      });
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
        navigate("/about-why-choose-section");
      }, 2500);
    } catch (err) {
      setError("Update failed. Please try again.");
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    navigate("/about-why-choose-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Why Choose Section
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Heading */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Heading
            </label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter heading"
              required
            />
          </div>
          {/* Title */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter title"
              required
            />
          </div>
          {/* Error Message */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}
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

export default AboutWhyChooseSectionUpdate;
