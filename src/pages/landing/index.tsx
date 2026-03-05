import React from "react";
import BottomCTA from "../../components/landing/BottomCTA";
import Features from "../../components/landing/Features";
import HeroSection from "../../components/landing/HeroSection";
import MissionVision from "../../components/landing/MissionVision";
import SubscriptionSection from "../../components/landing/SubscriptionSection";
import WhoWeAre from "../../components/landing/WhoWeAre";

const LandingPageIndex: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full md:h-[80vh] text-black 2xl:mb-20">
        <HeroSection />
        {/* <HeroSlider /> */}
      </div>
      <div id="about-us" className="py-10 md:py-20">
        {/* <div className="space-y-4 text-center">
          <h2 className="text-4xl font-black">About Us</h2>
          <p className="w-full md:w-xl mx-auto px-4">
            This is <b>EASYLIFE MARRIAGE ACADEMY</b>, Powered By{" "}
            <b>EASYLONA INTERNATIONAL</b>, This platform is for those who are
            married, who wish to get married, who wish to stay married, and who
            wish to enjoy their marriages to the full.
          </p>
        </div> */}
        <MissionVision />
      </div>
      <div
        id="who-we-are"
        className="w-full py-10 md:py-20 px-4 bg-secondary/20"
      >
        <div className="w-[99%] md:w-[80%] mx-auto">
          <WhoWeAre />
        </div>
      </div>
      <div id="features" className="w-full py-10 md:py-20 2xl:py-30 px-4">
        <Features />
      </div>
      <div
        id="subscribe"
        className="w-full py-10 md:py-20 px-4 bg-linear-to-tr from-secondary/20 to-secondary text-white"
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
