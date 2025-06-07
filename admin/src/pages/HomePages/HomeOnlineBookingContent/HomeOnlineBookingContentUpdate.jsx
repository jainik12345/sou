import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const HomeOnlineBookingContentUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const rowData = location.state?.rowData;

  useEffect(() => {
    if (rowData) {
      setText(rowData.text || "");
    }
  }, [rowData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      console.log("Validation failed: Content text is required");
      return;
    }

    try {
      const res = await axios.put(`${BE_URL}/homeOnlineBookingContent/${rowData.id}`, {
        text,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/home-online-booking-content");
        }, 2500);
      }
    } catch (err) {
      console.error("Error updating content:", err);
      alert("Failed to update content.");
    }
  };

  const handleCancel = () => {
    navigate("/home-online-booking-content");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Home Online Booking Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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

export default HomeOnlineBookingContentUpdate;