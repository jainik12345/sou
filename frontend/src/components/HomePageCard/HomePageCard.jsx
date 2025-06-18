import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { KnowMore } from "../Buttons/KnowMore";
import { BookOnline } from "../Buttons/BookOnline";
import * as motion from "motion/react-client";
import BE_URL from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";

// New color palette
const COLORS = {
  accent: "#9F7AEA", // purple
  accent2: "#FEE140", // yellow
  text: "#22223B",
  descBg: "rgba(159, 122, 234, 0.07)",
  cardShadow: "0 6px 24px 0 rgba(159, 122, 234, 0.09)",
  border: "#FEE140",
};

export const HomePageCard = ({ HomeStayPackages }) => {
  const [FetchError, setFetchError] = useState(null);
  const [HomePackagesNames, setHomePackagesNames] = useState(null);

  useEffect(() => {
    const FetchHomePageStayPackages = async () => {
      try {
        const FetchResponse = await axios.get(`${BE_URL}/souPackageName`);
        const FetchFilteredResponse = FetchResponse.data.data;
        if (FetchResponse.status === 200) {
          setHomePackagesNames(FetchFilteredResponse);
          setFetchError(null);
        } else {
          setFetchError("Failed to load Home Page Stay Packages .");
          console.warn("Unexpected response status:", FetchResponse.status);
        }
      } catch (error) {
        console.error(
          "Unable To Fetch Data Of Home Page Stay Packages :- ",
          error
        );
        setFetchError(
          "An error occurred while loading Home Page Stay Packages."
        );
      }
    };
    FetchHomePageStayPackages();
  }, []);

  // Helper to get the package name by id
  const getPackageName = (sou_package_id) => {
    if (!HomePackagesNames) return null;
    const pkg = HomePackagesNames.find(
      (pkgName) => pkgName.id === sou_package_id
    );
    return pkg ? pkg.sou_package_name : null;
  };

  return (
    <>
      {FetchError && (
        <div className="max-w-screen-xl mx-auto p-4 text-center text-red-500 font-semibold">
          {FetchError}
        </div>
      )}

      {HomeStayPackages?.map((Val, Idx) => {
        return (
          <motion.div
            key={Val.id}
            className="card-cont flex flex-col justify-center items-center gap-7 p-6 w-fit rounded-3xl shadow-xl bg-white relative group"
            style={{
              minWidth: 330,
              maxWidth: 370,
              transition: "box-shadow 0.4s cubic-bezier(.4,2,.6,1)",
            }}
            // Card entrance and hover motion
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Idx * 0.1 }}
          >
            <motion.div
              className="card-img rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.4, type: "spring" }}
              style={{
                background: "#fff",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 180,
                maxHeight: 200,
                width: "100%",
              }}
            >
              <motion.img
                src={`${BE_URL}/Images/HomeImages/HomeSouPackage/${Val.image}`}
                alt="IMG"
                className="h-44 w-full object-cover rounded-xl"
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <div className="card-title text-center">
              <h3
                className="text-[1.25rem] font-extrabold tracking-wide"
                style={{
                  color: COLORS.accent,
                  textShadow: "0 2px 12px #fee14033",
                }}
              >
                <NavLink
                  to={`/stay-in-tent/${getPackageName(Val.sou_package_id)
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9\-]/g, "")}`}
                >
                  {getPackageName(Val.sou_package_id)}
                </NavLink>
              </h3>
            </div>

            <div
              className="card-desc flex gap-5 border-l-4 w-full"
              style={{
                background: COLORS.descBg,
                borderColor: COLORS.accent,
                borderRadius: 18,
                padding: "1.1rem 0 1.1rem 1.2rem",
              }}
            >
              <div className="location-description flex flex-col gap-4 w-full">
                <motion.div
                  className="Accommodation-cont flex flex-col gap-1 relative"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.09, duration: 0.4, type: "spring" }}
                >
                  <TfiLayoutLineSolid
                    className="absolute top-[5px] left-[-22px] text-[1.2rem]"
                    style={{ color: COLORS.accent }}
                  />
                  <h4
                    className="font-bold flex items-center gap-2 text-[1.07rem]"
                    style={{ color: COLORS.text }}
                  >
                    <FaHome className="bg-[#9F7AEA] text-[1.25rem] p-1 rounded-md text-white" />
                    Accommodation
                  </h4>
                  <p className="text-[#635985] text-[.92rem] font-[400] pl-10">
                    {Val.accommodation}
                  </p>
                </motion.div>
                <motion.div
                  className="Package-cont flex flex-col gap-1 relative"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.17, duration: 0.4, type: "spring" }}
                >
                  <TfiLayoutLineSolid
                    className="absolute top-[5px] left-[-22px] text-[1.2rem]"
                    style={{ color: COLORS.accent }}
                  />
                  <h4
                    className="font-bold flex items-center gap-2 text-[1.07rem]"
                    style={{ color: COLORS.text }}
                  >
                    <CgNotes className="bg-[#FEE140] text-[1.25rem] p-1 rounded-md text-[#9F7AEA]" />
                    Package
                  </h4>
                  <p className="text-[#635985] text-[.92rem] font-[400] pl-10">
                    {Val.package}
                  </p>
                </motion.div>
                <motion.div
                  className="Location-cont flex flex-col gap-1 relative"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.4, type: "spring" }}
                >
                  <TfiLayoutLineSolid
                    className="absolute top-[5px] left-[-22px] text-[1.2rem]"
                    style={{ color: COLORS.accent }}
                  />
                  <h4
                    className="font-bold flex items-center gap-2 text-[1.07rem]"
                    style={{ color: COLORS.text }}
                  >
                    <FaLocationDot className="bg-[#9F7AEA] text-[1.25rem] p-1 rounded-md text-white" />
                    Location
                  </h4>
                  <p className="text-[#635985] text-[.92rem] font-[400] pl-10">
                    {Val.location}
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="card-btns flex gap-4 mt-2"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.21, duration: 0.4, type: "spring" }}
            >
              <KnowMore
                KnowMoreLink={`/stay-in-tent/${getPackageName(
                  Val.sou_package_id
                )
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9\-]/g, "")}`}
                Text={"Know More"}
              />
              <BookOnline BookOnlineLink="#" />
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
};
