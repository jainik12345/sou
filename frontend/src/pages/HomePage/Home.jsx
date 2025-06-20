import { HomePageStayPackages } from "./HomePageStayPackages/HomePageStayPackages.jsx";
import { HomePageTestimonial } from "./HomePageTestimonial/HomePageTestimonial.jsx";
import { HomePageImgSlider } from "./HomePageImgSlider/HomePageImgSlider.jsx";
import { HomepageExploreAttractions } from "./HomepageExploreAttractions/HomepageExploreAttractions.jsx";
import { HomePageSouInfo } from "./HomePageSouInfo/HomePageSouInfo.jsx";
import { HomePageForm } from "./HomePageForm/HomePageForm.jsx";
import { HomePageAchievements } from "./HomePageAchievements/HomePageAchievements.jsx";


export const Home = () => {



  return (
    <>

      <HomePageImgSlider />
      <HomePageStayPackages />
      <HomepageExploreAttractions />
      <HomePageTestimonial />
      <HomePageSouInfo />
      <HomePageForm />
      <HomePageAchievements />

    </>
  );
};
