import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Tooltip,
} from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const BlogCategoryNameTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch trashed (deleted) Blog Category Names
  const fetchDeletedData = async () => {
    try {
      // Must match backend route
      const res = await axios.get(`${BE_URL}/blogCategoryName/trashed/list`);
      setData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching deleted blog category data:", err);
    }
  };

  useEffect(() => {
    fetchDeletedData();
  }, []);

  const handleRestoreClick = async (id) => {
    try {
      await axios.patch(`${BE_URL}/blogCategoryName/restore/${id}`);
      setSelectedId(id);
      setShowRestorePopup(true);
      fetchDeletedData();
    } catch (err) {
      console.error("Error restoring blog category name:", err);
    }
  };

  const handleBackClick = () => {
    navigate("/blog-category-name");
  };

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {/* Restore Popup */}
      {showRestorePopup && (
        <RestoreData
          onClose={() => {
            setShowRestorePopup(false);
            setSelectedId(null);
          }}
          id={selectedId}
        />
      )}

      {/* Header and Back */}
      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          Blog Category Name Trace
        </h2>
        <Back onClick={handleBackClick} />
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r !font-extrabold text-base text-left">
                S.No.
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Blog Category Name
              </TableCell>
              <TableCell className="!font-extrabold text-base text-left">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
              >
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell
                  className="border-r text-left"
                  style={{ maxWidth: 400, whiteSpace: "pre-wrap" }}
                >
                  {row.blog_category_name}
                </TableCell>
                <TableCell className="text-left">
                  <Tooltip title="Restore">
                    <button
                      className="text-blue-600 cursor-pointer hover:text-blue-800"
                      onClick={() => handleRestoreClick(row.id)}
                    >
                      <FaRecycle size={22} />
                    </button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default BlogCategoryNameTrace;
