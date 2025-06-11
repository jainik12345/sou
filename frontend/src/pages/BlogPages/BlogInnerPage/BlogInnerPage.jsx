import { useState } from "react";
import { NavLink } from "react-router-dom";

export const BlogInnerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Example 18 archives for illustration
  const archives = [
    { title: "May 2025", count: 3 },
    { title: "April 2025", count: 3 },
    { title: "March 2025", count: 2 },
    { title: "February 2025", count: 2 },
    { title: "January 2025", count: 1 },
    { title: "December 2024", count: 2 },
    { title: "November 2024", count: 2 },
    { title: "October 2024", count: 2 },
    { title: "September 2024", count: 3 },
    { title: "August 2024", count: 2 },
    { title: "July 2024", count: 2 },
    { title: "June 2024", count: 2 },
    { title: "May 2024", count: 2 },
    { title: "April 2024", count: 3 },
    { title: "March 2024", count: 3 },
    { title: "February 2024", count: 4 },
    { title: "January 2024", count: 3 },
    { title: "December 2023", count: 3 },
    { title: "November 2023", count: 2 },
    { title: "October 2023", count: 2 },
    { title: "September 2023", count: 2 },
    { title: "August 2023", count: 2 },
    { title: "July 2023", count: 2 },
    { title: "June 2023", count: 2 },
    { title: "May 2023", count: 2 },
    { title: "April 2023", count: 3 },
    { title: "March 2023", count: 3 },
    { title: "February 2023", count: 4 },
    { title: "January 2023", count: 4 },
    { title: "December 2022", count: 4 },
    { title: "November 2022", count: 1 },
    { title: "October 2022", count: 1 },
    { title: "September 2022", count: 1 },
    { title: "August 2022", count: 1 },
    { title: "July 2022", count: 1 },
  ];
  return (
    <>
      <div className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-screen-xl mx-auto flex lg:flex-row flex-col gap-5">
          {/* Blog Main Content (Image + Text) */}
          <div className="lg:w-2/3 w-full">
            <div className="rounded-xl shadow-xl bg-white overflow-hidden border border-gray-200 mb-5">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                  alt="Statue of Unity Tent City"
                  className="w-full object-cover h-100"
                />
                <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-4 py-1 rounded shadow text-xs font-semibold">
                  Statue of Unity
                </div>
              </div>
              <div className="px-8 py-6">
                {/* Blog Meta */}
                <div className="flex flex-wrap items-center text-gray-500 text-xs mb-6 gap-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 20 20">
                      <path
                        fill="currentColor"
                        d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"
                      />
                    </svg>
                    @statueunity
                  </span>
                  <span>|</span>
                  <span>May 15, 2025</span>
                  <span>|</span>
                  <span>Statue of Unity</span>
                  <span>|</span>
                  <span>No Comments</span>
                </div>

                {/* Blog Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  Everything you need to know about Statue of Unity Tent City -1
                </h1>

                {/* Blog Content */}
                <div className="text-gray-700 space-y-6">
                  <p>
                    If you're a traveller visiting the Statue of Unity, selecting the best location to stay will enhance the experience even more.{" "}
                    <span className="font-semibold">Statue of Unity Tent City</span> is a perfect getaway for travellers who wish to have a taste of everything – luxury, nature, exclusivity, and a dash of heritage.
                  </p>
                  <p>
                    It has a serene ambiance and contemporary amenities. It provides relief from the conventional hotel experience and is ideal for holiday aspirants near one of India’s prominent tourist spots.
                  </p>

                  <h2 className="text-xl font-bold text-orange-500 mt-6">Beautiful location with fantastic views</h2>
                  <p>
                    Statue of Unity Tent City-1 is roughly 5.4 kilometers from the central point of the Statue of Unity in Ekta Nagar, Gujarat. It’s positioned close to Dyke 4, near the Sardar Sarovar Dam with beautiful water views of the Narmada River and surrounding hills. The tents are a short drive from the statue with the tranquility of woods and serene riverbank making it an ideal natural surrounding.
                  </p>
                  <p>
                    If you're a traveller visiting the Statue of Unity, selecting the best location to stay will enhance the experience even more.{" "}
                    <span className="font-semibold">Statue of Unity Tent City</span> is a perfect getaway for travellers who wish to have a taste of everything – luxury, nature, exclusivity, and a dash of heritage.
                  </p>
                  <p>
                    It has a serene ambiance and contemporary amenities. It provides relief from the conventional hotel experience and is ideal for holiday aspirants near one of India’s prominent tourist spots.
                  </p>

                  <h2 className="text-xl font-bold text-orange-500 mt-6">Beautiful location with fantastic views</h2>
                  <p>
                    Statue of Unity Tent City-1 is roughly 5.4 kilometers from the central point of the Statue of Unity in Ekta Nagar, Gujarat. It’s positioned close to Dyke 4, near the Sardar Sarovar Dam with beautiful water views of the Narmada River and surrounding hills. The tents are a short drive from the statue with the tranquility of woods and serene riverbank making it an ideal natural surrounding.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 w-full">
            <div
              className="
                relative
                lg:sticky lg:top-8
                lg:overflow-y-auto
                flex flex-col gap-10 px-5 py-10
                bg-white border border-gray-200 rounded-xl shadow-xl text-gray-900
              "
            >
              {/* Search Bar Start */}
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-[1.5rem] text-orange-500">Search Blogs</h2>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Search blog titles or keywords..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 text-white cursor-pointer px-4 py-2 rounded-md font-semibold hover:bg-orange-600 transition"
                    aria-label="Search"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Recent Blogs Section */}
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-[1.5rem] text-orange-500">Recent Posted Blogs</h2>
                <div className="flex flex-col gap-6">
                  <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 transition">
                    Everything you need to know about Statue of Unity Tent City -1
                  </NavLink>
                  <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 transition">
                    Everything you need to know about Statue of Unity Tent City -1
                  </NavLink>
                  <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 transition">
                    Everything you need to know about Statue of Unity Tent City -1
                  </NavLink>
                  <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 transition">
                    Everything you need to know about Statue of Unity Tent City -1
                  </NavLink>
                  <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 transition">
                    Everything you need to know about Statue of Unity Tent City -1
                  </NavLink>
                </div>
              </div>

              {/* Categories Section */}
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-[1.5rem] text-orange-500">Blogs Categories</h2>
                <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 flex justify-between items-center transition">
                  Auto Insurance <span className="text-orange-500 font-bold">10</span>
                </NavLink>
                <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 flex justify-between items-center transition">
                  Statue of Unity <span className="text-orange-500 font-bold">100</span>
                </NavLink>
                <NavLink className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 flex justify-between items-center transition">
                  Tourism <span className="text-orange-500 font-bold">500</span>
                </NavLink>
              </div>

              {/* Archives Section */}
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-[1.5rem] text-orange-500">Blogs Archives</h2>
                <div
                  className={`
                    flex flex-col gap-2
                    ${archives.length > 10 ? "max-h-64 overflow-y-auto pr-2" : ""}
                    scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent
                  `}
                  style={{
                    scrollbarColor: "#fdba74 #f3f4f6",
                    scrollbarWidth: "thin",
                  }}
                >
                  {archives.map((archive, idx) => (
                    <NavLink
                      key={idx}
                      className="cursor-pointer text-[1rem] font-semibold hover:text-orange-500 text-gray-700 flex justify-between items-center transition"
                    >
                      {archive.title} <span className="text-orange-500 font-bold">{archive.count}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogInnerPage;