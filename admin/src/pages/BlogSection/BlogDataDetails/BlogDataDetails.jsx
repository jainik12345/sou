import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const ROW_HEIGHT = 120; // px

const BlogDataDetails = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [details, setDetails] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();

  // Fetch all blog categories
  useEffect(() => {
    axios
      .get(`${BE_URL}/blogCategoryName`)
      .then((res) => setCategoryOptions(res.data.data))
      .catch((err) => console.error("Category fetch failed:", err));
  }, []);

  // Fetch blog data details for the selected category
  useEffect(() => {
    if (selectedCategoryId) {
      axios
        .get(`${BE_URL}/blogDataDetails/category/${selectedCategoryId}`)
        .then((res) => setDetails(res.data.data))
        .catch((err) => console.error("Data details fetch failed:", err));
    } else {
      setDetails([]);
    }
  }, [selectedCategoryId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/blogDataDetails/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setDetails((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = details.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/blog-data-details/insert");

  const handleUpdate = (item) => {
    navigate("/blog-data-details/update", {
      state: { blogDataDetails: item },
    });
  };

  const handleTraceClick = () => navigate("/blog-data-details/trace");

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
    setPage(1);
  };

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add Blog Data Details"
          width="w-[250px]"
          onClick={handleAdd}
        />
      </div>

      {/* Category Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-category-label">
            Select Blog Category
          </InputLabel>
          <Select
            labelId="select-category-label"
            value={selectedCategoryId}
            onChange={handleCategoryChange}
            label="Select Blog Category"
            displayEmpty
          >
            {categoryOptions.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.blog_category_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <hr className="border-gray-300 mb-6" />

      {/* Blog Data Details Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                S.No.
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Image
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Title
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Date
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Description
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Data (Heading & Content)
              </TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-6">
                  Please select a blog category to view data.
                </TableCell>
              </TableRow>
            ) : (
              displayedRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100 transition-all duration-300"
                  style={{ height: ROW_HEIGHT, maxHeight: ROW_HEIGHT }}
                >
                  <TableCell
                    className="border-r align-top"
                    style={{ height: ROW_HEIGHT, maxHeight: ROW_HEIGHT }}
                  >
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell
                    className="border-r align-top"
                    style={{ height: ROW_HEIGHT, maxHeight: ROW_HEIGHT }}
                  >
                    {row.image ? (
                      <img
                        src={`${BE_URL}/Images/Blog/BlogDataDetailsImages/${row.image}`}
                        alt="Blog"
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell
                    className="border-r align-top"
                    style={{ height: ROW_HEIGHT, maxHeight: ROW_HEIGHT }}
                  >
                    {row.title || "-"}
                  </TableCell>
                  <TableCell
                    className="border-r align-top"
                    style={{ height: ROW_HEIGHT, maxHeight: ROW_HEIGHT }}
                  >
                    {row.date
                      ? new Date(row.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell
                    className="border-r align-top"
                    style={{
                      height: ROW_HEIGHT,
                      maxHeight: ROW_HEIGHT,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        maxHeight: ROW_HEIGHT - 10,
                        overflowY: "auto",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {row.description || "-"}
                    </div>
                  </TableCell>
                  <TableCell
                    className="border-r align-top"
                    style={{
                      height: ROW_HEIGHT,
                      maxHeight: ROW_HEIGHT,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        maxHeight: ROW_HEIGHT - 10,
                        overflowY: "auto",
                      }}
                    >
                      {row.data &&
                      Array.isArray(
                        typeof row.data === "string"
                          ? (() => {
                              try {
                                return JSON.parse(row.data);
                              } catch {
                                return [];
                              }
                            })()
                          : row.data
                      )
                        ? (typeof row.data === "string"
                            ? JSON.parse(row.data)
                            : row.data
                          ).map((item, idx) =>
                            item.heading || item.content ? (
                              <div key={idx} className="mb-2">
                                <div className="font-semibold text-blue-700">
                                  {item.heading}
                                </div>
                                <div className="text-gray-800 ml-2">
                                  {item.content}
                                </div>
                              </div>
                            ) : null
                          )
                        : "-"}
                    </div>
                  </TableCell>
                  <TableCell
                    className="align-top"
                    style={{ height: ROW_HEIGHT, maxHeight: ROW_HEIGHT }}
                  >
                    <div className="flex space-x-4">
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleUpdate(row)}
                      >
                        <FaEdit size={22} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(row.id)}
                      >
                        <FaTrash size={22} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(details.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default BlogDataDetails;
