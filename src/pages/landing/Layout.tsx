import Navbar from "../../components/landing/NavBar";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className="w-full bg-zinc-50 min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="mt-25">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingPageLayout;
