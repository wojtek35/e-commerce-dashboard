"use client";

import React from "react";
import { FaClipboardList } from "react-icons/fa";
import cx from 'classnames'; // Import cx from classnames

import { AppRoutes } from "@/shared/constants/app-routes";
import { useSidebar } from "@/context/sidebar-context";
import { RiCloseLine } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <aside
      className={cx(
        'fixed lg:relative top-0 left-0 w-72 bg-primary-900 text-white min-h-screen transition-transform lg:translate-x-0 z-50',
        {
          'translate-x-0': isSidebarOpen,
          '-translate-x-full': !isSidebarOpen,
        }
      )}
    >
      <div className="flex items-center justify-between bg-primary-800">
        <div className="p-6 text-2xl font-bold ">
          Acai Travel
        </div>
        <button
          className=" lg:hidden p-4 bg-primary-800 text-white rounded"
          onClick={closeSidebar}
          aria-label="Close Sidebar"
        >
          <RiCloseLine />
        </button>
      </div>
      
      <nav className="flex-grow py-6 px-3">
        <ul className="space-y-4">
          <li
            className="flex items-center space-x-2 p-2 rounded hover:bg-primary-700 cursor-pointer"
            onClick={() => window.location.href = AppRoutes.PUBLIC.HOME}
          >
            <FaClipboardList />
            <span>Manage Products</span>
          </li>
        </ul>
      </nav>
     
    </aside>
  );
};

export default Sidebar;
