import React from "react";
import WhoWeAre from "../../components/landing/WhoWeAre";
import BottomCTA from "../../components/landing/BottomCTA";
import HeroSlider from "../../components/landing/HeroSlider";
import MissionVision from "../../components/landing/MissionVision";
import Features from "../../components/landing/Features";
import SubscriptionSection from "../../components/landing/SubscriptionSection";

const LandingPageIndex: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-[80vh] text-black">
        <HeroSlider />
        {/* <h1 className="text-4xl font-bold text-center">Slider Section</h1> */}
      </div>
      <div id="about-us" className="py-10 md:py-20">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl font-black">About Us</h2>
          <p className="w-full md:w-xl mx-auto px-4">
            This is EASYLIFE MARRIAGE ACADEMY, Powered By EASYLONA
            INTERNATIONAL, This platform is for those who are married, who wish
            to get married, who wish to stay married, and who wish to enjoy
            their marriages to the full.
          </p>
        </div>
        <MissionVision />
      </div>
      <div
        id="who-we-are"
        className="w-full py-10 md:py-20 px-4 bg-linear-to-tr from-black to-secondary text-white"
      >
        <div className="w-[99%] md:w-[80%] mx-auto">
          <WhoWeAre />
        </div>
      </div>
      <div id="features" className="w-full py-10 md:py-20 px-4">
        <Features />
      </div>
      <div
        id="subscribe"
        className="w-full py-10 md:py-20 px-4 bg-linear-to-tr from-primary to-secondary text-white"
      >
        <SubscriptionSection />
      </div>
      <div className="py-10 md:py-20 px-2">
        <BottomCTA />
      </div>
    </div>
  );
};

export default LandingPageIndex;
