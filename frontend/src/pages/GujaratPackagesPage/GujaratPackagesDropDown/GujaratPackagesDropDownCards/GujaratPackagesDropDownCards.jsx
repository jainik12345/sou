import { useParams } from "react-router-dom";
import { GujaratPackagesTourData } from "../../GujaratPackagesData";
import {GujaratPackagesGuideCard} from "../../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard";

export const GujaratPackagesDropDownCards = () => {
  const { GujaratPath } = useParams();
  const tourData = GujaratPackagesTourData[GujaratPath];

  if (!tourData) {
    return (
      <div className="text-center text-red-500 text-xl p-10">
        No package data found for this route.
      </div>
    );
  }

  const {  TourGuide } = tourData;

  return (
    <>
      {/* Tour Guide Card Section */}
      {TourGuide && (
        <div className="gujarat-packages-tour-guide-section">
          <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">
            <GujaratPackagesGuideCard
              Title={TourGuide.Title}
              Heading={TourGuide.Heading}
              Faq={TourGuide.Faq}
              Images={TourGuide.ImgUrl}
              TableData={TourGuide.TourTable}
              Optional={TourGuide.Optional}
            />
          </div>
        </div>
      )}
    </>
  );
};