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
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const SOUPackageLakeView = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [lakeViews, setLakeViews] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch SOU Packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  // Fetch Lake Views by selected package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(`${BE_URL}/souPackageLakeView/package/${selectedPackageId}`)
        .then((res) => setLakeViews(res.data.data))
        .catch((err) => console.error("Lake View fetch failed:", err));
    } else {
      setLakeViews([]);
    }
  }, [selectedPackageId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souPackageLakeView/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setLakeViews((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = lakeViews.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-package-lake-view/insert");

  const handleUpdate = (item) => {
    navigate("/sou-package-lake-view/update", {
      state: { lakeViewData: item },
    });
  };

  const handleTraceClick = () => navigate("/sou-package-lake-view/trace");

  const handlePackageChange = (event) => {
    setSelectedPackageId(event.target.value);
    setPage(1);
  };

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
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add SOU Package Lake View"
          width="w-[280px]"
          onClick={handleAdd}
        />
      </div>

      {/* Package Selector */}
      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>Select Package</InputLabel>
          <Select
            value={selectedPackageId}
            onChange={handlePackageChange}
            label="Select Package"
          >
            {packageOptions.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.sou_package_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Lake View Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Week
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Lake View Data
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
                  {row.week ? row.week : "-"}
                </TableCell>
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
            count={Math.ceil(lakeViews.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageLakeView;
