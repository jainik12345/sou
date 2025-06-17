import { KnowMore } from "../../../components/Buttons/KnowMore.jsx";
import BE_URL from "../../../config.js";
import axios from "axios";
import { useState, useEffect } from "react";

export const HomePageSouInfo = () => {
  const [SouInfo, setSouInfo] = useState([]);
  const [FetchError, setFetchError] = useState(null);

  useEffect(() => {
    const FetchHomeSouInfo = async () => {
      try {
        const FetchResponse = await axios.get(`${BE_URL}/homeOnlineBookingContent`);
        const FetchFilteredResponse = FetchResponse.data.data;
        if (FetchResponse.status === 200) {
          setSouInfo(FetchFilteredResponse);
          setFetchError(null);
        } else {
          setFetchError("Failed to load home slider images.");
          console.warn("Unexpected response status:", FetchResponse.status);
        }
      } catch (error) {
        console.error("Unable To Fetch Data Of Home Page Sou Info :- ", error);
        setFetchError("An error occurred while loading home page Sou Info.");
      }
    };
    FetchHomeSouInfo();
  }, []);

  return (
    <section className="relative bg-gray-50 py-16">
      {/* Decorative Top Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1920 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
          <path d="M0 120L1920 0V120H0Z" fill="#fbbf24" fillOpacity="0.13" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          <h2 className="text-gray-800 text-2xl text-center sm:text-4xl font-extrabold mb-2 tracking-tight">
            Statue of Unity Tent City Online Booking
          </h2>
          <div className="w-16 h-1 bg-orange-300 rounded mb-2" />
        </div>
        <div className="bg-white rounded-lg shadow px-6 py-6 md:px-10 md:py-8">
          {SouInfo && SouInfo.map((val, idx) => (
            <p key={val.id || idx} className="mb-4 whitespace-pre-line text-[1rem] font-semibold text-gray-600">
              {val.text}
            </p>
          ))}
          {FetchError && (
            <div className="text-red-500 mt-4">{FetchError}</div>
          )}
        </div>
        <div className="flex justify-center">
          <KnowMore KnowMoreLink="/about-us" Text={"know more"} />
        </div>
      </div>
      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1920 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
          <path d="M0 0L1920 120V0H0Z" fill="#fbbf24" fillOpacity="0.13" />
        </svg>
      </div>
    </section>
  );
};