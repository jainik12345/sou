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
  Tooltip,
  IconButton,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const SOUPackageItinerarySection = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [itineraryOptions, setItineraryOptions] = useState([]);
  const [selectedItineraryId, setSelectedItineraryId] = useState("");
  const [sections, setSections] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch SOU Package Itinerary Names
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageItineraryName`)
      .then((res) => setItineraryOptions(res.data.data))
      .catch((err) => console.error("Itinerary fetch failed:", err));
  }, []);

  // Fetch Sections by selected itinerary
  useEffect(() => {
    if (selectedItineraryId) {
      axios
        .get(
          `${BE_URL}/souPackageItinerarySection/itinerary/${selectedItineraryId}`
        )
        .then((res) => setSections(res.data.data))
        .catch((err) => console.error("Section fetch failed:", err));
    } else {
      setSections([]);
    }
  }, [selectedItineraryId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souPackageItinerarySection/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setSections((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = sections.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-package-itinerary-section/insert");

  const handleUpdate = (item) => {
    navigate("/sou-package-itinerary-section/update", {
      state: { itinerarySectionData: item },
    });
  };

  const handleTraceClick = () =>
    navigate("/sou-package-itinerary-section/trace");

  const handleItineraryChange = (event) => {
    setSelectedItineraryId(event.target.value);
    setPage(1);
  };

  // Helper to display events from JSON string/array
  const renderEvents = (evenst) => {
    try {
      const eventsArr =
        typeof evenst === "string" ? JSON.parse(evenst) : evenst;
      if (Array.isArray(eventsArr)) {
        return (
          <ul className="list-disc pl-4">
            {eventsArr.map((evt, i) => (
              <li key={i}>{evt}</li>
            ))}
          </ul>
        );
      }
      return "-";
    } catch {
      return "-";
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add SOU Package Itinerary Section"
          width="w-[350px]"
          onClick={handleAdd}
        />
      </div>

      {/* Itinerary Selector */}
      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>Select Itinerary Name</InputLabel>
          <Select
            value={selectedItineraryId}
            onChange={handleItineraryChange}
            label="Select Itinerary Name"
          >
            {itineraryOptions.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.sou_package_itinerary_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Sections Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Heading
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Events
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
                  {row.heading ? row.heading : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.evenst ? renderEvents(row.evenst) : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-4">
                    <Tooltip title="Edit">
                      <IconButton
                        className="text-green-600 hover:text-green-800"
                        onClick={() => handleUpdate(row)}
                        size="small"
                      >
                        <FaEdit size={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(row.id)}
                        size="small"
                      >
                        <FaTrash size={22} />
                      </IconButton>
                    </Tooltip>
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

export default SOUPackageItinerarySection;
