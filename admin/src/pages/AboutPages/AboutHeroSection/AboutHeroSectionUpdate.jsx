/* eslint-disable no-extra-boolean-cast */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const AboutHeroSectionUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData } = location.state || {};

  // Parse improvement as array (it may be stringified JSON or array)
  const initialImprovement = Array.isArray(rowData?.improvement)
    ? rowData.improvement
    : !!rowData?.improvement
    ? (() => {
        try {
          const parsed = JSON.parse(rowData.improvement);
          return Array.isArray(parsed) ? parsed : [String(rowData.improvement)];
        } catch {
          return [String(rowData.improvement)];
        }
      })()
    : [""];

  const [description, setDescription] = useState(rowData?.description || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [improvement, setImprovement] = useState(
    initialImprovement.length > 0 ? initialImprovement : [""]
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
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
    if (improvement.length === 1) return;
    setImprovement(improvement.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError("Description is required.");
      return;
    }
    if (improvement.some((item) => !item.trim())) {
      setError("All improvement fields must be filled.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("improvement", JSON.stringify(improvement));
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("existingImage", rowData.image);
    }

    try {
      await axios.put(`${BE_URL}/aboutHeroSection/${rowData.id}`, formData);
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
        navigate("/about-hero-section");
      }, 2500);
    } catch (err) {
      setError("Update failed. Please try again.");
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    navigate("/about-hero-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update About Hero Section
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
                    : `${BE_URL}/Images/AboutImages/Hero/${rowData.image}`
                }
                alt="Hero"
                className="w-24 h-24 object-cover rounded mt-1"
              />
            </div>
          </div>
          {/* Improvement */}
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
                    onChange={(e) =>
                      handleImprovementChange(idx, e.target.value)
                    }
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

export default AboutHeroSectionUpdate;
