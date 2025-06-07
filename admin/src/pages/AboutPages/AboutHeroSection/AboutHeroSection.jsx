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

const AboutHeroSection = () => {
  const [sections, setSections] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const fetchSections = async () => {
    try {
      const res = await axios.get(`${BE_URL}/aboutHeroSection`);
      const formatted = res.data.data.map((item) => ({
        ...item,
        imageUrl: `${BE_URL}/Images/AboutImages/Hero/${item.image}`,
        improvementList: Array.isArray(item.improvement)
          ? item.improvement
          : (Array.isArray(JSON.parse(item.improvement)) ? JSON.parse(item.improvement) : []),
      }));
      setSections(formatted);
    } catch (err) {
      console.error("Error fetching hero sections:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/aboutHeroSection/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchSections();
      }, 2500);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const displayedRows = sections.slice(
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
        <Trace onClick={() => navigate("/about-hero-section/trace")} />
        <Add
          text="Add Hero Section"
          width="w-[200px]"
          onClick={() => navigate("/about-hero-section/insert")}
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
                Description
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Improvement
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Image
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
                  {row.description}
                </TableCell>
                <TableCell className="border-r text-left">
                  <ul className="list-disc pl-5">
                    {row.improvementList && row.improvementList.map((im, idx) => (
                      <li key={idx}>{im}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="border-r text-left">
                  <img
                    src={row.imageUrl}
                    alt="Hero"
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-left">
                  <div className="flex space-x-4">
                    <IconButton
                      onClick={() =>
                        navigate("/about-hero-section/update", {
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
            count={Math.ceil(sections.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default AboutHeroSection;