import React from "react";
import { FaRocket } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResetOTP = () => {
  return (
    <div>
      <div className="h-screen bg-black text-white flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-[#191919] p-12 mt-12">
          <FaRocket className="text-2xl" />
          <div className="font-bold text-2xl p-5">Reset Your Account</div>
          <form className="flex flex-col justify-center items-center gap-4 p-2">
            <p className="text-xs">
              <p>Please verify your email ID to continue.</p>
              <p>We have sent an OTP to this EMAILID</p>
            </p>
            <input
              className=" border rounded-full px-4 py-2 bg-inherit"
              type="tel"
              maxLength={8}
              name="otp"
              placeholder="Enter OTP"
            />
          </form>

          <Link
            to="/update-password"
            className="border-none rounded-full bg-[#404040] flex items-center justify-center gap-2 px-16 py-2"
          >
            Continue
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetOTP;
