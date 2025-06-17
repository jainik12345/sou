const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");

const path = require("path");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// MiddleWare
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Create Database Connection  */
const db = require("./config/db");
/**Make Database Connection Avaiable in globally */
global.db = db;
/** */

// Simple Route to Check Server
app.get("/", (req, res) => {
  res.send("Hello unity... 🚀🚀🚀🚀🚀");
});

/**Call Routes.. */

const admin = require("./routes/admin");
const privatePolicy = require("./routes/privatePolicy");
const termsConditions = require("./routes/termsConditions");
/**--------------------------------------------------Home-------------------------------------------------- */

const homeTestimonial = require("./routes/home/homeTestimonial");
const homeCertificate = require("./routes/home/homeCertificate");
const homeImageSlider = require("./routes/home/homeImageSlider");
const homeNearAttractions = require("./routes/home/homeNearAttractions");
const homeOnlineBookingContent = require("./routes/home/homeOnlineBookingContent");
const homeSouPackage = require("./routes/home/homeSouPackage");

/**--------------------------------------------------About-------------------------------------------------- */

const aboutHeroSection = require("./routes/about/aboutHeroSection");
const aboutIntrestingFaqs = require("./routes/about/aboutIntrestingFaqs");
const aboutWhyChooseSection = require("./routes/about/aboutWhyChooseSection");
const aboutAttractionsSection = require("./routes/about/aboutAttractionsSection");
const aboutActivitiesSection = require("./routes/about/aboutActivitiesSection");

/**--------------------------------------------------Contact-------------------------------------------------- */

const contactForm = require("./routes/contact/contactForm");
const contactPage = require("./routes/contact/contactPage");

/**------------------------------------------Gujarat Package-------------------------------------------------- */

const gujaratPackage = require("./routes/gujaratPackage/gujaratPackage");
const gujaratPackageData = require("./routes/gujaratPackage/gujaratPackageData");

/**------------------------------------------Sou Package-------------------------------------------------- */

const souPackageName = require("./routes/souPackage/souPackageName");
const souPackageGallery = require("./routes/souPackage/souPackageGallery");
const souPackageHeroSection = require("./routes/souPackage/souPackageHeroSection");
const souPackageAmenities = require("./routes/souPackage/souPackageAmenities");
const souPackageItineraryName = require("./routes/souPackage/souPackageItineraryName");
const souPackageItinerarySection = require("./routes/souPackage/souPackageItinerarySection");
const souPackageNotesPolicy = require("./routes/souPackage/souPackageNotesPolicy");
const souPackageFaqs = require("./routes/souPackage/souPackageFaqs");
const souPackageParagraph = require("./routes/souPackage/souPackageParagraph");
const souPackageMealPlan = require("./routes/souPackage/souPackageMealPlan");
const souPackageLakeView = require("./routes/souPackage/souPackageLakeView");
const souPackageResort = require("./routes/souPackage/souPackageResort");
const souPackageBookLayer = require("./routes/souPackage/souPackageBookLayer");
const souPackageBgImage = require("./routes/souPackage/souPackageBgImage");
const souPackageItineraryPackagePrice = require("./routes/souPackage/souPackageItineraryPackagePrice");

/**------------------------------------------Blogs-------------------------------------------------- */

const blogcategoryName = require("./routes/blog/blogCategoryName");
const blogDataDetails = require("./routes/blog/blogDataDetails");

/**------------------------------------------Sou Ticket-------------------------------------------------- */

const souTicketInsideEventPrice = require("./routes/souTicket/souTicketInsideEventPrice");
const souTicketTourPackage = require("./routes/souTicket/souTicketTourPackage");
const souTicketOnlineBooking = require("./routes/souTicket/souTicketOnlineBooking");

app.use("/admin", admin);
app.use("/privatePolicy", privatePolicy);
app.use("/termsConditions", termsConditions);
/**--------------------------------------------------Home-------------------------------------------------- */

app.use("/homeTestimonial", homeTestimonial);
app.use("/homeCertificate", homeCertificate);
app.use("/homeImageSlider", homeImageSlider);
app.use("/homeNearAttractions", homeNearAttractions);
app.use("/homeOnlineBookingContent", homeOnlineBookingContent);
app.use("/homeSouPackage", homeSouPackage);

/**--------------------------------------------------About-------------------------------------------------- */

app.use("/aboutHeroSection", aboutHeroSection);
app.use("/aboutIntrestingFaqs", aboutIntrestingFaqs);
app.use("/aboutWhyChooseSection", aboutWhyChooseSection);
app.use("/aboutAttractionsSection", aboutAttractionsSection);
app.use("/aboutActivitiesSection", aboutActivitiesSection);

/**--------------------------------------------------Contact-------------------------------------------------- */

app.use("/contactForm", contactForm);
app.use("/contactPage", contactPage);

/**------------------------------------------Gujarat Package-------------------------------------------------- */

app.use("/gujaratPackage", gujaratPackage);
app.use("/gujaratPackageData", gujaratPackageData);

/**------------------------------------------Sou Package-------------------------------------------------- */

