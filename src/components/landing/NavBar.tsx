import clsx from "clsx";
import { ArrowUpRightFromCircle, LogIn, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";
import Login from "../auth/Login";
import Welcome from "../auth/Welcome";
import Button from "../global/Button";
// import GetStarted from "../auth/GetStarted";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useModal();
  const { isLoggedIn, user } = useUserStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const getStarted = () => {
    if (isLoggedIn) {
      if (user?.marital_status) {
        navigate("/dashboard");
      } else open(<Welcome />);
    } else open(<Welcome />);
  };
  const openLoginModal = () => {
    open(<Login />);
  };
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const navLinks: LandingNavItem[] = [
    {
      label: "Home",
      href: "/#",
    },
    {
      label: "About",
      href: "#about-us",
    },
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Subscribe",
      href: "#subscribe",
    },
    {
      label: "App",
      href: "#app",
    },
    {
      label: "Help",
      href: "/contact/",
    },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 backdrop-blur-md ${
        scrolled ? "bg-custom-pink shadow" : "bg-custom-pink"
      }`}
    >
      <nav className="w-full px-4 md:max-w-[90%] mx-auto flex justify-between items-center pt-4 pb-1">
        <div className=" flex items-center space-x-2 h-18">
          <img
            src="/images/logo.png"
            alt="Easy Life Logo"
            className="w-full h-full"
          />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex flex-1 justify-center space-x-15 text-base 2xl:text-xl relative">
          {navLinks.map((link) => (
            <li key={link.href} className={clsx("relative", "group")}>
              {link.href.startsWith("#") ? (
                <button
                  onClick={() => handleScrollTo(link.href.replace("#", ""))}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <NavLink
                  to={link.href}
                  end
                  className={({ isActive }) =>
                    `transition-colors duration-300 ${
                      isActive
                        ? "text-secondary font-bold"
                        : "text-gray-500 hover:text-gray-700"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-2">
          <div className="bg-linear-to-r from bg-secondary to-secondary-light p-0.75 rounded-2xl text-white">
            <Button
              label="Login"
              className="px-4 w-fit! bg-white text-secondary! hover:text-white! font-medium hover:bg-linear-to-r from-secondary to-secondary-light"
              onClick={openLoginModal}
              rightIcon={<LogIn size={17} />}
            />
          </div>
          <Button
            label="Get Started"
            className="px-4 w-fit! bg-linear-to-br rounded-2xl! font-medium from-primary to-primary-light"
            onClick={getStarted}
            rightIcon={<ArrowUpRightFromCircle size={17} />}
          />
        </div>

        {/* Hamburger Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="cursor-pointer"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Overlay + Mobile Menu Drawer */}
      <div
        className={clsx(
          "fixed inset-0 z-60 min-h-screen transition-transform duration-300 lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
          "flex"
        )}
      >
        {/* Transparent dark overlay */}
        <div
          className="flex-1 bg-black/50 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Side drawer menu */}
        <div className="w-64 bg-white h-full p-6 shadow-lg overflow-y-auto">
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col justify-between h-1/2 mt-30">
            <ul className="flex flex-col space-y-5 flex-1">
              {navLinks.map((link, index) => (
                <li key={`${link.href}-${index}`}>
                  <div className="font-bold">
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => {
                          handleScrollTo(link.href.replace("#", ""));
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <NavLink
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-base block ${
                            isActive
                              ? "text-primary"
                              : "text-gray-700 hover:text-primary"
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <Button
                label="Login"
                onClick={openLoginModal}
                className="bg-secondary"
              />
              <Button
                label="Get Started"
                onClick={getStarted}
                rightIcon={<ArrowUpRightFromCircle />}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
