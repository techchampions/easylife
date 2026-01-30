import React from "react";
import FeaturesSection from "../../components/landing/FeaturesSection";
import WhoWeAre from "../../components/landing/WhoWeAre";
import BottomCTA from "../../components/landing/BottomCTA";
import HeroSlider from "../../components/landing/HeroSlider";

const LandingPageIndex: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full px-4 md:px-8 h-[80vh] text-black">
        <HeroSlider />
        {/* <h1 className="text-4xl font-bold text-center">Slider Section</h1> */}
      </div>
      <div className="">
        <FeaturesSection />
      </div>
      <div className="py-30 bg-white">
        <div className="w-[80%] mx-auto">
          <WhoWeAre />
        </div>
      </div>
      <div className="p-4">
        <BottomCTA />
      </div>
    </div>
  );
};

export default LandingPageIndex;
