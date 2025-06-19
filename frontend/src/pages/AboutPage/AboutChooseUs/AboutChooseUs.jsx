import { useState, useEffect } from "react";
import BE_URL from "../../../config";
import axios from "axios";

export const AboutChooseUs = () => {

  //useState Declarations

  const [AboutChooseUs, setAboutChooseUs] = useState(null);
  const [FetchError, setFetchError] = useState(null);

  useEffect(() => {

    const FetchAboutChooseUs = async () => {

      try {

        const FetchResponse = await axios.get(`${BE_URL}/aboutWhyChooseSection`);

        if (FetchResponse.status === 200) {

          setAboutChooseUs(FetchResponse.data.data);

        } else {

          console.error("unexpected api status code received:- ", FetchResponse.status);

        }

      } catch (error) {

        console.error("Unable To Fetch The About Why Choose Us Section:- ", error);
        setFetchError("Unable To Load The Data ");

      }
    };

    FetchAboutChooseUs();

  }, []);

  return (
    <section className="bg-gray-50 ">

      {FetchError && (
        <div className="text-center text-red-600 font-semibold text-lg py-10">
          {FetchError}
        </div>
      )}

      <div className="max-w-screen-xl mx-auto px-4 py-15 flex flex-col gap-8">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-orange-500 font-extrabold text-xl md:text-4xl mb-2">
            Why should you Choose Us?
          </h2>
          <div className="w-16 h-1 mx-auto bg-orange-300 rounded mb-2"></div>
        </div>

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {AboutChooseUs?.map((Val, Idx) => (
            <div
              key={Idx}
              className="flex items-start gap-3 bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="mt-1">
                <span className="text-orange-500 font-semibold md:text-xl text-md">
                  {Val.heading}
                </span>
                <span className="text-gray-700 block text-justify font-medium md:text-md text-sm mt-1">
                  {Val.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};