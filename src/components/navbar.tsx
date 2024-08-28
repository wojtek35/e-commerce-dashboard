import { FaCog, FaSignOutAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow p-4 flex justify-end items-center">
      <div className="flex items-center space-x-4">
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
