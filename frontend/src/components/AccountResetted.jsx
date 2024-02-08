import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const AccountResetted = () => {
  return (
    <div>
      <div className="h-screen bg-black text-white flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-[#191919] px-12 py-24 mt-12">
          <IoIosCheckmarkCircle className="text-4xl" />
          <div className="flex flex-col items-center justify-center font-bold text-2xl p-5">
            <div className="">Account Reset</div>
            <div className="">Successfully</div>
          </div>

          <Link
            to="/create-post"
            className="border rounded-full bg-[#404040] flex items-center justify-center gap-2 px-12 py-3 border-none"
          >
            Create Your First Post <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountResetted;
