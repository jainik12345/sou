import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config";
import { BookOnline } from "../../../../components/Buttons/BookOnline.jsx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

 
const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

 
const getImageUrl = (filename) =>
  filename
    ? `${BE_URL}/Images/SouPackage/SouPackageResortImages/${filename}`
    : "https://via.placeholder.com/400x200?text=No+Image";

// Food plan descriptions
const FOOD_PLAN_LABELS = {
  CP: "CP (Continental Plan: Includes stay & breakfast only)",
  MAP: "MAP (Modified American Plan: Includes stay, breakfast, and one major meal – lunch or dinner)",
  AP: "AP (American Plan: Includes stay and all meals – breakfast, lunch, and dinner)",
  EP: "EP (European Plan: Includes stay only, no meals provided)",
};

const groupResortsByPlanAndWeek = (resortsArr) => {
  const weekMap = {
    Weekday: "Monday To Thursday",
    Weekend: "Friday To Sunday",
    Other: "Other",
  };
  const group = {};
  for (const r of resortsArr) {
    const plan = (r.food_plans || "").trim() || "No Plan";
    if (!group[plan]) group[plan] = { Weekday: [], Weekend: [], Other: [] };

    const week = (r.week || "").trim().toLowerCase();
    let weekKey = "Other";
    if (week === "weekday") weekKey = "Weekday";
    else if (week === "weekend") weekKey = "Weekend";
    group[plan][weekKey].push(r);
  }
  return { group, weekMap };
};

export const StayInTentDropDownBookOnlineCard = () => {
  const { StayInTentPath } = useParams();
  const formattedPath = slugify(StayInTentPath);

  const [loading, setLoading] = useState(true);
  const [resorts, setResorts] = useState([]);
  const [planOrder, setPlanOrder] = useState([]);
  const [grouped, setGrouped] = useState({ group: {}, weekMap: {} });

  useEffect(() => {
    setLoading(true);
    setResorts([]);
    setPlanOrder([]);
    setGrouped({ group: {}, weekMap: {} });

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
        // 2. Fetch all resorts for this package
        return axios.get(`${BE_URL}/souPackageResort/package/${found.id}`);
      })
      .then((resortRes) => {
        if (
          !resortRes ||
          !resortRes.data ||
          !Array.isArray(resortRes.data.data)
        ) {
          setLoading(false);
          return;
        }
        const resortsArr = resortRes.data.data;

        // Find all unique food plans, preserve order of appearance
        const plansSet = [];
        resortsArr.forEach((r) => {
          const plan = (r.food_plans || "").trim() || "No Plan";
          if (!plansSet.includes(plan)) plansSet.push(plan);
        });
        setPlanOrder(plansSet);

        // Group by food plan and week
        setGrouped(groupResortsByPlanAndWeek(resortsArr));
        setResorts(resortsArr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [formattedPath]);

  if (loading)
    return (
      <section className="w-full px-4 py-16 bg-white text-center">
        <span className="text-lg">Loading...</span>
      </section>
    );

  if (!resorts.length) return null;

  // Render helper for week group
  const renderWeekCards = (weekObj, weekMap) => {
    return ["Weekday", "Weekend"].map((weekKey) =>
      weekObj[weekKey] && weekObj[weekKey].length > 0 ? (
        <div key={weekKey} className="flex-1 min-w-[280px] max-w-[420px]">
          <div className="text-xl font-bold text-center text-orange-500 mb-3">
            {weekMap[weekKey]}
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 flex flex-col items-center p-0 mb-6">
            {weekObj[weekKey].map((resort, idx) => (
              <div key={resort.id || idx} className="w-full">
                <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-100 rounded-t-2xl overflow-hidden">
                  <LazyLoadImage
                    src={getImageUrl(resort.image)}
                    alt={resort.type_room_name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-5 flex flex-col items-center">
                  <h3 className="font-extrabold text-lg text-orange-700 mb-1 text-center">
                    {resort.type_room_name}
                  </h3>
                  <div className="mb-2 text-gray-800 font-medium">
                    Per Couple ₹
                    {resort.per_couple
                      ? Number(resort.per_couple).toLocaleString()
                      : "-"}
                  </div>
                  <BookOnline BookOnlineLink="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null
    );
  };

  // Main rendering
  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-5xl flex flex-col gap-16 px-4 md:px-8 py-8">
        {planOrder.map((plan, idx) => {
          const weekObj = grouped.group[plan];
          if (!weekObj) return null;

          // Find label for food plan, fallback to plan name if missing
          // For "No Plan", show just the plan name
          const planKey = plan.toUpperCase();
          const planLabel =
            planKey !== "NO PLAN" ? FOOD_PLAN_LABELS[planKey] || plan : plan;

          return (
            <div key={plan + idx}>
              {/* Plan Title */}
              <div className="mb-2">
                <div className="text-[18px] font-semibold text-center text-orange-600 uppercase tracking-wide mb-1">
                  {planLabel}
                </div>
              </div>
              {/* Week cards in row */}
              <div className="flex flex-col md:flex-row gap-8 justify-center">
                {renderWeekCards(weekObj, grouped.weekMap)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StayInTentDropDownBookOnlineCard;
