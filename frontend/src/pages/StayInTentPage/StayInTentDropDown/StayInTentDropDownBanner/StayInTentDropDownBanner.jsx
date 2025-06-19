// import { useParams } from "react-router-dom";
// import { StayInTentDropDownData } from "../../StayInTent";
// import { Banner } from "../../../../components/Banner/Banner";

// export const StayInTentDropDownBanner = () => {
//   const { StayInTentPath } = useParams();

//   const FormattedPath = StayInTentPath.toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "");

//   const FormattedData = StayInTentDropDownData[FormattedPath];

//   return (
//     <>
//       <Banner Title={FormattedData.Banner} />
//     </>
//   );
// };

/* */

import { useParams } from "react-router-dom";
import { Banner } from "../../../../components/Banner/Banner";

export const StayInTentDropDownBanner = () => {
  const { StayInTentPath } = useParams();

  const formatSlugToTitle = (slug) => {
    if (!slug) return "";
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const bannerTitle = formatSlugToTitle(StayInTentPath);

  return (
    <>
      <Banner Title={bannerTitle} />
    </>
  );
};
