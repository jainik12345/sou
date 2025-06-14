import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";

const getWeekLabel = (week = "") => {
  const trimmed = week.trim().toLowerCase();
  if (trimmed === "weekday")
    return { main: "Monday to Thursday", secondary: "Weekday" };
  if (trimmed === "weekend")
    return { main: "Friday to Sunday", secondary: "Weekend" };

  return { main: week.charAt(0).toUpperCase() + week.slice(1), secondary: "" };
};

const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const PackageTable = ({ section }) => (
  <div className="overflow-x-auto bg-white  shadow-md">
    {section.label && (
      <div className="bg-orange-100 text-orange-700 px-4 py-2 font-bold text-center text-lg  flex items-center justify-center gap-2">
        <span>{section.label.main}</span>
        {section.label.secondary && (
          <span className="text-base text-orange-600 font-semibold">
            ( {section.label.secondary} )
          </span>
        )}
      </div>
    )}
    <table className="min-w-max w-full text-sm text-gray-700 border">
      <thead>
        <tr>
          {section.columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-3 bg-orange-500 text-white font-semibold text-center text-base"
              style={{ whiteSpace: "nowrap" }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {section.rows.map((row, idx) => (
          <tr
            key={idx}
            className="hover:bg-orange-50 transition-colors border-b last:border-none"
          >
            {section.columns.map((col) => (
              <td
                key={col.key}
                className="px-4 py-2 text-center"
                style={{ whiteSpace: "nowrap" }}
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const StayInTentDropDownCottagePackagesRate = () => {
  const { StayInTentPath } = useParams();
  const [loading, setLoading] = useState(true);
  const [packageData, setPackageData] = useState([]);
  const [notFound, setNotFound] = useState(false);

  // Format param for matching
  const formattedPath = slugify(StayInTentPath);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setPackageData([]);

    // 1. Fetch all package names
    axios
      .get(`${BE_URL}/souPackageName`)
      .then((res) => {
        const allPackages = res.data.data || [];
        const found = allPackages.find(
          (pkg) => slugify(pkg.sou_package_name) === formattedPath
        );
        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        // 2. Fetch all lake view plans for that package
        return axios.get(`${BE_URL}/souPackageLakeView/package/${found.id}`);
      })
      .then((lakeRes) => {
        if (!lakeRes || !lakeRes.data || !Array.isArray(lakeRes.data.data)) {
          setLoading(false);
          return;
        }
        const views = lakeRes.data.data;

        // Group by week, map backend week value to user-friendly label+suffix
        const sections = views.map((view) => {
          let rows = [];
          try {
            rows = Array.isArray(view.data) ? view.data : JSON.parse(view.data);
          } catch {
            rows = [];
          }
          return {
            label: getWeekLabel(view.week),
            columns: [
              { label: "Plan", key: "plans" },
              { label: "1 Night & 2 Days", key: "night1days2" },
              { label: "2 Night & 3 Days", key: "night2days3" },
            ],
            rows: rows,
          };
        });

        setPackageData(sections);
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [formattedPath]);

  if (loading)
    return (
      <section className="w-full px-4 py-12 bg-gray-50 text-center">
        <span className="text-lg">Loading...</span>
      </section>
    );

  if (notFound || !packageData.length) return null;

  return (
    <section className="w-full px-4 py-12 bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="heading">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-orange-600">
            Lake View Cottage Packages
          </h1>
          <p className="text-center text-gray-600 mb-1">
            Choose from our exclusive lake view cottage packages.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center mt-8">
          {packageData.map((section, idx) => (
            <div key={idx} className="flex-1 flex flex-col mb-6">
              <PackageTable section={section} />
              <div className="flex-1"></div>
              <div className="flex justify-center mt-6">
                <button
                  className={`px-8 py-3 rounded-lg text-white font-semibold cursor-pointer transition bg-green-500 hover:bg-green-600 shadow-md focus:outline-none`}
                >
                  Book Online
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayInTentDropDownCottagePackagesRate;
