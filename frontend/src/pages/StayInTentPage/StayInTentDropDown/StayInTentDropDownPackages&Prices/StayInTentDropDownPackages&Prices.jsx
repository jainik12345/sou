/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// For image paths (adjust as per your backend/public setup)
const getImageUrl = (filename) =>
  filename
    ? `${BE_URL}/Images/SouPackage/SouPackageItineraryPackagePriceImages/${filename}`
    : "https://via.placeholder.com/400x200?text=No+Image";

export const StayInTentDropDownPackagesPrices = () => {
  const { StayInTentPath } = useParams();
  const formattedPath = slugify(StayInTentPath);

  const [loading, setLoading] = useState(true);
  const [itineraries, setItineraries] = useState([]); // [{ id, sou_package_itinerary_name }]
  const [prices, setPrices] = useState({}); // id: [ { ...priceRow } ]

  useEffect(() => {
    setLoading(true);
    setItineraries([]);
    setPrices({});

    // 1. Find sou_package_id by path
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        const allPackages = res.data.data || [];
        const found = allPackages.find(
          (pkg) => slugify(pkg.sou_package_name) === formattedPath
        );
        if (!found) {
          setLoading(false);
          return;
        }
        // 2. Fetch all itinerary names for this package
        return axios.get(
          `${BE_URL}/souPackageItineraryName/package/${found.id}`
        );
      })
      .then((itRes) => {
        if (!itRes || !itRes.data || !Array.isArray(itRes.data.data)) {
          setLoading(false);
          return;
        }
        setItineraries(itRes.data.data);

        // 3. For each itinerary, fetch prices
        return Promise.all(
          itRes.data.data.map((it) =>
            axios
              .get(
                `${BE_URL}/souPackageItineraryPackagePrice/itinerary/${it.id}`
              )
              .then((priceRes) => ({
                id: it.id,
                prices: priceRes.data.data || [],
                name: it.sou_package_itinerary_name,
              }))
          )
        );
      })
      .then((allPrices) => {
        if (!allPrices) {
          setLoading(false);
          return;
        }
        // Map: itinerary_id -> prices[]
        const priceMap = {};
        for (const { id, prices, name } of allPrices) {
          priceMap[id] = { prices, name };
        }
        setPrices(priceMap);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [formattedPath]);

  if (loading)
    return (
      <section className="w-full px-4 py-12 bg-gray-50 text-center">
        <span className="text-lg">Loading package prices...</span>
      </section>
    );

  if (!itineraries.length) return null;

  // Collect all price rows from all itineraries
  let allPricePanels = [];
  for (const it of itineraries) {
    const p = prices[it.id];
    if (p && Array.isArray(p.prices) && p.prices.length) {
      for (const priceRow of p.prices) {
        allPricePanels.push({
          ...priceRow,
          itineraryName: it.sou_package_itinerary_name,
        });
      }
    }
  }

  return (
    <section className="py-12 px-2 w-full bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-700 mb-2">
            Statue of Unity Tent City Tour Packages & Prices
          </h1>
          <div className="font-semibold text-base sm:text-lg text-gray-700 tracking-wide">
            {/* Optionally show date range or other static info */}
          </div>
          <div className="text-sm sm:text-base text-gray-500 mt-1">
            Experience Ultimate Hospitality, Unmatchable Luxury and Unparalleled
            Comfort at Tented Accommodation Near Statue Of Unity at Kevadia.
          </div>
        </div>

        {/* Show all prices for all itineraries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
          {allPricePanels.map((priceRow, idx) => {
            let otherPrices = [];
            try {
              otherPrices = Array.isArray(priceRow.other_price)
                ? priceRow.other_price
                : JSON.parse(priceRow.other_price);
            } catch {
              otherPrices = [];
            }

            // Group prices by label, e.g. Weekday/Weekend
            const grouped = {};
            for (const obj of otherPrices) {
              const label = obj.label || "Other";
              if (!grouped[label]) grouped[label] = [];
              grouped[label].push(obj);
            }

            return (
              <div
                key={priceRow.id + "-" + idx}
                className="bg-white rounded-3xl shadow-lg border border-orange-100 flex flex-col hover:shadow-2xl transition-all overflow-hidden"
              >
                <img
                  src={getImageUrl(priceRow.image)}
                  alt={priceRow.itineraryName}
                  className="h-full w-full object-cover"
                />
                <div className="p-5 flex flex-col h-full">
                  <h2 className="text-lg text-center font-bold text-orange-700 mb-1">
                    {priceRow.itineraryName}
                  </h2>
                  {priceRow.package_start_price && (
                    <div className="font-semibold text-center text-sm text-orange-500 mb-2">
                      Package Starts with ₹
                      {Number(priceRow.package_start_price).toLocaleString()}
                    </div>
                  )}

                  <div>
                    {Object.entries(grouped).map(([label, arr], i) => (
                      <div key={label} className="mb-5">
                        <div className="text-xs font-semibold text-left text-orange-600 mb-1">
                          {label}
                        </div>
                        <div className="rounded-xl border border-orange-200 overflow-hidden">
                          <table className="w-full text-sm text-left">
                            <thead>
                              <tr className="bg-orange-100">
                                <th className="px-4 py-2 font-semibold">
                                  Category
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                  Premium Cottage
                                </th>
                                <th className="px-4 py-2 font-semibold">
                                  Royal Cottage
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {arr.map((row, j) => (
                                <tr
                                  key={j}
                                  className={j % 2 === 0 ? "bg-orange-50" : ""}
                                >
                                  <td className="px-4 py-2">{row.label}</td>
                                  <td className="px-4 py-2 text-orange-700 font-bold">
                                    {row.premium
                                      ? `₹${Number(
                                          row.premium
                                        ).toLocaleString()}/-`
                                      : "-"}
                                  </td>
                                  <td className="px-4 py-2 text-orange-700 font-bold">
                                    {row.royal
                                      ? `₹${Number(
                                          row.royal
                                        ).toLocaleString()}/-`
                                      : "-"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-auto w-full py-2 bg-gradient-to-tr from-green-500 to-green-700 text-white font-bold rounded-lg shadow hover:from-green-600 hover:to-green-800 transition">
                    Book Online
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
