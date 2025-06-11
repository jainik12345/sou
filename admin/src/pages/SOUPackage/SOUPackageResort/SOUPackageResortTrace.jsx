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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import RestoreData from "../../../components/Popup/RestoreData";
import Back from "../../../components/Buttons/Back";
import { FaRecycle } from "react-icons/fa";

const SOUPackageResortTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [trashedResorts, setTrashedResorts] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  // Fetch trashed resorts by package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(`${BE_URL}/souPackageResort/trashed/package/${selectedPackageId}`)
        .then((res) => setTrashedResorts(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedResorts([]);
    }
  }, [selectedPackageId]);

  const handlePackageChange = (e) => {
    setSelectedPackageId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/souPackageResort/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedResorts((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedResorts.slice(
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
          Trashed Package Resort
        </h2>
        <Back onClick={() => navigate("/sou-package-resort")} />
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
                Type Room Name
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Week
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Food Plan
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Per Couple (Price)
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
                  First select package name, then resort data will appear here.
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
                    {row.type_room_name || "-"}
                  </TableCell>
                  <TableCell className="border-r">{row.week || "-"}</TableCell>
                  <TableCell className="border-r">
                    {row.food_plans || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.per_couple || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.image ? (
                      <img
                        src={`${BE_URL}/Images/SouPackage/SouPackageResortImages/${row.image}`}
                        alt="Resort"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Resort" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Resort"
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
            count={Math.ceil(trashedResorts.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageResortTrace;
