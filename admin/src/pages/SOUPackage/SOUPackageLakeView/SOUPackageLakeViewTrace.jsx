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

const SOUPackageLakeViewTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [trashedLakeViews, setTrashedLakeViews] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  // Fetch trashed lake views by package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(
          `${BE_URL}/souPackageLakeView/trashed/package/${selectedPackageId}`
        )
        .then((res) => setTrashedLakeViews(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedLakeViews([]);
    }
  }, [selectedPackageId]);

  const handlePackageChange = (e) => {
    setSelectedPackageId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/souPackageLakeView/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedLakeViews((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedLakeViews.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Helper to display JSON array data
  const renderDataRows = (data) => {
    if (!Array.isArray(data)) return "-";
    return data.map((row, idx) => (
      <div key={idx} className="mb-1">
        <span className="font-semibold">Plan:</span> {row.plans || "-"}
        {" | "}
        <span className="font-semibold">1 Night & 2 Days:</span>{" "}
        {row.night1days2 || "-"}
        {" | "}
        <span className="font-semibold">2 Night & 3 Days:</span>{" "}
        {row.night2days3 || "-"}
      </div>
    ));
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
          Trashed Package Lake View
        </h2>
        <Back onClick={() => navigate("/sou-package-lake-view")} />
      </Box>

      {/* Package Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-package-label">Select Package</InputLabel>
          <Select
            labelId="select-package-label"
            value={selectedPackageId}
            onChange={handlePackageChange}
            label="Select Package"
            displayEmpty
          >
            {packageOptions.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.sou_package_name}
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
                Week
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Lake View Data
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
                  First select package name, then lake view data will appear
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
                  <TableCell className="border-r">{row.week || "-"}</TableCell>
                  <TableCell className="border-r">
                    {row.data
                      ? renderDataRows(
                          typeof row.data === "string"
                            ? (() => {
                                try {
                                  return JSON.parse(row.data);
                                } catch {
                                  return [];
                                }
                              })()
                            : row.data
                        )
                      : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Lake View" arrow>
                      <IconButton
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Lake View"
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
            count={Math.ceil(trashedLakeViews.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageLakeViewTrace;
