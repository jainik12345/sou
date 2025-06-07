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

//       <div className="Slider-cont w-full h-[500px] relative overflow-hidden">
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

export const HomePageImgSlider = () => {

  const [CurrentImgIdx, SetCurrentImgIdx] = useState(0);
  const [Fade, setFade] = useState(true);

  useEffect(() => {
    const SliderInteval = setInterval(() => {
      HandleNextBtn();
    }, 8000);

    return () => {
      clearInterval(SliderInteval);
    };
  }, []);

  const HandlePrevBtn = () => {
    setFade(false);

    setTimeout(() => {
      SetCurrentImgIdx((PrevVal) => {
        return PrevVal === 0 ? SliderImgArr.length - 1 : PrevVal - 1;
      });
      setFade(true);
    }, 200);
  };

  const HandleNextBtn = () => {
    setFade(false);

    setTimeout(() => {
      SetCurrentImgIdx((PrevVal) => {
        return PrevVal === SliderImgArr.length - 1 ? 0 : PrevVal + 1;
      });
      setFade(true);
    }, 250);
  };

  return (

    <div className="carousel-section">

      <div className="Slider-cont w-full h-[85vh] relative overflow-hidden">
        <div
          className={`w-full h-100 absolute mt-15 py-20 ${SliderImgArr[CurrentImgIdx].ImgDescription === ""
            ? "hidden"
            : "md:block"
            } hidden`}
        >
          <div className="slider-desc flex flex-col max-w-screen-xl mx-auto px-50 gap-5">
            <h4 className="text-white text-2xl font-bold select-none">
              <Typewriter
                options={{
                  strings: "Incredible Offers On",
                  autoStart: Fade,
                  loop: false,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </h4>

            <h2 className="text-white xl:text-[5rem] lg:text-[4rem] text-[2.3rem] font-bold select-none">
              <Typewriter
                options={{
                  strings: `${SliderImgArr[CurrentImgIdx].ImgDescription}`,
                  autoStart: Fade,
                  loop: false,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              ></Typewriter>
            </h2>
            <NavLink
              to="#"
              className="bg-orange-color select-none w-fit py-4 px-10 text-white font-semibold rounded-full border border-transparent hover:border-orange-color hover:bg-transparent transition-all duration-700"
            >
              Click Here
            </NavLink>
          </div>
        </div>

        <img
          src={SliderImgArr[CurrentImgIdx].ImgUrl}
          alt="IMG"
          className={`w-full h-full object-cover transition-opacity duration-700 ${Fade ? "opacity-100" : "opacity-0"
            }`}
        />

        <button className="md:block hidden">
          <IoIosArrowBack
            size={70}
            onClick={HandlePrevBtn}
            className=" p-4  text-white absolute top-[50%] left-[3%] cursor-pointer transition-all duration-500  rounded"
          />
        </button>
        <button className="md:block hidden">
          <IoIosArrowForward
            size={70}
            onClick={HandleNextBtn}
            className=" p-4  text-white absolute top-[50%] right-[3%] cursor-pointer transition-all duration-500  rounded"
          />
        </button>
      </div>

    </div>
  );
};
