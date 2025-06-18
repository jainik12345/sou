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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   IconButton,
//   Box,
// } from "@mui/material";
// import { FaReply, FaTrash, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Trace from "../../../components/Buttons/Trace";
// import BE_URL from "../../../config";

// // Field labels for your Gujarat Packages Form table
// const fieldLabels = [
//   { key: "name", label: "Name" },
//   { key: "email", label: "Email" },
//   { key: "number", label: "Number" },
//   { key: "date", label: "Date" },
//   { key: "gujarat_package_name", label: "Gujarat Package Name" },
//   { key: "message", label: "Message" },
// ];

// const GujaratPackagesForm = () => {
//   const [page, setPage] = useState(1);
//   const [showReplyDialog, setShowReplyDialog] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [replyMessage, setReplyMessage] = useState("");
//   const [sending, setSending] = useState(false);
//   const [showReplySuccess, setShowReplySuccess] = useState(false);
//   const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

//   const [showViewPopup, setShowViewPopup] = useState(false);
//   const [viewRow, setViewRow] = useState(null);

//   const rowsPerPage = 10;
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${BE_URL}/gujaratPackageForm`);
//         if (response.data.status === "success") {
//           setData(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching Gujarat package form data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const displayedRows = data.slice(
//     (page - 1) * rowsPerPage,
//     page * rowsPerPage
//   );

//   const handleChangePage = (event, value) => {
//     setPage(value);
//   };

//   const handleReplyClick = (row) => {
//     setSelectedRow(row);
//     setShowReplyDialog(true);
//   };

//   const handleReplyClose = () => {
//     setShowReplyDialog(false);
//     setSelectedRow(null);
//     setReplyMessage("");
//   };

//   const handleReplySubmit = async () => {
//     if (!replyMessage.trim() || !selectedRow?.email) {
//       alert("Reply message and recipient email are required.");
//       return;
//     }

//     setSending(true);

//     try {
//       const response = await axios.post(`${BE_URL}/gujaratPackageForm/reply`, {
//         toEmail: selectedRow.email,
//         replyMessage: replyMessage,
//       });

//       if (response.data.status === "success") {
//         setShowReplySuccess(true);
//         setShowReplyDialog(false);
//         setReplyMessage("");
//       } else {
//         alert(
//           `Failed to send reply: ${response.data.error || "Unknown error"}`
//         );
//       }
//     } catch (error) {
//       console.error("Error sending reply:", error);
//       alert("An error occurred while sending the reply. Please try again.");
//     } finally {
//       setSending(false);
//       setTimeout(() => setShowReplySuccess(false), 2000);
//     }
//   };

//   const handleDeleteRow = async (id) => {
//     try {
//       const response = await axios.delete(`${BE_URL}/gujaratPackageForm/${id}`);
//       if (response.data.status === "success") {
//         setData((prevData) => prevData.filter((row) => row.id !== id));
//         setShowDeleteSuccess(true);
//         setTimeout(() => {
//           setShowDeleteSuccess(false);
//         }, 2000);
//       } else {
//         alert("Failed to delete the Gujarat package form entry.");
//       }
//     } catch (error) {
//       console.error("Error deleting Gujarat package form:", error);
//       alert("An error occurred while deleting. Please try again.");
//     }
//   };

//   const handleRowClick = (row) => {
//     setViewRow(row);
//     setShowViewPopup(true);
//   };

//   const handleBackClick = () => {
//     navigate("/gujarat-Packages-form/trace");
//   };

//   const handleCloseViewPopup = () => {
//     setShowViewPopup(false);
//     setViewRow(null);
//   };

//   return (
//     <div className="p-4 rounded-xl bg-white">
//       <div className="pb-4 flex justify-between">
//         <Trace onClick={handleBackClick} />
//         <h2 className="text-xl font-semibold mb-4">
//           Gujarat Package Form Details
//         </h2>
//       </div>

//       <TableContainer component={Paper} className="shadow-md">
//         <Table
//           className="border border-gray-300"
//           sx={{ minWidth: 900, tableLayout: "fixed" }}
//         >
//           <TableHead>
//             <TableRow className="bg-gray-100">
//               <TableCell
//                 className="border-r !font-extrabold text-base text-left"
//                 sx={{ width: 60 }}
//               >
//                 ID
//               </TableCell>
//               <TableCell
//                 className="border-r !font-extrabold text-base text-left"
//                 sx={{ width: 160 }}
//               >
//                 Name
//               </TableCell>
//               <TableCell
//                 className="border-r !font-extrabold text-base text-left"
//                 sx={{ width: 220 }}
//               >
//                 Email
//               </TableCell>
//               <TableCell
//                 className="border-r !font-extrabold text-base text-left"
//                 sx={{ width: 130 }}
//               >
//                 Number
//               </TableCell>
//               <TableCell
//                 className="border-r !font-extrabold text-base text-left"
//                 sx={{ width: 120 }}
//               >
//                 Date
//               </TableCell>
//               <TableCell
//                 className="border-r !font-extrabold text-base text-left"
//                 sx={{ width: 200 }}
//               >
//                 Gujarat Package Name
//               </TableCell>
//               <TableCell
//                 className="border-r !font-extrabold text-base text-left"
//                 sx={{ width: 350 }}
//               >
//                 Message
//               </TableCell>
//               <TableCell
//                 className="!font-extrabold text-base text-left"
//                 sx={{ width: 130 }}
//               >
//                 Action
//               </TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {displayedRows.map((row, index) => (
//               <TableRow
//                 key={row.id}
//                 className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
//                 hover
//                 onClick={(e) => {
//                   if (
//                     e.target.closest("button") ||
//                     e.target.closest("svg") ||
//                     e.target.closest("path")
//                   )
//                     return;
//                   handleRowClick(row);
//                 }}
//                 style={{ cursor: "pointer" }}
//               >
//                 <TableCell className="border-r text-left">
//                   {(page - 1) * rowsPerPage + index + 1}
//                 </TableCell>
//                 <TableCell className="border-r text-left">{row.name}</TableCell>
//                 <TableCell className="border-r text-left">
//                   {row.email}
//                 </TableCell>
//                 <TableCell className="border-r text-left">
//                   {row.number}
//                 </TableCell>
//                 <TableCell className="border-r text-left">{row.date}</TableCell>
//                 <TableCell className="border-r text-left">
//                   {row.gujarat_package_name}
//                 </TableCell>
//                 <TableCell className="border-r text-left">
//                   <div
//                     className="w-full max-h-24 overflow-y-auto text-sm whitespace-pre-wrap"
//                     style={{
//                       wordBreak: "break-word",
//                       fontFamily: "inherit",
//                     }}
//                   >
//                     {row.message}
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-left flex items-center gap-2">
//                   <button
//                     className="text-blue-600 hover:text-blue-800 mr-2"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleReplyClick(row);
//                     }}
//                   >
//                     <FaReply size={20} />
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteRow(row.id);
//                     }}
//                   >
//                     <FaTrash size={20} />
//                   </button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination */}
//         <div className="flex justify-start p-4">
//           <Pagination
//             count={Math.ceil(data.length / rowsPerPage)}
//             page={page}
//             onChange={handleChangePage}
//             color="primary"
//           />
//         </div>
//       </TableContainer>

//       {/* View Popup */}
//       <Dialog
//         open={showViewPopup}
//         onClose={handleCloseViewPopup}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { position: "relative" } }}
//       >
//         <IconButton
//           aria-label="close"
//           onClick={handleCloseViewPopup}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//             zIndex: 20,
//           }}
//         >
//           <FaTimes />
//         </IconButton>
//         <DialogTitle sx={{ fontWeight: "bold", mb: 0.5 }}>
//           Gujarat Package Details
//         </DialogTitle>
//         <DialogContent dividers sx={{ pt: 1, pb: 2 }}>
//           {viewRow &&
//             fieldLabels.map((field) => (
//               <Box key={field.key} sx={{ mb: 1.5 }}>
//                 <span className="font-semibold text-gray-700">
//                   {field.label}:
//                 </span>
//                 <span
//                   className="ml-2 break-all text-gray-800"
//                   style={
//                     field.key === "message" ? { whiteSpace: "pre-line" } : {}
//                   }
//                 >
//                   {viewRow[field.key] || "-"}
//                 </span>
//               </Box>
//             ))}
//         </DialogContent>
//       </Dialog>

//       {/* Reply Dialog */}
//       <Dialog
//         open={showReplyDialog}
//         onClose={handleReplyClose}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Reply to Gujarat Package Inquiry</DialogTitle>
//         <DialogContent>
//           <p className="mb-2 text-sm text-gray-700">
//             <strong>To:</strong> {selectedRow?.email}
//           </p>

//           <TextField
//             multiline
//             rows={4}
//             fullWidth
//             variant="outlined"
//             label="Your Reply"
//             placeholder="Type Your Response Here..."
//             value={replyMessage}
//             onChange={(e) => setReplyMessage(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleReplyClose}
//             color="secondary"
//             disabled={sending}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleReplySubmit}
//             variant="contained"
//             color="primary"
//             disabled={sending}
//           >
//             {sending ? "Sending..." : "Submit Reply"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Success Notifications */}
//       {showReplySuccess && (
//         <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
//           <p className="font-medium">Reply Sent Successfully</p>
//         </div>
//       )}
//       {showDeleteSuccess && (
//         <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
//           <p className="font-medium">Deleted Successfully</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GujaratPackagesForm;

/** */

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { FaReply, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../config";
import { format } from "date-fns";
import Trace from "../../../components/Buttons/Trace";

// Field labels for your Gujarat Packages Form table
const fieldLabels = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "number", label: "Number" },
  { key: "date", label: "Date" },
  { key: "gujarat_package_name", label: "Gujarat Package Name" },
  { key: "message", label: "Message" },
];

const GujaratPackagesForm = () => {
  const [page, setPage] = useState(1);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showReplySuccess, setShowReplySuccess] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const [showViewPopup, setShowViewPopup] = useState(false);
  const [viewRow, setViewRow] = useState(null);

  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BE_URL}/gujaratPackageForm`);
        if (response.data.status === "success") {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching Gujarat package form data:", error);
      }
    };

    fetchData();
  }, []);

  const displayedRows = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleReplyClick = (row) => {
    setSelectedRow(row);
    setShowReplyDialog(true);
  };

  const handleReplyClose = () => {
    setShowReplyDialog(false);
    setSelectedRow(null);
    setReplyMessage("");
  };

  const handleReplySubmit = async () => {
    if (!replyMessage.trim() || !selectedRow?.email) {
      alert("Reply message and recipient email are required.");
      return;
    }

    setSending(true);

    try {
      const response = await axios.post(`${BE_URL}/gujaratPackageForm/reply`, {
        toEmail: selectedRow.email,
        replyMessage: replyMessage,
      });

      if (response.data.status === "success") {
        setShowReplySuccess(true);
        setShowReplyDialog(false);
        setReplyMessage("");
      } else {
        alert(
          `Failed to send reply: ${response.data.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      alert("An error occurred while sending the reply. Please try again.");
    } finally {
      setSending(false);
      setTimeout(() => setShowReplySuccess(false), 2000);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      const response = await axios.delete(`${BE_URL}/gujaratPackageForm/${id}`);
      if (response.data.status === "success") {
        setData((prevData) => prevData.filter((row) => row.id !== id));
        setShowDeleteSuccess(true);
        setTimeout(() => {
          setShowDeleteSuccess(false);
        }, 2000);
      } else {
        alert("Failed to delete the Gujarat package form entry.");
      }
    } catch (error) {
      console.error("Error deleting Gujarat package form:", error);
      alert("An error occurred while deleting. Please try again.");
    }
  };

  const handleRowClick = (row) => {
    setViewRow(row);
    setShowViewPopup(true);
  };

  const handleBackClick = () => {
    navigate("/gujarat-Packages-form/trace");
  };

  const handleCloseViewPopup = () => {
    setShowViewPopup(false);
    setViewRow(null);
  };

  return (
    <div className="p-4 rounded-xl bg-white">
      <div className="pb-4 flex justify-between">
        <Trace onClick={handleBackClick} />
        <h2 className="text-xl font-semibold mb-4">
          Gujarat Package Form Details
        </h2>
      </div>

      <TableContainer component={Paper} className="shadow-md">
        <Table
          className="border border-gray-300"
          sx={{ minWidth: 900, tableLayout: "fixed" }}
        >
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 60 }}
              >
                ID
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 200 }}
              >
                Name
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 250 }}
              >
                Email
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 150 }}
              >
                Number
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 150 }}
              >
                Date
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 300 }}
              >
                Gujarat Package Name
              </TableCell>
              <TableCell
                className="border-r !font-extrabold text-base text-left"
                sx={{ width: 300 }}
              >
                Message
              </TableCell>
              <TableCell
                className="!font-extrabold text-base text-left"
                sx={{ width: 150 }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-100 transition-all duration-300 border-t border-gray-300"
                hover
                onClick={(e) => {
                  if (
                    e.target.closest("button") ||
                    e.target.closest("svg") ||
                    e.target.closest("path")
                  )
                    return;
                  handleRowClick(row);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell className="border-r text-left">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell className="border-r text-left">{row.name}</TableCell>
                <TableCell className="border-r text-left">
                  {row.email}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.number}
                </TableCell>
                {/* UPDATE THIS LINE FOR DATE */}
                <TableCell className="border-r text-left">
                  {row.date ? format(new Date(row.date), "dd-MM-yyyy") : "-"}
                </TableCell>
                <TableCell className="border-r text-left">
                  {row.gujarat_package_name}
                </TableCell>
                <TableCell className="border-r text-left">
                  <div
                    className="w-full max-h-24 overflow-y-auto text-sm whitespace-pre-wrap"
                    style={{
                      wordBreak: "break-word",
                      fontFamily: "inherit",
                    }}
                  >
                    {row.message}
                  </div>
                </TableCell>
                <TableCell className="text-left flex items-center gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReplyClick(row);
                    }}
                  >
                    <FaReply size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRow(row.id);
                    }}
                  >
                    <FaTrash size={20} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-start p-4">
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </TableContainer>

      {/* View Popup */}
      <Dialog
        open={showViewPopup}
        onClose={handleCloseViewPopup}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { position: "relative" } }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseViewPopup}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 20,
          }}
        >
          <FaTimes />
        </IconButton>
        <DialogTitle sx={{ fontWeight: "bold", mb: 0.5 }}>
          Gujarat Package Details
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 1, pb: 2 }}>
          {viewRow &&
            fieldLabels.map((field) => (
              <Box key={field.key} sx={{ mb: 1.5 }}>
                <span className="font-semibold text-gray-700">
                  {field.label}:
                </span>
                <span
                  className="ml-2 break-all text-gray-800"
                  style={
                    field.key === "message" ? { whiteSpace: "pre-line" } : {}
                  }
                >
                  {field.key === "date"
                    ? viewRow[field.key]
                      ? format(new Date(viewRow[field.key]), "dd-MM-yyyy")
                      : "-"
                    : viewRow[field.key] || "-"}
                </span>
              </Box>
            ))}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog
        open={showReplyDialog}
        onClose={handleReplyClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reply to Gujarat Package Inquiry</DialogTitle>
        <DialogContent>
          <p className="mb-2 text-sm text-gray-700">
            <strong>To:</strong> {selectedRow?.email}
          </p>

          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            label="Your Reply"
            placeholder="Type Your Response Here..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleReplyClose}
            color="secondary"
            disabled={sending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleReplySubmit}
            variant="contained"
            color="primary"
            disabled={sending}
          >
            {sending ? "Sending..." : "Submit Reply"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Notifications */}
      {showReplySuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          <p className="font-medium">Reply Sent Successfully</p>
        </div>
      )}
      {showDeleteSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          <p className="font-medium">Deleted Successfully</p>
        </div>
      )}
    </div>
  );
};

export default GujaratPackagesForm;
