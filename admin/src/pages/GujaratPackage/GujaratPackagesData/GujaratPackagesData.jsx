import React, { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../../config";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Add from "../../../components/Buttons/Add";
import Trace from "../../../components/Buttons/Trace";
import DeleteData from "../../../components/Popup/DeleteData";

const GujaratPackagesData = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [packageData, setPackageData] = useState([]);
  const [page, setPage] = useState(1);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const rowsPerPage = 10;
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${BE_URL}/gujaratPackage`);
      setPackages(res.data.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };
  const fetchPackageData = async () => {
    if (!selectedPackageId) {
      return;
    }
    try {
      const res = await axios.get(
        `${BE_URL}/gujaratPackageData/by-package/${selectedPackageId}`
      );
      setPackageData(res.data.data);
    } catch (err) {
      console.error("Error fetching package data:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BE_URL}/gujaratPackageData/${id}`);
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        fetchPackageData();
      }, 2000);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    if (selectedPackageId) {
      fetchPackageData();
    }
  }, [selectedPackageId]);

  const displayedRows = packageData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {showDeletePopup && (
        <DeleteData onClose={() => setShowDeletePopup(false)} />
      )}

      {/* Header Controls */}
      <div className="flex justify-between mb-4">
        <Trace onClick={() => navigate("/gujarat-packages-data/trace")} />
        <Add
          text="Add Package Data"
          width="w-[200px]"
          onClick={() => navigate("/gujarat-packages-data/insert")}
        />
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Selector */}
      <div className="mb-6 w-full md:w-1/3">
        <FormControl fullWidth>
          <InputLabel>Select Package</InputLabel>
          <Select
            value={selectedPackageId}
            onChange={(e) => {
              setSelectedPackageId(e.target.value);
              setPage(1);
            }}
            label="Select Package"
          >
            {/* <MenuItem value="">All Packages</MenuItem> */}
            {packages.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.Nights} Night - {pkg.Days} Days
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>FAQs</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  {/* Show heading if available */}
                  <div
                    style={{
                      maxHeight: 60,
                      minWidth: 120,
                      overflowY: "auto",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {row.heading || "-"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {(() => {
                      try {
                        const images = Array.isArray(row.multiple_images)
                          ? row.multiple_images
                          : JSON.parse(row.multiple_images || "[]");

                        return images.map((img, idx) => (
                          <img
                            key={idx}
                            src={`${BE_URL}/Images/GujaratPackage/GujaratPackageDataImage/${img}`}
                            alt="Package"
                            className="w-12 h-12 rounded object-cover"
                          />
                        ));
                      } catch (error) {
                        console.error(
                          "Image JSON parse error:",
                          error,
                          row.multiple_images
                        );
                        return (
                          <span className="text-red-600">
                            Invalid image data
                          </span>
                        );
                      }
                    })()}
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    style={{
                      maxHeight: 100,
                      overflowY: "auto",
                      minWidth: 160,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {(() => {
                      try {
                        const faqArray = Array.isArray(row.faqs)
                          ? row.faqs
                          : JSON.parse(row.faqs || "[]");

                        return faqArray.map((faqBlock, blockIndex) => (
                          <div key={blockIndex} className="mb-2">
                            <ul className="ml-2 list-disc">
                              {faqBlock.faqs.map((faq, i) => (
                                <li key={i}>
                                  <strong>{faq.question}</strong>
                                  <br />
                                  {faq.answer}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ));
                      } catch (err) {
                        console.error("FAQ JSON parse error:", err, row.faqs);
                        return (
                          <span className="text-red-600">Invalid FAQ data</span>
                        );
                      }
                    })()}
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    style={{
                      maxHeight: 80,
                      overflowY: "auto",
                      minWidth: 120,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {(() => {
                      try {
                        const priceObj =
                          typeof row.price === "object"
                            ? row.price
                            : JSON.parse(row.price || "{}");

                        return Object.entries(priceObj).map(([key, val]) => (
                          <div key={key}>
                            <strong>{key}:</strong> ₹{val}
                          </div>
                        ));
                      } catch (err) {
                        console.error(
                          "Price JSON parse error:",
                          err,
                          row.price
                        );
                        return (
                          <span className="text-red-600">
                            Invalid price data
                          </span>
                        );
                      }
                    })()}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex space-x-4">
                    <IconButton
                      onClick={() =>
                        navigate("/gujarat-packages-data/update", {
                          state: { rowData: row, selectedPackageId },
                        })
                      }
                    >
                      <FaEdit className="text-green-600 hover:text-green-800" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)}>
                      <FaTrash className="text-red-600 hover:text-red-800" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(packageData.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default GujaratPackagesData;
