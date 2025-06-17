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

const SOUTicketTourPackageTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [trashedTourPackages, setTrashedTourPackages] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => setPackageOptions(res.data.data))
      .catch((err) => console.error("Package fetch failed:", err));
  }, []);

  // Fetch trashed tour packages by package
  useEffect(() => {
    if (selectedPackageId) {
      axios
        .get(
          `${BE_URL}/souTicketTourPackage/trashed/package/${selectedPackageId}`
        )
        .then((res) => setTrashedTourPackages(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedTourPackages([]);
    }
  }, [selectedPackageId]);

  const handlePackageChange = (e) => {
    setSelectedPackageId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/souTicketTourPackage/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedTourPackages((prev) =>
            prev.filter((item) => item.id !== id)
          );
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedTourPackages.slice(
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
          Trashed Ticket Tour Packages
        </h2>
        <Back onClick={() => navigate("/sou-ticket-tour-package")} />
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
                Nights
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Days
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
              <TableCell className="border-r font-bold text-base">
                FAQs
              </TableCell>
              <TableCell className="font-bold text-base text-center">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" className="py-6">
                  First select package name, then trashed tour package data will
                  appear here.
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
                    {row.nights ?? "-"}
                  </TableCell>
                  <TableCell className="border-r">{row.days ?? "-"}</TableCell>
                  <TableCell className="border-r">
                    {row.adult_price ?? "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.child_price ?? "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.caution ?? "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.image ? (
                      <img
                        src={`${BE_URL}/Images/SouTicket/SouTicketTourPackageImages/${row.image}`}
                        alt="tour package"
                        className="w-16 h-16 object-cover rounded-md border"
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
                                  <b>Q:</b> {faq.q || faq.question}
                                  <br />
                                  <b>A:</b> {faq.a || faq.answer}
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
                  <TableCell className="text-center">
                    <Tooltip title="Restore Tour Package" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Tour Package"
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
            count={Math.ceil(trashedTourPackages.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUTicketTourPackageTrace;
