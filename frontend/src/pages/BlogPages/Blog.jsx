// /* eslint-disable no-unused-vars */

// import React, { useEffect, useState } from "react";
// import BlogCard from "../../components/BlogCard/BlogCard";
// import { useNavigate } from "react-router-dom";
// import BE_URL from "../../config";
// import { motion } from "framer-motion";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";

// export const Blog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${BE_URL}/blogDataDetails`)
//       .then((res) => res.json())
//       .then((result) => setBlogs(result.data || []));

//     fetch(`${BE_URL}/blogcategoryName`)
//       .then((res) => res.json())
//       .then((result) => setCategories(result.data || []));
//   }, []);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="section bg-gray-100 min-h-screen"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center mb-10"
//           initial={{ y: -20, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true, amount: 0.5 }}
//         >
//           Latest Blog Posts
//         </motion.h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((val) => {
//             const category = categories.find(
//               (cat) => cat.id === val.blog_category_id
//             );

//             return (
//               <motion.div
//                 key={val.id}
//                 className="cursor-pointer"
//                 variants={cardVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.3 }}
//                 onClick={() => navigate(`/blogs/${val.id}`)}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.97 }}
//               >
//                 <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
//                   <LazyLoadImage
//                     src={
//                       val.image
//                         ? `${BE_URL}/Images/Blog/BlogDataDetailsImages/${val.image}`
//                         : "https://via.placeholder.com/600x400?text=Loading..."
//                     }
//                     alt={val.title}
//                     effect="blur"
//                     className="w-full h-52 object-cover"
//                     width="100%"
//                     height="auto"
//                   />
//                   <div className="p-4">
//                     <p className="text-sm text-gray-500 mb-1">
//                       {category ? category.blog_category_name : ""}
//                     </p>
//                     <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
//                       {val.title}
//                     </h3>
//                     <p className="text-sm text-gray-400 mt-2">{val.date}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

/** */

/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useNavigate } from "react-router-dom";
import BE_URL from "../../config";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Format date as "May 15, 2025"
function formatBlogDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d)) return dateString;
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BE_URL}/blogDataDetails`)
      .then((res) => res.json())
      .then((result) => setBlogs(result.data || []));

    fetch(`${BE_URL}/blogcategoryName`)
      .then((res) => res.json())
      .then((result) => setCategories(result.data || []));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="section bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-screen-xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Latest Blog Posts
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((val) => {
            const category = categories.find(
              (cat) => cat.id === val.blog_category_id
            );

            return (
              <motion.div
                key={val.id}
                className="cursor-pointer"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                onClick={() => navigate(`/blogs/${val.id}`)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <LazyLoadImage
                    src={
                      val.image
                        ? `${BE_URL}/Images/Blog/BlogDataDetailsImages/${val.image}`
                        : "https://via.placeholder.com/600x400?text=Loading..."
                    }
                    alt={val.title}
                    effect="blur"
                    className="w-full h-52 object-cover"
                    width="100%"
                    height="auto"
                  />
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">
                      {category ? category.blog_category_name : ""}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {val.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">
                      {formatBlogDate(val.date)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
