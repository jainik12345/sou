// import { BrowserRouter } from "react-router-dom";
// import RouteComponents from "./Routing/RouteComponents/RouteComponents";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <RouteComponents />
//     </BrowserRouter>
//   );
// };

// export default App;

//
import { useState, useEffect } from "react";
import RouteComponents from "./Routing/RouteComponents/RouteComponents";
import PageLoader from "./components/PageLoader/PageLoader";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");
    if (!visited) {
      setLoading(true);
      sessionStorage.setItem("visited", "true");
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      <RouteComponents />
    </div>
  );
};

export default App;
