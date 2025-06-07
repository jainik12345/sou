import { Banner } from "../../components/Banner/Banner";
import { AboutPageMain } from "./AboutPageMain/AboutPageMain.jsx";
import { AboutSouInfo } from "./AboutSouInfo/AboutSouInfo.jsx";
import { HomePageForm } from "../HomePage/HomePageForm/HomePageForm.jsx";
import { AboutChooseUs } from "./AboutChooseUs/AboutChooseUs.jsx";
import { AboutFAQ } from "./AboutFAQ/AboutFAQ.jsx";

export const AboutUs = () => {
  return (
    <>

      {/* Banner */}

      <Banner Title="About Us" />

      {/* About Page Main Info  */}

      <AboutPageMain />

      {/* About Statue Of Unity info */}

      <AboutSouInfo/>

      {/* About Page FAQ section */}

      <AboutFAQ />

      {/* About Page Form Section*/}

      <HomePageForm/>

      {/* {About Page why should choose us Section} */}

      <AboutChooseUs />
    </>
  );
};