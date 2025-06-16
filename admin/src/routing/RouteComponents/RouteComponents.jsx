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
import SOUPackageName from './../../pages/SOUPackage/SOUPackageName/SOUPackageName';
import SOUPackageNameInsert from './../../pages/SOUPackage/SOUPackageName/SOUPackageNameInsert';
import SOUPackageNameUpdate from './../../pages/SOUPackage/SOUPackageName/SOUPackageNameUpdate';
import SOUPackageNameTrace from './../../pages/SOUPackage/SOUPackageName/SOUPackageNameTrace';
import SOUPackageGallery from './../../pages/SOUPackage/SOUPackageGallery/SOUPackageGallery';
import SOUPackageGalleryInsert from './../../pages/SOUPackage/SOUPackageGallery/SOUPackageGalleryInsert';
import SOUPackageGalleryUpdate from './../../pages/SOUPackage/SOUPackageGallery/SOUPackageGalleryUpdate';
import SOUPackageGalleryTrace from './../../pages/SOUPackage/SOUPackageGallery/SOUPackageGalleryTrace';
import HomeSouPackage from "../../pages/HomePages/HomeSouPackage/HomeSouPackage";
import HomeSouPackageInsert from "../../pages/HomePages/HomeSouPackage/HomeSouPackageInsert";
import HomeSouPackageUpdate from "../../pages/HomePages/HomeSouPackage/HomeSouPackageUpdate";
import HomeSouPackageTrace from "../../pages/HomePages/HomeSouPackage/HomeSouPackageTrace";
import SOUPackageHeroSection from './../../pages/SOUPackage/SOUPackageHeroSection/SOUPackageHeroSection';
import SOUPackageHeroSectionInsert from './../../pages/SOUPackage/SOUPackageHeroSection/SOUPackageHeroSectionInsert';
import SOUPackageHeroSectionUpdate from './../../pages/SOUPackage/SOUPackageHeroSection/SOUPackageHeroSectionUpdate';
import SOUPackageHeroSectionTrace from './../../pages/SOUPackage/SOUPackageHeroSection/SOUPackageHeroSectionTrace';
import SOUPackageAmenities from './../../pages/SOUPackage/SOUPackageAmenities/SOUPackageAmenities';
import SOUPackageAmenitiesInsert from './../../pages/SOUPackage/SOUPackageAmenities/SOUPackageAmenitiesInsert';
import SOUPackageAmenitiesUpdate from './../../pages/SOUPackage/SOUPackageAmenities/SOUPackageAmenitiesUpdate';
import SOUPackageAmenitiesTrace from './../../pages/SOUPackage/SOUPackageAmenities/SOUPackageAmenitiesTrace';
import SOUPackageItinerarySection from './../../pages/SOUPackage/SOUPackageItinerarySection/SOUPackageItinerarySection';
import SOUPackageItinerarySectionInsert from './../../pages/SOUPackage/SOUPackageItinerarySection/SOUPackageItinerarySectionInsert';
import SOUPackageItinerarySectionUpdate from './../../pages/SOUPackage/SOUPackageItinerarySection/SOUPackageItinerarySectionUpdate';
import SOUPackageItinerarySectionTrace from './../../pages/SOUPackage/SOUPackageItinerarySection/SOUPackageItinerarySectionTrace';
import SOUPackageNotesPolicy from './../../pages/SOUPackage/SOUPackageNotesPolicy/SOUPackageNotesPolicy';
import SOUPackageNotesPolicyInsert from './../../pages/SOUPackage/SOUPackageNotesPolicy/SOUPackageNotesPolicyInsert';
import SOUPackageNotesPolicyUpdate from './../../pages/SOUPackage/SOUPackageNotesPolicy/SOUPackageNotesPolicyUpdate';
import SOUPackageNotesPolicyTrace from './../../pages/SOUPackage/SOUPackageNotesPolicy/SOUPackageNotesPolicyTrace';
import SOUPackageFAQS from './../../pages/SOUPackage/SOUPackageFAQS/SOUPackageFAQS';
import SOUPackageFAQSInsert from './../../pages/SOUPackage/SOUPackageFAQS/SOUPackageFAQSInsert';
import SOUPackageFAQSUpdate from './../../pages/SOUPackage/SOUPackageFAQS/SOUPackageFAQSUpdate';
import SOUPackageFAQSTrace from './../../pages/SOUPackage/SOUPackageFAQS/SOUPackageFAQSTrace';
import SOUPackageParagrpah from './../../pages/SOUPackage/SOUPackageParagrpah/SOUPackageParagrpah';
import SOUPackageParagrpahInsert from './../../pages/SOUPackage/SOUPackageParagrpah/SOUPackageParagrpahInsert';
import SOUPackageParagrpahUpdate from './../../pages/SOUPackage/SOUPackageParagrpah/SOUPackageParagrpahUpdate';
import SOUPackageParagrpahTrace from './../../pages/SOUPackage/SOUPackageParagrpah/SOUPackageParagrpahTrace';
import SOUPackageItineraryName from "../../pages/SOUPackage/SOUPackageItineraryName/SOUPackageItineraryName";
import SOUPackageItineraryNameInsert from "../../pages/SOUPackage/SOUPackageItineraryName/SOUPackageItineraryNameInsert";
import SOUPackageItineraryNameUpdate from "../../pages/SOUPackage/SOUPackageItineraryName/SOUPackageItineraryNameUpdate";
import SOUPackageItineraryNameTrace from "../../pages/SOUPackage/SOUPackageItineraryName/SOUPackageItineraryNameTrace";
import SOUPackageMealPlan from "../../pages/SOUPackage/SOUPackageMealPlan/SOUPackageMealPlan";
import SOUPackageMealPlanInsert from "../../pages/SOUPackage/SOUPackageMealPlan/SOUPackageMealPlanInsert";
import SOUPackageMealPlanUpdate from "../../pages/SOUPackage/SOUPackageMealPlan/SOUPackageMealPlanUpdate";
import SOUPackageMealPlanTrace from "../../pages/SOUPackage/SOUPackageMealPlan/SOUPackageMealPlanTrace";
import SOUPackageLakeView from "../../pages/SOUPackage/SOUPackageLakeView/SOUPackageLakeView";
import SOUPackageLakeViewInsert from "../../pages/SOUPackage/SOUPackageLakeView/SOUPackageLakeViewInsert";
import SOUPackageLakeViewUpdate from "../../pages/SOUPackage/SOUPackageLakeView/SOUPackageLakeViewUpdate";
import SOUPackageLakeViewTrace from "../../pages/SOUPackage/SOUPackageLakeView/SOUPackageLakeViewTrace";
import SOUPackageResort from "../../pages/SOUPackage/SOUPackageResort/SOUPackageResort";
import SOUPackageResortInsert from "../../pages/SOUPackage/SOUPackageResort/SOUPackageResortInsert";
import SOUPackageResortUpdate from "../../pages/SOUPackage/SOUPackageResort/SOUPackageResortUpdate";
import SOUPackageResortTrace from "../../pages/SOUPackage/SOUPackageResort/SOUPackageResortTrace";
import BlogCategoryName from './../../pages/BlogSection/BlogCategoryName/BlogCategoryName';
import BlogCategoryNameInsert from './../../pages/BlogSection/BlogCategoryName/BlogCategoryNameInsert';
import BlogCategoryNameUpdate from './../../pages/BlogSection/BlogCategoryName/BlogCategoryNameUpdate';
import BlogCategoryNameTrace from './../../pages/BlogSection/BlogCategoryName/BlogCategoryNameTrace';
import BlogDataDetails from './../../pages/BlogSection/BlogDataDetails/BlogDataDetails';
import BlogDataDetailsInsert from './../../pages/BlogSection/BlogDataDetails/BlogDataDetailsInsert';
import BlogDataDetailsUpdate from './../../pages/BlogSection/BlogDataDetails/BlogDataDetailsUpdate';
import BlogDataDetailsTrace from './../../pages/BlogSection/BlogDataDetails/BlogDataDetailsTrace';
import SOUPackageBookLayer from "../../pages/SOUPackage/SOUPackageBookLayer/SOUPackageBookLayer";
import SOUPackageBookLayerInsert from "../../pages/SOUPackage/SOUPackageBookLayer/SOUPackageBookLayerInsert";
import SOUPackageBookLayerUpdate from "../../pages/SOUPackage/SOUPackageBookLayer/SOUPackageBookLayerUpdate";
import SOUPackageBookLayerTrace from "../../pages/SOUPackage/SOUPackageBookLayer/SOUPackageBookLayerTrace";
import SOUPackageBGImage from "../../pages/SOUPackage/SOUPackageBGImage/SOUPackageBGImage";
import SOUPackageBGImageInsert from './../../pages/SOUPackage/SOUPackageBGImage/SOUPackageBGImageInsert';
import SOUPackageBGImageUpdate from './../../pages/SOUPackage/SOUPackageBGImage/SOUPackageBGImageUpdate';
import SOUPackageBGImageTrace from './../../pages/SOUPackage/SOUPackageBGImage/SOUPackageBGImageTrace';
import SOUPackageItineraryPackagePrice from './../../pages/SOUPackage/SOUPackageItineraryPackagePrice/SOUPackageItineraryPackagePrice';
import SOUPackageItineraryPackagePriceInsert from './../../pages/SOUPackage/SOUPackageItineraryPackagePrice/SOUPackageItineraryPackagePriceInsert';
import SOUPackageItineraryPackagePriceUpdate from './../../pages/SOUPackage/SOUPackageItineraryPackagePrice/SOUPackageItineraryPackagePriceUpdate';
import SOUPackageItineraryPackagePriceTrace from './../../pages/SOUPackage/SOUPackageItineraryPackagePrice/SOUPackageItineraryPackagePriceTrace';
import SOUTicketInsideEventPrice from './../../pages/SOUTicket/SOUTicketInsideEventPrice/SOUTicketInsideEventPrice';
import SOUTicketInsideEventPriceInsert from './../../pages/SOUTicket/SOUTicketInsideEventPrice/SOUTicketInsideEventPriceInsert';
import SOUTicketInsideEventPriceUpdate from './../../pages/SOUTicket/SOUTicketInsideEventPrice/SOUTicketInsideEventPriceUpdate';
import SOUTicketInsideEventPriceTrace from './../../pages/SOUTicket/SOUTicketInsideEventPrice/SOUTicketInsideEventPriceTrace';
import SOUTicketTourPackage from './../../pages/SOUTicket/SOUTicketTourPackage/SOUTicketTourPackage';
import SOUTicketTourPackageInsert from './../../pages/SOUTicket/SOUTicketTourPackage/SOUTicketTourPackageInsert';
import SOUTicketTourPackageUpdate from './../../pages/SOUTicket/SOUTicketTourPackage/SOUTicketTourPackageUpdate';
import SOUTicketTourPackageTrace from './../../pages/SOUTicket/SOUTicketTourPackage/SOUTicketTourPackageTrace';



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



          <Route path="/home-sou-package" element={<HomeSouPackage/>} />
          <Route path="/home-sou-package/insert" element={<HomeSouPackageInsert/>} />
          <Route path="/home-sou-package/update" element={<HomeSouPackageUpdate/>} />
          <Route path="/home-sou-package/trace" element={<HomeSouPackageTrace/>} />

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


          {/*------------------------------------------------- SOU Package------------------------------------------- */}



          <Route path="/sou-package-name" element={<SOUPackageName/>} />
          <Route path="/sou-package-name/insert" element={<SOUPackageNameInsert/>} />
          <Route path="/sou-package-name/update" element={<SOUPackageNameUpdate/>} />
          <Route path="/sou-package-name/trace" element={<SOUPackageNameTrace/>} />

          

          <Route path="/sou-package-gallery" element={<SOUPackageGallery/>} />
          <Route path="/sou-package-gallery/insert" element={<SOUPackageGalleryInsert/>} />
          <Route path="/sou-package-gallery/update" element={<SOUPackageGalleryUpdate/>} />
          <Route path="/sou-package-gallery/trace" element={<SOUPackageGalleryTrace/>} />


          <Route path="/sou-package-hero-section" element={<SOUPackageHeroSection/>} />
          <Route path="/sou-package-hero-section/insert" element={<SOUPackageHeroSectionInsert/>} />
          <Route path="/sou-package-hero-section/update" element={<SOUPackageHeroSectionUpdate/>} />
          <Route path="/sou-package-hero-section/trace" element={<SOUPackageHeroSectionTrace/>} />


          <Route path="/sou-package-amenities" element={<SOUPackageAmenities/>} />
          <Route path="/sou-package-amenities/insert" element={<SOUPackageAmenitiesInsert/>} />
          <Route path="/sou-package-amenities/update" element={<SOUPackageAmenitiesUpdate/>} />
          <Route path="/sou-package-amenities/trace" element={<SOUPackageAmenitiesTrace/>} />


          <Route path="/sou-package-itinerary-name" element={<SOUPackageItineraryName/>} />
          <Route path="/sou-package-itinerary-name/insert" element={<SOUPackageItineraryNameInsert/>} />
          <Route path="/sou-package-itinerary-name/update" element={<SOUPackageItineraryNameUpdate/>} />
          <Route path="/sou-package-itinerary-name/trace" element={<SOUPackageItineraryNameTrace/>} />


          <Route path="/sou-package-itinerary-section" element={<SOUPackageItinerarySection/>} />
          <Route path="/sou-package-itinerary-section/insert" element={<SOUPackageItinerarySectionInsert/>} />
          <Route path="/sou-package-itinerary-section/update" element={<SOUPackageItinerarySectionUpdate/>} />
          <Route path="/sou-package-itinerary-section/trace" element={<SOUPackageItinerarySectionTrace/>} />


          <Route path="/sou-package-notes-policy" element={<SOUPackageNotesPolicy/>} />
          <Route path="/sou-package-notes-policy/insert" element={<SOUPackageNotesPolicyInsert/>} />
          <Route path="/sou-package-notes-policy/update" element={<SOUPackageNotesPolicyUpdate/>} />
          <Route path="/sou-package-notes-policy/trace" element={<SOUPackageNotesPolicyTrace/>} />


          <Route path="/sou-package-faqs" element={<SOUPackageFAQS/>} />
          <Route path="/sou-package-faqs/insert" element={<SOUPackageFAQSInsert/>} />
          <Route path="/sou-package-faqs/update" element={<SOUPackageFAQSUpdate/>} />
          <Route path="/sou-package-faqs/trace" element={<SOUPackageFAQSTrace/>} />


          <Route path="/sou-package-paragrpah" element={<SOUPackageParagrpah/>} />
          <Route path="/sou-package-paragrpah/insert" element={<SOUPackageParagrpahInsert/>} />
          <Route path="/sou-package-paragrpah/update" element={<SOUPackageParagrpahUpdate/>} />
          <Route path="/sou-package-paragrpah/trace" element={<SOUPackageParagrpahTrace/>} />


          <Route path="/sou-package-meal-plan" element={<SOUPackageMealPlan/>} />
          <Route path="/sou-package-meal-plan/insert" element={<SOUPackageMealPlanInsert/>} />
          <Route path="/sou-package-meal-plan/update" element={<SOUPackageMealPlanUpdate/>} />
          <Route path="/sou-package-meal-plan/trace" element={<SOUPackageMealPlanTrace/>} />



          <Route path="/sou-package-lake-view" element={<SOUPackageLakeView/>} />
          <Route path="/sou-package-lake-view/insert" element={<SOUPackageLakeViewInsert/>} />
          <Route path="/sou-package-lake-view/update" element={<SOUPackageLakeViewUpdate/>} />
          <Route path="/sou-package-lake-view/trace" element={<SOUPackageLakeViewTrace/>} />


          <Route path="/sou-package-resort" element={<SOUPackageResort/>} />
          <Route path="/sou-package-resort/insert" element={<SOUPackageResortInsert/>} />
          <Route path="/sou-package-resort/update" element={<SOUPackageResortUpdate/>} />
          <Route path="/sou-package-resort/trace" element={<SOUPackageResortTrace/>} />


          <Route path="/sou-package-book-layer" element={<SOUPackageBookLayer/>} />
          <Route path="/sou-package-book-layer/insert" element={<SOUPackageBookLayerInsert/>} />
          <Route path="/sou-package-book-layer/update" element={<SOUPackageBookLayerUpdate/>} />
          <Route path="/sou-package-book-layer/trace" element={<SOUPackageBookLayerTrace/>} />


          <Route path="/sou-package-bg-image" element={<SOUPackageBGImage/>} />
          <Route path="/sou-package-bg-image/insert" element={<SOUPackageBGImageInsert/>} />
          <Route path="/sou-package-bg-image/update" element={<SOUPackageBGImageUpdate/>} />
          <Route path="/sou-package-bg-image/trace" element={<SOUPackageBGImageTrace/>} />



          <Route path="/sou-package-itinerary-price" element={<SOUPackageItineraryPackagePrice/>} />
          <Route path="/sou-package-itinerary-price/insert" element={<SOUPackageItineraryPackagePriceInsert/>} />
          <Route path="/sou-package-itinerary-price/update" element={<SOUPackageItineraryPackagePriceUpdate/>} />
          <Route path="/sou-package-itinerary-price/trace" element={<SOUPackageItineraryPackagePriceTrace/>} />




          {/*-------------------------------------------------Sou Ticket---------------------------------------------- */}




          <Route path="/sou-ticket-inside-event-price" element={<SOUTicketInsideEventPrice/>} />
          <Route path="/sou-ticket-inside-event-price/insert" element={<SOUTicketInsideEventPriceInsert/>} />
          <Route path="/sou-ticket-inside-event-price/update" element={<SOUTicketInsideEventPriceUpdate/>} />
          <Route path="/sou-ticket-inside-event-price/trace" element={<SOUTicketInsideEventPriceTrace/>} />



          <Route path="/sou-ticket-tour-Package" element={<SOUTicketTourPackage/>} />
          <Route path="/sou-ticket-tour-Package/insert" element={<SOUTicketTourPackageInsert/>} />
          <Route path="/sou-ticket-tour-Package/update" element={<SOUTicketTourPackageUpdate/>} />
          <Route path="/sou-ticket-tour-Package/trace" element={<SOUTicketTourPackageTrace/>} />






          {/*-------------------------------------------------Blog---------------------------------------------- */}


          <Route path="/blog-category-name" element={<BlogCategoryName/>} />
          <Route path="/blog-category-name/insert" element={<BlogCategoryNameInsert/>} />
          <Route path="/blog-category-name/update" element={<BlogCategoryNameUpdate/>} />
          <Route path="/blog-category-name/trace" element={<BlogCategoryNameTrace/>} />



          <Route path="/blog-data-details" element={<BlogDataDetails/>} />
          <Route path="/blog-data-details/insert" element={<BlogDataDetailsInsert/>} />
          <Route path="/blog-data-details/update" element={<BlogDataDetailsUpdate/>} />
          <Route path="/blog-data-details/trace" element={<BlogDataDetailsTrace/>} />




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
