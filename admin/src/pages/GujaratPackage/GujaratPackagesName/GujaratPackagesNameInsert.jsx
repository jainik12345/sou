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
  const [placeNames, setPlaceNames] = useState([""]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [success, setSuccess] = useState(false);

  // Handle dynamic Place Name fields
  const handlePlaceChange = (idx, value) => {
    const updated = [...placeNames];
    updated[idx] = value;
    setPlaceNames(updated);
  };
  const handleAddPlace = () => setPlaceNames([...placeNames, ""]);
  const handleRemovePlace = (idx) => {
    if (placeNames.length === 1) return;
    setPlaceNames(placeNames.filter((_, i) => i !== idx));
  };

  // Handle Images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Cleanup image URLs
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Nights || !Days) return alert("Nights and Days are required");
    if (placeNames.some((p) => !p.trim()))
      return alert("All place names must be filled");
    if (!images.length) return alert("Select at least one image");

    const formData = new FormData();
    formData.append("Nights", Nights);
    formData.append("Days", Days);
    formData.append("places_name", placeNames.join(", "));
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post(`${BE_URL}/gujaratPackage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.status === "success") {
        setSuccess(true);
        setNights("");
        setDays("");
        setPlaceNames([""]);
        setImages([]);
        setImagePreviews([]);
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error("Error saving package:", err);
      alert("Failed to save package.");
    }
  };

  const handleCancel = () => navigate("/gujarat-packages-name");

  // Auto-hide success popup after 2.5 seconds
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
          Add Gujarat Package
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          encType="multipart/form-data"
        >
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
          {/* Place Names */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Place Name(s)
            </label>
            {placeNames.map((place, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={place}
                  onChange={(e) => handlePlaceChange(idx, e.target.value)}
                  className="border border-blue-500 rounded-md p-2 flex-1"
                  placeholder={`Place Name ${idx + 1}`}
                  required
                />
                {placeNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePlace(idx)}
                    className="bg-red-500 text-white rounded px-2"
                  >
                    &minus;
                  </button>
                )}
                {idx === placeNames.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddPlace}
                    className="bg-green-500 text-white rounded px-2"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* Images */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-blue-500 rounded-md p-2 w-full"
              required
            />
            {/* Previews */}
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
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
