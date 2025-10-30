import { Menu } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // control mobile menu toggle

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Upload", path: "/upload-resources" },
    { title: "Courses", path: "/courses" },
    { title: "Question Paper", path: "/question-paper" },
    { title: "Saved", path: "/saved" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-white fixed z-10  border-gray-200 ">
      <div className="max-w-7xl flex flex-wrap items-center justify-between p-4 py-4 mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Diginotes Logo"
          />
          <span className="self-center text-primary text-2xl font-semibold whitespace-nowrap ">
            Diginotes
          </span>
        </NavLink>

        {/* Buttons */}
        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
          <button type="button" className="btn-primary">
            Get Started
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-primary rounded-lg p-2 lg:hidden outline-none"
            aria-controls="navbar-cta"
            aria-expanded={isOpen}
          >
            <Menu stroke="white" />
          </button>
        </div>

        {/* Nav Links */}
        <div
          id="navbar-cta"
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full lg:flex lg:w-auto lg:order-1`}
        >
          <ul
            className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg 
          bg-gray-50 lg:space-x-1 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 
          lg:bg-white "
          >
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-2xl transition-all duration-200 
                     ${
                       isActive
                         ? "bg-[#5AB2FF] text-white font-semibold" // active state
                         : "text-gray-700! hover:bg-[#5AB2FF] hover:text-white!"
                     }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
