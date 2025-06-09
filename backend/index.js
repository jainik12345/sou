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

app.use("/admin", admin);
app.use("/privatePolicy", privatePolicy);
app.use("/termsConditions", termsConditions);
/**--------------------------------------------------Home-------------------------------------------------- */

app.use("/homeTestimonial", homeTestimonial);
app.use("/homeCertificate", homeCertificate);
app.use("/homeImageSlider", homeImageSlider);
app.use("/homeNearAttractions", homeNearAttractions);
app.use("/homeOnlineBookingContent", homeOnlineBookingContent);

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

/**---------------Start Server ---------------*/
// app.listen(port, () => {
//   console.log(`Server Running On Port: ${port}`);
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`Server Running On Port: ${port}`);
});
