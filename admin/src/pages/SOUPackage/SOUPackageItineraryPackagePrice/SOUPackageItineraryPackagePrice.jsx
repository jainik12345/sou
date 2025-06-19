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
// } from "@mui/material";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import Add from "../../../components/Buttons/Add";
// import DeleteData from "../../../components/Popup/DeleteData";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import BE_URL from "../../../config";
// import Trace from "../../../components/Buttons/Trace";

// const SOUPackageItineraryPackagePrice = () => {
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;
//   const [itineraryOptions, setItineraryOptions] = useState([]);
//   const [selectedItineraryId, setSelectedItineraryId] = useState("");
//   const [packagePrices, setPackagePrices] = useState([]);
//   const [deleteSuccess, setDeleteSuccess] = useState(false);
//   const navigate = useNavigate();

//   // Fetch SOU Package Itineraries
//   useEffect(() => {
//     axios
//       .get(`${BE_URL}/souPackageItineraryName`)
//       .then((res) => setItineraryOptions(res.data.data))
//       .catch((err) => console.error("Itinerary fetch failed:", err));
//   }, []);

//   // Fetch Package Prices by selected itinerary
//   useEffect(() => {
//     if (selectedItineraryId) {
//       axios
//         .get(
//           `${BE_URL}/souPackageItineraryPackagePrice/itinerary/${selectedItineraryId}`
//         )
//         .then((res) => setPackagePrices(res.data.data))
//         .catch((err) => console.error("Package Price fetch failed:", err));
//     } else {
//       setPackagePrices([]);
//     }
//   }, [selectedItineraryId]);

//   const handleDelete = (id) => {
//     axios
//       .delete(`${BE_URL}/souPackageItineraryPackagePrice/${id}`)
//       .then((res) => {
//         if (res.data.status === "success") {
//           setPackagePrices((prev) => prev.filter((item) => item.id !== id));
//           setDeleteSuccess(true);
//           setTimeout(() => setDeleteSuccess(false), 2500);
//         } else {
//           console.error("Deletion failed");
//         }
//       })
//       .catch((err) => console.error("Delete error:", err));
//   };

//   const displayedRows = packagePrices.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleAdd = () =>
//     navigate("/sou-package-itinerary-price/insert");

//   const handleUpdate = (item) => {
//     navigate("/sou-package-itinerary-price/update", {
//       state: { itineraryPackagePriceData: item },
//     });
//   };

//   const handleTraceClick = () =>
//     navigate("/sou-package-itinerary-price/trace");

//   const handleItineraryChange = (event) => {
//     setSelectedItineraryId(event.target.value);
//     setPage(1);
//   };

//   return (
//     <div className="p-4 rounded-xl bg-white relative">
//       {deleteSuccess && <DeleteData />}

//       {/* Add Button */}
//       <div className="flex justify-between mb-4">
//         <Trace onClick={handleTraceClick} />
//         <Add
//           text="Add SOU Package Itinerary Package Price"
//           width="w-[370px]"
//           onClick={handleAdd}
//         />
//       </div>

//       {/* Itinerary Selector */}
//       <div className="mb-4">
//         <FormControl fullWidth>
//           <InputLabel>Select Itinerary</InputLabel>
//           <Select
//             value={selectedItineraryId}
//             onChange={handleItineraryChange}
//             label="Select Itinerary"
//           >
//             {itineraryOptions.map((itn) => (
//               <MenuItem key={itn.id} value={itn.id}>
//                 {itn.sou_package_itinerary_name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </div>

//       <hr className="border-gray-300 mb-6" />

//       {/* Package Price Table */}
//       <TableContainer component={Paper} className="shadow-md">
//         <Table className="border border-gray-300">
//           <TableHead>
//             <TableRow className="bg-gray-100">
//               <TableCell className="border-r border-gray-300 font-bold text-base">
//                 ID
//               </TableCell>
//               <TableCell className="border-r border-gray-300 font-bold text-base">
//                 Image
//               </TableCell>
//               <TableCell className="border-r border-gray-300 font-bold text-base">
//                 Package Start Price
//               </TableCell>
//               <TableCell className="border-r border-gray-300 font-bold text-base">
//                 Other Price
//               </TableCell>
//               <TableCell className="font-bold text-base">Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {displayedRows.map((row, index) => (
//               <TableRow
//                 key={row.id}
//                 className="hover:bg-gray-100 transition-all duration-300"
//               >
//                 <TableCell className="border-r">
//                   {(page - 1) * rowsPerPage + index + 1}
//                 </TableCell>
//                 <TableCell className="border-r">
//                   {row.image ? (
//                     <img
//                       src={`${BE_URL}/Images/SouPackage/SouPackageItineraryPackagePriceImages/${row.image}`}
//                       alt="Itinerary Package Price"
//                       className="h-12 w-12 object-cover rounded"
//                     />
//                   ) : (
//                     "-"
//                   )}
//                 </TableCell>
//                 <TableCell className="border-r">
//                   {row.package_start_price || "-"}
//                 </TableCell>
//                 <TableCell className="border-r">
//                   {(() => {
//                     let other = row.other_price;
//                     // If backend sends a string, parse it
//                     if (typeof other === "string") {
//                       try {
//                         other = JSON.parse(other);
//                       } catch {
//                         other = [];
//                       }
//                     }
//                     if (Array.isArray(other) && other.length > 0) {
//                       return (
//                         <div className="space-y-1">
//                           {other.map((item, idx) => (
//                             <div
//                               key={idx}
//                               className="text-xs bg-gray-50 p-2 rounded mb-1"
//                             >
//                               <b>{item.label}</b>: Premium: {item.premium},
//                               Royal: {item.royal}
//                             </div>
//                           ))}
//                         </div>
//                       );
//                     }
//                     return "-";
//                   })()}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex space-x-4">
//                     <button
//                       className="text-green-600 hover:text-green-800"
//                       onClick={() => handleUpdate(row)}
//                     >
//                       <FaEdit size={22} />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800"
//                       onClick={() => handleDelete(row.id)}
//                     >
//                       <FaTrash size={22} />
//                     </button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination */}
//         <div className="flex justify-end p-4">
//           <Pagination
//             count={Math.ceil(packagePrices.length / rowsPerPage)}
//             page={page}
//             onChange={(e, val) => setPage(val)}
//             color="primary"
//           />
//         </div>
//       </TableContainer>
//     </div>
//   );
// };

