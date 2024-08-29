"use client";

import { useSidebar } from "@/app/context/sidebar-context";
import React from "react";
import { FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <button
        className="lg:hidden text-gray-600 hover:text-gray-800"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaBars size={20} />
      </button>
      <div className="flex items-center space-x-4 ml-auto">
        <span className="text-gray-700">admin@acai-travel.com</span>
        <button className="text-gray-600 hover:text-gray-800">
          <FaCog size={20} />
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
