import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const AboutIntrestingFaqsUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rowData } = location.state || {};

  const [questions, setQuestions] = useState(rowData?.questions || "");
  const [answer, setAnswer] = useState(rowData?.answer || "");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questions.trim()) {
      setError("Questions field is required.");
      return;
    }
    if (!answer.trim()) {
      setError("Answer field is required.");
      return;
    }

    try {
      await axios.put(`${BE_URL}/aboutIntrestingFaqs/${rowData.id}`, {
        questions,
        answer,
      });
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        setSuccess(false);
        navigate("/about-intresting-faqs");
      }, 2500);
    } catch (err) {
      setError("Update failed. Please try again.");
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    navigate("/about-intresting-faqs");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Interesting FAQ
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Questions */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Questions
            </label>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter questions"
              rows={2}
              required
            />
          </div>
          {/* Answer */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter answer"
              rows={4}
              required
            />
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

export default AboutIntrestingFaqsUpdate;
