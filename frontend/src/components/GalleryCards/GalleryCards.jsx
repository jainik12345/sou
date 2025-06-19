// import { IoIosSearch } from "react-icons/io";
// import { useState } from "react";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { RiCloseLargeFill } from "react-icons/ri";
// import BE_URL from "../../config";

// export const GalleryCards = ({ GalleryImgs }) => {
//   const [IsImgClickedIdx, setIsImgClickedIdx] = useState(null);

//   return (
//     <>
//       {IsImgClickedIdx !== null && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center px-5 gap-4 border backdrop-blur-sm bg-black/70 select-none">
//           <button
//             className="absolute top-4 right-4 text-gray-300 text-3xl z-50 cursor-pointer"
//             onClick={() => setIsImgClickedIdx(null)}
//           >
//             <RiCloseLargeFill />
//           </button>

//           <IoIosArrowBack
//             className="text-5xl text-grey-text cursor-pointer"
//             onClick={() =>
//               setIsImgClickedIdx((prev) =>
//                 prev === 0 ? GalleryImgs.length - 1 : prev - 1
//               )
//             }
//           />

//           <div
//             className="relative bg-white p-4 rounded-lg shadow-lg flex items-center justify-center"
//             style={{
//               width: "80vw",
//               height: "80vh",
//               maxWidth: 900,
//               maxHeight: 700,
//             }}
//           >
//             <img
//               src={`${BE_URL}/Images/SouPackage/SouPackageGalleryImages/${GalleryImgs[IsImgClickedIdx].image}`}
//               alt="Pop Up Img"
//               className="w-full h-full object-cover rounded-lg"
//               style={{ maxWidth: "100%", maxHeight: "100%" }}
//             />
//           </div>

//           <IoIosArrowForward
//             className="text-5xl text-grey-text cursor-pointer"
//             onClick={() =>
//               setIsImgClickedIdx((prev) =>
//                 prev === GalleryImgs.length - 1 ? 0 : prev + 1
//               )
//             }
//           />
//         </div>
//       )}

//       {GalleryImgs &&
//         GalleryImgs?.map((val, idx) => {
//           return (
//             <div
//               className="gallery-card relative group"
//               key={idx}
//               onClick={() => {
//                 setIsImgClickedIdx(idx);
//               }}
//             >
//               <img
//                 src={`${BE_URL}/Images/SouPackage/SouPackageGalleryImages/${val.image}`}
//                 alt="IMG"
//                 className="h-60 w-100 rounded-2xl"
//               />
//               <div className="absolute top-0 left-0 w-full h-0 bg-black z-10 transition-all duration-500 ease-in-out group-hover:h-full rounded-2xl opacity-50 flex justify-between items-center flex-col gap-5 cursor-pointer group-hover:pt-25 group-hover:pb-2">
//                 <IoIosSearch
//                   size={30}
//                   className="text-white hidden group-hover:block"
//                 />
//                 <span className="hidden group-hover:block text-white text-[1.2rem]">
//                   {val.title}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//     </>
//   );
// };

/* */

import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import BE_URL from "../../config";

