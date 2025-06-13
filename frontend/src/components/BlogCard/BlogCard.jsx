import { NavLink } from "react-router-dom";

const BlogCard = ({ image, title, category, date, redirect }) => {
  return (
    <NavLink to={`/blogs/${redirect}`}>
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group flex flex-col h-full">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-4 left-4 bg-orange-color text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {category}
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col justify-between">
          <h2 className="text-[16px] font-bold text-gray-800 mb-2 group-hover:text-orange-color transition-colors duration-300 line-clamp-2 min-h-[40px]">
            {title}
          </h2>
          <p className="text-sm text-gray-700">{date}</p>
        </div>
      </div>
    </NavLink>
  );
};

export default BlogCard;
