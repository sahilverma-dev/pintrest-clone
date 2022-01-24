import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Toggle from "./Toggle";

// icons
import {
  IoMdAddCircle as AddIcon,
  IoMdSearch as SearchIcon,
} from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex w-full mt-5 pb-7 gap-2 bg-transparent">
        <div className="flex justify-start dark:bg-gray-300 dark: flex-grow items-center px-2 rounded-md border-none outline-none focus-within:shadow-sm">
          <SearchIcon fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate("/search")}
            className="p-2 w-full rounded bg-transparent dark:text-black outline-none"
          />
        </div>
        <div className="hidden md:flex dark:bg-white dark:text-black items-center justify-center h-12 w-12 bg-gray-800 rounded-full text-white">
          <Toggle />
        </div>

        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img
            src={user.image}
            alt="user-pic"
            className="w-12 h-12 rounded-full block"
          />
        </Link>

        <Link
          to="/create-pin"
          className="bg-black dark:bg-gray-200 dark:text-gray-900 text-white rounded-full w-12 h-12 flex justify-center items-center"
        >
          <AddIcon className="text-2xl" />
        </Link>
      </div>
    );
  }

  return null;
};

export default Navbar;
