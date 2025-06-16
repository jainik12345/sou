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

const SOUTicketInsideEventPrice = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [eventPrices, setEventPrices] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all SOU Ticket Inside Event Prices
  useEffect(() => {
    axios
      .get(`${BE_URL}/souTicketInsideEventPrice`)
      .then((res) => setEventPrices(res.data.data))
      .catch((err) => console.error("Event Price fetch failed:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souTicketInsideEventPrice/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setEventPrices((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = eventPrices.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-ticket-inside-event-price/insert");

  const handleUpdate = (item) => {
    navigate("/sou-ticket-inside-event-price/update", {
      state: { eventPriceData: item },
    });
  };

  const handleTraceClick = () =>
    navigate("/sou-ticket-inside-event-price/trace");

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add SOU Ticket Inside Event Price"
          width="w-[320px]"
          onClick={handleAdd}
        />
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Event Price Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Title
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Adult Price
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Child Price
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Caution
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Image
              </TableCell>
              <TableCell className="font-bold text-base">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                <TableCell className="border-r">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r">
                  {row.title ? row.title : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.adult_price ? row.adult_price : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.child_price ? row.child_price : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.caution ? row.caution : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.image ? (
                    <img
                      src={`${BE_URL}/Images/SouTicket/SouTicketInsideEventPriceImages/${row.image}`}
                      alt="Event"
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
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
            count={Math.ceil(eventPrices.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUTicketInsideEventPrice;
