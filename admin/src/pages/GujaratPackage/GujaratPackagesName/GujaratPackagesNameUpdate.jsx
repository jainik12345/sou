// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Update from "../../../components/Buttons/Update";
// import Cancel from "../../../components/Buttons/Cancel";
// import UpdateData from "../../../components/Popup/UpdateData";
// import axios from "axios";
// import BE_URL from "../../../config";

// const GujaratPackagesNameUpdate = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { rowData } = location.state || {};

//   const [Nights, setNights] = useState(rowData?.Nights || "");
//   const [Days, setDays] = useState(rowData?.Days || "");
//   const [placeNames, setPlaceNames] = useState(() => {
//     // Parse places_name as array (if JSON array or CSV string)
//     if (!rowData?.places_name) return [""];
//     try {
//       if (
//         typeof rowData.places_name === "string" &&
//         rowData.places_name.startsWith("[") &&
//         rowData.places_name.endsWith("]")
//       ) {
//         return JSON.parse(rowData.places_name);
//       } else {
//         return rowData.places_name.split(",").map((p) => p.trim());
//       }
//     } catch {
//       return [rowData.places_name];
//     }
//   });
//   const [existingImages, setExistingImages] = useState(() => {
//     // Parse image as array (if JSON string or single filename)
//     if (!rowData?.image) return [];
//     try {
//       if (typeof rowData.image === "string" && rowData.image.startsWith("["))
//         return JSON.parse(rowData.image);
//       else return [rowData.image];
//     } catch {
//       return [rowData.image];
//     }
//   });
//   const [newImages, setNewImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (!rowData) {
//       navigate("/gujarat-packages-name");
//     }
//   }, [rowData, navigate]);

//   // Place Names logic
//   const handlePlaceChange = (idx, value) => {
//     const updated = [...placeNames];
//     updated[idx] = value;
//     setPlaceNames(updated);
//   };
//   const handleAddPlace = () => setPlaceNames([...placeNames, ""]);
//   const handleRemovePlace = (idx) => {
//     if (placeNames.length === 1) return;
//     setPlaceNames(placeNames.filter((_, i) => i !== idx));
//   };

//   // Images logic
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages(files);

//     // Preview
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews(previews);
//   };

//   // Remove an existing image
//   const handleRemoveExistingImage = (imgIdx) => {
//     setExistingImages(existingImages.filter((_, i) => i !== imgIdx));
//   };

//   useEffect(() => {
//     return () => {
//       imagePreviews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [imagePreviews]);

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!Nights || !Days) return alert("Both Nights and Days are required.");
//     if (placeNames.some((p) => !p.trim()))
//       return alert("All place names must be filled.");
//     if (!existingImages.length && !newImages.length)
//       return alert("At least one image is required.");

//     const formData = new FormData();
//     formData.append("Nights", Nights);
//     formData.append("Days", Days);
//     formData.append("places_name", placeNames.join(", "));
//     formData.append("existingImages", JSON.stringify(existingImages));
//     newImages.forEach((img) => formData.append("images", img));

//     try {
//       const res = await axios.put(
//         `${BE_URL}/gujaratPackage/${rowData.id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (res.data.status === "success") {
//         setSuccess(true);
//       } else {
//         alert("Something went wrong while updating.");
//       }
//     } catch (err) {
//       console.error("Error updating package:", err);
//       alert("Failed to update package.");
//     }
//   };

//   const handleCancel = () => {
//     navigate("/gujarat-packages-name");
//   };

//   // Auto-hide success popup after 2.5 seconds and redirect
//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         setSuccess(false);
//         navigate("/gujarat-packages-name");
//       }, 2500);
//       return () => clearTimeout(timer);
//     }
//   }, [success, navigate]);

