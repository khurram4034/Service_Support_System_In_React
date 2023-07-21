import { useRoutes, Navigate } from "react-router-dom";
import { getAllRoutes } from "./index";
import Error from "../pages/Error";
import { useAuth } from "../hooks/useAuth";

const Router: React.FC = () => {
  const allRoutes = getAllRoutes();
  const { user } = useAuth();

  const getHomeRoute = () => {
    if (user) {
      return "/Reservation";
    } else {
      return "/login";
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "*",
      index: true,
      element: <Error />,
    },
    ...allRoutes,
  ]);

  return routes;
};

export default Router;
