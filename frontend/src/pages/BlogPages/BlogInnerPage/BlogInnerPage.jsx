/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { NavLink, useParams, useNavigate } from "react-router-dom";
// import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
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

// const BlogInnerPage = () => {
//   const { BlogSlug } = useParams();
//   const navigate = useNavigate();

//   const [blog, setBlog] = useState(null);
//   const [category, setCategory] = useState("");
//   const [allBlogs, setAllBlogs] = useState([]);
//   const [recentBlogs, setRecentBlogs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState(null);
//   const [categoryCounts, setCategoryCounts] = useState({});
//   const [archives, setArchives] = useState([]);
//   const [prevNext, setPrevNext] = useState({ prev: null, next: null });

//   // Fetch all blogs, categories, and build stats
//   useEffect(() => {
//     fetch(`${BE_URL}/blogDataDetails`)
//       .then((res) => res.json())
//       .then((result) => {
//         const all = result.data || [];
//         setAllBlogs(all);

//         // Recent
//         const sortedRecent = [...all].sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         setRecentBlogs(sortedRecent.slice(0, 5));

//         // Category counts
//         const catCounts = {};
//         all.forEach((b) => {
//           catCounts[b.blog_category_id] =
//             (catCounts[b.blog_category_id] || 0) + 1;
//         });
//         setCategoryCounts(catCounts);

//         // Archives
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
//         const archiveArr = Object.entries(archiveMap)
//           .map(([key, obj]) => ({ key, label: obj.label, count: obj.count }))
//           .sort((a, b) => {
//             const [am, ay] = a.key.split("-").map(Number);
//             const [bm, by] = b.key.split("-").map(Number);
//             if (by !== ay) return by - ay;
//             return bm - am;
//           });
//         setArchives(archiveArr);

//         // Prev/next
//         const sortedByDate = [...all].sort(
//           (a, b) => new Date(a.date) - new Date(b.date)
//         );
//         const idx = sortedByDate.findIndex(
//           (b) => String(b.id) === String(BlogSlug)
//         );
//         setPrevNext({
//           prev: idx > 0 ? sortedByDate[idx - 1] : null,
//           next: idx < sortedByDate.length - 1 ? sortedByDate[idx + 1] : null,
//         });
//       });

//     fetch(`${BE_URL}/blogcategoryName`)
//       .then((res) => res.json())
//       .then((result) => setCategories(result.data || []));
//   }, [BlogSlug]);

//   // Fetch this blog
//   useEffect(() => {
//     fetch(`${BE_URL}/blogDataDetails/data/${BlogSlug}`)
//       .then((res) => res.json())
//       .then((result) => {
//         const b = result.data && result.data[0];
//         setBlog(b);

//         // fetch category name
//         if (b && b.blog_category_id) {
//           fetch(`${BE_URL}/blogcategoryName/${b.blog_category_id}`)
//             .then((res) => res.json())
//             .then((catData) => {
//               setCategory(catData.data ? catData.data.blog_category_name : "");
//             });
//         }
//       });
//   }, [BlogSlug]);

//   useEffect(() => {
//     setSearchResults(null);
//     setSearchQuery("");
//   }, [BlogSlug]);

//   // Blog content sections (solve [object Object] bug)
//   let contentSections = [];
//   if (blog && blog.data) {
//     try {
//       const parsed =
//         typeof blog.data === "string" ? JSON.parse(blog.data) : blog.data;
//       if (Array.isArray(parsed)) {
//         contentSections = parsed
//           .filter((x) => typeof x === "object" && (x.heading || x.content))
//           .map((x) => ({
//             heading: x.heading || "",
//             content:
//               typeof x.content === "string"
//                 ? x.content
//                 : Array.isArray(x.content)
//                 ? x.content.join("\n")
//                 : x.content
//                 ? JSON.stringify(x.content)
//                 : "",
//           }));
//       } else if (
//         parsed &&
//         typeof parsed === "object" &&
//         (parsed.heading || parsed.content)
//       ) {
//         contentSections = [
//           {
//             heading: parsed.heading || "",
//             content:
//               typeof parsed.content === "string"
//                 ? parsed.content
//                 : Array.isArray(parsed.content)
//                 ? parsed.content.join("\n")
//                 : parsed.content
//                 ? JSON.stringify(parsed.content)
//                 : "",
//           },
//         ];
//       } else if (typeof blog.data === "string") {
//         contentSections = [{ heading: "", content: blog.data }];
//       }
//     } catch {
//       contentSections = [{ heading: "", content: blog.data }];
//     }
//   }

