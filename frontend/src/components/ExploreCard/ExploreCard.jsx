import BE_URL from "../../config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional effect

export const ExploreCard = ({ visibleCards }) => {
  return (
    <>
      {visibleCards.map((item, index) => (
        <div
          key={item.id || index}
          className="Explore-card group bg-white rounded-2xl shadow-md shadow-grey-text p-3 max-w-[400px] my-5 flex flex-col transition-all duration-500 ease-in-out"
        >
          {/* Card Image */}
           <div className="Card-img mb-10">
            <LazyLoadImage
              src={`${BE_URL}/Images/HomeImages/HomeNearAttractions/${item.image}`}
              alt={item.Title || item.title || "Image"}
              className="h-55 w-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Title */}
          <div className="Card-Title text-center text-orange-color font-bold text-2xl relative">
            <div className="animation-title absolute inset-0 w-0 h-full bg-none z-0 group-hover:w-full group-hover:bg-orange-color transition-all duration-700"></div>
            <h3 className="relative z-10 py-3 group-hover:text-white">
              {item.Title || item.title}
            </h3>
          </div>

          {/* Timing */}
          <div className="Card-Timing relative text-center font-semibold overflow-hidden  group bg-white">
            <div className="absolute top-0 right-0 h-full w-0 bg-orange-color z-0 transition-all duration-700 origin-right group-hover:w-full"></div>
            <h4 className="relative z-10 py-3 text-gray-600 group-hover:text-white transition-all duration-700">
              {item.Timing || item.time}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};