import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const AboutActivitiesSectionUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData } = location.state || {};

  const [heading, setHeading] = useState(rowData?.heading || "");
  const [description, setDescription] = useState(rowData?.description || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading.trim()) {
      setError("Heading is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("existingImage", rowData.image);
    }

    try {
      await axios.put(
        `${BE_URL}/aboutActivitiesSection/${rowData.id}`,
        formData
      );
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/about-activities-section");
      }, 2500);
    } catch (error) {
      setError("Update failed. Please try again.");
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    navigate("/about-activities-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Activity Section
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
          {/* Description */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter description"
              required
              rows={4}
            />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-blue-500 rounded-md p-2 w-full"
            />
            <div className="mt-2">
              <span className="text-sm text-gray-500">Image preview:</span>
              <img
                src={
                  preview
                    ? preview
                    : `${BE_URL}/Images/AboutImages/Activities/${rowData.image}`
                }
                alt="Activity"
                className="w-24 h-24 object-cover rounded mt-1"
              />
            </div>
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

export default AboutActivitiesSectionUpdate;
