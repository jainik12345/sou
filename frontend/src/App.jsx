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