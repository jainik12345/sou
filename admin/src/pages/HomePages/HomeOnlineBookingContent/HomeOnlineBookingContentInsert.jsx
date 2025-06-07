import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import axios from "axios";
import BE_URL from "../../../config";

const HomeOnlineBookingContentInsert = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      console.log("Validation failed: Content text is required");
      return;
    }

    try {
      const res = await axios.post(`${BE_URL}/homeOnlineBookingContent`, {
        text,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setText("");
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error("Error saving content:", err);
      alert("Failed to save content.");
    }
  };

  const handleCancel = () => {
    navigate("/home-online-booking-content");
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
          Add Home Online Booking Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Only Text Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Online Booking Content Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter online booking content"
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

export default HomeOnlineBookingContentInsert;