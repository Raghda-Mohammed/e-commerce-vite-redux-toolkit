import React from "react";
import contact from "../assets/contact.jpg"; // ضع صورة داخل مجلد `assets`
import { FaFacebook, FaInstagramSquare, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto p-4">
        <div className="md:flex gap-8 bg-white shadow-md rounded p-4">
          <div className="md:w-1/2 text-center flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-center mt-10">Contact Us</h1>
            <p className="text-center mt-4">
              We would love to hear from you! Please reach out to us at:
            </p>
            <p className="text-center mt-2">Email: 6v5hB@example.com</p>
            <p className="text-center mt-2">Phone: +1 (555) 123-4567</p>
            <p className="text-center mt-2">
              Address: 123 E-commerce St, Shop City
            </p>
            <p className="text-center mt-2">Follow us on social media!</p>
            <div className="flex justify-center space-x-10 mt-4">
              <a href="#" className="text-2xl text-blue-900 border border-blue-900 px-1 py-1 hover:bg-orange-500">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl text-blue-900 border border-blue-900 px-1 py-1 hover:bg-orange-500">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl text-blue-900 border border-blue-900 px-1 py-1 hover:bg-orange-500">
                <FaInstagramSquare />
              </a>
            </div>
            <div className="flex justify-center mt-2 space-x-4">
              <a href="#" className="text-blue-500 hover:underline">
                Facebook
              </a>
              <a href="#" className="text-blue-500 hover:underline">
                Twitter
              </a>
              <a href="#" className="text-blue-500 hover:underline">
                Instagram
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-4">
            <img
              src={contact}
              alt="E-commerce Store"
              className=" my-10  rounded shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
