import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const BlogCategoryNameUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {};

  const [blogCategoryName, setBlogCategoryName] = useState(
    rowData?.blog_category_name || ""
  );
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!rowData) {
      navigate("/blog-category-name");
    }
  }, [rowData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogCategoryName.trim()) {
      alert("Blog Category Name is required.");
      return;
    }
    try {
      const res = await axios.put(`${BE_URL}/blogCategoryName/${rowData.id}`, {
        blog_category_name: blogCategoryName,
      });
      if (res.data.status === "success") {
        setSuccess(true);
      } else {
        alert("Something went wrong while updating.");
      }
    } catch (err) {
      console.error("Error updating blog category name:", err);
      alert("Failed to update blog category name.");
    }
  };

  const handleCancel = () => {
    navigate("/blog-category-name");
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        navigate("/blog-category-name");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Blog Category Name
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Blog Category Name
            </label>
            <input
              type="text"
              value={blogCategoryName}
              onChange={(e) => setBlogCategoryName(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter Blog Category Name"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>
      {success && <UpdateData />}
    </div>
  );
};

export default BlogCategoryNameUpdate;
