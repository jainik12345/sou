import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FaRecycle } from "react-icons/fa";
import Back from "../../../components/Buttons/Back";
import RestoreData from "../../../components/Popup/RestoreData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";

const rowsPerPage = 10;

const GujaratPackagesDataTrace = () => {
  const [page, setPage] = useState(1);
  const [trashedData, setTrashedData] = useState([]);
  const [showRestorePopup, setShowRestorePopup] = useState(false);
  const [gujaratPackages, setGujaratPackages] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${BE_URL}/gujaratPackage`);
      setGujaratPackages(res.data.data || []);
    } catch (err) {
      console.error("Errro in fetch Packages Data ", err);

      setGujaratPackages([]);
    }
  };

  const fetchTrashedData = async (packageId) => {
    try {
      if (!packageId) {
        setTrashedData([]);
        return;
      }
      const res = await axios.get(`${BE_URL}/gujaratPackageData/trashed`);

      const formatted = (res.data.data || [])
        .filter((item) => String(item.gujarat_package_id) === String(packageId))
        .map((item) => ({
          ...item,
          images: Array.isArray(item.multiple_images)
            ? item.multiple_images
            : typeof item.multiple_images === "string"
            ? JSON.parse(item.multiple_images || "[]")
            : [],
        }));
      setTrashedData(formatted);
    } catch (err) {
      console.error("Errro in fetch Time ", err);
      setTrashedData([]);
    }
  };

  const handlePackageChange = (e) => {
    const pkgId = e.target.value;
    setSelectedPackageId(pkgId);
    setPage(1);
    fetchTrashedData(pkgId);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleRestore = async (id) => {
    try {
      await axios.patch(`${BE_URL}/gujaratPackageData/restore/${id}`);
      setShowRestorePopup(true);
      setTimeout(() => {
        setShowRestorePopup(false);
        fetchTrashedData(selectedPackageId);
      }, 2500);
    } catch (err) {
      console.error("Errro in handleRestore ", err);
    }
  };

  const handleBackClick = () => {
    navigate("/gujarat-packages-data");
  };

  const displayedRows = trashedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="p-4 rounded-xl bg-white">
      {showRestorePopup && (
        <RestoreData onClose={() => setShowRestorePopup(false)} />
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-left font-semibold text-xl">
          Gujarat Packages Data Trace
        </h2>
        <Back onClick={handleBackClick} />
      </div>

      {/* Selector */}
      <div className="mb-6 w-full md:w-1/3">
        <FormControl fullWidth>
          <InputLabel>Select Package</InputLabel>
          <Select
            label="Select Package"
            value={selectedPackageId}
            onChange={handlePackageChange}
          >
            <MenuItem value="">Select Package</MenuItem>
            {gujaratPackages.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                Gujarat Tour {pkg.Nights} Nights {pkg.Days} Days
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r !font-extrabold text-base text-left">
                #
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Package
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Heading
              </TableCell>
              <TableCell className="border-r !font-extrabold text-base text-left">
                Images
              </TableCell>
              <TableCell className="!font-extrabold text-base text-left">
                Restore
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedPackageId === "" ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-gray-500"
                >
                  Please select a package to view trashed data.
                </TableCell>
              </TableRow>
            ) : displayedRows.length > 0 ? (
              displayedRows.map((row, index) => {
                const pkg = gujaratPackages.find(
                  (p) => String(p.id) === String(row.gujarat_package_id)
                );
                const pkgLabel = pkg
                  ? `Gujarat Tour ${pkg.Nights} Nights ${pkg.Days} Days`
                  : row.gujarat_package_id;

                return (
                  <TableRow
                    key={row.id}
                    className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
                  >
                    <TableCell className="border-r">
                      {(page - 1) * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell className="border-r">{pkgLabel}</TableCell>
                    <TableCell className="border-r">{row.heading}</TableCell>
                    <TableCell className="border-r">
                      <div className="flex gap-1 flex-wrap">
                        {(row.images || []).map((img, idx) => (
                          <img
                            key={idx}
                            src={`${BE_URL}/Images/GujaratPackage/GujaratPackageDataImage/${img}`}
                            alt="Data"
                            className="w-12 h-12 object-cover rounded border"
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                      >
                        <FaRecycle size={22} />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-3">
                  No trashed data found for this package.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end p-4">
          <Pagination
            count={Math.ceil(trashedData.length / rowsPerPage) || 1}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default GujaratPackagesDataTrace;
