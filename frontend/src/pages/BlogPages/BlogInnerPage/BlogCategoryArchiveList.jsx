// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams, NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import BE_URL from "../../../config";

// function formatBlogDate(dateString) {
//   if (!dateString) return "";
//   const d = new Date(dateString);
//   if (isNaN(d)) return dateString;
//   return d.toLocaleString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.08, duration: 0.6, type: "spring" },
//   }),
// };

// const BlogCategoryArchiveList = () => {
//   const navigate = useNavigate();
//   const { categoryId, archiveMonth } = useParams();
//   const [blogs, setBlogs] = useState([]);
//   const [allBlogs, setAllBlogs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [recentBlogs, setRecentBlogs] = useState([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState(null); // null: not searching, array: search
//   const [categoryCounts, setCategoryCounts] = useState({});
//   const [archives, setArchives] = useState([]);
//   const searchInputRef = useRef(null);

//   // Fetch all blogs and categories for sidebar/statistics
//   useEffect(() => {
//     fetch(`${BE_URL}/blogDataDetails`)
//       .then((r) => r.json())
//       .then((res) => {
//         const all = res.data || [];
//         setAllBlogs(all);

//         // Category counts
//         const catCounts = {};
//         all.forEach((b) => {
//           catCounts[b.blog_category_id] =
//             (catCounts[b.blog_category_id] || 0) + 1;
//         });
//         setCategoryCounts(catCounts);

//         // Archives (month-year counts)
//         const archiveMap = {};
//         all.forEach((b) => {
//           const d = new Date(b.date);
//           if (!isNaN(d)) {
//             const key = `${String(d.getMonth() + 1).padStart(
//               2,
//               "0"
//             )}-${d.getFullYear()}`;
//             const label = d.toLocaleString("en-US", {
//               month: "long",
//               year: "numeric",
//             });
//             if (!archiveMap[key]) archiveMap[key] = { count: 0, label };
//             archiveMap[key].count += 1;
//           }
//         });
//         // Sort descending (latest first)
//         const archiveArr = Object.entries(archiveMap)
//           .map(([key, obj]) => ({ key, label: obj.label, count: obj.count }))
//           .sort((a, b) => {
//             const [am, ay] = a.key.split("-").map(Number);
//             const [bm, by] = b.key.split("-").map(Number);
//             if (by !== ay) return by - ay;
//             return bm - am;
//           });
//         setArchives(archiveArr);

//         // Recent Blogs (latest 5)
//         const sortedBlogs = [...all].sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         setRecentBlogs(sortedBlogs.slice(0, 5));
//       });

//     // Fetch all categories
//     fetch(`${BE_URL}/blogcategoryName`)
//       .then((r) => r.json())
//       .then((res) => setCategories(res.data || []));
//   }, []);

//   // Fetch blogs by category or archive
//   useEffect(() => {
//     setSearchResults(null); // clear search when navigating
//     setSearchQuery(""); // also clear search input when changing filter
//     if (categoryId) {
//       fetch(`${BE_URL}/blogDataDetails/category/${categoryId}`)
//         .then((r) => r.json())
//         .then((res) => {
//           setBlogs(res.data || []);
//           // Set category name
//           fetch(`${BE_URL}/blogcategoryName/${categoryId}`)
//             .then((r) => r.json())
//             .then((res) =>
//               setCategoryName(res.data ? res.data.blog_category_name : "")
//             );
//         });
//     } else if (archiveMonth) {
//       fetch(`${BE_URL}/blogDataDetails`)
//         .then((r) => r.json())
//         .then((res) => {
//           const all = res.data || [];
//           const [month, year] = archiveMonth.split("-");
//           const filtered = all.filter((b) => {
//             const d = new Date(b.date);
//             return (
//               String(d.getMonth() + 1).padStart(2, "0") === month &&
//               String(d.getFullYear()) === year
//             );
//           });
//           setBlogs(filtered);
//           setCategoryName(
//             `${new Date(`${year}-${month}-01`).toLocaleString("en-US", {
//               month: "long",
//               year: "numeric",
//             })}`
//           );
//         });
//     } else {
//       setCategoryName("");
//       setBlogs([]);
//     }
//   }, [categoryId, archiveMonth]);

