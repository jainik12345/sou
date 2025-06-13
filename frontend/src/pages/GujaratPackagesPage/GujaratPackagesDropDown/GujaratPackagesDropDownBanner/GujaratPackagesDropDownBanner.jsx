// import { useParams } from "react-router-dom";
// import { Banner } from "../../../../components/Banner/Banner";

// export const GujaratPackagesDropDownBanner = () => {
//   const { GujaratPath } = useParams();

//   if (!GujaratPath) return null;

//   const title = GujaratPath.replace(/-/g, " ").replace(/\b\w/g, (char) =>
//     char.toUpperCase()
//   );

//   return (
//     <div>
//       <Banner Title={title} />
//     </div>
//   );
// };

/** */

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Banner } from "../../../../components/Banner/Banner";
import axios from "axios";
import BE_URL from "../../../../config";

export const GujaratPackagesDropDownBanner = () => {
  const { GujaratPath } = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!GujaratPath) return;

    axios
      .get(`${BE_URL}/gujaratPackage`)
      .then((res) => {
        const packages = res.data?.data || [];

        const matched = packages.find((pkg) => {
          const slug = `gujarat-tour-${pkg.Nights}n-${pkg.Days}d`.toLowerCase();
          return slug === GujaratPath.toLowerCase();
        });

        if (matched) {
          setTitle(`Gujarat Tour ${matched.Nights}n ${matched.Days}d`);
        } else {
          setTitle(""); // Fallback if no match
        }
      })
      .catch((err) => {
        console.error("Failed to fetch Gujarat packages:", err);
      });
  }, [GujaratPath]);

  if (!title) return null;

  return (
    <div>
      <Banner Title={title} />
    </div>
  );
};
