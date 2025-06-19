// import { Outlet } from "react-router-dom";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Home } from "../../pages/HomePage/Home.jsx";
// import { AboutUs } from "../../pages/AboutPage/About.jsx";
// import { StayInTent } from "../../pages/StayInTentPage/StayInTent.jsx";
// import { Gallery } from "../../pages/GalleryPage/Gallery.jsx";
// import { SouTickets } from "../../pages/SouTicketsPage/SouTickets.jsx";
// import { GujaratPackages } from "../../pages/GujaratPackagesPage/GujaratPackages.jsx";
// import { Contact } from "../../pages/ContactPage/Contact.jsx";
// import { Header } from "../../components/Header/Header.jsx";
// import { Blog } from "../../pages/BlogPages/Blog.jsx";
// import { Footer } from "../../components/Footer/Footer.jsx";
// import { WaytoConatct } from "../../components/WayToContact/WayToContact.jsx";
// import { AboutActivities } from "../../pages/AboutPage/AboutDropDown/AboutActivities/AboutActivities.jsx";
// import { AboutAttraction } from "../../pages/AboutPage/AboutDropDown/AboutAttraction/AboutAttraction.jsx";
// import { AboutWeddings } from "../../pages/AboutPage/AboutDropDown/AboutWeddings/AboutWeddings.jsx";
// import { ScrollToTopBtn } from "../../components/ScrollToTopBtn/ScrollToTopBtn.jsx";
// import { GujaratPackagesDropDown } from "../../pages/GujaratPackagesPage/GujaratPackagesDropDown/GujaratPackagesDropDown.jsx";
// import { GalleryDropDown } from "../../pages/GalleryPage/GalleryDropDown/GalleryDropDown.jsx";
// import { StayInTentDropDown } from "../../pages/StayInTentPage/StayInTentDropDown/StayInTentDropDown.jsx";

// const AppLayOut = () => {
//   return (
//     <>
//       <ScrollToTopBtn />
//       <Header />
//       <Outlet />
//       <WaytoConatct />
//       <Footer />
//     </>
//   );
// };

// export const RouteComponents = () => {
//   const Router = createBrowserRouter([
//     {
//       path: "",
//       element: <AppLayOut />,
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/about-us",
//           element: <AboutUs />,
//         },
//         {
//           path: "/stay-in-tent",
//           element: <StayInTent />,
//         },
//         {
//           path: "/gallery",
//           element: <Gallery />,
//         },

//         {
//           path: "/gallery/:GalleryPath",
//           element: <GalleryDropDown />

//         },

//         {
//           path: "/sou-tickets",
//           element: <SouTickets />,
//         },

//         {

//           path: "/stay-in-tent/:StayInTentPath",
//           element: <StayInTentDropDown />

//         },

//         {
//           path: "gujarat-packages",
//           element: <GujaratPackages />
//         },

//         {
//           path: "/gujarat-packages/:GujaratPath",
//           element: <GujaratPackagesDropDown />,
//         },

//         {
//           path: "/contact",
//           element: <Contact />,
//         },
//         {
//           path: "/blog",
//           element: <Blog />,
//         },

//         {
//           path: "/about-us/Activities",
//           element: <AboutActivities />,
//         },
//         {
//           path: "/about-us/Attraction",
//           element: <AboutAttraction />,
//         },
//         {
//           path: "/about-us/Wedding",
//           element: <AboutWeddings />,
//         },

//       ],
//     },
//   ]);

//   return <RouterProvider router={Router} />;
// };

