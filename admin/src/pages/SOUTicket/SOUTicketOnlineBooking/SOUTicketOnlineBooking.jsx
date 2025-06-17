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
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const CELL_HEIGHT = 80; // px
const CONTENT_MAX_HEIGHT = 160; // px

const cellStyle = {
  height: CELL_HEIGHT,
  verticalAlign: "top",
  padding: "8px",
};

const contentStyle = {
  maxHeight: CONTENT_MAX_HEIGHT,
  overflowY: "auto",
  whiteSpace: "pre-line",
};

const SOUTicketOnlineBooking = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [bookings, setBookings] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all SOU Ticket Online Bookings
  useEffect(() => {
    axios
      .get(`${BE_URL}/souTicketOnlineBooking`)
      .then((res) => setBookings(res.data.data))
      .catch((err) => console.error("Online booking fetch failed:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souTicketOnlineBooking/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setBookings((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = bookings.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-ticket-online-booking/insert");

  const handleUpdate = (item) => {
    navigate("/sou-ticket-online-booking/update", {
      state: { bookingData: item },
    });
  };

  const handleTraceClick = () => navigate("/sou-ticket-online-booking/trace");

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add SOU Ticket Online Booking"
          width="w-[320px]"
          onClick={handleAdd}
        />
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Online Booking Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell
                className="border-r border-gray-300 font-bold text-base"
                style={cellStyle}
              >
                ID
              </TableCell>
              <TableCell
                className="border-r border-gray-300 font-bold text-base"
                style={cellStyle}
              >
                Heading
              </TableCell>
              <TableCell
                className="border-r border-gray-300 font-bold text-base"
                style={cellStyle}
              >
                First Description
              </TableCell>
              <TableCell
                className="border-r border-gray-300 font-bold text-base"
                style={cellStyle}
              >
                Description
              </TableCell>
              <TableCell
                className="border-r border-gray-300 font-bold text-base"
                style={cellStyle}
              >
                Data (Steps)
              </TableCell>
              <TableCell
                className="border-r border-gray-300 font-bold text-base"
                style={cellStyle}
              >
                Notes
              </TableCell>
              <TableCell className="font-bold text-base" style={cellStyle}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300"
                style={{ height: CELL_HEIGHT }}
              >
                <TableCell className="border-r" style={cellStyle}>
                  <div style={contentStyle}>
                    {(page - 1) * rowsPerPage + index + 1}
                  </div>
                </TableCell>
                <TableCell className="border-r" style={cellStyle}>
                  <div style={contentStyle}>
                    {row.headiing ? row.headiing : "-"}
                  </div>
                </TableCell>
                <TableCell className="border-r" style={cellStyle}>
                  <div style={contentStyle}>
                    {row.first_description ? row.first_description : "-"}
                  </div>
                </TableCell>
                <TableCell className="border-r" style={cellStyle}>
                  <div style={contentStyle}>
                    {row.description ? row.description : "-"}
                  </div>
                </TableCell>
                <TableCell className="border-r" style={cellStyle}>
                  <div style={contentStyle}>
                    {row.data && Array.isArray(row.data) ? (
                      <ul style={{ margin: 0, paddingLeft: 16 }}>
                        {row.data.map((step, i) => (
                          <li key={i}>
                            <span className="font-semibold">
                              {step.heading ? `${step.heading}: ` : ""}
                            </span>
                            {step.title}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "-"
                    )}
                  </div>
                </TableCell>
                <TableCell className="border-r" style={cellStyle}>
                  <div style={contentStyle}>{row.notes ? row.notes : "-"}</div>
                </TableCell>
                <TableCell style={cellStyle}>
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
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(bookings.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUTicketOnlineBooking;
