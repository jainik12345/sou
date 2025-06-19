import { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../config";

// Modern arrow icon as SVG component - size increased to 2em
const ArrowIcon = () => (
  <svg
    className="inline-block mr-3 text-orange-500"
    width="2em"
    height="2em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: "middle" }}
  >
    <path
      d="M7 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PrivacyPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`${BE_URL}/privatePolicy`)
      .then((res) => {
        setPolicies(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Failed to fetch privacy policy");
        setLoading(false);
      });
  }, []);

  // Split each policy text by newline and render each line as its own <p> with a larger arrow icon
  return (
    <div className="bg-[#f9f6f1] text-[#333] px-4 py-12 md:px-12 lg:px-20">
      <div className="max-w-screen-xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-12 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Privacy Policy
        </h2>
        <div className="space-y-6 text-justify text-gray-700 leading-relaxed">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && policies.length === 0 && (
            <p>No policy found.</p>
          )}
          {!loading &&
            !error &&
            policies.map((policy) =>
              policy.text
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, lineIdx) => (
                  <p
                    key={`${policy.id}-${lineIdx}`}
                    className="text-[1rem] font-semibold text-gray-600 flex items-start"
                  >
                    <span>{line}</span>
                  </p>
                ))
            )}
        </div>
      </div>
    </div>
  );
};
