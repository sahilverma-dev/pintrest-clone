import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

// icons
import { BsSun as SunIcon } from "react-icons/bs";
import { BiMoon as MoonIcon } from "react-icons/bi";

const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      {theme === "dark" ? (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <SunIcon />
        </button>
      ) : (
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <MoonIcon />
        </button>
      )}
    </>
  );
};

export default Toggle;
