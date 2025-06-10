import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Update from "../../../components/Buttons/Update";
import Cancel from "../../../components/Buttons/Cancel";
import UpdateData from "../../../components/Popup/UpdateData";
import BE_URL from "../../../config";
import { useNavigate, useLocation } from "react-router-dom";

const initialFaq = { question: "", answer: "" };
const initialPrice = {
  "2pax": "",
  "4pax": "",
  "6pax": "",
  "8pax": "",
  "10pax": "",
  extra: "",
};

const emptyAssignment = () => [{ nights: "1", area: "" }];

const initialAssignmentData = () => ({
  assignmentParts: emptyAssignment(),
  images: [],
  imagePreviews: [],
  faqs: [{ ...initialFaq }],
  price: { ...initialPrice },
});

const GujaratPackagesDataUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationRowData = location.state?.rowData;

  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(
    locationRowData?.gujarat_package_id?.toString() || ""
  );
  const [nights, setNights] = useState(0);
  const [rowId, setRowId] = useState(locationRowData?.id || null);

  const [assignment, setAssignment] = useState(initialAssignmentData());
  const [existingImages, setExistingImages] = useState([]);
  const imagesInputRef = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${BE_URL}/gujaratPackage`)
      .then((res) => {
        if (Array.isArray(res.data.data)) setPackages(res.data.data);
      })
      .catch(() => setPackages([]));
  }, []);

  // Set form from rowData
  useEffect(() => {
    if (!locationRowData) return;
    setRowId(locationRowData.id);
    setSelectedPackage(locationRowData.gujarat_package_id?.toString() || "");

    let assignmentParts = [];
    let nightsValue = 0;

    // Parse assignment from faqs if present
    let faqsArr = [];
    let assignmentString = "";
    try {
      const parsedFaqs =
        typeof locationRowData.faqs === "string"
          ? JSON.parse(locationRowData.faqs)
          : locationRowData.faqs;
      faqsArr = parsedFaqs?.[0]?.faqs || [{ ...initialFaq }];
      assignmentString = parsedFaqs?.[0]?.assignment || "";
    } catch {
      faqsArr = [{ ...initialFaq }];
      assignmentString = "";
    }

    assignmentParts =
      assignmentString?.split(" - ").map((part) => {
        const match = part.match(/^(\d+)N\s*(.+)$/i);
        return match
          ? { nights: match[1], area: match[2] }
          : { nights: "1", area: "" };
      }) || emptyAssignment();

    nightsValue = assignmentParts.reduce(
      (sum, part) => sum + (parseInt(part.nights) || 0),
      0
    );

    // Parse images
    let initialImages = [];
    try {
      initialImages = Array.isArray(locationRowData?.multiple_images)
        ? locationRowData.multiple_images
        : JSON.parse(locationRowData?.multiple_images || "[]");
    } catch {
      initialImages = [];
    }

    // Parse price
    let initialPriceObj = {};
    try {
      initialPriceObj =
        typeof locationRowData?.price === "object"
          ? locationRowData.price
          : JSON.parse(locationRowData?.price || "{}");
    } catch {
      initialPriceObj = {};
    }

    setNights(Number(nightsValue));
    setAssignment({
      assignmentParts: assignmentParts.length
        ? assignmentParts
        : emptyAssignment(),
      images: [],
      imagePreviews: [],
      faqs: faqsArr,
      price: {
        "2pax": initialPriceObj["2pax"] || "",
        "4pax": initialPriceObj["4pax"] || "",
        "6pax": initialPriceObj["6pax"] || "",
        "8pax": initialPriceObj["8pax"] || "",
        "10pax": initialPriceObj["10pax"] || "",
        extra: initialPriceObj.extra || "",
      },
    });
    setExistingImages(initialImages);
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  }, [locationRowData]);

  useEffect(() => {
    // update nights if package changes
    if (!selectedPackage) {
      setNights(0);
      setAssignment(initialAssignmentData());
      setExistingImages([]);
      if (imagesInputRef.current) imagesInputRef.current.value = "";
      return;
    }
    const pkg = packages.find((p) => String(p.id) === selectedPackage);
    setNights(Number(pkg?.Nights || 0));
    // don't reset assignment here (to allow editing)
  }, [selectedPackage, packages]);

  // Helper: sum of all nights in the assignment
  const totalAssignedNights = assignment.assignmentParts.reduce(
    (sum, part) => sum + (parseInt(part.nights) || 0),
    0
  );

  // Assignment part handlers
  const handleAssignmentPartChange = (partIdx, field, value) => {
    setAssignment((prev) => ({
      ...prev,
      assignmentParts: prev.assignmentParts.map((part, j) =>
        j === partIdx
          ? {
              ...part,
              [field]:
                field === "nights"
                  ? value.replace(/^0+/, "")
                  : value.replace(/[^a-zA-Z0-9\s]/gi, ""),
            }
          : part
      ),
    }));
  };

  const handleAddAssignmentPart = () => {
    setAssignment((prev) => ({
      ...prev,
      assignmentParts: [...prev.assignmentParts, { nights: "1", area: "" }],
    }));
  };

  const handleRemoveAssignmentPart = (partIdx) => {
    setAssignment((prev) => ({
      ...prev,
      assignmentParts:
        prev.assignmentParts.length > 1
          ? prev.assignmentParts.filter((_, j) => j !== partIdx)
          : prev.assignmentParts,
    }));
  };

  // Images
  const handleImagesChange = (files) => {
    const images = Array.from(files);
    const imagePreviews = images.map((img) => URL.createObjectURL(img));
    setAssignment((prev) => ({
      ...prev,
      images,
      imagePreviews,
    }));
    setError(null); // clear error
  };

  // Remove old image
  const handleRemoveExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // FAQs
  const handleFaqChange = (faqIdx, field, value) => {
    setAssignment((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, j) =>
        j === faqIdx ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const handleAddFaq = () => {
    setAssignment((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { ...initialFaq }],
    }));
  };

  const handleRemoveFaq = (faqIdx) => {
    setAssignment((prev) => ({
      ...prev,
      faqs:
        prev.faqs.length > 1
          ? prev.faqs.filter((_, j) => j !== faqIdx)
          : prev.faqs,
    }));
  };

  // Price
  const handlePriceChange = (type, value) => {
    if (!/^\d*$/.test(value)) return;
    setAssignment((prev) => ({
      ...prev,
      price: { ...prev.price, [type]: value },
    }));
  };

  // --- SUBMIT/UPDATE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedPackage) {
      setError("Please select a Gujarat package.");
      return;
    }
    if (
      assignment.assignmentParts.some(
        (part) =>
          part.nights === "" ||
          parseInt(part.nights) < 1 ||
          parseInt(part.nights) > nights ||
          !part.area.trim()
      )
    ) {
      setError("Please enter all nights (1 to max) and area names.");
      return;
    }
    if (
      (!assignment.images || assignment.images.length === 0) &&
      (!existingImages || existingImages.length === 0)
    ) {
      setError("Please add images.");
      return;
    }
    if (assignment.faqs.some((f) => !f.question.trim() || !f.answer.trim())) {
      setError("Please fill all FAQ questions and answers.");
      return;
    }
    if (Object.values(assignment.price).some((v) => v === "")) {
      setError("Please fill all price fields.");
      return;
    }
    if (totalAssignedNights !== nights) {
      setError(
        `Sum of all nights (${totalAssignedNights}) must match package nights (${nights}).`
      );
      return;
    }

    // Build assignment string, e.g. "2N Ahmedabad - 1N Ranip"
    const assignmentString = assignment.assignmentParts
      .filter((part) => parseInt(part.nights) > 0)
      .map((part) => `${part.nights}N ${part.area.trim()}`)
      .join(" - ");

    // Build formData for backend
    const formData = new FormData();
    formData.append("gujarat_package_id", selectedPackage);
    formData.append("heading", assignmentString);
    assignment.images.forEach((img) => formData.append("images", img));
    formData.append("existingImages", JSON.stringify(existingImages));
    formData.append(
      "faqs",
      JSON.stringify([{ assignment: assignmentString, faqs: assignment.faqs }])
    );
    formData.append("price", JSON.stringify(assignment.price));

    try {
      await axios.put(`${BE_URL}/gujaratPackageData/${rowId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/gujarat-packages-data");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || "Update failed. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Update Gujarat Package Data
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Selector */}
          <div>
            <label className="block mb-2 text-blue-700 font-semibold">
              Select Gujarat Package (Days & Nights)
            </label>
            <select
              className="border border-blue-500 rounded-md p-2 w-full"
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              required
            >
              <option value="">Select Package</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {`Gujarat Tour ${pkg.Nights} Nights ${pkg.Days} Days`}
                </option>
              ))}
            </select>
          </div>

          {/* Assignment */}
          {nights > 0 && (
            <div>
              <label className="block mb-2 text-blue-700 font-semibold">
                Night Area Assignment
              </label>
              <div className="border border-blue-200 rounded-md p-4 bg-gray-50">
                <div className="space-y-3 mb-2">
                  {assignment.assignmentParts.map((part, pidx) => {
                    const maxNights = Math.max(
                      1,
                      nights -
                        assignment.assignmentParts.reduce(
                          (sum, part2, idx) =>
                            idx === pidx
                              ? sum
                              : sum + (parseInt(part2.nights) || 0),
                          0
                        )
                    );
                    const maxSelectable = Math.min(
                      maxNights,
                      nights -
                        assignment.assignmentParts.reduce(
                          (sum, part2, idx) =>
                            idx === pidx
                              ? sum
                              : sum + (parseInt(part2.nights) || 0),
                          0
                        )
                    );
                    return (
                      <div key={pidx} className="flex items-center gap-2">
                        <select
                          style={{ width: 60 }}
                          className="border border-blue-400 rounded-md p-2"
                          value={part.nights}
                          onChange={(e) =>
                            handleAssignmentPartChange(
                              pidx,
                              "nights",
                              e.target.value
                            )
                          }
                        >
                          {Array.from(
                            { length: maxSelectable },
                            (_, i) => i + 1
                          ).map((i) => (
                            <option key={i} value={String(i)}>
                              {i}
                            </option>
                          ))}
                        </select>
                        <span className="text-gray-700 font-semibold">N</span>
                        <input
                          type="text"
                          style={{ width: 120 }}
                          className="border border-blue-400 rounded-md p-2"
                          value={part.area}
                          onChange={(e) =>
                            handleAssignmentPartChange(
                              pidx,
                              "area",
                              e.target.value
                            )
                          }
                          placeholder="Area"
                          required
                        />
                        {assignment.assignmentParts.length > 1 && (
                          <button
                            type="button"
                            title="Remove part"
                            className="ml-1 text-red-600 border border-red-300 px-2 py-1 rounded"
                            onClick={() => handleRemoveAssignmentPart(pidx)}
                          >
                            &minus;
                          </button>
                        )}
                        {pidx < assignment.assignmentParts.length - 1 && (
                          <span className="mx-2 text-gray-600 font-bold">
                            –
                          </span>
                        )}
                      </div>
                    );
                  })}
                  {/* Add part */}
                  {totalAssignedNights < nights && (
                    <button
                      type="button"
                      title="Add area part"
                      className="ml-2 text-green-600 border border-green-300 px-2 py-1 rounded"
                      onClick={handleAddAssignmentPart}
                    >
                      +
                    </button>
                  )}
                </div>

                {/* Images */}

                <div className="mb-4">
                  <label className="block mt-3 mb-1 text-blue-700 font-semibold">
                    Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={imagesInputRef}
                    onChange={(e) => handleImagesChange(e.target.files)}
                    className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
                  />
                  <div className="flex gap-2 mt-5 flex-wrap">
                    {existingImages.map((img, i) => (
                      <div key={i} className="relative mr-2">
                        <img
                          src={`${BE_URL}/Images/GujaratPackage/GujaratPackageDataImage/${img}`}
                          alt={`img-${i}`}
                          className="h-25 w-25 object-cover border rounded"
                        />
                        <button
                          type="button"
                          title="Remove"
                          onClick={() => handleRemoveExistingImage(i)}
                          className="absolute -top-2 -right-2 bg-white border border-red-500 text-red-600 rounded-full h-6 w-6 flex justify-center items-center shadow"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    {assignment.imagePreviews.map((src, i) => (
                      <div key={`preview-${i}`} className="relative mr-2">
                        <img
                          src={src}
                          alt={`preview-${i}`}
                          className="h-25 w-25 object-cover border rounded"
                        />
                        <button
                          type="button"
                          title="Remove"
                          onClick={() => {
                            // Remove the i-th new image and preview
                            setAssignment((prev) => {
                              const newImages = prev.images.filter(
                                (_, idx) => idx !== i
                              );
                              const newPreviews = prev.imagePreviews.filter(
                                (_, idx) => idx !== i
                              );
                              return {
                                ...prev,
                                images: newImages,
                                imagePreviews: newPreviews,
                              };
                            });
                          }}
                          className="absolute -top-2 -right-2 bg-white border border-red-500 text-red-600 rounded-full h-6 w-6 flex justify-center items-center shadow"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs */}
                <div className="mb-4">
                  <label className="block mb-1 text-blue-700 font-semibold">
                    FAQs
                  </label>
                  <div className="space-y-3">
                    {assignment.faqs.map((faq, faqIdx) => (
                      <div key={faqIdx} className="flex gap-2 items-end">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Question"
                            value={faq.question}
                            onChange={(e) =>
                              handleFaqChange(
                                faqIdx,
                                "question",
                                e.target.value
                              )
                            }
                            className="border border-blue-500 rounded-md p-2 w-full mb-2"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) =>
                              handleFaqChange(faqIdx, "answer", e.target.value)
                            }
                            className="border border-blue-500 rounded-md p-2 w-full"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          title="Remove FAQ"
                          className={`text-red-600 border border-red-300 px-2 py-1 rounded ml-2 ${
                            assignment.faqs.length === 1
                              ? "opacity-30 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleRemoveFaq(faqIdx)}
                          disabled={assignment.faqs.length === 1}
                        >
                          &minus;
                        </button>
                        {faqIdx === assignment.faqs.length - 1 && (
                          <button
                            type="button"
                            title="Add FAQ"
                            className="text-green-600 border border-green-300 px-2 py-1 rounded ml-2"
                            onClick={handleAddFaq}
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div className="mb-2">
                  <label className="block mb-1 text-blue-700 font-semibold">
                    Price
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(assignment.price).map(([type, val]) => (
                      <div key={type}>
                        <label className="block text-blue-600 mt-2 text-sm">
                          {type === "extra" ? "Extra Bed/Mattress" : type}
                        </label>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) =>
                            handlePriceChange(type, e.target.value)
                          }
                          className="border border-blue-500 rounded-md p-2 mt-3 w-full"
                          placeholder={
                            type === "extra"
                              ? "Extra Bed/Mattress"
                              : `${type} Price`
                          }
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Update type="submit">Update Package Data</Update>
            <Cancel onClick={() => navigate("/gujarat-packages-data")}>
              Cancel
            </Cancel>
          </div>
        </form>
      </div>
      {success && <UpdateData />}
    </div>
  );
};

export default GujaratPackagesDataUpdate;
