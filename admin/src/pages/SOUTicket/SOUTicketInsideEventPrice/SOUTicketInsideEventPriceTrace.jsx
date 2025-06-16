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

const SOUTicketInsideEventPriceTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [trashedEvents, setTrashedEvents] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch trashed SOU Ticket Inside Event Prices
  useEffect(() => {
    axios
      .get(`${BE_URL}/souTicketInsideEventPrice/trashed`)
      .then((res) => setTrashedEvents(res.data.data))
      .catch((err) => console.error("Trash fetch failed:", err));
  }, []);

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/souTicketInsideEventPrice/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedEvents((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedEvents.slice(
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
          Trashed Ticket Inside Event Price
        </h2>
        <Back onClick={() => navigate("/sou-ticket-inside-event-price")} />
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
                Adult Price
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Child Price
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Caution
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
                <TableCell colSpan={7} align="center" className="py-6">
                  No trashed event prices found.
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
                    {row.adult_price || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.child_price || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.caution || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.image ? (
                      <img
                        src={`${BE_URL}/Images/SouTicket/SouTicketInsideEventPriceImages/${row.image}`}
                        alt="event"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Event Price" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Event Price"
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
            count={Math.ceil(trashedEvents.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUTicketInsideEventPriceTrace;
