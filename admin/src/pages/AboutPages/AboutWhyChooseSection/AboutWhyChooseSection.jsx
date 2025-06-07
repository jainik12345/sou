import React, { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../../config";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import DeleteData from "../../../components/Popup/DeleteData";

const AboutWhyChooseSection = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const fetchRows = async () => {
    try {
      const res = await axios.get(`${BE_URL}/aboutWhyChooseSection`);
      setRows(res.data.data || []);
    } catch (err) {
      console.error("Error fetching rows:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/aboutWhyChooseSection/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchRows();
      }, 2500);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const displayedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Top Buttons */}
      <div className="flex justify-between mb-4">
        <Trace onClick={() => navigate("/about-why-choose-section/trace")} />
        <Add
          text="Add Why Choose"
          width="w-[200px]"
          onClick={() => navigate("/about-why-choose-section/insert")}
        />
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r !font-extrabold text-base text-left">
                ID
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Heading
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Title
              </TableCell>
              <TableCell className="!font-extrabold text-base text-left">
                Action
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
                <TableCell className="border-r text-left">
                  {row.heading}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.title}
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex space-x-4">
                    <IconButton
                      onClick={() =>
                        navigate("/about-why-choose-section/update", {
                          state: { rowData: row },
                        })
                      }
                    >
                      <FaEdit
                        size={22}
                        className="text-green-600 hover:text-green-800"
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <FaTrash
                        size={22}
                        className="text-red-600 hover:text-red-800"
                      />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default AboutWhyChooseSection;
