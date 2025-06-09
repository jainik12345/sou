import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./../../components/LoginSection/LoginPage";
import ForgotPassword from "./../../components/LoginSection/ForgotPassword";
import VerifyOTP from "./../../components/LoginSection/VerifyOTP";
import ResetPassword from "./../../components/LoginSection/ResetPassword";
import MainLayout from "./../../components/MainLayout";
import HomeImageSlider from './../../pages/HomePages/HomeImageSlider/HomeImageSlider';
import HomeImageSliderInsert from './../../pages/HomePages/HomeImageSlider/HomeImageSliderInsert';
import HomeImageSliderUpdate from './../../pages/HomePages/HomeImageSlider/HomeImageSliderUpdate';
import HomeImageSliderTrace from './../../pages/HomePages/HomeImageSlider/HomeImageSliderTrace';
import HomeNearAttractions from './../../pages/HomePages/HomeNearAttractions/HomeNearAttractions';
import HomeNearAttractionsInsert from './../../pages/HomePages/HomeNearAttractions/HomeNearAttractionsInsert';
import HomeNearAttractionsUpdate from './../../pages/HomePages/HomeNearAttractions/HomeNearAttractionsUpdate';
import HomeNearAttractionsTrace from './../../pages/HomePages/HomeNearAttractions/HomeNearAttractionsTrace';
import HomeTestimonial from './../../pages/HomePages/HomeTestimonial/HomeTestimonial';
import HomeTestimonialInsert from './../../pages/HomePages/HomeTestimonial/HomeTestimonialInsert';
import HomeTestimonialUpdate from './../../pages/HomePages/HomeTestimonial/HomeTestimonialUpdate';
import HomeTestimonialTrace from './../../pages/HomePages/HomeTestimonial/HomeTestimonialTrace';
import HomeOnlineBookingContent from './../../pages/HomePages/HomeOnlineBookingContent/HomeOnlineBookingContent';
import HomeOnlineBookingContentInsert from './../../pages/HomePages/HomeOnlineBookingContent/HomeOnlineBookingContentInsert';
import HomeOnlineBookingContentUpdate from './../../pages/HomePages/HomeOnlineBookingContent/HomeOnlineBookingContentUpdate';
import HomeOnlineBookingContentTrace from './../../pages/HomePages/HomeOnlineBookingContent/HomeOnlineBookingContentTrace';
import HomeCertificate from './../../pages/HomePages/HomeCertificate/HomeCertificate';
import HomeCertificateInsert from './../../pages/HomePages/HomeCertificate/HomeCertificateInsert';
import HomeCertificateUpdate from './../../pages/HomePages/HomeCertificate/HomeCertificateUpdate';
import HomeCertificateTrace from './../../pages/HomePages/HomeCertificate/HomeCertificateTrace';
import AboutHeroSection from './../../pages/AboutPages/AboutHeroSection/AboutHeroSection';
import AboutHeroSectionInsert from './../../pages/AboutPages/AboutHeroSection/AboutHeroSectionInsert';
import AboutHeroSectionUpdate from './../../pages/AboutPages/AboutHeroSection/AboutHeroSectionUpdate';
import AboutHeroSectionTrace from './../../pages/AboutPages/AboutHeroSection/AboutHeroSectionTrace';
import AboutIntrestingFaqs from './../../pages/AboutPages/AboutIntrestingFaqs/AboutIntrestingFaqs';
import AboutIntrestingFaqsInsert from './../../pages/AboutPages/AboutIntrestingFaqs/AboutIntrestingFaqsInsert';
import AboutIntrestingFaqsUpdate from './../../pages/AboutPages/AboutIntrestingFaqs/AboutIntrestingFaqsUpdate';
import AboutIntrestingFaqsTrace from './../../pages/AboutPages/AboutIntrestingFaqs/AboutIntrestingFaqsTrace';
import AboutWhyChooseSection from './../../pages/AboutPages/AboutWhyChooseSection/AboutWhyChooseSection';
import AboutWhyChooseSectionInsert from './../../pages/AboutPages/AboutWhyChooseSection/AboutWhyChooseSectionInsert';
import AboutWhyChooseSectionUpdate from './../../pages/AboutPages/AboutWhyChooseSection/AboutWhyChooseSectionUpdate';
import AboutWhyChooseSectionTrace from './../../pages/AboutPages/AboutWhyChooseSection/AboutWhyChooseSectionTrace';
import AboutAttractionsSection from './../../pages/AboutPages/AboutAttractionsSection/AboutAttractionsSection';
import AboutAttractionsSectionInsert from './../../pages/AboutPages/AboutAttractionsSection/AboutAttractionsSectionInsert';
import AboutAttractionsSectionUpdate from './../../pages/AboutPages/AboutAttractionsSection/AboutAttractionsSectionUpdate';
import AboutAttractionsSectionTrace from './../../pages/AboutPages/AboutAttractionsSection/AboutAttractionsSectionTrace';
import AboutActivitiesSection from './../../pages/AboutPages/AboutActivitiesSection/AboutActivitiesSection';
import AboutActivitiesSectionInsert from './../../pages/AboutPages/AboutActivitiesSection/AboutActivitiesSectionInsert';
import AboutActivitiesSectionUpdate from './../../pages/AboutPages/AboutActivitiesSection/AboutActivitiesSectionUpdate';
import AboutActivitiesSectionTrace from './../../pages/AboutPages/AboutActivitiesSection/AboutActivitiesSectionTrace';
import ContactSectionInsert from './../../pages/ContactPages/ContactSection/ContactSectionInsert';
import ContactFormDetails from './../../pages/ContactPages/ContactFormDetails/ContactFormDetails';
import ContactFormDetailsTrace from './../../pages/ContactPages/ContactFormDetails/ContactFormDetailsTrace';
import HomePage from './../../pages/HomePages/HomePage';
import PrivatePolicy from './../../pages/PrivatePolicy/PrivatePolicy';
import PrivatePolicyInsert from './../../pages/PrivatePolicy/PrivatePolicyInsert';
import PrivatePolicyUpdate from './../../pages/PrivatePolicy/PrivatePolicyUpdate';
import PrivatePolicyTrace from './../../pages/PrivatePolicy/PrivatePolicyTrace';
import TermsConditions from './../../pages/TermsConditions/TermsConditions';
import TermsConditionsInsert from './../../pages/TermsConditions/TermsConditionsInsert';
import TermsConditionsUpdate from './../../pages/TermsConditions/TermsConditionsUpdate';
import TermsConditionsTrace from './../../pages/TermsConditions/TermsConditionsTrace';
import GujaratPackagesNameInsert from "../../pages/GujaratPackage/GujaratPackagesName/GujaratPackagesNameInsert";
import GujaratPackagesName from './../../pages/GujaratPackage/GujaratPackagesName/GujaratPackagesName';
import GujaratPackagesNameUpdate from './../../pages/GujaratPackage/GujaratPackagesName/GujaratPackagesNameUpdate';
import GujaratPackagesNameTrace from './../../pages/GujaratPackage/GujaratPackagesName/GujaratPackagesNameTrace';
import GujaratPackagesData from "../../pages/GujaratPackage/GujaratPackagesData/GujaratPackagesData";
import GujaratPackagesDataInsert from "../../pages/GujaratPackage/GujaratPackagesData/GujaratPackagesDataInsert";
import GujaratPackagesDataUpdate from "../../pages/GujaratPackage/GujaratPackagesData/GujaratPackagesDataUpdate";
import GujaratPackagesDataTrace from "../../pages/GujaratPackage/GujaratPackagesData/GujaratPackagesDataTrace";



