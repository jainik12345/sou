import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import axios from "axios";

const AboutHeroSectionInsert = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [improvement, setImprovement] = useState([""]);
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

  const handleImprovementChange = (index, value) => {
    const updated = [...improvement];
    updated[index] = value;
    setImprovement(updated);
  };

  const handleAddImprovement = () => {
    setImprovement([...improvement, ""]);
  };

  const handleRemoveImprovement = (index) => {
    if (improvement.length === 1) return; // Always keep at least one
    const updated = improvement.filter((_, idx) => idx !== index);
    setImprovement(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    if (!image) {
      setError("Image is required.");
      return;
    }
    if (improvement.some((item) => !item.trim())) {
      setError("All improvement fields must be filled.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);
    formData.append("improvement", JSON.stringify(improvement));

    try {
      const response = await axios.post(`${BE_URL}/aboutHeroSection`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "success") {
        setSuccess(true);
        setError(null);
        setDescription("");
        setImprovement([""]);
        setImage(null);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        setError("Failed to add hero section.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/about-hero-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add About Hero Section
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">

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
              Select Hero Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
              required
            />
          </div>

          {/* Improvement (JSON List) */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Improvement
            </label>
            <ul className="space-y-3">
              {improvement.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleImprovementChange(idx, e.target.value)}
                    className="border border-blue-500 rounded-md p-2 flex-1"
                    placeholder={`Improvement ${idx + 1}`}
                    required
                  />
                  {improvement.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImprovement(idx)}
                      className="text-red-600 hover:text-red-900 p-2"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  )}
                  {idx === improvement.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddImprovement}
                      className="text-green-600 hover:text-green-900 p-2"
                      title="Add"
                    >
                      <FaPlus />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit">Add Hero Section</Submit>
            <Cancel onClick={handleCancel}>Cancel</Cancel>
          </div>
        </form>
      </div>
      {success && <SubmitData />}
    </div>
  );
};

export default AboutHeroSectionInsert;