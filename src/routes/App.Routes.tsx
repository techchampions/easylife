import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "../components/global/Loader";
import { useUserStore } from "../zustand/user.state";
import SinglesRoutes from "./Singles.Route";
import CouplesRoutes from "./Couples.Route";
import CouplesLayout from "../pages/couples/Layout";
import LandingRoute from "./Landing.Route";
import LandingPageLayout from "../pages/landing/Layout";
import Toast from "../components/global/Toast";
import Modal from "../components/global/Modal";
import LandingPageIndex from "../pages/landing";
import About from "../pages/landing/About";
import Contact from "../pages/landing/Contact";
import Settings from "../pages/general_dashboard/Settings";
import Discover from "../pages/general_dashboard/Discover";
import Messages from "../pages/general_dashboard/Messages";
import Notifications from "../pages/general_dashboard/Notifications";
import ProfileScreen from "../pages/general_dashboard/Profile";
import SocialFeedPage from "../pages/couples/Mentorship";
import Index from "../pages/general_dashboard/Index";
const SinglesLayout = lazy(() => import("../pages/singles/Layout"));

const AppRoutes = () => {
  const { isLoggedIn, user } = useUserStore();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader className="h-25 w-25" />}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    isLoggedIn
                      ? user?.role === 1
                        ? "/singles"
                        : "/couples"
                      : "/"
                  }
                  replace
                />
              }
            />

            {/* Protected Routes - Dashboard */}

            <Route path="/singles/*" element={<SinglesRoutes />}>
              <Route element={<SinglesLayout />}>
                <Route index element={<Index />} />
                <Route path="settings" element={<Settings />} />
                <Route path="discover" element={<Discover />} />
                <Route path="messages" element={<Messages />} />
                <Route path="profile" element={<ProfileScreen />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
            </Route>

            {/* Login Route */}
            <Route path="/couples/*" element={<CouplesRoutes />}>
              <Route element={<CouplesLayout />}>
                <Route index element={<Index />} />
                <Route path="settings" element={<Settings />} />
                <Route path="discover" element={<Discover />} />
                <Route path="messages" element={<Messages />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<ProfileScreen />} />
                <Route path="mentorship" element={<SocialFeedPage />} />
              </Route>
            </Route>
            <Route path="/" element={<LandingRoute />}>
              <Route element={<LandingPageLayout />}>
                <Route index element={<LandingPageIndex />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
        <Toast />
        <Modal />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