import { Routes, Route } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { Home } from "../../pages/HomePage/Home.jsx";
import { AboutUs } from "../../pages/AboutPage/About.jsx";
import { StayInTent } from "../../pages/StayInTentPage/StayInTent.jsx";
import { Gallery } from "../../pages/GalleryPage/Gallery.jsx";
import { SouTickets } from "../../pages/SouTicketsPage/SouTickets.jsx";
import { GujaratPackages } from "../../pages/GujaratPackagesPage/GujaratPackages.jsx";
import { Contact } from "../../pages/ContactPage/Contact.jsx";
import { Blog } from "../../pages/BlogPages/Blog.jsx";
import { WaytoConatct } from "../../components/WayToContact/WayToContact.jsx";
import { AboutActivities } from "../../pages/AboutPage/AboutDropDown/AboutActivities/AboutActivities.jsx";
import { AboutAttraction } from "../../pages/AboutPage/AboutDropDown/AboutAttraction/AboutAttraction.jsx";
import { AboutWeddings } from "../../pages/AboutPage/AboutDropDown/AboutWeddings/AboutWeddings.jsx";
import { ScrollToTopBtn } from "../../components/ScrollToTopBtn/ScrollToTopBtn.jsx";
import { ScrollPageToTop } from "../../components/ScrollPageToTop/ScrollPageToTop.jsx";
import { GujaratPackagesDropDown } from "../../pages/GujaratPackagesPage/GujaratPackagesDropDown/GujaratPackagesDropDown.jsx";
import { GalleryDropDown } from "../../pages/GalleryPage/GalleryDropDown/GalleryDropDown.jsx";
import { StayInTentDropDown } from "../../pages/StayInTentPage/StayInTentDropDown/StayInTentDropDown.jsx";
import { ListYourPropertyPage } from "../../pages/ListYourPropertyPage/ListYourPropertyPage.jsx";
import { PrivacyPolicy } from "../../pages/PrivacyPolicyPage/PrivacyPolicy.jsx";
import TermsConditions from "../../pages/TermsConditionsPages/TermsConditions.jsx";
import BlogInnerPage from "../../pages/BlogPages/BlogInnerPage/BlogInnerPage.jsx";
import BlogCategoryArchiveList from "../../pages/BlogPages/BlogInnerPage/BlogCategoryArchiveList.jsx";
import PageNotFound from "../../pages/PageNotFound/PageNotFound.jsx";

const WebsitePage = ({ children }) => {
  return (
    <>
      {/* <ScrollToTopBtn /> */}
      <Header />
      {children}
      <WaytoConatct />
      <Footer />
    </>
  );
};

const RouteComponents = () => {
  return (
    <>
      <ScrollPageToTop />
      <Routes>
        <Route
          path="/"
          element={
            <WebsitePage>
              <Home />
            </WebsitePage>
          }
        />
        <Route
          path="/about-us"
          element={
            <WebsitePage>
              <AboutUs />
            </WebsitePage>
          }
        />
        <Route
          path="/stay-in-tent"
          element={
            <WebsitePage>
              <StayInTent />
            </WebsitePage>
          }
        />
        {/* <Route
          path="/gallery"
          element={
            <WebsitePage>
              <Gallery />
            </WebsitePage>
          }
        /> */}
        <Route
          path="/gallery/:GalleryPath"
          element={
            <WebsitePage>
              <GalleryDropDown />
            </WebsitePage>
          }
        />
        <Route
          path="/sou-tickets"
          element={
            <WebsitePage>
              <SouTickets />
            </WebsitePage>
          }
        />
        <Route
          path="/stay-in-tent/:StayInTentPath"
          element={
            <WebsitePage>
              <StayInTentDropDown />
            </WebsitePage>
          }
        />
        <Route
          path="/gujarat-packages"
          element={
            <WebsitePage>
              <GujaratPackages />
            </WebsitePage>
          }
        />
        <Route
          path="/gujarat-packages/:GujaratPath"
          element={
            <WebsitePage>
              <GujaratPackagesDropDown />
            </WebsitePage>
          }
        />
        <Route
          path="/contact"
          element={
            <WebsitePage>
              <Contact />
            </WebsitePage>
          }
        />
        <Route
          path="/blogs"
          element={
            <WebsitePage>
              <Blog />
            </WebsitePage>
          }
        />
        <Route
          path="/blogs/:BlogSlug"
          element={
            <WebsitePage>
              <BlogInnerPage />
            </WebsitePage>
          }
        />
        <Route
          path="/blogs/category/:categoryId"
          element={
            <WebsitePage>
              <BlogCategoryArchiveList />
            </WebsitePage>
          }
        />

        <Route
          path="/blogs/archive/:archiveMonth"
          element={
            <WebsitePage>
              <BlogCategoryArchiveList />
            </WebsitePage>
          }
        />

        <Route
          path="/about-us/Activities"
          element={
            <WebsitePage>
              <AboutActivities />
            </WebsitePage>
          }
        />
        <Route
          path="/about-us/Attraction"
          element={
            <WebsitePage>
              <AboutAttraction />
            </WebsitePage>
          }
        />
        <Route
          path="/about-us/Wedding"
          element={
            <WebsitePage>
              <AboutWeddings />
            </WebsitePage>
          }
        />
        <Route
          path="/list-your-property"
          element={
            <WebsitePage>
              <ListYourPropertyPage />
            </WebsitePage>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <WebsitePage>
              <PrivacyPolicy />
            </WebsitePage>
          }
        />

        <Route
          path="/terms-conditions"
          element={
            <WebsitePage>
              <TermsConditions />
            </WebsitePage>
          }
        />

        {/* 404 Page Not Found Route */}
        <Route
          path="*"
          element={
            <WebsitePage>
              <PageNotFound />
            </WebsitePage>
          }
        />
      </Routes>
    </>
  );
};

export default RouteComponents;
