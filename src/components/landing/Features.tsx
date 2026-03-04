import { ArrowUpRightFromSquare, Sparkle } from "lucide-react";
import LinkButton from "../global/LinkButton";

const content = {
  icon: <Sparkle size={45} />,
  title: "Our Features",
  desc: "EasyLife offers alot of benefits and features within the ecosystem. Some of these benefits include",
  list: [
    {
      text: "Relationship Coaching / Marriage Mentorship (Singles & Couples)",
      image: "/images/couple (1).jpeg",
    },
    {
      text: " General Marriage Trainings (Singles & Couples)",
      image: "/images/couple (3).jpeg",
    },
    {
      text: " Marriage Connections ( Singles Only)",
      image: "/images/couple (4).jpeg",
    },
    {
      text: " Marriage Reconciliations (Couples Only)",
      image: "/images/couple (5).jpeg",
    },
    {
      text: " Coordinated Godly Match Making (Singles Only)",
      image: "/images/couple (2).jpeg",
    },
  ],
};

const Features = () => {
  return (
    <div className="w-full md:w-[80%] mx-auto text-center space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-black">{content.title}</h2>
        <p className="w-full md:w-1/2 mx-auto">{content.desc}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {" "}
        {content.list.map((item, i) => (
          // <div
          //   className={` hover:shadow-lg relative rounded-xl overflow-hidden h-80 min-h-80 max-h-80 bg-secondary/20`}
          //   key={i}
          // >
          <div
            key={i}
            className="
    w-full 
    md:w-[calc(50%-12px)] 
    lg:w-[calc(33.333%-16px)]
    hover:shadow-lg 
    relative 
    rounded-xl 
    overflow-hidden 
    h-80 
    bg-secondary/20
  "
          >
            <div className="h-1/2">
              <img
                src={item.image}
                alt={item.text}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="flex justify-center items-center h-1/2 text-black">
              <div className="p-4 space-y-4 flex flex-col justify-between h-full">
                <p className="font-semibold text-lg flex-1">{item.text}</p>
                <LinkButton
                  label="LEARN MORE"
                  rightIcon={
                    <ArrowUpRightFromSquare
                      //   className="text-gray-800"
                      size={15}
                    />
                  }
                  className="text-sm bg-white text-black! w-fit! px-7 mx-auto"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
