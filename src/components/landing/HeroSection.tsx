import { useModal } from "../../zustand/modal.state";
import Welcome from "../auth/Welcome";
import Button from "../global/Button";

const HeroSection = () => {
  const modal = useModal();
  const getStarted = () => {
    modal.open(<Welcome />);
  };

  return (
    <div className="flex justify-center bg-custom-pink h-fit">
      <div className="grid md:grid-cols-2 gap-5 md:gap-0 w-full md:mx-10">
        <div className="">
          <div className=" px-5 md:px-10 w-[80%] md:w-auto mx-auto lg:ml-10 mt-18 md:mt-24 lg:p-8 lg:py-16 lg:mt-12">
            <div className="relative">
              <h1 className="text-4xl md:text-5xl xl:text-7xl 2xl:text-[80px] font-bold text-gray-900 z-10 relative leading-tight">
                Discover Love <br /> One Swipe at a <br /> Time
                <span className="sm:flex hidden text-gray-600 text-sm md:text-base flex-row font-base ml-0 md:ml-20">
                  Building Happy homes
                </span>
              </h1>

              <img
                className="absolute bottom-15 w-2/3 z-0 h-auto"
                src="./images/slash.png"
                alt="Decorative Slash"
              />
            </div>
            <Button
              onClick={getStarted}
              className="w-fit! bg-linear-to-r from-primary to-primary-light text-white font-bold px-14 py-3 rounded-full shadow-lg hover:bg-linear-to-r hover:from-primary-light hover:to-primary mt-6 md:mt-8 2xl:text-2xl 2xl:py-5 2xl:rounded-2xl"
              label="GET STARTED"
            />
          </div>
        </div>
        <div className="h-full flex items-center justify-center">
          <img
            src="./images/MainContent.png"
            alt="User with Emoji"
            className="w-full h-full object-contain max-h-full"
          />
        </div>
        {/* <div className="h-full">
          <img
            src="./images/MainContent.png"
            alt="User with Emoji"
            className="lg:w-[80%] 2xl:w-full h-full max-h-full pt-5 2xl:pt-0"
          />
        </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
