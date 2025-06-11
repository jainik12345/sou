import React from "react";
import BlogCard from "../../components/BlogCard/BlogCard";

const BlogData = [

  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "10 Tips for Writing Clean React Code",
    category: "statue of unity",
    date: "June 10, 2025"
  },

  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "10 Tips for Writing Clean React Code",
    category: "ReactJS",
    date: "June 10, 2025"
  },


  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "10 Tips for Writing Clean React Code",
    category: "ReactJS",
    date: "June 10, 2025"
  },


  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "10 Tips for Writing Clean React Code",
    category: "ReactJS",
    date: "June 10, 2025"
  },


  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "10 Tips for Writing Clean React Code",
    category: "ReactJS",
    date: "June 10, 2025"
  },


  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    title: "10 Tips for Writing Clean React Code",
    category: "ReactJS",
    date: "June 10, 2025"
  },


]

export const Blog = () => {
  return (
    <>

      <div className="section bg-gray-100">

        <div className="max-w-screen-xl mx-auto py-10 px-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          {

            BlogData && BlogData.map((val) => {

              return (

                <BlogCard image={val.image} category={val.category} title={val.title} date={val.date} redirect={val.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}/>

              )

            })

          }
        </div>
      </div>

    </>
  );
}
