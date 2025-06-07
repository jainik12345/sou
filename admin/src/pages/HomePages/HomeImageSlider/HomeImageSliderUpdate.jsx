import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const HomeImageSliderUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData } = location.state || {};

  const [title, setTitle] = useState(rowData?.title || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // for preview new image
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Title is optional for image slider, but you can require it if needed
    const formData = new FormData();
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("existingImage", rowData.image); // pass current image if no new one
    }

    try {
      await axios.put(`${BE_URL}/homeImageSlider/${rowData.id}`, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/home-image-slider");
      }, 2500);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleCancel = () => {
    navigate("/home-image-slider");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Image Slider
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter slider title (optional)"
            />
          </div>

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
                    : `${BE_URL}/Images/HomeImages/HomeImageSlider/${rowData.image}`
                }
                alt="Slider"
                className="w-24 h-24 object-cover rounded mt-1"
              />
            </div>
          </div>

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

export default HomeImageSliderUpdate;
