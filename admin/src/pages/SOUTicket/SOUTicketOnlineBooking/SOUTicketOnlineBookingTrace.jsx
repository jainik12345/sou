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
  Box,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import RestoreData from "../../../components/Popup/RestoreData";
import Back from "../../../components/Buttons/Back";
import { FaRecycle } from "react-icons/fa";

const ROW_HEIGHT = 90; // px
const CELL_MAX_HEIGHT = 160; // px
const cellStyle = {
  height: ROW_HEIGHT,
  verticalAlign: "top",
  padding: "8px",
};
const contentStyle = {
  maxHeight: CELL_MAX_HEIGHT,
  overflowY: "auto",
  whiteSpace: "pre-line",
};

const SOUTicketOnlineBookingTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [trashedBookings, setTrashedBookings] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch trashed SOU Ticket Online Bookings
  useEffect(() => {
    axios
      .get(`${BE_URL}/souTicketOnlineBooking/trashed`)
      .then((res) => setTrashedBookings(res.data.data))
      .catch((err) => console.error("Trash fetch failed:", err));
  }, []);

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/souTicketOnlineBooking/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedBookings((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedBookings.slice(
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
          Trashed Ticket Online Booking
        </h2>
        <Back onClick={() => navigate("/sou-ticket-online-booking")} />
      </Box>

      <hr className="border-gray-300 mb-6" />

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100" style={{ height: ROW_HEIGHT }}>
              <TableCell
                className="border-r font-bold text-base"
                style={cellStyle}
              >
                #
              </TableCell>
              <TableCell
                className="border-r font-bold text-base"
                style={cellStyle}
              >
                Heading
              </TableCell>
              <TableCell
                className="border-r font-bold text-base"
                style={cellStyle}
              >
                First Description
              </TableCell>
              <TableCell
                className="border-r font-bold text-base"
                style={cellStyle}
              >
                Description
              </TableCell>
              <TableCell
                className="border-r font-bold text-base"
                style={cellStyle}
              >
                Data (Steps)
              </TableCell>
              <TableCell
                className="border-r font-bold text-base"
                style={cellStyle}
              >
                Notes
              </TableCell>
              <TableCell
                className="font-bold text-base text-center"
                style={cellStyle}
              >
                Restore
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.length === 0 ? (
              <TableRow style={{ height: ROW_HEIGHT }}>
                <TableCell colSpan={7} align="center" className="py-6">
                  No trashed online bookings found.
                </TableCell>
              </TableRow>
            ) : (
              displayedRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-100 transition-all"
                  style={{ height: ROW_HEIGHT }}
                >
                  <TableCell className="border-r" style={cellStyle}>
                    <div style={contentStyle}>
                      {(page - 1) * rowsPerPage + index + 1}
                    </div>
                  </TableCell>
                  <TableCell className="border-r" style={cellStyle}>
                    <div style={contentStyle}>{row.headiing || "-"}</div>
                  </TableCell>
                  <TableCell className="border-r" style={cellStyle}>
                    <div style={contentStyle}>
                      {row.first_description || "-"}
                    </div>
                  </TableCell>
                  <TableCell className="border-r" style={cellStyle}>
                    <div style={contentStyle}>{row.description || "-"}</div>
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
                    <div style={contentStyle}>{row.notes || "-"}</div>
                  </TableCell>
                  <TableCell className="text-center" style={cellStyle}>
                    <Tooltip title="Restore Online Booking" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Online Booking"
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
            count={Math.ceil(trashedBookings.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUTicketOnlineBookingTrace;
