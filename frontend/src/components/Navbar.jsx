import React, { useEffect, useState } from "react";
import { HiSquares2X2 } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = () => {
      const storedData = localStorage.getItem("my-app-user");
      if (!storedData) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        const parsedData = JSON.parse(storedData) || [];
        const userName = parsedData.name.split(" ")[0];
        setName(userName);
      }
    };

    checkUserStatus();
  }, [isLoggedIn]);

  return (
    <div className="flex flex-row items-center justify-between bg-black text-white px-6 pt-5 pb-10 ">
      <div>
        <Link to="/">
          <div className="flex gap-2 items-center">
            <HiSquares2X2 className="text-4xl" />
            <div className="font-bold">ANONYMOUS</div>
          </div>
        </Link>
      </div>
      {isLoggedIn && <div className="text-xl font-bold">Welcome, {name}</div>}
    </div>
  );
};

export default Navbar;
