import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";
import axios from "axios";

const AboutIntrestingFaqsInsert = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState("");
  const [answer, setAnswer] = useState("");
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

    if (!questions.trim()) {
      setError("Questions field is required.");
      return;
    }
    if (!answer.trim()) {
      setError("Answer field is required.");
      return;
    }

    try {
      const response = await axios.post(`${BE_URL}/aboutIntrestingFaqs`, {
        questions,
        answer,
      });

      if (response.data.status === "success") {
        setSuccess(true);
        setError(null);
        setQuestions("");
        setAnswer("");
      } else {
        setError("Failed to add FAQ.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  const handleCancel = () => {
    navigate("/about-intresting-faqs");
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Interesting FAQ
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
          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Submit type="submit">Add FAQ</Submit>
            <Cancel onClick={handleCancel}>Cancel</Cancel>
          </div>
        </form>
      </div>
      {success && <SubmitData />}
    </div>
  );
};

export default AboutIntrestingFaqsInsert;
