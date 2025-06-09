// import { useEffect, useState } from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import { NavLink } from "react-router-dom";
// import Typewriter from "typewriter-effect";
// import { SliderImgArr } from "../HomeData";

// export const HomePageImgSlider = () => {

//   const [CurrentImgIdx, SetCurrentImgIdx] = useState(0);
//   const [Fade, setFade] = useState(true);

//   useEffect(() => {
//     const SliderInteval = setInterval(() => {
//       HandleNextBtn();
//     }, 8000);

//     return () => {
//       clearInterval(SliderInteval);
//     };
//   }, []);

//   const HandlePrevBtn = () => {
//     setFade(false);

//     setTimeout(() => {
//       SetCurrentImgIdx((PrevVal) => {
//         return PrevVal === 0 ? SliderImgArr.length - 1 : PrevVal - 1;
//       });
//       setFade(true);
//     }, 200);
//   };

//   const HandleNextBtn = () => {
//     setFade(false);

//     setTimeout(() => {
//       SetCurrentImgIdx((PrevVal) => {
//         return PrevVal === SliderImgArr.length - 1 ? 0 : PrevVal + 1;
//       });
//       setFade(true);
//     }, 250);
//   };

//   return (

//     <div className="carousel-section">

//       <div className="Slider-cont w-full h-[85vh] relative overflow-hidden">
//         <div
//           className={`w-full h-100 absolute mt-15 py-20 ${SliderImgArr[CurrentImgIdx].ImgDescription === ""
//             ? "hidden"
//             : "md:block"
//             } hidden`}
//         >
//           <div className="slider-desc flex flex-col max-w-screen-xl mx-auto px-50 gap-5">
//             <h4 className="text-white text-2xl font-bold select-none">
//               <Typewriter
//                 options={{
//                   strings: "Incredible Offers On",
//                   autoStart: Fade,
//                   loop: false,
//                   delay: 50,
//                   deleteSpeed: 30,
//                 }}
//               />
//             </h4>

//             <h2 className="text-white xl:text-[5rem] lg:text-[4rem] text-[2.3rem] font-bold select-none">
//               <Typewriter
//                 options={{
//                   strings: `${SliderImgArr[CurrentImgIdx].ImgDescription}`,
//                   autoStart: Fade,
//                   loop: false,
//                   delay: 50,
//                   deleteSpeed: 30,
//                 }}
//               ></Typewriter>
//             </h2>
//             <NavLink
//               to="#"
//               className="bg-orange-color select-none w-fit py-4 px-10 text-white font-semibold rounded-full border border-transparent hover:border-orange-color hover:bg-transparent transition-all duration-700"
//             >
//               Click Here
//             </NavLink>
//           </div>
//         </div>

//         <img
//           src={SliderImgArr[CurrentImgIdx].ImgUrl}
//           alt="IMG"
//           className={`w-full h-full object-cover transition-opacity duration-700 ${Fade ? "opacity-100" : "opacity-0"
//             }`}
//         />

//         <button className="md:block hidden">
//           <IoIosArrowBack
//             size={70}
//             onClick={HandlePrevBtn}
//             className=" p-4  text-white absolute top-[50%] left-[3%] cursor-pointer transition-all duration-500  rounded"
//           />
//         </button>
//         <button className="md:block hidden">
//           <IoIosArrowForward
//             size={70}
//             onClick={HandleNextBtn}
//             className=" p-4  text-white absolute top-[50%] right-[3%] cursor-pointer transition-all duration-500  rounded"
//           />
//         </button>
//       </div>

//     </div>
//   );
// };


import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { SliderImgArr } from "../HomeData";

// Responsive padding helper
const getResponsivePadding = () =>
  "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-52";

export const HomePageImgSlider = () => {
  const [CurrentImgIdx, SetCurrentImgIdx] = useState(0);
  const [Fade, setFade] = useState(true);

  useEffect(() => {
    const SliderInteval = setInterval(() => {
      HandleNextBtn();
    }, 8000);
    return () => clearInterval(SliderInteval);
  }, []);

  const HandlePrevBtn = () => {
    setFade(false);
    setTimeout(() => {
      SetCurrentImgIdx((PrevVal) =>
        PrevVal === 0 ? SliderImgArr.length - 1 : PrevVal - 1
      );
      setFade(true);
    }, 200);
  };

  const HandleNextBtn = () => {
    setFade(false);
    setTimeout(() => {
      SetCurrentImgIdx((PrevVal) =>
        PrevVal === SliderImgArr.length - 1 ? 0 : PrevVal + 1
      );
      setFade(true);
    }, 250);
  };

  return (
    <section className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden shadow-2xl mb-6 bg-black">
      {/* Slider Image with Gradient Overlay */}
      <img
        src={SliderImgArr[CurrentImgIdx].ImgUrl}
        alt="slider"
        className={`w-full h-full object-cover transition-opacity duration-700 ${Fade ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none"
        aria-hidden="true"
      />
      {/* Content Overlay */}
      {SliderImgArr[CurrentImgIdx].ImgDescription !== "" && (
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
                  strings: `${SliderImgArr[CurrentImgIdx].ImgDescription}`,
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
        {SliderImgArr.map((_, idx) => (
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
    </section>
  );
};  