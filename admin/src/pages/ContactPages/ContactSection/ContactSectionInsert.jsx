import React, { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../../config";
import Submit from "../../../components/Buttons/Submit";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import UpdateData from "../../../components/Popup/UpdateData";
import { useNavigate } from "react-router-dom";

const initialState = {
  address: "",
  email: "",
  phone_number: "",
  map_link: "",
};

const ContactSectionInsert = () => {
  const [form, setForm] = useState(initialState);
  const [dataId, setDataId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Popup auto-close
  useEffect(() => {
    if (showSubmitPopup || showUpdatePopup) {
      const timer = setTimeout(() => {
        setShowSubmitPopup(false);
        setShowUpdatePopup(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSubmitPopup, showUpdatePopup]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${BE_URL}/contactPage`);
      if (res.data?.data?.length) {
        const d = res.data.data[0];
        setDataId(d.id);
        setForm({
          address: d.address || "",
          email: d.email || "",
          phone_number: d.phone_number || "",
          map_link: d.map_link || "",
        });
      } else {
        setDataId(null);
        setForm(initialState);
      }
    } catch (e) {
      setError("Failed to fetch data.");
      console.error("Error is ", e);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    setError("");
    try {
      if (!dataId) {
        // Insert
        await axios.post(`${BE_URL}/contactPage`, form);
        setShowSubmitPopup(true);
        await fetchData(); // Refetch to get id and switch to update mode
      } else {
        // Update
        await axios.put(`${BE_URL}/contactPage/${dataId}`, form);
        setShowUpdatePopup(true);
        await fetchData();
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Error saving data.");
    }
    setBtnLoading(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          {dataId ? "Update Contact Section" : "Add Contact Section"}
        </h2>

        {error && (
          <div className="text-red-600 font-semibold mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Address */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              className="border border-blue-500 rounded-md p-2 w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border border-blue-500 rounded-md p-2 w-full"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={form.phone_number}
              onChange={handleChange}
              required
              className="border border-blue-500 rounded-md p-2 w-full"
            />
          </div>

          {/* Map Link */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Map Link
            </label>
            <input
              type="text"
              name="map_link"
              placeholder="Google Map Link"
              value={form.map_link}
              onChange={handleChange}
              required
              className="border border-blue-500 rounded-md p-2 w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            {!dataId ? (
              <Submit
                type="submit"
                disabled={btnLoading}
                text={btnLoading ? "Submitting..." : "Submit"}
              />
            ) : (
              <Update
                type="submit"
                disabled={btnLoading}
                text={btnLoading ? "Updating..." : "Update"}
              />
            )}
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {/* Popup Components */}
      {showSubmitPopup && <SubmitData />}
      {showUpdatePopup && <UpdateData />}
    </div>
  );
};

export default ContactSectionInsert;
