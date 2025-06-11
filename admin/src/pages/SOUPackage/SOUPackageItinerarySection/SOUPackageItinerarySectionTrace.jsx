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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import RestoreData from "../../../components/Popup/RestoreData";
import Back from "../../../components/Buttons/Back";
import { FaRecycle } from "react-icons/fa";

const SOUPackageItinerarySectionTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [itineraryOptions, setItineraryOptions] = useState([]);
  const [selectedItineraryId, setSelectedItineraryId] = useState("");
  const [trashedSections, setTrashedSections] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all itineraries
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageItineraryName`)
      .then((res) => setItineraryOptions(res.data.data))
      .catch((err) => console.error("Itinerary fetch failed:", err));
  }, []);

  // Fetch trashed sections by itinerary
  useEffect(() => {
    if (selectedItineraryId) {
      axios
        .get(
          `${BE_URL}/souPackageItinerarySection/trashed/itinerary/${selectedItineraryId}`
        )
        .then((res) => setTrashedSections(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedSections([]);
    }
  }, [selectedItineraryId]);

  const handleItineraryChange = (e) => {
    setSelectedItineraryId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/souPackageItinerarySection/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedSections((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedSections.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
          Trashed Package Itinerary Section
        </h2>
        <Back onClick={() => navigate("/sou-package-itinerary-section")} />
      </Box>

      {/* Itinerary Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-itinerary-label">
            Select Itinerary Name
          </InputLabel>
          <Select
            labelId="select-itinerary-label"
            value={selectedItineraryId}
            onChange={handleItineraryChange}
            label="Select Itinerary Name"
            displayEmpty
          >
            {itineraryOptions.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.sou_package_itinerary_name}
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
                Heading
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Events
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
                  First select itinerary name, then section data will appear
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
                  <TableCell className="border-r">
                    {row.heading || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.evenst ? renderEvents(row.evenst) : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Section" arrow>
                      <IconButton
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Section"
                        size="small"
                      >
                        <FaRecycle size={22} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(trashedSections.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageItinerarySectionTrace;
