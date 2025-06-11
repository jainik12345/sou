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

const SOUPackageResort = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [resorts, setResorts] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch SOU Packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  // Fetch Resorts by selected package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(`${BE_URL}/souPackageResort/package/${selectedPackageId}`)
        .then((res) => setResorts(res.data.data))
        .catch((err) => console.error("Resort fetch failed:", err));
    } else {
      setResorts([]);
    }
  }, [selectedPackageId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souPackageResort/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setResorts((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = resorts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-package-resort/insert");

  const handleUpdate = (item) => {
    navigate("/sou-package-resort/update", {
      state: { resortData: item },
    });
  };

  const handleTraceClick = () => navigate("/sou-package-resort/trace");

  const handlePackageChange = (event) => {
    setSelectedPackageId(event.target.value);
    setPage(1);
  };

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add SOU Package Resort"
          width="w-[250px]"
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

      {/* Resort Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                #
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Type Room Name
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Week
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Food Plan
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Per Couple (Price)
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
            count={Math.ceil(resorts.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageResort;
