// // import { useState } from "react";
// import { AboutWeddingVideoData } from "../../../AboutData";
// // import { FaCirclePlay } from "react-icons/fa6";
// // import { motion } from "framer-motion";

// export const AboutWeddingsVideo = () => {
//   // const [IsPlayed, setIsPlayed] = useState(false);

//   return (
//     <>
//       <div className="AboutWeddingsVideo-section bg-gray-100">
//         <div className="AboutWeddingsVideo-cont max-w-screen-xl mx-auto md:px-10 px-5 py-20">
//           {AboutWeddingVideoData &&
//             AboutWeddingVideoData.map((VideoVal, Idx) => {
//               return (
//                 <div key={Idx} className="flex flex-col gap-5">
//                   <div className="heading text-center ">
//                     <h2 className="text-orange-color font-bold md:text-[2.5rem] text-[1.4rem] font-(family-name:--font-title-font)">
//                       Tie The Knot At The Iconic Statue Of Unity
//                     </h2>
//                   </div>

//                   <div className="video-section relative flex justify-center items-center w-fit h-fit">
//                     {/* <motion.div
//                       initial={{ scale: 1 }}
//                       animate={{
//                         scale: IsPlayed ? 1 : [1, 1.2, 1],
//                         opacity: IsPlayed ? 0 : 1,
//                       }}
//                       transition={{
//                         duration: IsPlayed ? 0.3 : 1.2,
//                         repeat: IsPlayed ? 0 : Infinity,
//                         ease: "easeInOut",
//                       }}
//                       className={`absolute text-orange-color bg-white rounded-full p-3 cursor-pointer ${IsPlayed ? "hidden" : ""}`}
//                       onClick={() => setIsPlayed(true)}
//                     >
//                       <FaCirclePlay size={60} />
//                     </motion.div> */}

//                     <video
//                       src={VideoVal.VideoUrl}
//                       autoPlay
//                       loop
//                       muted
//                     ></video>
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };



import { useState } from "react";
import { AboutWeddingVideoData } from "../../../AboutData";
import { FaCirclePlay } from "react-icons/fa6";
import { motion } from "framer-motion";

export const AboutWeddingsVideo = () => {
  const [isPlayed, setIsPlayed] = useState(false);

  return (
    <section className="AboutWeddingsVideo-section bg-gray-100 py-20">
      <div className="AboutWeddingsVideo-cont max-w-screen-xl mx-auto px-2 md:px-8">
        {AboutWeddingVideoData &&
          AboutWeddingVideoData.map((video, idx) => (
            <div key={idx} className="flex flex-col gap-8 items-center">
              <div className="heading text-center mb-6">
                <h2 className="text-orange-600 font-bold md:text-4xl text-2xl font-title tracking-tight drop-shadow">
                  Tie The Knot At The Iconic Statue Of Unity
                </h2>
                <p className="max-w-xl mx-auto mt-3 text-gray-600 text-base md:text-lg">
                  Experience a wedding like never before at one of India's most iconic landmarks. Celebrate your special day in grandeur and elegance.
                </p>
              </div>

              <div className="video-section relative flex justify-center items-center rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl aspect-video bg-black group">
                {!isPlayed && (
                  <motion.button
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute z-10 text-orange-500 bg-white/80 hover:bg-orange-100 rounded-full p-4 cursor-pointer shadow-md transition-all group-hover:scale-110"
                    onClick={() => setIsPlayed(true)}
                    aria-label="Play Wedding Video"
                  >
                    <FaCirclePlay size={64} />
                  </motion.button>
                )}

                <video
                  src={video.VideoUrl}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${isPlayed ? "opacity-100" : "opacity-80 blur-sm grayscale"}`}
                  autoPlay={isPlayed}
                  loop
                  muted
                  controls={isPlayed}
                  poster={video.ThumbnailUrl || ""}
                  playsInline
                ></video>
                {/* Fallback text for video */}
                <span className="sr-only">Wedding venue highlights video</span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};