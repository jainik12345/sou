import { Banner } from "../../../../components/Banner/Banner.jsx";
import { AboutActivitiesHeading } from "./AboutActivitiesHeading/AboutActivitiesHeading.jsx";
import { AboutActivitiesCards } from "../../../../components/AboutActivitiesCards/AboutActivitiesCards.jsx";
import { HomePageForm } from "../../../HomePage/HomePageForm/HomePageForm.jsx";

export const AboutActivities = () => {
  return (
    <>
      <Banner Title="Activities Near Statue of Unity" />

      <AboutActivitiesHeading/>

      <AboutActivitiesCards/>

      <HomePageForm/>
    </>
  );
};
