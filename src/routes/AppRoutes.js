import { lazy } from "react";
const LayoutWithDrawer = lazy(() => import("../components/LayoutWithDrawer"));
const ProblematicReservationList = lazy(() =>
  import("../pages/ProblematicReservationList")
);
const ReservationExpended = lazy(() => import("../pages/ReservationExpended"));
const Login = lazy(() => import("../pages/Login"));

const AppRoutes = [
  {
    path: "/Reservation",
    element: <LayoutWithDrawer children={<ProblematicReservationList />} />,
  },
  {
    path: "/Reservation/:id",
    element: <LayoutWithDrawer children={<ReservationExpended />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default AppRoutes;
