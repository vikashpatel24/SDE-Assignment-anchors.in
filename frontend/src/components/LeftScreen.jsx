import React, { useEffect, useState } from "react";
import { TbCirclePlus } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const LeftScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    var answer = window.confirm("Are you sure to logout?");
    if (answer) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <>
      <div className="w-[25%] flex flex-col text-xl gap-4 items-start overflow-hidden">
        <div>
          <div className="flex flex-col text-[#868686] gap-4 pb-8">
            <Link
              to="/posts"
              className="border-none rounded-lg bg-[#0d0d0d] px-8 py-3"
            >
              All Post
            </Link>
            <Link
              to="/commented-post"
              className="border-none rounded-lg bg-[#0d0d0d] pl-8 pr-20 py-3"
            >
              Your Commented Post
            </Link>
            <Link
              to="/replied-post"
              className="rounded-lg bg-[#0d0d0d] px-8 py-3 border-none"
            >
              Your Replied Post
            </Link>
          </div>
          <div className="flex flex-col font-bold">
            <Link
              to="/create-post"
              className="flex items-center pl-10 pr-24 py-3 justify-center gap-4 border-2 rounded-lg text-[#808080]"
            >
              <TbCirclePlus className="text-3xl" />
              Create Post
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <button
              onClick={handleLogout}
              className="font-bold mt-10 text-red-600  py-3 border-2 border-red-500 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftScreen;