//   // Social share
//   const SOCIALS = [
//     {
//       name: "Facebook",
//       url: (slug) =>
//         `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/blogs/${slug}`,
//       icon: <FaFacebook size={24} />,
//       color: "#1877f3",
//     },
//     {
//       name: "Instagram",
//       url: () => `https://www.instagram.com/`,
//       icon: <FaInstagram size={24} />,
//       color: "#E1306C",
//     },
//     {
//       name: "YouTube",
//       url: () => `https://www.youtube.com/`,
//       icon: <FaYoutube size={24} />,
//       color: "#ff0000",
//     },
//   ];

//   // SEARCH: only filter by title, reset search bar after submit
//   function handleSearch(e) {
//     e.preventDefault();
//     const q = searchQuery.trim().toLowerCase();
//     if (!q) {
//       setSearchResults(null);
//       setSearchQuery("");
//       return;
//     }
//     const found = allBlogs.filter(
//       (b) => b.title && b.title.toLowerCase().includes(q)
//     );
//     setSearchResults(found);
//     setSearchQuery(""); // clear search bar after search
//   }

//   function handleClearSearch() {
//     setSearchResults(null);
//     setSearchQuery("");
//   }

//   function BlogCard({ blog }) {
//     return (
//       <div
//         className="flex bg-white rounded-lg shadow-lg overflow-hidden mb-10 cursor-pointer hover:shadow-xl transition"
//         tabIndex={0}
//         onClick={() => {
//           if (String(blog.id) !== String(BlogSlug)) {
//             setSearchResults(null);
//             navigate(`/blogs/${blog.id}`);
//           }
//         }}
//         onKeyPress={(e) => {
//           if (e.key === "Enter") {
//             if (String(blog.id) !== String(BlogSlug)) {
//               setSearchResults(null);
//               navigate(`/blogs/${blog.id}`);
//             }
//           }
//         }}
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
//               <span className="ml-3">
//                 {categories.find((c) => c.id === blog.blog_category_id)
//                   ?.blog_category_name || ""}
//               </span>
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
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSearchResults(null);
//               }}
//             >
//               &gt; Read more
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white py-12">
//       <div className="max-w-screen-xl mx-auto flex lg:flex-row flex-col gap-8">
//         {/* Main Content */}
//         <div className="lg:w-2/3 w-full">
//           {/* If searching, show search results */}
//           {searchResults ? (
//             <>
//               <h1 className="text-3xl font-bold mb-8">
//                 {searchResults.length === 0
//                   ? "No results found."
//                   : `Search Results (${searchResults.length})`}
//               </h1>
//               {searchResults.length === 0 ? (
//                 <div className="text-gray-500 p-12 text-center">
//                   No blog posts found.
//                 </div>
//               ) : (
//                 searchResults.map((b) => <BlogCard key={b.id} blog={b} />)
//               )}
//             </>
//           ) : (
//             blog && (
//               <div className="rounded-xl shadow-xl bg-white overflow-hidden border border-gray-200 mb-5">
//                 <div className="relative">
//                   {blog.image ? (
//                     <img
//                       src={`${BE_URL}/Images/Blog/BlogDataDetailsImages/${blog.image}`}
//                       alt={blog.title}
//                       className="w-full object-cover h-100"
//                     />
//                   ) : null}
//                   {category && (
//                     <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-4 py-1 rounded shadow text-xs font-semibold">
//                       {category}
//                     </div>
//                   )}
//                 </div>
//                 <div className="px-8 py-6">
//                   {/* Blog Meta */}
//                   <div className="flex flex-wrap items-center text-gray-500 text-xs mb-6 gap-3">
//                     <span className="flex items-center gap-1">
//                       <svg className="w-4 h-4" viewBox="0 0 20 20">
//                         <path
//                           fill="currentColor"
//                           d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
//                         />
//                       </svg>
//                       @{category.toLowerCase().replace(/\s/g, "")}
//                     </span>
//                     <span>|</span>
//                     <span>
//                       <svg
//                         width={16}
//                         height={16}
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         style={{
//                           display: "inline-block",
//                           verticalAlign: "middle",
//                         }}
//                       >
//                         <path
//                           d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2ZM16 3v4M8 3v4"
//                           stroke="currentColor"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       {formatBlogDate(blog.date)}
//                     </span>
//                     <span>|</span>
//                     <span>{category}</span>
//                     <span>|</span>
//                     <span>No Comments</span>
//                   </div>
//                   {/* Blog Title */}
//                   <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
//                     {blog.title}
//                   </h1>
//                   {/* Blog Description */}
//                   <div className="text-gray-700 space-y-6">
//                     {blog.description && <p>{blog.description}</p>}
//                     {/* Blog Content Sections */}
//                     {contentSections.map((section, idx) => (
//                       <div key={idx}>
//                         {section.heading ? (
//                           <h2 className="font-bold text-2xl mt-6 mb-2">
//                             {section.heading}
//                           </h2>
//                         ) : null}
//                         {section.content && (
//                           <div className="whitespace-pre-line">
//                             {section.content}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   {/* Share Buttons */}
//                   <div className="mt-8 flex items-center gap-4">
//                     <span className="font-semibold mr-2">Share:</span>
//                     {SOCIALS.map((soc) => (
//                       <a
//                         key={soc.name}
//                         href={soc.url(BlogSlug)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-block"
//                         title={soc.name}
//                         style={{ color: soc.color }}
//                       >
//                         {soc.icon}
//                       </a>
//                     ))}
//                   </div>
//                   {/* Prev/Next Navigation */}
//                   <hr className="my-8" />
//                   <div className="flex justify-between items-center">
//                     <div>
//                       {prevNext.prev && (
//                         <button
//                           className="text-black font-semibold hover:text-orange-500 flex items-center gap-1"
//                           onClick={() => {
//                             setSearchResults(null);
//                             navigate(`/blogs/${prevNext.prev.id}`);
//                           }}
//                         >
//                           &laquo; Previous Post
//                         </button>
//                       )}
//                     </div>
//                     <div>
//                       {prevNext.next && (
//                         <button
//                           className="text-black font-semibold hover:text-orange-500 flex items-center gap-1"
//                           onClick={() => {
//                             setSearchResults(null);
//                             navigate(`/blogs/${prevNext.next.id}`);
//                           }}
//                         >
//                           Newer Post &raquo;
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//         {/* Sidebar */}
//         <div className="lg:w-1/3 w-full">
//           <div className="flex flex-col gap-10 px-5 py-10 bg-white border border-gray-200 rounded-xl shadow-xl text-gray-900">
//             {/* Search */}
//             <div className="flex flex-col gap-3">
//               <h2 className="font-semibold text-[1.2rem] text-orange-500">
//                 Search Blogs
//               </h2>
//               <form onSubmit={handleSearch} className="flex gap-2">
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="Search blog titles..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition"
//                   aria-label="Search"
//                 >
//                   <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
//                     <path
//                       d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>
//               </form>
//               {/* If searching, add a clear button */}
//               {searchResults && (
//                 <button
//                   className="text-sm text-orange-500 mt-2 underline"
//                   onClick={handleClearSearch}
//                 >
//                   Clear search
//                 </button>
//               )}
//             </div>
//             {/* Recent Blogs */}
//             <div>
//               <h2 className="font-bold text-[1.5rem] mb-2">Recent Posts</h2>
//               <div className="flex flex-col gap-3">
//                 {recentBlogs.map((b) => (
//                   <NavLink
//                     to={`/blogs/${b.id}`}
//                     className="hover:text-orange-500 text-gray-800 border-b border-gray-200 py-1"
//                     key={b.id}
//                     onClick={() => setSearchResults(null)}
//                   >
//                     {b.title}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//             {/* Categories */}
//             <div>
//               <h2 className="font-bold text-[1.5rem] mb-2">Categories</h2>
//               <div className="flex flex-col gap-2">
//                 {categories.map((cat) => (
//                   <NavLink
//                     to={`/blogs/category/${cat.id}`}
//                     className="flex justify-between items-center hover:text-orange-500 text-gray-800"
//                     key={cat.id}
//                   >
//                     {cat.blog_category_name}
//                     <span className="text-orange-500 font-bold">
//                       {categoryCounts[cat.id] || 0}
//                     </span>
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//             {/* Archives */}
//             <div>
//               <h2 className="font-bold text-[1.5rem] mb-2">Archives</h2>
//               <div className="flex flex-col gap-2">
//                 {archives.map((a) => (
//                   <NavLink
//                     to={`/blogs/archive/${a.key}`}
//                     className="flex justify-between hover:text-orange-500 text-gray-800"
//                     key={a.key}
//                   >
//                     {a.label}{" "}
//                     <span className="text-orange-500 font-bold">{a.count}</span>
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogInnerPage;

/** */
import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import BE_URL from "../../../config";

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

const BlogInnerPage = () => {
  const { BlogSlug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [category, setCategory] = useState("");
  const [allBlogs, setAllBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [archives, setArchives] = useState([]);
  const [prevNext, setPrevNext] = useState({ prev: null, next: null });

  useEffect(() => {
    fetch(`${BE_URL}/blogDataDetails`)
      .then((res) => res.json())
      .then((result) => {
        const all = result.data || [];
        setAllBlogs(all);
        const sortedRecent = [...all].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRecentBlogs(sortedRecent.slice(0, 5));
        const catCounts = {};
        all.forEach((b) => {
          catCounts[b.blog_category_id] =
            (catCounts[b.blog_category_id] || 0) + 1;
        });
        setCategoryCounts(catCounts);
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
        const archiveArr = Object.entries(archiveMap)
          .map(([key, obj]) => ({ key, label: obj.label, count: obj.count }))
          .sort((a, b) => {
            const [am, ay] = a.key.split("-").map(Number);
            const [bm, by] = b.key.split("-").map(Number);
            if (by !== ay) return by - ay;
            return bm - am;
          });
        setArchives(archiveArr);
        const sortedByDate = [...all].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const idx = sortedByDate.findIndex(
          (b) => String(b.id) === String(BlogSlug)
        );
        setPrevNext({
          prev: idx > 0 ? sortedByDate[idx - 1] : null,
          next: idx < sortedByDate.length - 1 ? sortedByDate[idx + 1] : null,
        });
      });

    fetch(`${BE_URL}/blogcategoryName`)
      .then((res) => res.json())
      .then((result) => setCategories(result.data || []));
  }, [BlogSlug]);

  useEffect(() => {
    fetch(`${BE_URL}/blogDataDetails/data/${BlogSlug}`)
      .then((res) => res.json())
      .then((result) => {
        const b = result.data && result.data[0];
        setBlog(b);
        if (b && b.blog_category_id) {
          fetch(`${BE_URL}/blogcategoryName/${b.blog_category_id}`)
            .then((res) => res.json())
            .then((catData) => {
              setCategory(catData.data ? catData.data.blog_category_name : "");
            });
        }
      });
  }, [BlogSlug]);

  useEffect(() => {
    setSearchResults(null);
    setSearchQuery("");
  }, [BlogSlug]);

  let contentSections = [];
  if (blog && blog.data) {
    try {
      const parsed =
        typeof blog.data === "string" ? JSON.parse(blog.data) : blog.data;
      if (Array.isArray(parsed)) {
        contentSections = parsed
          .filter((x) => typeof x === "object" && (x.heading || x.content))
          .map((x) => ({
            heading: x.heading || "",
            content:
              typeof x.content === "string"
                ? x.content
                : Array.isArray(x.content)
                ? x.content.join("\n")
                : x.content
                ? JSON.stringify(x.content)
                : "",
          }));
      } else if (
        parsed &&
        typeof parsed === "object" &&
        (parsed.heading || parsed.content)
      ) {
        contentSections = [
          {
            heading: parsed.heading || "",
            content:
              typeof parsed.content === "string"
                ? parsed.content
                : Array.isArray(parsed.content)
                ? parsed.content.join("\n")
                : parsed.content
                ? JSON.stringify(parsed.content)
                : "",
          },
        ];
      } else if (typeof blog.data === "string") {
        contentSections = [{ heading: "", content: blog.data }];
      }
    } catch {
      contentSections = [{ heading: "", content: blog.data }];
    }
  }

  const SOCIALS = [
    {
      name: "Facebook",
      url: (slug) =>
        `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/blogs/${slug}`,
      icon: <FaFacebook size={24} />,
      color: "#1877f3",
    },
    {
      name: "Instagram",
      url: () => `https://www.instagram.com/`,
      icon: <FaInstagram size={24} />,
      color: "#E1306C",
    },
    {
      name: "YouTube",
      url: () => `https://www.youtube.com/`,
      icon: <FaYoutube size={24} />,
      color: "#ff0000",
    },
  ];

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setSearchResults(null);
      setSearchQuery("");
      return;
    }
    const found = allBlogs.filter(
      (b) => b.title && b.title.toLowerCase().includes(q)
    );
    setSearchResults(found);
    setSearchQuery("");
  }

  function handleClearSearch() {
    setSearchResults(null);
    setSearchQuery("");
  }

  function BlogCard({ blog, index = 0 }) {
    return (
      <motion.div
        className="flex bg-white rounded-lg shadow-lg overflow-hidden mb-10 cursor-pointer hover:shadow-xl transition"
        tabIndex={0}
        onClick={() => {
          if (String(blog.id) !== String(BlogSlug)) {
            setSearchResults(null);
            navigate(`/blogs/${blog.id}`);
          }
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (String(blog.id) !== String(BlogSlug)) {
              setSearchResults(null);
              navigate(`/blogs/${blog.id}`);
            }
          }
        }}
        initial="hidden"
        animate="visible"
        custom={index}
        variants={fadeUp}
        whileHover={{ boxShadow: "0 8px 32px rgba(0,0,0,0.14)" }}
      >
        <div className="w-[300px] min-w-[220px] h-[240px] overflow-hidden bg-gray-100 flex items-center">
          {blog.image && (
            <img
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
              <span className="ml-3">
                {categories.find((c) => c.id === blog.blog_category_id)
                  ?.blog_category_name || ""}
              </span>
            </div>
            <div className="text-gray-600">
              {blog.description?.slice(0, 180)}
              {blog.description && blog.description.length > 180 ? "..." : ""}
            </div>
          </div>
          <div>
            <NavLink
              to={`/blogs/${blog.id}`}
              className="text-black font-semibold mt-2 inline-block hover:text-orange-500"
              onClick={(e) => {
                e.stopPropagation();
                setSearchResults(null);
              }}
            >
              &gt; Read more
            </NavLink>
          </div>
        </div>
      </motion.div>
    );
  }

  // Conditional wrapper for sidebar (prevents flicker)
  const SidebarWrapper = searchResults ? "div" : motion.div;

  return (
    <motion.div
      className="bg-gradient-to-b from-blue-50 to-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-screen-xl mx-auto flex lg:flex-row flex-col gap-8">
        {/* Main Content */}
        <motion.div
          className="lg:w-2/3 w-full"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          {searchResults ? (
            <>
              <motion.h1 className="text-3xl font-bold mb-8">
                {searchResults.length === 0
                  ? "No results found."
                  : `Search Results (${searchResults.length})`}
              </motion.h1>
              {searchResults.length === 0 ? (
                <motion.div className="text-gray-500 p-12 text-center">
                  No blog posts found.
                </motion.div>
              ) : (
                searchResults.map((b, i) => (
                  <BlogCard key={b.id} blog={b} index={i} />
                ))
              )}
            </>
          ) : (
            blog && (
              <motion.div
                className="rounded-xl shadow-xl bg-white overflow-hidden border border-gray-200 mb-5"
                initial="hidden"
                animate="visible"
              >
                <div className="relative">
                  {blog.image ? (
                    <motion.img
                      src={`${BE_URL}/Images/Blog/BlogDataDetailsImages/${blog.image}`}
                      alt={blog.title}
                      className="w-full object-cover h-100"
                    />
                  ) : null}
                  {category && (
                    <motion.div
                      className="absolute bottom-4 left-4 bg-yellow-500 text-white px-4 py-1 rounded shadow text-xs font-semibold"
                      transition={{ delay: 0.2 }}
                    >
                      {category}
                    </motion.div>
                  )}
                </div>
                <div className="px-8 py-6">
                  <div className="flex flex-wrap items-center text-gray-500 text-xs mb-6 gap-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" viewBox="0 0 20 20">
                        <path
                          fill="currentColor"
                          d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
                        />
                      </svg>
                      @{category.toLowerCase().replace(/\s/g, "")}
                    </span>
                    <span>|</span>
                    <span>
                      <svg
                        width={16}
                        height={16}
                        fill="none"
                        viewBox="0 0 24 24"
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                        }}
                      >
                        <path
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2ZM16 3v4M8 3v4"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {formatBlogDate(blog.date)}
                    </span>
                    <span>|</span>
                    <span>{category}</span>
                    <span>|</span>
                    <span>No Comments</span>
                  </div>
                  <motion.h1
                    className="text-3xl font-bold text-gray-900 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {blog.title}
                  </motion.h1>
                  <motion.div
                    className="text-gray-700 space-y-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.15 },
                      },
                    }}
                  >
                    {blog.description && <p>{blog.description}</p>}
                    {contentSections.map((section, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + idx * 0.1 }}
                      >
                        {section.heading ? (
                          <h2 className="font-bold text-2xl mt-6 mb-2">
                            {section.heading}
                          </h2>
                        ) : null}
                        {section.content && (
                          <div className="whitespace-pre-line">
                            {section.content}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.div
                    className="mt-8 flex items-center gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <span className="font-semibold mr-2">Share:</span>
                    {SOCIALS.map((soc) => (
                      <a
                        key={soc.name}
                        href={soc.url(BlogSlug)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                        title={soc.name}
                        style={{ color: soc.color }}
                      >
                        {soc.icon}
                      </a>
                    ))}
                  </motion.div>
                  <hr className="my-8" />
                  <div className="flex justify-between items-center">
                    <div>
                      {prevNext.prev && (
                        <button
                          className="text-black font-semibold hover:text-orange-500 flex items-center gap-1"
                          onClick={() => {
                            setSearchResults(null);
                            navigate(`/blogs/${prevNext.prev.id}`);
                          }}
                        >
                          &laquo; Previous Post
                        </button>
                      )}
                    </div>
                    <div>
                      {prevNext.next && (
                        <button
                          className="text-black font-semibold hover:text-orange-500 flex items-center gap-1"
                          onClick={() => {
                            setSearchResults(null);
                            navigate(`/blogs/${prevNext.next.id}`);
                          }}
                        >
                          Newer Post &raquo;
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
        {/* Sidebar -- always rendered, animation only when not searching */}
        <SidebarWrapper
          className="lg:w-1/3 w-full"
          {...(!searchResults && {
            initial: { x: 60, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.7, type: "spring" },
          })}
        >
          <div className="flex flex-col gap-10 px-5 py-10 bg-white border border-gray-200 rounded-xl shadow-xl text-gray-900">
            {/* Search */}
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-[1.2rem] text-orange-500">
                Search Blogs
              </h2>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Search blog titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                >
                  Clear search
                </button>
              )}
            </div>
            {/* Recent Blogs */}
            <div>
              <h2 className="font-bold text-[1.5rem] mb-2">Recent Posts</h2>
              <div className="flex flex-col gap-3">
                {recentBlogs.map((b, i) =>
                  searchResults ? (
                    <NavLink
                      to={`/blogs/${b.id}`}
                      className="hover:text-orange-500 text-gray-800 border-b border-gray-200 py-1"
                      key={b.id}
                      onClick={() => setSearchResults(null)}
                    >
                      {b.title}
                    </NavLink>
                  ) : (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      <NavLink
                        to={`/blogs/${b.id}`}
                        className="hover:text-orange-500 text-gray-800 border-b border-gray-200 py-1"
                        onClick={() => setSearchResults(null)}
                      >
                        {b.title}
                      </NavLink>
                    </motion.div>
                  )
                )}
              </div>
            </div>
            {/* Categories */}
            <div>
              <h2 className="font-bold text-[1.5rem] mb-2">Categories</h2>
              <div className="flex flex-col gap-2">
                {categories.map((cat, i) =>
                  searchResults ? (
                    <NavLink
                      to={`/blogs/category/${cat.id}`}
                      className="flex justify-between items-center hover:text-orange-500 text-gray-800"
                      key={cat.id}
                    >
                      {cat.blog_category_name}
                      <span className="text-orange-500 font-bold">
                        {categoryCounts[cat.id] || 0}
                      </span>
                    </NavLink>
                  ) : (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
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
                    </motion.div>
                  )
                )}
              </div>
            </div>
            {/* Archives */}
            <div>
              <h2 className="font-bold text-[1.5rem] mb-2">Archives</h2>
              <div className="flex flex-col gap-2">
                {archives.map((a, i) =>
                  searchResults ? (
                    <NavLink
                      to={`/blogs/archive/${a.key}`}
                      className="flex justify-between hover:text-orange-500 text-gray-800"
                      key={a.key}
                    >
                      {a.label}{" "}
                      <span className="text-orange-500 font-bold">
                        {a.count}
                      </span>
                    </NavLink>
                  ) : (
                    <motion.div
                      key={a.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.17 + i * 0.06 }}
                    >
                      <NavLink
                        to={`/blogs/archive/${a.key}`}
                        className="flex justify-between hover:text-orange-500 text-gray-800"
                      >
                        {a.label}{" "}
                        <span className="text-orange-500 font-bold">
                          {a.count}
                        </span>
                      </NavLink>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </div>
        </SidebarWrapper>
      </div>
    </motion.div>
  );
};

export default BlogInnerPage;
