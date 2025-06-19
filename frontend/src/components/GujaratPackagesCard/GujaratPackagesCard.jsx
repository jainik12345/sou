// import { KnowMore } from "../Buttons/KnowMore";
// import { Inquiry } from "../Buttons/Inquiry";

// export const GujaratPackagesCard = ({ CardImg, CardTitle, CardPara }) => {
//   return (
//     <>
//       <div className="card-cont p-5 rounded-2xl shadow-xl/30 flex flex-col gap-10">
//         <div className="card-img">
//           <img src={CardImg} alt="IMG " className="40" />
//         </div>

//         <div className="card-desc flex flex-col gap-5">
//           <h2 className="font-semibold text-[1.2rem] text-orange-color text-center">
//             {CardTitle}
//           </h2>

//           <p className="font-semibold text-[1rem] text-gray-600 text-center">
//             {CardPara}
//           </p>

//           <div className="flex gap-5 justify-around">
//             <KnowMore Text={"Book Now"} />
//             <Inquiry />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

/** */

import { KnowMore } from "../Buttons/KnowMore";
import { Inquiry } from "../Buttons/Inquiry";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";



export const GujaratPackagesCard = ({ CardImg, TourTitle, PlacesName }) => {
  return (
    <div className="card-cont flex max-w-[1440px] flex-col cursor-pointer bg-white rounded-xl shadow-lg h-full overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <LazyLoadImage
          src={CardImg}
          alt={TourTitle || "IMG"}
          className="w-full h-55 object-cover rounded-t-2xl"
        />
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl"></div>
      </div>
      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tour Title */}
        <h2 className="font-bold text-lg text-orange-500 text-center tracking-wide mb-2">
          {TourTitle}
        </h2>
        {/* Places Name with icon */}
        <div className="flex items-center justify-center mb-5">
          <p className="font-medium text-gray-700 text-center text-sm break-words max-h-16 overflow-auto scrollbar-thin scrollbar-thumb-orange-200">
            {PlacesName}
          </p>
        </div>
        {/* Spacer to push buttons down */}
        <div className="flex-1"></div>
        {/* Button Section */}
        <div className="flex gap-4 justify-center w-full mt-auto">
          <KnowMore Text="Book Now" className="transition hover:scale-105" />
          <Inquiry className="transition hover:scale-105" />
        </div>
      </div>
    </div>
  );
};

export default GujaratPackagesCard;