//   return (
//     <div className="p-6">
//       <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
//         <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
//           Update Gujarat Package
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-8"
//           encType="multipart/form-data"
//         >
//           {/* Nights Field */}
//           <div>
//             <label className="block mb-2 text-blue-700 font-semibold">
//               Nights
//             </label>
//             <input
//               type="number"
//               value={Nights}
//               onChange={(e) => setNights(e.target.value)}
//               className="border border-blue-500 rounded-md p-2 w-full"
//               placeholder="Enter number of nights"
//               required
//               min={1}
//             />
//           </div>
//           {/* Days Field */}
//           <div>
//             <label className="block mb-2 text-blue-700 font-semibold">
//               Days
//             </label>
//             <input
//               type="number"
//               value={Days}
//               onChange={(e) => setDays(e.target.value)}
//               className="border border-blue-500 rounded-md p-2 w-full"
//               placeholder="Enter number of days"
//               required
//               min={1}
//             />
//           </div>
//           {/* Place Names */}
//           <div>
//             <label className="block mb-2 text-blue-700 font-semibold">
//               Place Name(s)
//             </label>
//             {placeNames.map((place, idx) => (
//               <div key={idx} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={place}
//                   onChange={(e) => handlePlaceChange(idx, e.target.value)}
//                   className="border border-blue-500 rounded-md p-2 flex-1"
//                   placeholder={`Place Name ${idx + 1}`}
//                   required
//                 />
//                 {placeNames.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemovePlace(idx)}
//                     className="bg-red-500 text-white rounded px-2"
//                   >
//                     &minus;
//                   </button>
//                 )}
//                 {idx === placeNames.length - 1 && (
//                   <button
//                     type="button"
//                     onClick={handleAddPlace}
//                     className="bg-green-500 text-white rounded px-2"
//                   >
//                     +
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//           {/* Existing Images */}
//           <div>
//             <label className="block mb-2 text-blue-700 font-semibold">
//               Existing Images
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {existingImages.length === 0 && (
//                 <span className="text-gray-500">No images</span>
//               )}
//               {existingImages.map((img, i) => (
//                 <div key={i} className="relative">
//                   <img
//                     src={`${BE_URL}/Images/GujaratPackage/GujaratPackageImage/${img}`}
//                     alt={`img-${i + 1}`}
//                     className="w-20 h-20 object-cover rounded border"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveExistingImage(i)}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
//                     title="Remove"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* New Images */}
//           <div>
//             <label className="block mb-2 text-blue-700 font-semibold">
//               Add More Images
//             </label>
//             <input
//               type="file"
//               name="images"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="border border-blue-500 rounded-md p-2 w-full"
//             />
//             {/* Previews */}
//             <div className="flex flex-wrap gap-2 mt-2">
//               {imagePreviews.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`Preview ${i + 1}`}
//                   className="w-20 h-20 object-cover rounded border"
//                 />
//               ))}
//             </div>
//           </div>
//           {/* Buttons */}
//           <div className="flex justify-end gap-4">
//             <Update type="submit" />
//             <Cancel onClick={handleCancel} />
//           </div>
//         </form>
//       </div>

//       {/* Success Popup */}
//       {success && <UpdateData />}
//     </div>
//   );
// };

// export default GujaratPackagesNameUpdate;

/* */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import axios from "axios";
import BE_URL from "../../../config";

const GujaratPackagesNameUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rowData } = location.state || {};

  const [Nights, setNights] = useState(rowData?.Nights || "");
  const [Days, setDays] = useState(rowData?.Days || "");
  const [placeNames, setPlaceNames] = useState(() => {
    if (!rowData?.places_name) return [""];
    try {
      if (
        typeof rowData.places_name === "string" &&
        rowData.places_name.startsWith("[") &&
        rowData.places_name.endsWith("]")
      ) {
        return JSON.parse(rowData.places_name);
      } else {
        return rowData.places_name.split(",").map((p) => p.trim());
      }
    } catch {
      return [rowData.places_name];
    }
  });
  const [existingImages, setExistingImages] = useState(() => {
    if (!rowData?.image) return [];
    try {
      if (typeof rowData.image === "string" && rowData.image.startsWith("["))
        return JSON.parse(rowData.image);
      else return [rowData.image];
    } catch {
      return [rowData.image];
    }
  });
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!rowData) {
      navigate("/gujarat-packages-name");
    }
  }, [rowData, navigate]);

  // Place Names logic
  const handlePlaceChange = (idx, value) => {
    const updated = [...placeNames];
    updated[idx] = value;
    setPlaceNames(updated);
  };
  const handleAddPlace = () => setPlaceNames([...placeNames, ""]);
  const handleRemovePlace = (idx) => {
    if (placeNames.length === 1) return;
    setPlaceNames(placeNames.filter((_, i) => i !== idx));
  };

  // Images logic
  // If user selects new image(s), remove existing images (replace)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    // Remove previews for any previous images
    setExistingImages([]); // REMOVE existing images when new image(s) selected

    // Preview
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove an existing image
  const handleRemoveExistingImage = (imgIdx) => {
    setExistingImages(existingImages.filter((_, i) => i !== imgIdx));
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Nights || !Days) return alert("Both Nights and Days are required.");
    if (placeNames.some((p) => !p.trim()))
      return alert("All place names must be filled.");
    // Now: If there are no existing images and no new images, show alert
    if (!existingImages.length && !newImages.length)
      return alert("At least one image is required.");

    const formData = new FormData();
    formData.append("Nights", Nights);
    formData.append("Days", Days);
    formData.append("places_name", placeNames.join(", "));

    // If user selected new images, only upload those, ignore existingImages
    if (newImages.length > 0) {
      // Do not send existingImages, only send new images
      newImages.forEach((img) => formData.append("images", img));
      formData.append("existingImages", JSON.stringify([])); // No old image
    } else {
      // If no new images, keep existingImages
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    try {
      const res = await axios.put(
        `${BE_URL}/gujaratPackage/${rowData.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.status === "success") {
        setSuccess(true);
      } else {
        alert("Something went wrong while updating.");
      }
    } catch (err) {
      console.error("Error updating package:", err);
      alert("Failed to update package.");
    }
  };

  const handleCancel = () => {
    navigate("/gujarat-packages-name");
  };

  // Auto-hide success popup after 2.5 seconds and redirect
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        navigate("/gujarat-packages-name");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Gujarat Package
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          encType="multipart/form-data"
        >
          {/* Nights Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Nights
            </label>
            <input
              type="number"
              value={Nights}
              onChange={(e) => setNights(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of nights"
              required
              min={1}
            />
          </div>
          {/* Days Field */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Days
            </label>
            <input
              type="number"
              value={Days}
              onChange={(e) => setDays(e.target.value)}
              className="border border-blue-500 rounded-md p-2 w-full"
              placeholder="Enter number of days"
              required
              min={1}
            />
          </div>
          {/* Place Names */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Place Name(s)
            </label>
            {placeNames.map((place, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={place}
                  onChange={(e) => handlePlaceChange(idx, e.target.value)}
                  className="border border-blue-500 rounded-md p-2 flex-1"
                  placeholder={`Place Name ${idx + 1}`}
                  required
                />
                {placeNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePlace(idx)}
                    className="bg-red-500 text-white rounded px-2"
                  >
                    &minus;
                  </button>
                )}
                {idx === placeNames.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddPlace}
                    className="bg-green-500 text-white rounded px-2"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          {/* Existing Images */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Existing Images
            </label>
            <div className="flex flex-wrap gap-2">
              {existingImages.length === 0 && (
                <span className="text-gray-500">No images</span>
              )}
              {existingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={`${BE_URL}/Images/GujaratPackage/GujaratPackageImage/${img}`}
                    alt={`img-${i + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(i)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* New Images */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Add More Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
              className="border border-blue-500 rounded-md p-2 w-full"
            />
            {/* Previews */}
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Update type="submit" />
            <Cancel onClick={handleCancel} />
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {success && <UpdateData />}
    </div>
  );
};

export default GujaratPackagesNameUpdate;
