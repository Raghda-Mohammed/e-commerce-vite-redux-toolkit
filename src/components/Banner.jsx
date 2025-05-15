import React from "react";
import { FaCamera, FaLongArrowAltRight } from "react-icons/fa";
import bannerImg from "../assets/banner2.jpg";

import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  // Initialize AOS
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
    });
  }, []);
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-900 text-white p-6 md:p-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between w-full">
        {/* القسم النصي */}
      <div data-aos="fade-right" className="md:w-1/2 text-center md:text-left mx-2">
        <div className="flex items-center gap-2">
          <FaCamera className="text-3xl" />
          <h5 className="text-orange-500 font-bold text-lg">Camera Store Sale</h5>
        </div>
        <h1 className="text-3xl font-bold mt-2 animate-bounce">Up to 50% off</h1>
        <p className="text-gray-400 mt-4">
          Discover the latest camera models and accessories at unbeatable prices.
          Don't miss out on this limited-time offer!
        </p>
        <p>
          <span className="text-orange-500 font-bold">Shop Now</span> and
          capture your moments with the best gear!
        </p>
        <div className="flex gap-4 mt-4 justify-center md:justify-start">
          <button className="text-white border-b-2 text-lg">Shop Now</button>
          <FaLongArrowAltRight className="text-xl" />
        </div>
        <div className="flex gap-4 mt-4 justify-center md:justify-start">
          <button className="text-white bg-orange-600 w-32 py-2 rounded-lg cursor-pointer hover:bg-orange-700 transition duration-300">
            Let's Talk
          </button>
        </div>
      </div>

      {/* صورة المنتج */}
      <div data-aos="fade-left" className="md:w-1/2 flex justify-end mt-6 md:mt-0">
        <img
          className="w-auto h-80 md:w-96 lg:w-lg rounded-lg shadow-lg"
          src={bannerImg}
          alt="Product Banner"
        />
      </div>
      </div>
    </div>
  );
};

export default Banner;

