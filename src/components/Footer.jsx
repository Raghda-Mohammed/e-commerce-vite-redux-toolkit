import React from "react";
import {
  FaArrowAltCircleUp,
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">

      {/* زر العودة للأعلى */}
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition duration-300">
        <FaArrowAltCircleUp
          size={24}
          className="animate-bounce cursor-pointer "
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </button>

      <div className="container mx-auto px-6 text-center">
        {/* روابط الصفحات */}
        <nav className="mb-6">
          <ul className="flex flex-wrap justify-center space-x-6 text-sm md:text-base">
            <li>
              <a href="/" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-gray-400">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-gray-400">
                Terms of Service
              </a>
            </li>
          </ul>
        </nav>

        {/* قسم الاتصال وحقوق النشر */}
        <div className="md:flex md:justify-between md:items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Stay Connected</h2>
            <p className="text-gray-400 text-sm">Follow us on:</p>
          </div>

          {/* أيقونات وسائل التواصل الاجتماعي */}
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaInstagramSquare size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* حقوق النشر */}
        <p className="mt-6 text-gray-300 text-sm">
          &copy; 2025 E Commerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
