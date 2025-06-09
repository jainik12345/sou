// import bane_bg from "../../assets/images/SouBanner.webp";

// export const Banner = ({ Title }) => {
//   return (
//     <div
//       className="p-10 bg-center bg-cover bg-no-repeat "
//       style={{
//         backgroundImage: `linear-gradient(rgb(58, 58, 65), rgba(65, 58, 58, 0.7)), url(${bane_bg})`,
//       }}
//     >
//       <div className="text-orange-color text-2xl lg:text-3xl font-bold w-full flex items-center justify-center text-center p-4">
//         {Title}
//       </div>
//     </div>
//   );
// };

import { useEffect, useRef } from "react";
import bane_bg from "../../assets/images/SouBanner.webp";

export const Banner = ({ Title, subtitle }) => {
  const underlineRef = useRef(null);

  useEffect(() => {
    let timeoutAppear, timeoutOriginSwitch, timeoutDisappear;

    // Initial state: hidden, origin left
    if (underlineRef.current) {
      underlineRef.current.style.width = "0";
      underlineRef.current.style.transition = "none";
      underlineRef.current.style.transformOrigin = "left";
    }

    // Animate in (left to right, full width)
    timeoutAppear = setTimeout(() => {
      if (underlineRef.current) {
        underlineRef.current.style.transition = "width 1s cubic-bezier(0.4,0,0.2,1)";
        underlineRef.current.style.width = "100%";
      }
    }, 700);

    // Switch transformOrigin to right after the fill animation completes
    timeoutOriginSwitch = setTimeout(() => {
      if (underlineRef.current) {
        underlineRef.current.style.transition = "none";
        underlineRef.current.style.transformOrigin = "right";
      }
    }, 1700); // 700ms delay + 1s grow

    // Animate out (right to left, full width)
    timeoutDisappear = setTimeout(() => {
      if (underlineRef.current) {
        underlineRef.current.style.transition = "width 1s cubic-bezier(0.4,0,0.2,1)";
        underlineRef.current.style.width = "0";
      }
    }, 2200); // 700ms delay + 1s grow + 500ms pause

    return () => {
      clearTimeout(timeoutAppear);
      clearTimeout(timeoutOriginSwitch);
      clearTimeout(timeoutDisappear);
    };
  }, [Title]);

  return (
    <div
      className="relative h-40 md:h-56 overflow-hidden flex items-center justify-center bg-center bg-cover "
      style={{
        backgroundImage: `url(${bane_bg})`,
      }}
    >
      {/* Soft overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-black-900/40" />

      <div className="relative z-10  w-fit flex flex-col items-center justify-center text-center px-10">
        <h1 className="text-white text-xl md:text-3xl font-extrabold tracking-wide drop-shadow-lg">
          {Title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-orange-100 text-base md:text-lg font-medium drop-shadow">
            {subtitle}
          </p>
        )}
        {/* Animated underline - full width */}
        <div
          ref={underlineRef}
          className="mt-4 h-1 w-fit bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 rounded-full mx-auto opacity-90"
          style={{
            width: 0,
            transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
};