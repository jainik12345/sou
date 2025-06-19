// import { useEffect, useState, useRef } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { NavLink } from "react-router-dom";
// import Typewriter from "typewriter-effect";
// import BE_URL from "../../../config";
// import axios from "axios";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// const getResponsivePadding = () => "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52";

// export const HomePageImgSlider = () => {
//   const [CurrentImgIdx, SetCurrentImgIdx] = useState(0);
//   const [Fade, setFade] = useState(true);
//   const [HomeSliderImgs, setHomeSliderImgs] = useState([]);
//   const [FetchError, setFetchError] = useState(null);
//   const [countdown, setCountdown] = useState(5);

//   const countdownRef = useRef();

//   // Fetch images
//   useEffect(() => {
//     const FetchHomeImgSlider = async () => {
//       try {
//         const FetchResponse = await axios.get(`${BE_URL}/homeImageSlider`);
//         const FetchFilteredResponse = FetchResponse.data.data;
//         if (FetchResponse.status === 200) {
//           setHomeSliderImgs(FetchFilteredResponse);
//           setFetchError(null);
//         } else {
//           setFetchError("Failed to load home slider images.");
//           console.warn("Unexpected response status:", FetchResponse.status);
//         }
//       } catch (error) {
//         console.error(
//           "Unable To Fetch Data Of Home Page Image Slider:- ",
//           error
//         );
//         setFetchError("An error occurred while loading home slider images.");
//       }
//     };
//     FetchHomeImgSlider();
//   }, []);

//   // Auto-advance image and reset countdown
//   useEffect(() => {
//     if (HomeSliderImgs.length === 0) return;
//     setCountdown(8); // Reset countdown when images loaded or changed
//     const SliderInterval = setInterval(() => {
//       HandleNextBtn();
//     }, 5000);
//     return () => clearInterval(SliderInterval);
//     // eslint-disable-next-line
//   }, [HomeSliderImgs, CurrentImgIdx]);

//   // Countdown effect
//   useEffect(() => {
//     if (HomeSliderImgs.length === 0) return;
//     setCountdown(5); // Always reset when image changes

//     // Setup a 1-second interval to decrease the timer
//     countdownRef.current && clearInterval(countdownRef.current);
//     countdownRef.current = setInterval(() => {
//       setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     // Cleanup
//     return () => {
//       clearInterval(countdownRef.current);
//     };
//   }, [CurrentImgIdx, HomeSliderImgs]);

//   const HandlePrevBtn = () => {
//     setFade(false);
//     setTimeout(() => {
//       SetCurrentImgIdx((PrevVal) =>
//         PrevVal === 0 ? HomeSliderImgs.length - 1 : PrevVal - 1
//       );
//       setFade(true);
//     }, 200);
//   };

//   const HandleNextBtn = () => {
//     if (HomeSliderImgs.length === 0) return;
//     setFade(false);
//     setTimeout(() => {
//       SetCurrentImgIdx((PrevVal) =>
//         PrevVal === HomeSliderImgs.length - 1 ? 0 : PrevVal + 1
//       );
//       setFade(true);
//     }, 250);
//   };

//   return (
//     <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden shadow-2xl mb-6 bg-black">
//       {/* Show loading or error message */}
//       {FetchError && (
//         <div className="text-center text-red-500 py-10">{FetchError}</div>
//       )}
//       {!HomeSliderImgs ? (
//         <div className="text-center text-white py-10">Loading...</div>
//       ) : (
//         <>
//           {/* Slider Image with Gradient Overlay */}
//           <LazyLoadImage
//             src={`${BE_URL}/Images/HomeImages/HomeImageSlider/${HomeSliderImgs[CurrentImgIdx]?.image}`}
//             alt="slider"
//             className={`w-full h-full object-cover transition-opacity duration-700  ${
//               Fade ? "opacity-100" : "opacity-0"
//             }`}
//           />
//           <div
//             className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none"
//             aria-hidden="true"
//           />
//           {/* Content Overlay */}
//           {HomeSliderImgs[CurrentImgIdx]?.title && (
//             <div
//               className={`absolute left-0 top-0 z-20 h-full flex items-center ${getResponsivePadding()} w-full`}
//             >
//               <div className="max-w-3xl flex flex-col gap-4 select-none animate-fade-in">
//                 <h4 className="text-orange-100 text-lg md:text-2xl font-semibold tracking-wide mb-1 drop-shadow">
//                   <Typewriter
//                     options={{
//                       strings: "Incredible Offers On",
//                       autoStart: Fade,
//                       loop: false,
//                       delay: 40,
//                       deleteSpeed: 24,
//                     }}
//                   />
//                 </h4>
//                 <h2 className="text-white xl:text-[4rem] lg:text-[3.2rem] text-2xl font-extrabold leading-tight drop-shadow-md mb-2">
//                   <Typewriter
//                     options={{
//                       strings: HomeSliderImgs[CurrentImgIdx]?.title || "",
//                       autoStart: Fade,
//                       loop: false,
//                       delay: 45,
//                       deleteSpeed: 20,
//                     }}
//                   />
//                 </h2>
//                 <NavLink
//                   to="#"
//                   className="bg-orange-500/90 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-full shadow-lg border border-orange-400/60 hover:border-orange-500/80 transition-all duration-300 text-lg w-fit mt-2"
//                 >
//                   Click Here
//                 </NavLink>
//                 {/* Countdown Timer */}
//                 {/* <div className="text-white text-xl mt-4 select-none">
//                   Next in: <span className="font-bold">{countdown}s</span>
//                 </div> */}
//               </div>
//             </div>
//           )}

