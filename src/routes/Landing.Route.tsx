import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/user.state";

const LandingRoute = () => {
  const { isLoggedIn, user } = useUserStore();
  if (isLoggedIn) {
    if (user?.role === 1) {
      return <Navigate to="/singles" replace />;
    } else {
      return <Navigate to="/couples" replace />;
    }
  } else return <Outlet />;

  // Redirect UNAUTHENTICATED users to login with return URL
  // return !isLoggedIn ? <Outlet /> : <Navigate to="/singles" replace />;
};

export default LandingRoute;
