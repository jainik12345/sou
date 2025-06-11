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
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import RestoreData from "../../../components/Popup/RestoreData";
import Back from "../../../components/Buttons/Back";
import { FaRecycle } from "react-icons/fa";

const BlogDataDetailsTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [trashedDetails, setTrashedDetails] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all blog categories
  useEffect(() => {
    axios
      .get(`${BE_URL}/blogCategoryName`)
      .then((res) => setCategoryOptions(res.data.data))
      .catch((err) => console.error("Category fetch failed:", err));
  }, []);

  // Fetch trashed blog data details by category
  useEffect(() => {
    if (selectedCategoryId) {
      axios
        .get(`${BE_URL}/blogDataDetails/trashed/category/${selectedCategoryId}`)
        .then((res) => setTrashedDetails(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedDetails([]);
    }
  }, [selectedCategoryId]);

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/blogDataDetails/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedDetails((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedDetails.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-6 rounded-xl bg-white relative shadow-lg">
      {/* Restore success popup */}
      {restoreSuccess && <RestoreData />}

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <h2 className="text-2xl font-semibold text-gray-900">
          Trashed Blog Data Details
        </h2>
        <Back onClick={() => navigate("/blog-data-details")} />
      </Box>

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

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r font-bold text-base">#</TableCell>
              <TableCell className="border-r font-bold text-base">
                Title
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Image
              </TableCell>
              <TableCell className="font-bold text-base text-center">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" className="py-6">
                  First select blog category, then trashed data will appear
                  here.
                </TableCell>
              </TableRow>
            ) : (
              displayedRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100 transition-all"
                >
                  <TableCell className="border-r">
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="border-r">{row.title || "-"}</TableCell>
                  <TableCell className="border-r">
                    {row.image ? (
                      <img
                        src={`${BE_URL}/Images/Blog/BlogDataDetailsImages/${row.image}`}
                        alt="blog"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Blog Data" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Blog Data"
                      >
                        <FaRecycle size={22} />
                      </button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(trashedDetails.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default BlogDataDetailsTrace;
