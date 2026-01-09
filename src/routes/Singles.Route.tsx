import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../zustand/user.state";

const SinglesRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  // Redirect UNAUTHENTICATED users to login with return URL
  return isLoggedIn && user?.role === 1 ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default SinglesRoutes;
