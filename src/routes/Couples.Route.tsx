import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/user.state";

const CouplesRoutes = () => {
  const { isLoggedIn, user } = useUserStore();
  // Redirect UNAUTHENTICATED users to login with return URL
  if (isLoggedIn && user?.marital_status) {
    return <Outlet />;
    // if (user.marital_status === "married") {
    //   return <Outlet />;
    // }
    // return <Navigate to="/singles" replace />;
  }
  return <Navigate to="/" replace />;
};

export default CouplesRoutes;
