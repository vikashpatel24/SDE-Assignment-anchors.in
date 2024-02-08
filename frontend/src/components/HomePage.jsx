import React from "react";
import { Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const homePage = () => {
  return (
    <div className="h-screen bg-black text-white pt-20">
      <div className="flex justify-center mb-10">
        <div className=" flex items-center justify-center gap-4 border rounded-full border-[#292929] px-8 p-2">
          <FaRocket />
          <span className="text-sm">For Indian Users Only</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-center text-5xl font-bold mb-10 md:w-[40%]">
          Start posting anonymously where no one will judge.
        </div>
      </div>
      <div className="text-center text-xl mb-10">
        Welcome to Stranger discussion forum
      </div>
      <div className="flex justify-center">
        <Link
          to="/signup"
          className=" flex items-center gap-6 bg-[#404040] rounded-full p-2 px-8 mb-5"
        >
          Create Your Account <FaArrowRight />
        </Link>
      </div>
      <div className="text-center pb-20">
        Already have account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default homePage;