// export default SOUPackageItineraryPackagePrice;

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
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Add from "../../../components/Buttons/Add";
import DeleteData from "../../../components/Popup/DeleteData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import Trace from "../../../components/Buttons/Trace";

const SOUPackageItineraryPackagePrice = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [itineraryOptions, setItineraryOptions] = useState([]);
  const [selectedItineraryId, setSelectedItineraryId] = useState("");
  const [packagePrices, setPackagePrices] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch SOU Package Itineraries
  useEffect(() => {
    axios
      .get(`${BE_URL}/souPackageItineraryName`)
      .then((res) => setItineraryOptions(res.data.data))
      .catch((err) => console.error("Itinerary fetch failed:", err));
  }, []);

  // Fetch Package Prices by selected itinerary
  useEffect(() => {
    if (selectedItineraryId) {
      axios
        .get(
          `${BE_URL}/souPackageItineraryPackagePrice/itinerary/${selectedItineraryId}`
        )
        .then((res) => setPackagePrices(res.data.data))
        .catch((err) => console.error("Package Price fetch failed:", err));
    } else {
      setPackagePrices([]);
    }
  }, [selectedItineraryId]);

  const handleDelete = (id) => {
    axios
      .delete(`${BE_URL}/souPackageItineraryPackagePrice/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setPackagePrices((prev) => prev.filter((item) => item.id !== id));
          setDeleteSuccess(true);
          setTimeout(() => setDeleteSuccess(false), 2500);
        } else {
          console.error("Deletion failed");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const displayedRows = packagePrices.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleAdd = () => navigate("/sou-package-itinerary-price/insert");

  const handleUpdate = (item) => {
    navigate("/sou-package-itinerary-price/update", {
      state: { itineraryPackagePriceData: item },
    });
  };

  const handleTraceClick = () => navigate("/sou-package-itinerary-price/trace");

  const handleItineraryChange = (event) => {
    setSelectedItineraryId(event.target.value);
    setPage(1);
  };

  return (
    <div className="p-4 rounded-xl bg-white relative">
      {deleteSuccess && <DeleteData />}

      {/* Add Button */}
      <div className="flex justify-between mb-4">
        <Trace onClick={handleTraceClick} />
        <Add
          text="Add SOU Package Itinerary Package Price"
          width="w-[370px]"
          onClick={handleAdd}
        />
      </div>

      {/* Itinerary Selector */}
      <div className="mb-4">
        <FormControl fullWidth>
          <InputLabel>Select Itinerary</InputLabel>
          <Select
            value={selectedItineraryId}
            onChange={handleItineraryChange}
            label="Select Itinerary"
          >
            {itineraryOptions.map((itn) => (
              <MenuItem key={itn.id} value={itn.id}>
                {itn.sou_package_itinerary_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Package Price Table */}
      <TableContainer component={Paper} className="shadow-md">
        <Table className="border border-gray-300">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border-r border-gray-300 font-bold text-base">
                ID
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Image
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Package Start Price
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                From Date
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                To Date
              </TableCell>
              <TableCell className="border-r border-gray-300 font-bold text-base">
                Other Price
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
                  {row.image ? (
                    <img
                      src={`${BE_URL}/Images/SouPackage/SouPackageItineraryPackagePriceImages/${row.image}`}
                      alt="Itinerary Package Price"
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="border-r">
                  {row.package_start_price || "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.from_date
                    ? new Date(row.from_date).toLocaleDateString("en-CA")
                    : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {row.to_date
                    ? new Date(row.to_date).toLocaleDateString("en-CA")
                    : "-"}
                </TableCell>
                <TableCell className="border-r">
                  {(() => {
                    let other = row.other_price;
                    // If backend sends a string, parse it
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
            count={Math.ceil(packagePrices.length / rowsPerPage)}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </div>
      </TableContainer>
    </div>
  );
};

export default SOUPackageItineraryPackagePrice;