//   // --- SEARCH HANDLING ---
//   // Only filter by title
//   function handleSearch(e) {
//     e.preventDefault();
//     const q = searchQuery.trim().toLowerCase();
//     if (!q) {
//       setSearchResults(null);
//       if (searchInputRef.current) {
//         searchInputRef.current.focus();
//       }
//       return;
//     }
//     const found = allBlogs.filter(
//       (b) => b.title && b.title.toLowerCase().includes(q)
//     );
//     setSearchResults(found);
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }

//   function handleClearSearch() {
//     setSearchResults(null);
//     setSearchQuery("");
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }

//   // On every keypress in search bar, if input is empty, clear search results
//   useEffect(() => {
//     if (searchQuery === "") {
//       setSearchResults(null);
//     }
//   }, [searchQuery]);

//   // Disable all motion when searching
//   const disableMotion = searchResults !== null || searchQuery !== "";

//   const PageWrapper = disableMotion ? "div" : motion.div;
//   const MainWrapper = disableMotion ? "div" : motion.div;
//   const SidebarWrapper = disableMotion ? "div" : motion.div;
//   const BlogCardWrapper = disableMotion ? "div" : motion.div;

//   // Main blog listing card with conditional motion
//   function BlogCard({ blog, category, index = 0 }) {
//     return (
//       <BlogCardWrapper
//         className="flex bg-white rounded-lg shadow-lg overflow-hidden mb-10 cursor-pointer hover:shadow-xl transition"
//         onClick={() => navigate(`/blogs/${blog.id}`)}
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") navigate(`/blogs/${blog.id}`);
//         }}
//         role="button"
//         aria-label={`Open blog post: ${blog.title}`}
//         {...(!disableMotion && {
//           initial: "hidden",
//           animate: "visible",
//           custom: index,
//           variants: fadeUp,
//           whileHover: { boxShadow: "0 8px 32px rgba(0,0,0,0.14)" },
//         })}
//       >
//         <div className="w-[300px] min-w-[220px] h-[240px] overflow-hidden bg-gray-100 flex items-center">
//           {blog.image && (
//             <img
//               src={`${BE_URL}/Images/Blog/BlogDataDetailsImages/${blog.image}`}
//               alt={blog.title}
//               className="object-cover w-full h-full"
//             />
//           )}
//         </div>
//         <div className="flex-1 p-7 flex flex-col justify-between">
//           <div>
//             <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
//             <div className="flex items-center mb-2 text-gray-500 gap-2 text-sm">
//               <svg width={16} height={16} fill="none" viewBox="0 0 24 24">
//                 <path
//                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2ZM16 3v4M8 3v4"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               {formatBlogDate(blog.date)}
//               <span className="ml-3">{category}</span>
//             </div>
//             <div className="text-gray-600">
//               {blog.description?.slice(0, 180)}
//               {blog.description && blog.description.length > 180 ? "..." : ""}
//             </div>
//           </div>
//           <div>
//             <NavLink
//               to={`/blogs/${blog.id}`}
//               className="text-black font-semibold mt-2 inline-block hover:text-orange-500"
//               onClick={(e) => e.stopPropagation()}
//             >
//               &gt; Read more
//             </NavLink>
//           </div>
//         </div>
//       </BlogCardWrapper>
//     );
//   }

