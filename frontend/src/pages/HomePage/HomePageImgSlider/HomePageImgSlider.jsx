import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import BE_URL from "../../../config";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional effect
// Responsive padding helper
const getResponsivePadding = () =>
  "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52";

export const HomePageImgSlider = () => {

  //useState Defind here 
  const [CurrentImgIdx, SetCurrentImgIdx] = useState(0);
  const [Fade, setFade] = useState(true);
  const [HomeSliderImgs, setHomeSliderImgs] = useState([]);
  const [FetchError, setFetchError] = useState(null);

  //Fetching The API Here


  useEffect(() => {

    //Function Declared to Fetch API Data
    const FetchHomeImgSlider = async () => {

      try {

        //Fetching The API Response 

        const FetchResponse = await axios.get(`${BE_URL}/homeImageSlider`);
        const FetchFilteredResponse = FetchResponse.data.data;

        //Checking If Status Code Is 200 Then Data Will Be Stored In useState

        if (FetchResponse.status === 200) {

          setHomeSliderImgs(FetchFilteredResponse);
          setFetchError(null);

        } else {

          setFetchError("Failed to load home slider images.");
          console.warn("Unexpected response status:", FetchResponse.status);

        }

        //Displaying The Error 

      } catch (error) {

        console.error("Unable To Fetch Data Of Home Page Image Slider:- ", error);
        setFetchError("An error occurred while loading home slider images.");

      }

    }

    //Calling The Function Only Once To Fetch Api Data

    FetchHomeImgSlider();

  }, []);


  //useEffect to slide the Image after Certain time

  useEffect(() => {
    if (HomeSliderImgs.length === 0) return;

    const SliderInterval = setInterval(() => {
      HandleNextBtn();
    }, 8000);

    return () => clearInterval(SliderInterval);
  }, [HomeSliderImgs]);

  //Handle Previous Button    

  const HandlePrevBtn = () => {
    setFade(false);
    setTimeout(() => {
      SetCurrentImgIdx((PrevVal) =>
        PrevVal === 0 ? HomeSliderImgs.length - 1 : PrevVal - 1
      );
      setFade(true);
    }, 200);
  };

  //Handle Next Button

  const HandleNextBtn = () => {
    if (HomeSliderImgs.length === 0) return;

    setFade(false);
    setTimeout(() => {
      SetCurrentImgIdx((PrevVal) =>
        PrevVal === HomeSliderImgs.length - 1 ? 0 : PrevVal + 1
      );
      setFade(true);
    }, 250);
  };


  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden shadow-2xl mb-6 bg-black">

      {/* Show loading or error message */}
      {FetchError && (
        <div className="text-center text-red-500 py-10">{FetchError}</div>
      )}
      {!HomeSliderImgs ? (
        <div className="text-center text-white py-10">Loading...</div>
      ) : (
        <>
          {/* Slider Image with Gradient Overlay */}
          <LazyLoadImage
            src={`${BE_URL}/Images/HomeImages/HomeImageSlider/${HomeSliderImgs[CurrentImgIdx]?.image}`}
            alt="slider"
            className={`w-full h-full object-cover transition-opacity duration-700  ${Fade ? "opacity-100" : "opacity-0"}`}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none"
            aria-hidden="true"
          />
          {/* Content Overlay */}
          {HomeSliderImgs[CurrentImgIdx]?.title && (
            <div
              className={`absolute left-0 top-0 z-20 h-full flex items-center ${getResponsivePadding()} w-full`}
            >
              <div className="max-w-3xl flex flex-col gap-4 select-none animate-fade-in">
                <h4 className="text-orange-100 text-lg md:text-2xl font-semibold tracking-wide mb-1 drop-shadow">
                  <Typewriter
                    options={{
                      strings: "Incredible Offers On",
                      autoStart: Fade,
                      loop: false,
                      delay: 40,
                      deleteSpeed: 24,
                    }}
                  />
                </h4>
                <h2 className="text-white xl:text-[4rem] lg:text-[3.2rem] text-2xl font-extrabold leading-tight drop-shadow-md mb-2">
                  <Typewriter
                    options={{
                      strings: HomeSliderImgs[CurrentImgIdx]?.title || "",
                      autoStart: Fade,
                      loop: false,
                      delay: 45,
                      deleteSpeed: 20,
                    }}
                  />
                </h2>
                <NavLink
                  to="#"
                  className="bg-orange-500/90 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-full shadow-lg border border-orange-400/60 hover:border-orange-500/80 transition-all duration-300 text-lg w-fit mt-2"
                >
                  Click Here
                </NavLink>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            className="hidden md:flex items-center justify-center absolute top-1/2 left-2 z-30 -translate-y-1/2 bg-black/40 hover:bg-orange-500/80 transition-all shadow-lg rounded-full"
            style={{ width: 54, height: 54 }}
            aria-label="Previous Slide"
            onClick={HandlePrevBtn}
            tabIndex={0}
          >
            <IoIosArrowBack size={36} className="text-white" />
          </button>
          <button
            className="hidden md:flex items-center justify-center absolute top-1/2 right-2 z-30 -translate-y-1/2 bg-black/40 hover:bg-orange-500/80 transition-all shadow-lg rounded-full"
            style={{ width: 54, height: 54 }}
            aria-label="Next Slide"
            onClick={HandleNextBtn}
            tabIndex={0}
          >
            <IoIosArrowForward size={36} className="text-white" />
          </button>

          {/* Dots */}
          <div className="absolute left-0 right-0 bottom-8 flex justify-center gap-3 z-30">
            {HomeSliderImgs.map((_, idx) => (
              <button
                key={idx}
                className={`transition-all duration-300 outline-none border-none
                ${idx === CurrentImgIdx
                    ? "w-8 h-3 bg-orange-400 rounded-full shadow"
                    : "w-3 h-3 bg-white/70 rounded-full border border-orange-300"
                  }`}
                style={{
                  transition: "all 0.3s cubic-bezier(.4,2,.6,1)"
                }}
                onClick={() => {
                  setFade(false);
                  setTimeout(() => {
                    SetCurrentImgIdx(idx);
                    setFade(true);
                  }, 220);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );

};  