app.use("/souPackageName", souPackageName);
app.use("/souPackageGallery", souPackageGallery);
app.use("/souPackageHeroSection", souPackageHeroSection);
app.use("/souPackageAmenities", souPackageAmenities);
app.use("/souPackageItineraryName", souPackageItineraryName);
app.use("/souPackageItinerarySection", souPackageItinerarySection);
app.use("/souPackageNotesPolicy", souPackageNotesPolicy);
app.use("/souPackageFaqs", souPackageFaqs);
app.use("/souPackageParagraph", souPackageParagraph);
app.use("/souPackageMealPlan", souPackageMealPlan);
app.use("/souPackageLakeView", souPackageLakeView);
app.use("/souPackageResort", souPackageResort);
app.use("/souPackageBookLayer", souPackageBookLayer);
app.use("/souPackageBgImage", souPackageBgImage);
app.use("/souPackageItineraryPackagePrice", souPackageItineraryPackagePrice);

/**------------------------------------------Blogs-------------------------------------------------- */

app.use("/blogcategoryName", blogcategoryName);
app.use("/blogDataDetails", blogDataDetails);

/**------------------------------------------Sou Ticket-------------------------------------------------- */

app.use("/souTicketInsideEventPrice", souTicketInsideEventPrice);
app.use("/souTicketTourPackage", souTicketTourPackage);
app.use("/souTicketOnlineBooking", souTicketOnlineBooking);

// Static Images
/**--------------------------------------------------Home-------------------------------------------------- */
app.use(
  "/Images/HomeImages/HomeTestimonial",
  express.static(path.join(__dirname, "Images/HomeImages/HomeTestimonial"))
);

app.use(
  "/Images/HomeImages/HomeCertificate",
  express.static(path.join(__dirname, "Images/HomeImages/HomeCertificate"))
);

app.use(
  "/Images/HomeImages/HomeImageSlider",
  express.static(path.join(__dirname, "Images/HomeImages/HomeImageSlider"))
);

app.use(
  "/Images/HomeImages/HomeNearAttractions",
  express.static(path.join(__dirname, "Images/HomeImages/HomeNearAttractions"))
);

app.use(
  "/Images/HomeImages/HomeSouPackage",
  express.static(path.join(__dirname, "Images/HomeImages/HomeSouPackage"))
);

/**--------------------------------------------------About-------------------------------------------------- */

app.use(
  "/Images/AboutImages/Activities",
  express.static(path.join(__dirname, "Images/AboutImages/Activities"))
);

app.use(
  "/Images/AboutImages/Attractions",
  express.static(path.join(__dirname, "Images/AboutImages/Attractions"))
);

app.use(
  "/Images/AboutImages/Hero",
  express.static(path.join(__dirname, "Images/AboutImages/Hero"))
);

/**--------------------------------------------------GujaratPackage-------------------------------------------------- */

app.use(
  "/Images/GujaratPackage/GujaratPackageImage",
  express.static(
    path.join(__dirname, "Images/GujaratPackage/GujaratPackageImage")
  )
);

app.use(
  "/Images/GujaratPackage/GujaratPackageDataImage",
  express.static(
    path.join(__dirname, "Images/GujaratPackage/GujaratPackageDataImage")
  )
);

/**------------------------------------------Sou Package-------------------------------------------------- */

app.use(
  "/Images/SouPackage/SouPackageGalleryImages",
  express.static(
    path.join(__dirname, "Images/SouPackage/SouPackageGalleryImages")
  )
);

app.use(
  "/Images/SouPackage/SouPackageHeroSection",
  express.static(
    path.join(__dirname, "Images/SouPackage/SouPackageHeroSection")
  )
);

app.use(
  "/Images/SouPackage/SouPackageAmenities",
  express.static(path.join(__dirname, "Images/SouPackage/SouPackageAmenities"))
);

app.use(
  "/Images/SouPackage/SouPackageResortImages",
  express.static(
    path.join(__dirname, "Images/SouPackage/SouPackageResortImages")
  )
);

app.use(
  "/Images/SouPackage/SouPackageBgImages",
  express.static(path.join(__dirname, "Images/SouPackage/SouPackageBgImages"))
);

app.use(
  "/Images/SouPackage/SouPackageItineraryPackagePriceImages",
  express.static(
    path.join(
      __dirname,
      "Images/SouPackage/SouPackageItineraryPackagePriceImages"
    )
  )
);

/**------------------------------------------Blogs-------------------------------------------------- */

app.use(
  "/Images/Blog/BlogDataDetailsImages",
  express.static(path.join(__dirname, "Images/Blog/BlogDataDetailsImages"))
);

/**------------------------------------------Sou Ticket-------------------------------------------------- */

app.use(
  "/Images/SouTicket/SouTicketInsideEventPriceImages",
  express.static(
    path.join(__dirname, "Images/SouTicket/SouTicketInsideEventPriceImages")
  )
);

app.use(
  "/Images/SouTicket/SouTicketTourPackageImages",
  express.static(
    path.join(__dirname, "Images/SouTicket/SouTicketTourPackageImages")
  )
);

/**---------------Start Server ---------------*/
// app.listen(port, () => {
//   console.log(`Server Running On Port: ${port}`);
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server Running On Port: ${port}`);
});