//   // Sidebar UI with motion only when not searching
//   function Sidebar() {
//     return (
//       <SidebarWrapper
//         className="flex flex-col gap-10 px-5 py-10 bg-white border border-gray-200 rounded-xl shadow-xl text-gray-900"
//         {...(!disableMotion && {
//           initial: { x: 60, opacity: 0 },
//           animate: { x: 0, opacity: 1 },
//           transition: { duration: 0.7, type: "spring" },
//         })}
//       >
//         {/* Search */}
//         <div className="flex flex-col gap-3">
//           <h2 className="font-semibold text-[1.2rem] text-orange-500">
//             Search
//           </h2>
//           <form onSubmit={handleSearch} className="flex gap-2">
//             <input
//               ref={searchInputRef}
//               type="text"
//               className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Search blog titles..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onClick={() => {
//                 if (searchInputRef.current) {
//                   const length = searchInputRef.current.value.length;
//                   searchInputRef.current.setSelectionRange(length, length);
//                   searchInputRef.current.focus();
//                 }
//               }}
//               autoFocus
//             />
//             <button
//               type="submit"
//               className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition"
//               aria-label="Search"
//             >
//               <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
//                 <path
//                   d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </form>
//           {searchResults && (
//             <button
//               className="text-sm text-orange-500 mt-2 underline"
//               onClick={handleClearSearch}
//               type="button"
//             >
//               Clear search
//             </button>
//           )}
//         </div>
//         {/* Recent Posts */}
//         <div>
//           <h2 className="font-bold text-[1.5rem] mb-2">Recent Posts</h2>
//           <div className="flex flex-col gap-3">
//             {recentBlogs.map((b, i) => {
//               const RecentWrapper = disableMotion ? "div" : motion.div;
//               return (
//                 <RecentWrapper
//                   key={b.id}
//                   {...(!disableMotion && {
//                     initial: { opacity: 0, x: 12 },
//                     animate: { opacity: 1, x: 0 },
//                     transition: { delay: 0.1 + i * 0.07 },
//                   })}
//                 >
//                   <NavLink
//                     to={`/blogs/${b.id}`}
//                     className="hover:text-orange-500 text-gray-800 border-b border-gray-200 py-1"
//                   >
//                     {b.title}
//                   </NavLink>
//                 </RecentWrapper>
//               );
//             })}
//           </div>
//         </div>
//         {/* Categories */}
//         <div>
//           <h2 className="font-bold text-[1.5rem] mb-2">Categories</h2>
//           <div className="flex flex-col gap-2">
//             {categories.map((cat, i) => {
//               const CatWrapper = disableMotion ? "div" : motion.div;
//               return (
//                 <CatWrapper
//                   key={cat.id}
//                   {...(!disableMotion && {
//                     initial: { opacity: 0, x: 18 },
//                     animate: { opacity: 1, x: 0 },
//                     transition: { delay: 0.15 + i * 0.06 },
//                   })}
//                 >
//                   <NavLink
//                     to={`/blogs/category/${cat.id}`}
//                     className="flex justify-between items-center hover:text-orange-500 text-gray-800"
//                   >
//                     {cat.blog_category_name}
//                     <span className="text-orange-500 font-bold">
//                       {categoryCounts[cat.id] || 0}
//                     </span>
//                   </NavLink>
//                 </CatWrapper>
//               );
//             })}
//           </div>
//         </div>
//         {/* Archives */}
//         <div>
//           <h2 className="font-bold text-[1.5rem] mb-2">Archives</h2>
//           <div className="flex flex-col gap-2">
//             {archives.map((a, i) => {
//               const ArchiveWrapper = disableMotion ? "div" : motion.div;
//               return (
//                 <ArchiveWrapper
//                   key={a.key}
//                   {...(!disableMotion && {
//                     initial: { opacity: 0, x: 20 },
//                     animate: { opacity: 1, x: 0 },
//                     transition: { delay: 0.17 + i * 0.06 },
//                   })}
//                 >
//                   <NavLink
//                     to={`/blogs/archive/${a.key}`}
//                     className="flex justify-between hover:text-orange-500 text-gray-800"
//                   >
//                     {a.label}{" "}
//                     <span className="text-orange-500 font-bold">{a.count}</span>
//                   </NavLink>
//                 </ArchiveWrapper>
//               );
//             })}
//           </div>
//         </div>
//       </SidebarWrapper>
//     );
//   }

//   // Which blogs to show in left: search results, or category/archive filter, or nothing.
//   let blogsToShow = searchResults ?? blogs;

