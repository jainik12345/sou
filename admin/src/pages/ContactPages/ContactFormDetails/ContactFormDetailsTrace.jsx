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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import { FaRecycle, FaTimes } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const fieldLabels = [
  { key: "Name", label: "Name" },
  { key: "Email", label: "Email" },
  { key: "Number", label: "Number" },
  { key: "City", label: "City" },
  { key: "NumberOfPerson", label: "Number Of Person" },
  { key: "NumberOfChild", label: "Number Of Child" },
  { key: "Date", label: "Date" },
  { key: "NumberOfNights", label: "Number Of Nights" },
  { key: "Resort", label: "Resort" },
  { key: "Message", label: "Message" },
];

const ContactFormDetailsTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [data, setData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewRow, setViewRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrashedData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/contactForm/trashed`);
        if (response.data.status === "success") {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch trashed data:", error);
      }
    };
    fetchTrashedData();
  }, []);

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleRestoreClick = async (id) => {
    try {
      const response = await axios.patch(`${BE_URL}/contactForm/restore/${id}`);
      if (response.data.status === "success") {
        setData((prev) => prev.filter((row) => row.id !== id));
        setSelectedId(id);
        setShowRestorePopup(true);
      } else {
        console.error("Failed to restore the record");
      }
    } catch (error) {
      console.error("Error restoring record:", error);
    }
  };

  const handleBackClick = () => {
    navigate("/contact-form-details");
  };

  const handleRowClick = (row) => {
    setViewRow(row);
    setShowViewPopup(true);
  };

  const handleCloseViewPopup = () => {
    setShowViewPopup(false);
    setViewRow(null);
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      {/* Restore Popup */}
      {showRestorePopup && (
        <RestoreData
          id={selectedId}
          onClose={() => {
            setShowRestorePopup(false);
            setSelectedId(null);
          }}
        />
      )}

      {/* View Popup */}
      <Dialog
        open={showViewPopup}
        onClose={handleCloseViewPopup}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { position: "relative" } }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseViewPopup}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 20,
          }}
        >
          <FaTimes />
        </IconButton>
        <DialogTitle sx={{ fontWeight: "bold", mb: 0.5 }}>
          Contact Details
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 1, pb: 2 }}>
          {viewRow &&
            fieldLabels.map((field) => (
              <Box key={field.key} sx={{ mb: 1.5 }}>
                <span className="font-semibold text-gray-700">
                  {field.label}:
                </span>
                <span
                  className="ml-2 break-all text-gray-800"
                  style={
                    field.key === "Message" ? { whiteSpace: "pre-line" } : {}
                  }
                >
                  {viewRow[field.key] || "-"}
                </span>
              </Box>
            ))}
        </DialogContent>
      </Dialog>

      {/* Header and Back */}
      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          Contact Form Details Trace
        </h2>
        <Back onClick={handleBackClick} />
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table
          className="border border-gray-300"
          sx={{ minWidth: 1200, tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 60 }}
              >
                ID
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 160 }}
              >
                Name
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 220 }}
              >
                Email
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 130 }}
              >
                Number
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 120 }}
              >
                City
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 120 }}
              >
                Number Of Person
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 120 }}
              >
                Number Of Child
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 120 }}
              >
                Date
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 120 }}
              >
                Number Of Nights
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 180 }}
              >
                Resort
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 350 }}
              >
                Message
              </TableCell>
              <TableCell
                className="!font-extrabold text-base text-left"
                sx={{ width: 100 }}
              >
                Restore
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
                hover
                onClick={(e) => {
                  // Avoid opening the view popup if restore button is clicked
                  if (
                    e.target.closest("button") ||
                    e.target.closest("svg") ||
                    e.target.closest("path")
                  )
                    return;
                  handleRowClick(row);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell className="border-r text-left">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r text-left">{row.Name}</TableCell>
                <TableCell className="border-r text-left">
                  {row.Email}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.Number}
                </TableCell>
                <TableCell className="border-r text-left">{row.City}</TableCell>
                <TableCell className="border-r text-left">
                  {row.NumberOfPerson}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.NumberOfChild}
                </TableCell>
                <TableCell className="border-r text-left">{row.Date}</TableCell>
                <TableCell className="border-r text-left">
                  {row.NumberOfNights}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.Resort}
                </TableCell>
                <TableCell
                  className="border-r text-left"
                  style={{ maxWidth: 350, whiteSpace: "pre-wrap" }}
                >
                  <div
                    className="w-full max-h-24 overflow-y-auto text-sm whitespace-pre-wrap"
                    style={{ wordBreak: "break-word", fontFamily: "inherit" }}
                  >
                    {row.Message}
                  </div>
                </TableCell>
                <TableCell className="text-left">
                  <button
                    className="text-blue-600 cursor-pointer hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRestoreClick(row.id);
                    }}
                    title="Restore"
                  >
                    <FaRecycle size={22} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-start p-4">
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

export default ContactFormDetailsTrace;
