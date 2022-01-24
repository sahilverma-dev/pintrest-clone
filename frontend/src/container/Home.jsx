import React, { useState, useRef, useEffect } from "react";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { IoMdCloseCircle as CloseIcon } from "react-icons/io";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import { userQuery } from "../utils/data";
import { client } from "../client";
import Pins from "./Pins";
import Toggle from "../components/Toggle";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-gray-50 dark:bg-gray-700 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex dark:bg-gray-900 flex-row justify-between items-center shadow-md">
          <MenuIcon
            fontSize={40}
            className="cursor-pointer dark:text-gray-500"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img
              src="https://1000logos.net/wp-content/uploads/2018/03/Pinterest-logo.png"
              alt="logo"
              className="w-28"
            />
          </Link>
          <div className="flex">
            <div className="flex items-center justify-center h-9 w-9 bg-gray-800 rounded-full text-white">
              <Toggle />
            </div>
            <Link to={`user-profile/${user?._id}`}>
              <img
                src={user?.image}
                alt="user-pic"
                className="w-9 h-9 rounded-full block ml-2"
              />
            </Link>
          </div>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <CloseIcon
                fontSize={30}
                className="cursor-pointer dark:text-white"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
