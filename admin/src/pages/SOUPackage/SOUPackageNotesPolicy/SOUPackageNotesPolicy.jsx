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

const SOUPackageNotesPolicy = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [notesPolicies, setNotesPolicies] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch SOU Packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  // Fetch NotesPolicy by selected package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(`${BE_URL}/souPackageNotesPolicy/package/${selectedPackageId}`)
        .then((res) => setNotesPolicies(res.data.data))
        .catch((err) => console.error("NotesPolicy fetch failed:", err));
    } else {
      setNotesPolicies([]);
    }
  }, [selectedPackageId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souPackageNotesPolicy/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setNotesPolicies((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = notesPolicies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-package-notes-policy/insert");

  const handleUpdate = (item) => {
    navigate("/sou-package-notes-policy/update", {
      state: { notesPolicyData: item },
    });
  };

  const handleTraceClick = () => navigate("/sou-package-notes-policy/trace");

  const handlePackageChange = (event) => {
    setSelectedPackageId(event.target.value);
    setPage(1);
  };

  // Helper to display notes/policy from JSON string/array
  const renderList = (data) => {
    try {
      const arr = typeof data === "string" ? JSON.parse(data) : data;
      if (Array.isArray(arr)) {
        return (
          <ul className="list-disc pl-4">
            {arr.map((v, idx) => (
              <li key={idx}>{v}</li>
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
          text="Add SOU Package Notes & Policy"
          width="w-[310px]"
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

      {/* Notes & Policy Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Notes
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Cancellation / Refund Policy
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
                  {row.notes ? renderList(row.notes) : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.refund_policy ? renderList(row.refund_policy) : "-"}
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
            count={Math.ceil(notesPolicies.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageNotesPolicy;
