// import { createRoot } from "react-dom/client";
// import "./index.css";
// import  App  from "./App.jsx";
// import ReactDOM from "react-dom";


// // createRoot(document.getElementById("root")).render(<App />);


// ReactDOM.render(
//   <App />,
//   document.getElementById("root")
// );

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);