// import  RouteComponents  from "./Routing/RouteComponents/RouteComponents";
// import { StrictMode } from "react";
// export const App = () => {
//   return (
//     <>
//       <StrictMode>
//         <RouteComponents />
//       </StrictMode>
//     </>
//   );
// };

import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./Routing/RouteComponents/RouteComponents";

const App = () => {
  return (
    <BrowserRouter>
      <RouteComponents />
    </BrowserRouter>
  );
};

export default App;