//   return (
//     <PageWrapper
//       className="bg-gradient-to-b from-blue-50 to-white py-12"
//       {...(!disableMotion && {
//         initial: { opacity: 0 },
//         animate: { opacity: 1 },
//         transition: { duration: 0.6 },
//       })}
//     >
//       <div className="max-w-screen-xl mx-auto flex lg:flex-row flex-col gap-8">
//         {/* Left: Blog Listing */}
//         <MainWrapper
//           className="lg:w-2/3 w-full"
//           {...(!disableMotion && {
//             initial: { x: -60, opacity: 0 },
//             animate: { x: 0, opacity: 1 },
//             transition: { duration: 0.7, type: "spring" },
//           })}
//         >
//           <div className="text-3xl font-bold mb-8">
//             {searchResults !== null
//               ? searchResults.length === 0
//                 ? "No results found."
//                 : `Search Results (${searchResults.length})`
//               : categoryId && categoryName
//               ? `Category: ${categoryName}`
//               : archiveMonth
//               ? `Archive: ${categoryName}`
//               : ""}
//           </div>
//           {blogsToShow.length === 0 ? (
//             <div className="text-gray-500 p-12 text-center">
//               No blog posts found.
//             </div>
//           ) : (
//             blogsToShow.map((b, i) => (
//               <BlogCard
//                 key={b.id}
//                 blog={b}
//                 category={
//                   categories.find((c) => c.id === b.blog_category_id)
//                     ?.blog_category_name || ""
//                 }
//                 index={i}
//               />
//             ))
//           )}
//         </MainWrapper>
//         {/* Right: Sidebar */}
//         <div className="lg:w-1/3 w-full">
//           <Sidebar />
//         </div>
//       </div>
//     </PageWrapper>
//   );
// };

// export default BlogCategoryArchiveList;

/* */

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import BE_URL from "../../../config";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// ---- ADD THIS SLUGIFY FUNCTION AT THE TOP ----
function slugify(title = "") {
  return title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric chars
    .replace(/\s+/g, "-") // spaces to dashes
    .replace(/-+/g, "-"); // collapse multiple dashes
}
// ----------------------------------------------

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, type: "spring" },
  }),
};

