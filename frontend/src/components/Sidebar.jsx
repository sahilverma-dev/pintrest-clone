import React from "react";
import { NavLink, Link } from "react-router-dom";

// icons
import { HiHome as HomeIcon } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";

import { categories } from "../utils/data";

// active and inactive classes
const isNotActiveStyle =
  "flex items-center px-5 dark:text-gray-100 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 dark:border-white border-black  transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between dark:bg-gray-900 dark:text-white bg-white h-full overflow-y-scroll shadow min-w-210 md:min-w-350 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img
            src="https://1000logos.net/wp-content/uploads/2018/03/Pinterest-logo.png"
            alt="logo"
            className="w-full"
          />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <HomeIcon className="text-2xl" />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover cateogries
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center dark:bg-black bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.username}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
