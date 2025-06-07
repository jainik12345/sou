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
// import { SouEcoCamp } from "../../pages/StayInTentPage/SouEcoCamp/SouEcoCamp.jsx";
// import { NiravanaResortRest } from "../../pages/StayInTentPage/NiravanaResortRest/NiravanaResortRest.jsx";
// import { SoilToSoulResort } from "../../pages/StayInTentPage/SoilToSoulResort/SoilToSoulResort.jsx";
// import { SouTentCity1 } from "../../pages/StayInTentPage/SouTentCity-1/SouTentCity1.jsx";
// import { TentCityNarmada2 } from "../../pages/StayInTentPage/TentCityNarmada2/TentCityNarmada2.jsx";
// import { VillaEuphoriaResort } from "../../pages/StayInTentPage/VillaEuphoriaResort/VillaEuphoriaResort.jsx";
// import { NiravanaResortRestGallery } from "../../pages/GalleryPage/NirvanaResort&RestaurantGallery/NirvanaResort&RestaurantGallery.jsx";
// import { SoilToSoulResortGallery } from "../../pages/GalleryPage/SoilToSoulResortGallery/SoilToSoulResortGallery.jsx";
// import { SouEcoCampGallery } from "../../pages/GalleryPage/SouEcoCampGallery/SouEcoCampGallery.jsx";
// import { TentCity1Gallery } from "../../pages/GalleryPage/TentCity1Gallery/TentCity1Gallery.jsx";
// import { TentCityNarmadaGallery } from "../../pages/GalleryPage/TentCityNarmadaGallery/TentCityNarmadaGallery.jsx";
// import { UnityVillageResortGallery } from "../../pages/GalleryPage/UnityVillageResortGallery/UnityVillageResortGallery.jsx";
// import { VillaEuphoriaResortGallery } from "../../pages/GalleryPage/VillaEuphoriaResortGallery/VillaEuphoriaResortGallery.jsx";
// import { RiverViewTentResort } from "../../pages/StayInTentPage/RiverViewTentResort/RiverViewTentResort.jsx";
// import { RiverViewTentResortGallery } from "../../pages/GalleryPage/RiverViewTentResortGallery/RiverViewTentResortGallery.jsx";
// import { ScrollToTopBtn } from "../../components/ScrollToTopBtn/ScrollToTopBtn.jsx";
// // import { GujaratTour4N5D } from "../../pages/GujaratPackagesPage/GujaratTour4N5D/GujaratTour4N5D.jsx";
// // import { GujaratTour5N6D } from "../../pages/GujaratPackagesPage/GujaratTour5N6D/GujaratTour5N6D.jsx";
// // import { GujaratTour3N4D } from "../../pages/GujaratPackagesPage/GujaratTour3N4D/GujaratTour3N4D.jsx";
// // import { GujaratTour6N7D } from "../../pages/GujaratPackagesPage/GujaratTour6N7D/GujaratTour6N7D.jsx";
// // import { GujaratTour7N8D } from "../../pages/GujaratPackagesPage/GujaratTour7N8D/GujaratTour7N8D.jsx";
// // import { GujaratTour11N12D } from "../../pages/GujaratPackagesPage/GujaratTour11N12D/GujaratTour11N12D.jsx";

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
//           path: "",
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
//           path: "/sou-tickets",
//           element: <SouTickets />,
//         },
//         {
//           path: "/gujarat-packages",
//           element: <GujaratPackages />,
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

//         {
//           path: "/stay-in-tent/sou-tent-city-1",
//           element: <SouTentCity1 />,
//         },
//         {
//           path: "/stay-in-tent/soil-to-soul-resort",
//           element: <SoilToSoulResort />,
//         },
//         {
//           path: "/stay-in-tent/river-riew-rent-resort",
//           element: <RiverViewTentResort />,
//         },

//         {
//           path: "/stay-in-tent/nirvana-resort&restaurant",
//           element: <NiravanaResortRest />,
//         },
//         {
//           path: "/stay-in-tent/sou-eco-camp",
//           element: <SouEcoCamp />,
//         },
//         {
//           path: "/stay-in-tent/tent-city-narmada-2",
//           element: <TentCityNarmada2 />,
//         },
//         {
//           path: "/stay-in-tent/unity-village-resort",
//           element: <AboutActivities />,
//         },
//         {
//           path: "/stay-in-tent/villa-euphoria-resort",
//           element: <VillaEuphoriaResort />,
//         },

