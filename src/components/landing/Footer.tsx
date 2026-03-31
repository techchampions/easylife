import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-custom-pink text-black pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="text-black text-xl font-semibold mb-4 w-2/3">
            <img
              src="/images/logo.png"
              alt="Easy Life Logo"
              className="w-full h-full"
            />
          </div>
          <p className="text-sm 2xl:text-xl leading-relaxed">
            Superlative Online / Offline Marriage Trainings, For Both Singles
            And Married Couples.{" "}
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4 2xl:text-3xl">Company</h3>
          <ul className="space-y-2 text-sm 2xl:text-xl">
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4 2xl:text-3xl">Resources</h3>
          <ul className="space-y-2 text-sm 2xl:text-xl">
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:font-bold text-gray-600">
                Documentation
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className=" font-semibold mb-4 2xl:text-3xl">Contact</h3>
          <ul className="space-y-3 text-sm 2xl:text-xl">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@demarriageacademy.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +39 351 251 3290 (Whatsapp only)
            </li>
          </ul>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-white">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-2/3 bg-gray-200 h-px mx-auto mt-10" />
      <div className="py-6 text-center text-sm 2xl:text-xl text-gray-800 flex items-center gap-10 justify-center">
        <div className="">
          © {new Date().getFullYear()} EasyLife. All rights reserved.
        </div>
        <div className="">Powered By Easylona International.</div>
      </div>
    </footer>
  );
};

export default Footer;
