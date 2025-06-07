import { RouteComponents } from "./Routing/RouteComponents/RouteComponents";
import { StrictMode } from "react";
export const App = () => {
  return (
    <>
      <StrictMode>
        <RouteComponents />
      </StrictMode>
    </>
  );
};
