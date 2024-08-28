"use client";

import { AppRoutes } from "@/shared/constants/app-routes";
import { useRouter } from "next/navigation";
import React from "react";
import { FaClipboardList } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleItemClick = (page: string) => {
    router.push(page);
  };

  return (
    <aside className="w-64 bg-primary-900 text-white min-h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold bg-primary-800">Acai Travel</div>
      <nav className="flex-grow py-6 px-3">
        <ul className="space-y-4">
          <li
            className="flex items-center space-x-2 p-2 rounded hover:bg-primary-700 cursor-pointer"
            onClick={() => handleItemClick(AppRoutes.PUBLIC.HOME)}
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
