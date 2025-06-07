import { HomePageStayPackages } from "./HomePageStayPackages/HomePageStayPackages.jsx";
import { HomePageTestimonial } from "./HomePageTestimonial/HomePageTestimonial.jsx";
import { HomePageImgSlider } from "./HomePageImgSlider/HomePageImgSlider.jsx";
import { HomepageExploreAttractions } from "./HomepageExploreAttractions/HomepageExploreAttractions.jsx";
import { HomePageSouInfo } from "./HomePageSouInfo/HomePageSouInfo.jsx";
import { HomePageForm } from "./HomePageForm/HomePageForm.jsx";
import { HomePageAchievements } from  "./HomePageAchievements/HomePageAchievements.jsx";


export const Home = () => {

  

  return (
    <>

      {/* Image Slider Section */}
      
      <HomePageImgSlider />

      {/* Stay Packages Cards Section */}

      <HomePageStayPackages />

      {/* Explore Attractions Section */}

      <HomepageExploreAttractions />

      {/* Testimonials Section */}

      <HomePageTestimonial />

      {/* SOU Info Section */}

      <HomePageSouInfo />

      {/* Form Section */}

      <HomePageForm />

      {/* Achievements Section */}

      <HomePageAchievements />

    </>
  );
};
