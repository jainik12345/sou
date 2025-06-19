// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Pagination,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   Box,
//   Tooltip,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import BE_URL from "../../../config";
// import RestoreData from "../../../components/Popup/RestoreData";
// import Back from "../../../components/Buttons/Back";
// import { FaRecycle } from "react-icons/fa";

// const SOUPackageItineraryPackagePriceTrace = () => {
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;
//   const [itineraryOptions, setItineraryOptions] = useState([]);
//   const [selectedItineraryId, setSelectedItineraryId] = useState("");
//   const [trashedPrices, setTrashedPrices] = useState([]);
//   const [restoreSuccess, setRestoreSuccess] = useState(false);
//   const navigate = useNavigate();

//   // Fetch all itinerary options
//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/souPackageItineraryName`)
//       .then((res) => setItineraryOptions(res.data.data))
//       .catch((err) => console.error("Itinerary fetch failed:", err));
//   }, []);

//   // Fetch trashed itinerary package prices by itinerary
//   useEffect(() => {
//     if (selectedItineraryId) {
//       axios
//         .get(
//           `${BE_URL}/souPackageItineraryPackagePrice/trashed/itinerary/${selectedItineraryId}`
//         )
//         .then((res) => setTrashedPrices(res.data.data))
//         .catch((err) => console.error("Trash fetch failed:", err));
//     } else {
//       setTrashedPrices([]);
//     }
//   }, [selectedItineraryId]);

//   const handleItineraryChange = (e) => {
//     setSelectedItineraryId(e.target.value);
//     setPage(1);
//   };

//   const handleRestore = (id) => {
//     axios
//       .patch(`${BE_URL}/souPackageItineraryPackagePrice/restore/${id}`)
//       .then((res) => {
//         if (res.data.status === "success") {
//           setTrashedPrices((prev) => prev.filter((item) => item.id !== id));
//           setRestoreSuccess(true);
//           setTimeout(() => setRestoreSuccess(false), 2500);
//         }
//       })
//       .catch((err) => {
//         console.error("Restore failed:", err);
//       });
//   };

//   const displayedRows = trashedPrices.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   return (
//     <div className="p-6 rounded-xl bg-white relative shadow-lg">
//       {/* Restore success popup */}
//       {restoreSuccess && <RestoreData />}

//       {/* Header */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={4}
//       >
//         <h2 className="text-2xl font-semibold text-gray-900">
//           Trashed Itinerary Package Price
//         </h2>
//         <Back
//           onClick={() => navigate("/sou-package-itinerary-price")}
//         />
//       </Box>

//       {/* Itinerary Selector */}
//       <Box mb={4}>
//         <FormControl fullWidth>
//           <InputLabel id="select-itinerary-label">Select Itinerary</InputLabel>
//           <Select
//             labelId="select-itinerary-label"
//             value={selectedItineraryId}
//             onChange={handleItineraryChange}
//             label="Select Itinerary"
//             displayEmpty
//           >
//             {itineraryOptions.map((itn) => (
//               <MenuItem key={itn.id} value={itn.id}>
//                 {itn.sou_package_itinerary_name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <hr className="border-gray-300 mb-6" />

