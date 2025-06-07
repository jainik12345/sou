import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import axios from "axios";

const AboutAttractionsSectionInsert = () => {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleImageChange = (e) => {
    setError(null);
    setImage(e.target.files[0]);
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
    if (!image) {
      setError("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        `${BE_URL}/aboutAttractionsSection`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.status === "success") {
        setSuccess(true);
        setError(null);
        setHeading("");
        setDescription("");
        setImage(null);

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        setError("Failed to add attraction section.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  const handleCancel = () => {
    navigate("/about-attractions-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add About Attractions Section
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
              rows={4}
              required
            />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select Attraction Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
              required
            />
          </div>
          {/* Error Message */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit">Add Attraction</Submit>
            <Cancel onClick={handleCancel}>Cancel</Cancel>
          </div>
        </form>
      </div>
      {/* Success Popup */}
      {success && <SubmitData />}
    </div>
  );
};

export default AboutAttractionsSectionInsert;