//           {/* Navigation Arrows */}
//           <button
//             className="hidden md:flex items-center justify-center absolute top-1/2 left-2 z-30 -translate-y-1/2 bg-black/40 hover:bg-orange-500/80 transition-all shadow-lg rounded-full"
//             style={{ width: 54, height: 54 }}
//             aria-label="Previous Slide"
//             onClick={HandlePrevBtn}
//             tabIndex={0}
//           >
//             <IoIosArrowBack size={36} className="text-white" />
//           </button>
//           <button
//             className="hidden md:flex items-center justify-center absolute top-1/2 right-2 z-30 -translate-y-1/2 bg-black/40 hover:bg-orange-500/80 transition-all shadow-lg rounded-full"
//             style={{ width: 54, height: 54 }}
//             aria-label="Next Slide"
//             onClick={HandleNextBtn}
//             tabIndex={0}
//           >
//             <IoIosArrowForward size={36} className="text-white" />
//           </button>

//           {/* Dots */}
//           <div className="absolute left-0 right-0 bottom-8 flex justify-center gap-3 z-30">
//             {HomeSliderImgs.map((_, idx) => (
//               <button
//                 key={idx}
//                 className={`transition-all duration-300 outline-none border-none
//                 ${
//                   idx === CurrentImgIdx
//                     ? "w-4 h-1.5 bg-orange-400 rounded-full shadow"
//                     : "w-1.5 h-1.5 bg-white/70 rounded-full border border-orange-300"
//                 }`}
//                 style={{
//                   transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
//                 }}
//                 onClick={() => {
//                   setFade(false);
//                   setTimeout(() => {
//                     SetCurrentImgIdx(idx);
//                     setFade(true);
//                   }, 220);
//                 }}
//                 aria-label={`Go to slide ${idx + 1}`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

/* */

import { useEffect, useState, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import BE_URL from "../../../config";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const getResponsivePadding = () => "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52";

// Utility to slugify string for URL
const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // non-word to hyphen
    .replace(/^-+|-+$/g, ""); // trim hyphens from ends

export const HomePageImgSlider = () => {
  const [CurrentImgIdx, SetCurrentImgIdx] = useState(0);
  const [Fade, setFade] = useState(true);
  const [HomeSliderImgs, setHomeSliderImgs] = useState([]);
  const [FetchError, setFetchError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const countdownRef = useRef();
  const navigate = useNavigate();

  // Fetch images
  useEffect(() => {
    const FetchHomeImgSlider = async () => {
      try {
        const FetchResponse = await axios.get(`${BE_URL}/homeImageSlider`);
        const FetchFilteredResponse = FetchResponse.data.data;
        if (FetchResponse.status === 200) {
          setHomeSliderImgs(FetchFilteredResponse);
          setFetchError(null);
        } else {
          setFetchError("Failed to load home slider images.");
          console.warn("Unexpected response status:", FetchResponse.status);
        }
      } catch (error) {
        console.error(
          "Unable To Fetch Data Of Home Page Image Slider:- ",
          error
        );
        setFetchError("An error occurred while loading home slider images.");
      }
    };
    FetchHomeImgSlider();
  }, []);

  // Auto-advance image and reset countdown
  useEffect(() => {
    if (HomeSliderImgs.length === 0) return;
    setCountdown(8); // Reset countdown when images loaded or changed
    const SliderInterval = setInterval(() => {
      HandleNextBtn();
    }, 5000);
    return () => clearInterval(SliderInterval);
    // eslint-disable-next-line
  }, [HomeSliderImgs, CurrentImgIdx]);

  // Countdown effect
  useEffect(() => {
    if (HomeSliderImgs.length === 0) return;
    setCountdown(5); // Always reset when image changes

    // Setup a 1-second interval to decrease the timer
    countdownRef.current && clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(countdownRef.current);
    };
  }, [CurrentImgIdx, HomeSliderImgs]);

  const HandlePrevBtn = () => {
    setFade(false);
    setTimeout(() => {
      SetCurrentImgIdx((PrevVal) =>
        PrevVal === 0 ? HomeSliderImgs.length - 1 : PrevVal - 1
      );
      setFade(true);
    }, 200);
  };

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

  // Handle click for "Click Here" button
  const handleClickHere = () => {
    const title = HomeSliderImgs[CurrentImgIdx]?.title;
    if (title) {
      const slug = slugify(title);
      navigate(`/stay-in-tent/${slug}`);
    }
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
            className={`w-full h-full object-cover transition-opacity duration-700  ${
              Fade ? "opacity-100" : "opacity-0"
            }`}
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
                {/* Use button instead of NavLink for routing */}
                <button
                  onClick={handleClickHere}
                  className="bg-orange-500/90 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-full shadow-lg border border-orange-400/60 hover:border-orange-500/80 cursor-pointer transition-all duration-300 text-lg w-fit mt-2"
                >
                  Click Here
                </button>
                {/* Countdown Timer */}
                {/* <div className="text-white text-xl mt-4 select-none">
                  Next in: <span className="font-bold">{countdown}s</span>
                </div> */}
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
                ${
                  idx === CurrentImgIdx
                    ? "w-4 h-1.5 bg-orange-400 rounded-full shadow"
                    : "w-1.5 h-1.5 bg-white/70 rounded-full border border-orange-300"
                }`}
                style={{
                  transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
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
