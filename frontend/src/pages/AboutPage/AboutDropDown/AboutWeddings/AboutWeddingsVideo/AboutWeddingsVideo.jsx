// import { useState } from "react";
import { AboutWeddingVideoData } from "../../../AboutData";
// import { FaCirclePlay } from "react-icons/fa6";
// import { motion } from "framer-motion";

export const AboutWeddingsVideo = () => {
  // const [IsPlayed, setIsPlayed] = useState(false);

  return (
    <>
      <div className="AboutWeddingsVideo-section bg-gray-100">
        <div className="AboutWeddingsVideo-cont max-w-screen-xl mx-auto md:px-10 px-5 py-20">
          {AboutWeddingVideoData &&
            AboutWeddingVideoData.map((VideoVal, Idx) => {
              return (
                <div key={Idx} className="flex flex-col gap-5">
                  <div className="heading text-center ">
                    <h2 className="text-orange-color font-bold md:text-[2.5rem] text-[1.4rem] font-(family-name:--font-title-font)">
                      Tie The Knot At The Iconic Statue Of Unity
                    </h2>
                  </div>

                  <div className="video-section relative flex justify-center items-center w-fit h-fit">
                    {/* <motion.div
                      initial={{ scale: 1 }}
                      animate={{
                        scale: IsPlayed ? 1 : [1, 1.2, 1],
                        opacity: IsPlayed ? 0 : 1,
                      }}
                      transition={{
                        duration: IsPlayed ? 0.3 : 1.2,
                        repeat: IsPlayed ? 0 : Infinity,
                        ease: "easeInOut",
                      }}
                      className={`absolute text-orange-color bg-white rounded-full p-3 cursor-pointer ${IsPlayed ? "hidden" : ""}`}
                      onClick={() => setIsPlayed(true)}
                    >
                      <FaCirclePlay size={60} />
                    </motion.div> */}

                    <video
                      src={VideoVal.VideoUrl}
                      autoPlay
                      loop
                      muted
                    ></video>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
