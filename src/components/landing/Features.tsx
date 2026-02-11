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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.list.map((item, i) => (
          <div
            className="hover:shadow-lg relative rounded-xl overflow-hidden"
            key={i}
          >
            <div className="h-65">
              <img
                src={item.image}
                alt={item.text}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="absolute inset-0 hover:backdrop-blur-sm bg-black/50 flex justify-center items-center text-white">
              <div className="p-4 space-y-4">
                <p className="font-semibold text-lg">{item.text}</p>
                <LinkButton
                  label="LEARN MORE"
                  rightIcon={
                    <ArrowUpRightFromSquare
                      //   className="text-gray-800"
                      size={15}
                    />
                  }
                  className="text-sm bg-white/20 hover:bg-white text-white hover:text-black! w-fit! px-7 mx-auto"
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
