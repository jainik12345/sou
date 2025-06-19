import { AboutStatueInfo } from "../AboutData.js";
import { motion } from "framer-motion";

export const AboutSouInfo = () => {
  return (
    <div className="bg-gray-100 py-10">
      {AboutStatueInfo.map((Val, Idx) => (
        <div
          className="max-w-screen-xl mx-auto px-4 md:px-10 py-8 flex flex-col gap-6"
          key={Idx}
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="md:text-4xl text-2xl font-semibold text-orange-500">
              About Statue of Unity
            </h2>
          </div>

          {/* Description */}
          <div>
            <p className="text-justify md:text-md text-sm font-medium text-gray-700">
              {Val.ImgDesc}
            </p>
          </div>

          {/* Images Section */}
          <div className="flex md:flex-row flex-col justify-around items-center gap-6 mt-4">
            {Val.StatueImgs.map((ValImg, ValIdx) => (
              <motion.div
                className="flex flex-col justify-center items-center text-center gap-2"
                key={ValIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ValIdx * 0.16 }}
                viewport={{ once: true }}
              >
                <img
                  src={ValImg.ImgUrl}
                  alt={ValImg.ImgTitle}
                  className="md:h-44 h-36 w-auto object-contain rounded mb-2"
                />
                <h3 className="font-bold text-orange-600 text-lg">{ValImg.ImgTitle}</h3>
                <h4 className="text-gray-600 font-semibold text-base">{ValImg.Height}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};