const BlogCategoryArchiveList = () => {
  const navigate = useNavigate();
  const { categoryId, archiveMonth } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null); // null: not searching, array: search
  const [categoryCounts, setCategoryCounts] = useState({});
  const [archives, setArchives] = useState([]);
  const searchInputRef = useRef(null);

  // Fetch all blogs and categories for sidebar/statistics
  useEffect(() => {
    fetch(`${BE_URL}/blogDataDetails`)
      .then((r) => r.json())
      .then((res) => {
        const all = res.data || [];
        setAllBlogs(all);

        // Category counts
        const catCounts = {};
        all.forEach((b) => {
          catCounts[b.blog_category_id] =
            (catCounts[b.blog_category_id] || 0) + 1;
        });
        setCategoryCounts(catCounts);

        // Archives (month-year counts)
        const archiveMap = {};
        all.forEach((b) => {
          const d = new Date(b.date);
          if (!isNaN(d)) {
            const key = `${String(d.getMonth() + 1).padStart(
              2,
              "0"
            )}-${d.getFullYear()}`;
            const label = d.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            });
            if (!archiveMap[key]) archiveMap[key] = { count: 0, label };
            archiveMap[key].count += 1;
          }
        });
        // Sort descending (latest first)
        const archiveArr = Object.entries(archiveMap)
          .map(([key, obj]) => ({ key, label: obj.label, count: obj.count }))
          .sort((a, b) => {
            const [am, ay] = a.key.split("-").map(Number);
            const [bm, by] = b.key.split("-").map(Number);
            if (by !== ay) return by - ay;
            return bm - am;
          });
        setArchives(archiveArr);

        // Recent Blogs (latest 5)
        const sortedBlogs = [...all].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRecentBlogs(sortedBlogs.slice(0, 5));
      });

    // Fetch all categories
    fetch(`${BE_URL}/blogcategoryName`)
      .then((r) => r.json())
      .then((res) => setCategories(res.data || []));
  }, []);

  // Fetch blogs by category or archive
  useEffect(() => {
    setSearchResults(null); // clear search when navigating
    setSearchQuery(""); // also clear search input when changing filter
    if (categoryId) {
      fetch(`${BE_URL}/blogDataDetails/category/${categoryId}`)
        .then((r) => r.json())
        .then((res) => {
          setBlogs(res.data || []);
          // Set category name
          fetch(`${BE_URL}/blogcategoryName/${categoryId}`)
            .then((r) => r.json())
            .then((res) =>
              setCategoryName(res.data ? res.data.blog_category_name : "")
            );
        });
    } else if (archiveMonth) {
      fetch(`${BE_URL}/blogDataDetails`)
        .then((r) => r.json())
        .then((res) => {
          const all = res.data || [];
          const [month, year] = archiveMonth.split("-");
          const filtered = all.filter((b) => {
            const d = new Date(b.date);
            return (
              String(d.getMonth() + 1).padStart(2, "0") === month &&
              String(d.getFullYear()) === year
            );
          });
          setBlogs(filtered);
          setCategoryName(
            `${new Date(`${year}-${month}-01`).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}`
          );
        });
    } else {
      setCategoryName("");
      setBlogs([]);
    }
  }, [categoryId, archiveMonth]);

  // --- SEARCH HANDLING ---
  // Only filter by title
  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults(null);
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
      return;
    }
    const found = allBlogs.filter(
      (b) => b.title && b.title.toLowerCase().includes(q)
    );
    setSearchResults(found);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  function handleClearSearch() {
    setSearchResults(null);
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  // On every keypress in search bar, if input is empty, clear search results
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(null);
    }
  }, [searchQuery]);

  // Disable all motion when searching
  const disableMotion = searchResults !== null || searchQuery !== "";

  const PageWrapper = disableMotion ? "div" : motion.div;
  const MainWrapper = disableMotion ? "div" : motion.div;
  const SidebarWrapper = disableMotion ? "div" : motion.div;
  const BlogCardWrapper = disableMotion ? "div" : motion.div;

  // Main blog listing card with conditional motion
  function BlogCard({ blog, category, index = 0 }) {
    const blogSlug = slugify(blog.title);
    return (
      <BlogCardWrapper
        className="flex-col bg-white rounded-lg shadow-lg overflow-hidden mb-10 cursor-pointer hover:shadow-xl transition"
        onClick={() => navigate(`/blogs/${blogSlug}`)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate(`/blogs/${blogSlug}`);
        }}
        role="button"
        aria-label={`Open blog post: ${blog.title}`}
        {...(!disableMotion && {
          initial: "hidden",
          animate: "visible",
          custom: index,
          variants: fadeUp,
          whileHover: { boxShadow: "0 8px 32px rgba(0,0,0,0.14)" },
        })}
      >
        <div className="w-full min-w-[220px] h-[240px] overflow-hidden bg-gray-100 flex items-center">
          {blog.image && (
            <LazyLoadImage
              src={`${BE_URL}/Images/Blog/BlogDataDetailsImages/${blog.image}`}
              alt={blog.title}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="flex-1 p-7 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <div className="flex items-center mb-2 text-gray-500 gap-2 text-sm">
              <svg width={16} height={16} fill="none" viewBox="0 0 24 24">
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2ZM16 3v4M8 3v4"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {formatBlogDate(blog.date)}
              <span className="ml-3">{category}</span>
            </div>
            <div className="text-gray-600">
              {blog.description?.slice(0, 180)}
              {blog.description && blog.description.length > 180 ? "..." : ""}
            </div>
          </div>
          <div>
            <NavLink
              to={`/blogs/${blogSlug}`}
              className="text-black font-semibold mt-2 inline-block hover:text-orange-500"
              onClick={(e) => e.stopPropagation()}
            >
              &gt; Read more
            </NavLink>
          </div>
        </div>
      </BlogCardWrapper>
    );
  }

  // Sidebar UI with motion only when not searching
  function Sidebar() {
    return (
      <SidebarWrapper
        className="flex flex-col gap-10 px-5 py-10 bg-white border border-gray-200 rounded-xl shadow-xl text-gray-900"
        {...(!disableMotion && {
          initial: { x: 60, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          transition: { duration: 0.7, type: "spring" },
        })}
      >
        {/* Search */}
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-[1.2rem] text-orange-500">
            Search
          </h2>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              ref={searchInputRef}
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Search blog titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => {
                if (searchInputRef.current) {
                  const length = searchInputRef.current.value.length;
                  searchInputRef.current.setSelectionRange(length, length);
                  searchInputRef.current.focus();
                }
              }}
              autoFocus
            />
            <button
              type="submit"
              className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition"
              aria-label="Search"
            >
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                <path
                  d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          {searchResults && (
            <button
              className="text-sm text-orange-500 mt-2 underline"
              onClick={handleClearSearch}
              type="button"
            >
              Clear search
            </button>
          )}
        </div>
        {/* Recent Posts */}
        <div>
          <h2 className="font-bold text-[1.5rem] mb-2">Recent Posts</h2>
          <div className="flex flex-col gap-3">
            {recentBlogs.map((b, i) => {
              const RecentWrapper = disableMotion ? "div" : motion.div;
              const blogSlug = slugify(b.title);
              return (
                <RecentWrapper
                  key={b.id}
                  {...(!disableMotion && {
                    initial: { opacity: 0, x: 12 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.1 + i * 0.07 },
                  })}
                >
                  <NavLink
                    to={`/blogs/${blogSlug}`}
                    className="hover:text-orange-500 text-gray-800 border-b border-gray-200 py-1"
                  >
                    {b.title}
                  </NavLink>
                </RecentWrapper>
              );
            })}
          </div>
        </div>
        {/* Categories */}
        <div>
          <h2 className="font-bold text-[1.5rem] mb-2">Categories</h2>
          <div className="flex flex-col gap-2">
            {categories.map((cat, i) => {
              const CatWrapper = disableMotion ? "div" : motion.div;
              return (
                <CatWrapper
                  key={cat.id}
                  {...(!disableMotion && {
                    initial: { opacity: 0, x: 18 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.15 + i * 0.06 },
                  })}
                >
                  <NavLink
                    to={`/blogs/category/${cat.id}`}
                    className="flex justify-between items-center hover:text-orange-500 text-gray-800"
                  >
                    {cat.blog_category_name}
                    <span className="text-orange-500 font-bold">
                      {categoryCounts[cat.id] || 0}
                    </span>
                  </NavLink>
                </CatWrapper>
              );
            })}
          </div>
        </div>
        {/* Archives */}
        <div>
          <h2 className="font-bold text-[1.5rem] mb-2">Archives</h2>
          <div className="flex flex-col gap-2">
            {archives.map((a, i) => {
              const ArchiveWrapper = disableMotion ? "div" : motion.div;
              return (
                <ArchiveWrapper
                  key={a.key}
                  {...(!disableMotion && {
                    initial: { opacity: 0, x: 20 },
                    animate: { opacity: 1, x: 0 },
                    transition: { delay: 0.17 + i * 0.06 },
                  })}
                >
                  <NavLink
                    to={`/blogs/archive/${a.key}`}
                    className="flex justify-between hover:text-orange-500 text-gray-800"
                  >
                    {a.label}{" "}
                    <span className="text-orange-500 font-bold">{a.count}</span>
                  </NavLink>
                </ArchiveWrapper>
              );
            })}
          </div>
        </div>
      </SidebarWrapper>
    );
  }

  // Which blogs to show in left: search results, or category/archive filter, or nothing.
  let blogsToShow = searchResults ?? blogs;

  return (
    <PageWrapper
      className="bg-gradient-to-b from-blue-50 to-white py-12"
      {...(!disableMotion && {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
      })}
    >
      <div className="max-w-screen-xl mx-auto flex lg:flex-row flex-col gap-8">
        {/* Left: Blog Listing */}
        <MainWrapper
          className="lg:w-2/3 w-full"
          {...(!disableMotion && {
            initial: { x: -60, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.7, type: "spring" },
          })}
        >
          <div className="text-3xl font-bold mb-8">
            {searchResults !== null
              ? searchResults.length === 0
                ? "No results found."
                : `Search Results (${searchResults.length})`
              : categoryId && categoryName
              ? `Category: ${categoryName}`
              : archiveMonth
              ? `Archive: ${categoryName}`
              : ""}
          </div>
          {blogsToShow.length === 0 ? (
            <div className="text-gray-500 p-12 text-center">
              No blog posts found.
            </div>
          ) : (
            blogsToShow.map((b, i) => (
              <BlogCard
                key={b.id}
                blog={b}
                category={
                  categories.find((c) => c.id === b.blog_category_id)
                    ?.blog_category_name || ""
                }
                index={i}
              />
            ))
          )}
        </MainWrapper>
        {/* Right: Sidebar */}
        <div className="lg:w-1/3 w-full">
          <Sidebar />
        </div>
      </div>
    </PageWrapper>
  );
};

export default BlogCategoryArchiveList;
