import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Submit from "../../../components/Buttons/Submit";
import Cancel from "../../../components/Buttons/Cancel";
import SubmitData from "../../../components/Popup/SubmitData";
import BE_URL from "../../../config";

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

const GujaratPackagesDataInsert = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [nights, setNights] = useState(0);
  const [assignment, setAssignment] = useState(initialAssignmentData());
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const imagesInputRef = useRef();

  // Fetch packages
  useEffect(() => {
    axios
      .get(`${BE_URL}/gujaratPackage`)
      .then((res) => {
        if (Array.isArray(res.data.data)) setPackages(res.data.data);
      })
      .catch(() => setPackages([]));
  }, []);

  // When selector changes: reset assignment
  useEffect(() => {
    if (!selectedPackage) {
      setNights(0);
      setAssignment(initialAssignmentData());
      return;
    }
    const pkg = packages.find((p) => String(p.id) === selectedPackage);
    setNights(Number(pkg?.Nights || 0));
    setAssignment(initialAssignmentData());
    if (imagesInputRef.current) imagesInputRef.current.value = "";
  }, [selectedPackage, packages]);

  // Remove popup after 2.5s
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [success]);

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
    setError(null); // clear image error on image select
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

  // --- SUBMIT ---
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
    if (!assignment.images || assignment.images.length === 0) {
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
    formData.append(
      "faqs",
      JSON.stringify([{ assignment: assignmentString, faqs: assignment.faqs }])
    );
    formData.append("price", JSON.stringify(assignment.price));

    try {
      const response = await axios.post(
        `${BE_URL}/gujaratPackageData`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.status === "success") {
        setSuccess(true);
        setAssignment(initialAssignmentData());
        setSelectedPackage("");
        if (imagesInputRef.current) imagesInputRef.current.value = "";
      } else {
        setError("Failed to add package data.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="p-6">
      <div className="border-2 border-blue-300 rounded-2xl p-6 shadow-md">
        <h2 className="bg-blue-600 text-white text-lg font-semibold py-3 px-5 rounded-md mb-8">
          Add Gujarat Package Data
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
                {/* Assignment Parts */}
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  {assignment.assignmentParts.map((part, pidx) => {
                    // For the last part, max option is the remaining nights
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
                      <React.Fragment key={pidx}>
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
                      </React.Fragment>
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
                  <label className="block mb-1 text-blue-700 font-semibold">
                    Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={imagesInputRef}
                    onChange={(e) => handleImagesChange(e.target.files)}
                    className="border border-blue-500 cursor-pointer rounded-md p-2 w-full"
                    required
                  />
                  {assignment.imagePreviews.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {assignment.imagePreviews.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`preview-${i}`}
                          className="h-16 w-20 object-cover border rounded"
                        />
                      ))}
                    </div>
                  )}
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
                        <label className="block text-blue-600 text-sm">
                          {type === "extra" ? "Extra Bed/Mattress" : type}
                        </label>
                        <input
                          type="text"
                          value={val}
                          onChange={(e) =>
                            handlePriceChange(type, e.target.value)
                          }
                          className="border border-blue-500 rounded-md p-2 w-full"
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
            <Submit type="submit">Add Package Data</Submit>
            <Cancel onClick={() => window.history.back()}>Cancel</Cancel>
          </div>
        </form>
      </div>
      {success && <SubmitData />}
    </div>
  );
};

export default GujaratPackagesDataInsert;
