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
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const SOUTicketTourPackage = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [tourPackages, setTourPackages] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch SOU Packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  // Fetch Tour Packages by selected package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(`${BE_URL}/souTicketTourPackage/package/${selectedPackageId}`)
        .then((res) => setTourPackages(res.data.data))
        .catch((err) => console.error("Tour Package fetch failed:", err));
    } else {
      setTourPackages([]);
    }
  }, [selectedPackageId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souTicketTourPackage/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTourPackages((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = tourPackages.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-ticket-tour-package/insert");

  const handleUpdate = (item) => {
    navigate("/sou-ticket-tour-package/update", {
      state: { tourPackageData: item },
    });
  };

  const handleTraceClick = () => navigate("/sou-ticket-tour-package/trace");

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
          text="Add SOU Ticket Tour Package"
          width="w-[300px]"
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

      {/* Tour Package Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Nights
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Days
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
              <TableCell className="border-r border-gray-300 font-bold text-base">
                FAQs
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
                <TableCell className="border-r">{row.nights ?? "-"}</TableCell>
                <TableCell className="border-r">{row.days ?? "-"}</TableCell>
                <TableCell className="border-r">
                  {row.adult_price ?? "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.child_price ?? "-"}
                </TableCell>
                <TableCell className="border-r">{row.caution ?? "-"}</TableCell>
                <TableCell className="border-r">
                  {row.image ? (
                    <img
                      src={`${BE_URL}/Images/SouTicket/SouTicketTourPackageImages/${row.image}`}
                      alt="Tour Package"
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="border-r">
                  {row.faqs ? (
                    <Tooltip
                      title={
                        Array.isArray(row.faqs)
                          ? row.faqs.map((faq, idx) => (
                              <div key={idx}>
                                <b>Q:</b> {faq.q}
                                <br />
                                <b>A:</b> {faq.a}
                              </div>
                            ))
                          : typeof row.faqs === "string"
                          ? (() => {
                              try {
                                const faqsArr = JSON.parse(row.faqs);
                                return faqsArr.map((faq, idx) => (
                                  <div key={idx}>
                                    <b>Q:</b> {faq.q || faq.question}
                                    <br />
                                    <b>A:</b> {faq.a || faq.answer}
                                  </div>
                                ));
                              } catch {
                                return row.faqs;
                              }
                            })()
                          : "-"
                      }
                      arrow
                    >
                      <span className="underline cursor-pointer text-blue-600">
                        View
                      </span>
                    </Tooltip>
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
            count={Math.ceil(tourPackages.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUTicketTourPackage;
