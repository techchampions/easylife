import { Mail, MapPin, PhoneCall } from "lucide-react";
import ContactForm from "../../components/landing/ContactForm";

const Contact = () => {
  return (
    <div className="flex justify-center items-center my-30">
      <div className="w-[95%] md:w-[70%] flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/5 space-y-8">
          <div className="space-y-4">
            <div className="">
              <h3 className="uppercase font-medium">Need help?</h3>
              <h3 className="text-3xl font-bold text-secondary">
                Reach Out Let's Talk
              </h3>
            </div>
            <p>
              Have questions about your account or complictaions with this
              platform? Our team is here to help you find your soul mate.
            </p>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-4 rounded-xl space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="flex justify-center items-center p-2 rounded-lg bg-secondary/20">
                    <Mail />
                  </div>
                  <div className="text-lg font-medium">Email us</div>
                </div>
                <div className="">help@easylife.com</div>
              </div>
              <div className="bg-white p-4 rounded-xl space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="flex justify-center items-center p-2 rounded-lg bg-secondary/20">
                    <PhoneCall />
                  </div>
                  <div className="text-lg font-medium">Call us</div>
                </div>
                <div className="">+234 901 2345 678</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl space-y-4">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center p-2 rounded-lg bg-secondary/20">
                  <MapPin />
                </div>
                <div className="text-lg font-medium">Our Offices</div>
              </div>
              <ul className="w-3/4 list-disc ml-5 text-sm space-y-0">
                <li>123 Green Mold str, Suite 401, Ikeja Lagos, IKD902133.</li>
                <li>123 Green Mold str, Suite 401, Ikeja Lagos, IKD902133.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/5 bg-white h-fit rounded-xl p-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