export const GalleryCards = ({ GalleryImgs }) => {
  const [IsImgClickedIdx, setIsImgClickedIdx] = useState(null);

  // Swipe handling for mobile
  const popupImgRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Media query for mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640); // Tailwind's sm
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent background scroll when popup is open
  useEffect(() => {
    if (IsImgClickedIdx !== null) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [IsImgClickedIdx]);

  // Touch event handlers for swipe (for mobile)
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // swipe left, next image
        setIsImgClickedIdx((prev) =>
          prev === GalleryImgs.length - 1 ? 0 : prev + 1
        );
      } else {
        // swipe right, prev image
        setIsImgClickedIdx((prev) =>
          prev === 0 ? GalleryImgs.length - 1 : prev - 1
        );
      }
    }
    // reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation support (desktop only)
  useEffect(() => {
    if (IsImgClickedIdx === null || isMobile) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsImgClickedIdx(null);
      if (e.key === "ArrowRight")
        setIsImgClickedIdx((prev) =>
          prev === GalleryImgs.length - 1 ? 0 : prev + 1
        );
      if (e.key === "ArrowLeft")
        setIsImgClickedIdx((prev) =>
          prev === 0 ? GalleryImgs.length - 1 : prev - 1
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [IsImgClickedIdx, GalleryImgs.length, isMobile]);

  return (
    <>
      {IsImgClickedIdx !== null && (
        <div
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            ${isMobile ? "p-0" : "px-5 gap-4"}
            border backdrop-blur-sm bg-black/80 select-none
          `}
          style={{ touchAction: "none" }}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-gray-300 text-3xl z-50 cursor-pointer"
            onClick={() => setIsImgClickedIdx(null)}
            aria-label="Close"
          >
            <RiCloseLargeFill />
          </button>

          {/* Desktop left arrow */}
          {!isMobile && GalleryImgs.length > 1 && (
            <IoIosArrowBack
              className="text-5xl text-white/70 hover:text-white cursor-pointer"
              onClick={() =>
                setIsImgClickedIdx((prev) =>
                  prev === 0 ? GalleryImgs.length - 1 : prev - 1
                )
              }
            />
          )}

          {/* Popup Image */}
          <div
            className={`
              relative bg-white ${
                isMobile
                  ? "p-0 rounded-none w-full h-full max-w-none max-h-none"
                  : "p-4 rounded-xl"
              }
              shadow-lg flex items-center justify-center
              ${
                isMobile
                  ? "w-full h-full"
                  : "w-[80vw] h-[80vh] max-w-[900px] max-h-[700px]"
              }
              overflow-hidden
            `}
            ref={popupImgRef}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
          >
            <img
              src={`${BE_URL}/Images/SouPackage/SouPackageGalleryImages/${GalleryImgs[IsImgClickedIdx].image}`}
              alt="Pop Up Img"
              className={`${
                isMobile ? "w-full h-full" : "w-full h-full"
              } object-contain`}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                userSelect: "none",
              }}
              draggable={false}
            />
            {/* Title: only show on desktop */}
            {!isMobile && (
              <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-semibold bg-black/40 rounded-xl pointer-events-none select-none">
                {GalleryImgs[IsImgClickedIdx]?.title}
              </span>
            )}
          </div>

          {/* Desktop right arrow */}
          {!isMobile && GalleryImgs.length > 1 && (
            <IoIosArrowForward
              className="text-5xl text-white/70 hover:text-white cursor-pointer"
              onClick={() =>
                setIsImgClickedIdx((prev) =>
                  prev === GalleryImgs.length - 1 ? 0 : prev + 1
                )
              }
            />
          )}
        </div>
      )}

      {GalleryImgs &&
        GalleryImgs.map((val, idx) => {
          return (
            <div
              className="gallery-card relative group cursor-pointer"
              key={idx}
              onClick={() => {
                setIsImgClickedIdx(idx);
              }}
            >
              <img
                src={`${BE_URL}/Images/SouPackage/SouPackageGalleryImages/${val.image}`}
                alt="IMG"
                className="h-60 w-100 rounded-2xl object-cover object-center"
                draggable={false}
              />
              {/* Overlay: Only show text in middle of image on desktop; nothing on mobile */}
              <div
                className={`
                absolute top-0 left-0 w-full h-full z-10 transition-all duration-500 ease-in-out rounded-2xl
                flex items-center justify-center
                ${
                  isMobile
                    ? "opacity-0"
                    : "bg-black/50 group-hover:opacity-100 opacity-0"
                }
              `}
              >
                {!isMobile && (
                  <span className="text-white text-xl font-semibold text-center px-4">
                    {val.title}
                  </span>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};