const RouteComponents = () => {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect / to /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/" element={<MainLayout />}>
          {/* -----------------------------------------------------Home Pages-------------------------------------------- */}

          <Route path="/home" element={<HomePage/>} />

          <Route path="/home-image-slider" element={<HomeImageSlider/>} />
          <Route path="/home-image-slider/insert" element={<HomeImageSliderInsert/>} />
          <Route path="/home-image-slider/update" element={<HomeImageSliderUpdate/>} />
          <Route path="/home-image-slider/trace" element={<HomeImageSliderTrace/>} />

          <Route path="/home-near-attractions" element={<HomeNearAttractions/>} />
          <Route path="/home-near-attractions/insert" element={<HomeNearAttractionsInsert/>} />
          <Route path="/home-near-attractions/update" element={<HomeNearAttractionsUpdate/>} />
          <Route path="/home-near-attractions/trace" element={<HomeNearAttractionsTrace/>} />

          <Route path="/home-testimonial" element={<HomeTestimonial/>} />
          <Route path="/home-testimonial/insert" element={<HomeTestimonialInsert/>} />
          <Route path="/home-testimonial/update" element={<HomeTestimonialUpdate/>} />
          <Route path="/home-testimonial/trace" element={<HomeTestimonialTrace/>} />

          <Route path="/home-online-booking-content" element={<HomeOnlineBookingContent/>} />
          <Route path="/home-online-booking-content/insert" element={<HomeOnlineBookingContentInsert/>} />
          <Route path="/home-online-booking-content/update" element={<HomeOnlineBookingContentUpdate/>} />
          <Route path="/home-online-booking-content/trace" element={<HomeOnlineBookingContentTrace/>} />

          <Route path="/home-certificate" element={<HomeCertificate/>} />
          <Route path="/home-certificate/insert" element={<HomeCertificateInsert/>} />
          <Route path="/home-certificate/update" element={<HomeCertificateUpdate/>} />
          <Route path="/home-certificate/trace" element={<HomeCertificateTrace/>} />

          {/*------------------------------------------------- About Pages -------------------------------------------------*/}



          <Route path="/about-hero-section" element={<AboutHeroSection/>} />
          <Route path="/about-hero-section/insert" element={<AboutHeroSectionInsert/>} />
          <Route path="/about-hero-section/update" element={<AboutHeroSectionUpdate/>} />
          <Route path="/about-hero-section/trace" element={<AboutHeroSectionTrace/>} />

          <Route path="/about-intresting-faqs" element={<AboutIntrestingFaqs/>} />
          <Route path="/about-intresting-faqs/insert" element={<AboutIntrestingFaqsInsert/>} />
          <Route path="/about-intresting-faqs/update" element={<AboutIntrestingFaqsUpdate/>} />
          <Route path="/about-intresting-faqs/trace" element={<AboutIntrestingFaqsTrace/>} />

          <Route path="/about-why-choose-section" element={<AboutWhyChooseSection/>} />
          <Route path="/about-why-choose-section/insert" element={<AboutWhyChooseSectionInsert/>} />
          <Route path="/about-why-choose-section/update" element={<AboutWhyChooseSectionUpdate/>} />
          <Route path="/about-why-choose-section/trace" element={<AboutWhyChooseSectionTrace/>} />

          <Route path="/about-attractions-section" element={<AboutAttractionsSection/>}/>
          <Route path="/about-attractions-section/insert" element={<AboutAttractionsSectionInsert/>}/>
          <Route path="/about-attractions-section/update" element={<AboutAttractionsSectionUpdate/>}/>
          <Route path="/about-attractions-section/trace" element={<AboutAttractionsSectionTrace/>}/>

          <Route path="/about-activities-section" element={<AboutActivitiesSection/>} />
          <Route path="/about-activities-section/insert" element={<AboutActivitiesSectionInsert/>} />
          <Route path="/about-activities-section/update" element={<AboutActivitiesSectionUpdate/>} />
          <Route path="/about-activities-section/trace" element={<AboutActivitiesSectionTrace/>} />




          {/*------------------------------------------------- Contact Pages------------------------------------------------- */}


          <Route path="/contact-page-section" element={<ContactSectionInsert/>} />

          <Route path="/contact-form-details" element={<ContactFormDetails/>} />
          <Route path="/contact-form-details/trace" element={<ContactFormDetailsTrace/>} />



          {/*------------------------------------------------- Gujarat Package------------------------------------------- */}

          <Route path="/gujarat-packages-name" element={<GujaratPackagesName/>} />
          <Route path="/gujarat-packages-name/insert" element={<GujaratPackagesNameInsert/>} />
          <Route path="/gujarat-packages-name/update" element={<GujaratPackagesNameUpdate/>} />
          <Route path="/gujarat-packages-name/trace" element={<GujaratPackagesNameTrace/>} />


          <Route path="/gujarat-Packages-data" element={<GujaratPackagesData/>} />
          <Route path="/gujarat-Packages-data/insert" element={<GujaratPackagesDataInsert/>} />
          <Route path="/gujarat-Packages-data/update" element={<GujaratPackagesDataUpdate/>} />
          <Route path="/gujarat-Packages-data/trace" element={<GujaratPackagesDataTrace/>} />



          {/*------------------------------------------------- Terms----------------------------------------------------------- */}



          <Route path="/private-policy" element={<PrivatePolicy/>} />
          <Route path="/private-policy/insert" element={<PrivatePolicyInsert/>} />
          <Route path="/private-policy/update" element={<PrivatePolicyUpdate/>} />
          <Route path="/private-policy/trace" element={<PrivatePolicyTrace/>} />

          <Route path="/terms-conditions" element={<TermsConditions/>} />
          <Route path="/terms-conditions/insert" element={<TermsConditionsInsert/>} />
          <Route path="/terms-conditions/update" element={<TermsConditionsUpdate/>} />
          <Route path="/terms-conditions/trace" element={<TermsConditionsTrace/>} />




        </Route>
      </Routes>
    </>
  );
};

export default RouteComponents;
