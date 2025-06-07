// import React from 'react'

// const PrivatePolicyUpdate = () => {
//   return (
//     <div>
//       PrivatePolicy Update
//     </div>
//   )
// }

// export default PrivatePolicyUpdate

/** */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../components/Buttons/Update";
import Cancel from "../../components/Buttons/Cancel";
import UpdateData from "../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../config";

const PrivatePolicyUpdate = () => {
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
      console.log("Validation failed: Title and description are required");
      return;
    }

    try {
      const res = await axios.put(`${BE_URL}/privatePolicy/${rowData.id}`, {
        text,
      });

      if (res.data.status === "success") {
        setSuccess(true);
        setTimeout(() => {
          navigate("/private-policy");
        }, 2500);
      }
    } catch (err) {
      console.error("Error Updating polict", err);
      alert("Failed to Update Policy");
    }
  };

  const handleCancel = () => {
    navigate("/private-policy");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Private Policy
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Private Policy Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter private policy text"
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

export default PrivatePolicyUpdate;