//         {
//           path: "/gallery/Nirvana-Resort&Restaurant-Gallery",
//           element: <NiravanaResortRestGallery />,
//         },
//         {
//           path: "/gallery/River-View-Tent-Resort-Gallery",
//           element: <RiverViewTentResortGallery />,
//         },
//         {
//           path: "/gallery/soil-to-soul",
//           element: <SoilToSoulResortGallery />,
//         },
//         {
//           path: "/gallery/Sou-Eco-Camp-Gallery",
//           element: <SouEcoCampGallery />,
//         },
//         {
//           path: "/gallery/tent-city-1",
//           element: <TentCity1Gallery />,
//         },
//         {
//           path: "/gallery/Tent-City-Narmada-Gallery",
//           element: <TentCityNarmadaGallery />,
//         },
//         {
//           path: "/gallery/unity-village",
//           element: <UnityVillageResortGallery />,
//         },
//         {
//           path: "/gallery/Villa-Euphoria-Resort-Gallery",
//           element: <VillaEuphoriaResortGallery />,
//         },

//         // {
//         //   path: "/gujarat-packages/3n4d",
//         //   element: <GujaratTour3N4D />,
//         // },
//         // {
//         //   path: "/gujarat-packages/4n5d",
//         //   element: <GujaratTour4N5D />,
//         // },
//         // {
//         //   path: "/gujarat-packages/5n6d",
//         //   element: <GujaratTour5N6D />,
//         // },
//         // {
//         //   path: "/gujarat-packages/6n7d",
//         //   element: <GujaratTour6N7D />,
//         // },
//         // {
//         //   path: "/gujarat-packages/7n8d",
//         //   element: <GujaratTour7N8D />,
//         // },
//         // {
//         //   path: "/gujarat-packages/11n12d",
//         //   element: <GujaratTour11N12D />,
//         // },
//       ],
//     },
//   ]);

//   return <RouterProvider router={Router} />;
// };





// =====================================================jainik's code 


import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../../pages/HomePage/Home.jsx";
import { AboutUs } from "../../pages/AboutPage/About.jsx";
import { StayInTent } from "../../pages/StayInTentPage/StayInTent.jsx";
import { Gallery } from "../../pages/GalleryPage/Gallery.jsx";
import { SouTickets } from "../../pages/SouTicketsPage/SouTickets.jsx";
import { GujaratPackages } from "../../pages/GujaratPackagesPage/GujaratPackages.jsx";
import { Contact } from "../../pages/ContactPage/Contact.jsx";
import { Header } from "../../components/Header/Header.jsx";
import { Blog } from "../../pages/BlogPages/Blog.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { WaytoConatct } from "../../components/WayToContact/WayToContact.jsx";
import { AboutActivities } from "../../pages/AboutPage/AboutDropDown/AboutActivities/AboutActivities.jsx";
import { AboutAttraction } from "../../pages/AboutPage/AboutDropDown/AboutAttraction/AboutAttraction.jsx";
import { AboutWeddings } from "../../pages/AboutPage/AboutDropDown/AboutWeddings/AboutWeddings.jsx";
import { ScrollToTopBtn } from "../../components/ScrollToTopBtn/ScrollToTopBtn.jsx";
import { GujaratPackagesDropDown } from "../../pages/GujaratPackagesPage/GujaratPackagesDropDown/GujaratPackagesDropDown.jsx";
import { GalleryDropDown } from "../../pages/GalleryPage/GalleryDropDown/GalleryDropDown.jsx";
import { StayInTentDropDown } from "../../pages/StayInTentPage/StayInTentDropDown/StayInTentDropDown.jsx";

const AppLayOut = () => {
  return (
    <>
      <ScrollToTopBtn />
      <Header />
      <Outlet />
      <WaytoConatct />
      {/* <Footer />  */}
    </>
  );
};


export const RouteComponents = () => {
  const Router = createBrowserRouter([
    {
      path: "",
      element: <AppLayOut />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/stay-in-tent",
          element: <StayInTent />,
        },
        {
          path: "/gallery",
          element: <Gallery />,
        },

        {
          path: "/gallery/:GalleryPath",
          element: <GalleryDropDown />

        },

        {
          path: "/sou-tickets",
          element: <SouTickets />,
        },

        {

          path: "/stay-in-tent/:StayInTentPath",
          element: <StayInTentDropDown />

        },

        {
          path: "gujarat-packages",
          element: <GujaratPackages />
        },

        {
          path: "/gujarat-packages/:GujaratPath",
          element: <GujaratPackagesDropDown />,
        },

        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },

        {
          path: "/about-us/Activities",
          element: <AboutActivities />,
        },
        {
          path: "/about-us/Attraction",
          element: <AboutAttraction />,
        },
        {
          path: "/about-us/Wedding",
          element: <AboutWeddings />,
        },

      ],
    },
  ]);

  return <RouterProvider router={Router} />;
};