//       {/* Table */}
//       <TableContainer component={Paper} className="shadow-md">
//         <Table>
//           <TableHead>
//             <TableRow className="bg-gray-100">
//               <TableCell className="border-r font-bold text-base">#</TableCell>
//               <TableCell className="border-r font-bold text-base">
//                 Image
//               </TableCell>
//               <TableCell className="border-r font-bold text-base">
//                 Package Start Price
//               </TableCell>
//               <TableCell className="border-r font-bold text-base">
//                 Other Price
//               </TableCell>
//               <TableCell className="font-bold text-base text-center">
//                 Restore
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {displayedRows.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" className="py-6">
//                   First select itinerary name, then package price data will
//                   appear here.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               displayedRows.map((row, index) => (
//                 <TableRow
//                   key={row.id}
//                   className="hover:bg-gray-100 transition-all"
//                 >
//                   <TableCell className="border-r">
//                     {(page - 1) * rowsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell className="border-r">
//                     {row.image ? (
//                       <img
//                         src={`${BE_URL}/Images/SouPackage/SouPackageItineraryPackagePriceImages/${row.image}`}
//                         alt="Itinerary Package Price"
//                         className="w-16 h-16 object-cover rounded-md border"
//                       />
//                     ) : (
//                       "-"
//                     )}
//                   </TableCell>
//                   <TableCell className="border-r">
//                     {row.package_start_price || "-"}
//                   </TableCell>
//                   <TableCell className="border-r">
//                     {(() => {
//                       let other = row.other_price;
//                       if (typeof other === "string") {
//                         try {
//                           other = JSON.parse(other);
//                         } catch {
//                           other = [];
//                         }
//                       }
//                       if (Array.isArray(other) && other.length > 0) {
//                         return (
//                           <div className="space-y-1">
//                             {other.map((item, idx) => (
//                               <div
//                                 key={idx}
//                                 className="text-xs bg-gray-50 p-2 rounded mb-1"
//                               >
//                                 <b>{item.label}</b>: Premium: {item.premium},
//                                 Royal: {item.royal}
//                               </div>
//                             ))}
//                           </div>
//                         );
//                       }
//                       return "-";
//                     })()}
//                   </TableCell>
//                   <TableCell className="text-center">
//                     <Tooltip title="Restore Package Price" arrow>
//                       <button
//                         className="text-blue-600 cursor-pointer hover:text-blue-800"
//                         onClick={() => handleRestore(row.id)}
//                         aria-label="Restore Package Price"
//                       >
//                         <FaRecycle size={22} />
//                       </button>
//                     </Tooltip>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>

//         <div className="flex justify-end p-4">
//           <Pagination
//             count={Math.ceil(trashedPrices.length / rowsPerPage)}
//             page={page}
//             onChange={(e, val) => setPage(val)}
//             color="primary"
//           />
//         </div>
//       </TableContainer>
//     </div>
//   );
// };

// export default SOUPackageItineraryPackagePriceTrace;

/* */

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

const SOUPackageItineraryPackagePriceTrace = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [itineraryOptions, setItineraryOptions] = useState([]);
  const [selectedItineraryId, setSelectedItineraryId] = useState("");
  const [trashedPrices, setTrashedPrices] = useState([]);
  const [restoreSuccess, setRestoreSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all itinerary options
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageItineraryName`)
      .then((res) => setItineraryOptions(res.data.data))
      .catch((err) => console.error("Itinerary fetch failed:", err));
  }, []);

  // Fetch trashed itinerary package prices by itinerary
  useEffect(() => {
    if (selectedItineraryId) {
      axios
        .get(
          `${BE_URL}/souPackageItineraryPackagePrice/trashed/itinerary/${selectedItineraryId}`
        )
        .then((res) => setTrashedPrices(res.data.data))
        .catch((err) => console.error("Trash fetch failed:", err));
    } else {
      setTrashedPrices([]);
    }
  }, [selectedItineraryId]);

  const handleItineraryChange = (e) => {
    setSelectedItineraryId(e.target.value);
    setPage(1);
  };

  const handleRestore = (id) => {
    axios
      .patch(`${BE_URL}/souPackageItineraryPackagePrice/restore/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setTrashedPrices((prev) => prev.filter((item) => item.id !== id));
          setRestoreSuccess(true);
          setTimeout(() => setRestoreSuccess(false), 2500);
        }
      })
      .catch((err) => {
        console.error("Restore failed:", err);
      });
  };

  const displayedRows = trashedPrices.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Helper for date formatting
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("en-CA") : "-";

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
          Trashed Itinerary Package Price
        </h2>
        <Back onClick={() => navigate("/sou-package-itinerary-price")} />
      </Box>

      {/* Itinerary Selector */}
      <Box mb={4}>
        <FormControl fullWidth>
          <InputLabel id="select-itinerary-label">Select Itinerary</InputLabel>
          <Select
            labelId="select-itinerary-label"
            value={selectedItineraryId}
            onChange={handleItineraryChange}
            label="Select Itinerary"
            displayEmpty
          >
            {itineraryOptions.map((itn) => (
              <MenuItem key={itn.id} value={itn.id}>
                {itn.sou_package_itinerary_name}
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
                Image
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Package Start Price
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                From Date
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                To Date
              </TableCell>
              <TableCell className="border-r font-bold text-base">
                Other Price
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
                  First select itinerary name, then package price data will
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
                    {row.image ? (
                      <img
                        src={`${BE_URL}/Images/SouPackage/SouPackageItineraryPackagePriceImages/${row.image}`}
                        alt="Itinerary Package Price"
                        className="w-16 h-16 object-cover rounded-md border"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="border-r">
                    {row.package_start_price || "-"}
                  </TableCell>
                  <TableCell className="border-r">
                    {formatDate(row.from_date)}
                  </TableCell>
                  <TableCell className="border-r">
                    {formatDate(row.to_date)}
                  </TableCell>
                  <TableCell className="border-r">
                    {(() => {
                      let other = row.other_price;
                      if (typeof other === "string") {
                        try {
                          other = JSON.parse(other);
                        } catch {
                          other = [];
                        }
                      }
                      if (Array.isArray(other) && other.length > 0) {
                        return (
                          <div className="space-y-1">
                            {other.map((item, idx) => (
                              <div
                                key={idx}
                                className="text-xs bg-gray-50 p-2 rounded mb-1"
                              >
                                <b>{item.label}</b>: Premium: {item.premium},
                                Royal: {item.royal}
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return "-";
                    })()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Tooltip title="Restore Package Price" arrow>
                      <button
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleRestore(row.id)}
                        aria-label="Restore Package Price"
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
            count={Math.ceil(trashedPrices.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageItineraryPackagePriceTrace;
