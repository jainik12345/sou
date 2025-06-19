// import { createRoot } from "react-dom/client";
// import "./index.css";
// import  App  from "./App.jsx";
// import ReactDOM from "react-dom";


// // createRoot(document.getElementById("root")).render(<App />);


// ReactDOM.render(
//   <App />,
//   document.getElementById("root")
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);