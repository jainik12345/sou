import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import axios from "axios";

const AboutWhyChooseSectionInsert = () => {
  const navigate = useNavigate();
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

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
      const response = await axios.post(`${BE_URL}/aboutWhyChooseSection`, {
        heading,
        title,
      });

      if (response.data.status === "success") {
        setSuccess(true);
        setError(null);
        setHeading("");
        setTitle("");
      } else {
        setError("Failed to add Why Choose section.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  const handleCancel = () => {
    navigate("/about-why-choose-section");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Why Choose Section
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
          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit">Add</Submit>
            <Cancel onClick={handleCancel}>Cancel</Cancel>
          </div>
        </form>
      </div>
      {success && <SubmitData />}
    </div>
  );
};

export default AboutWhyChooseSectionInsert;
