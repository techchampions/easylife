import Button from "../global/Button";

const HeroSection = () => {
  return (
    <main className="lg:flex flex-row lg:justify-between lg:px-28 lg:overflow-hidden">
      <div>
        <div className="px-10 ml-10 mt-24 lg:p-8 lg:py-16 lg:mt-12">
          <div className="relative">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 z-10 relative leading-tight">
              Discover Love <br /> One Swipe at a <br /> Time
              <span className="sm:flex hidden text-gray-600 text-sm md:text-base flex-row font-base ml-0 md:ml-20">
                Building Happy homes
              </span>
            </h1>

            <img
              className="absolute bottom-0 left-14 transform -translate-y-1/2 -translate-x-1/4 z-0 w-auto h-auto"
              src="./images/slash.png"
              alt="Decorative Slash"
            />
          </div>
          <Button
            className="w-fit! bg-linear-to-r from-primary to-primary-light text-white font-bold px-14 py-3 rounded-full shadow-lg hover:bg-linear-to-r hover:from-primary-light hover:to-primary mt-6 md:mt-8"
            label="GET STARTED"
          />
        </div>
      </div>

      <div className="relative flex justify-center lg:justify-start lg:absolute lg:left-175 lg:bottom-0 z-0">
        <img
          src="./images/MainContent.png"
          alt="User with Emoji"
          className="lg:w-[80%] pt-5"
        />
      </div>
    </main>
  );
};

export default HeroSection;
