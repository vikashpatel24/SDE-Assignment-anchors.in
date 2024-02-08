import axios from "axios";
import React from "react";
import { FaRocket } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";
import { Navigate } from "react-router-dom";

const Reset = () => {
  const handleReset = (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log(form);
    const email = form.email.value;
    console.log(email);

    axios
      .post("https://backend-anchors-in.vercel.app/reset-otp", { email })
      .then((response) => {
        console.log(response);
        localStorage.setItem("access_token", response.data.token);
        alert("Login successfully!");
        Navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="h-screen bg-black text-white flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-[#191919] p-12 mt-12">
          <FaRocket className="text-2xl" />
          <div className="font-bold text-2xl p-5">Reset Your Account</div>
          <form
            className="flex flex-col justify-center items-center gap-4 p-2"
            onSubmit={handleReset}
          >
            <div className="text-xs">
              <p>Please enter your emailID to reset the password</p>
            </div>
            <input
              className=" border rounded-full px-4 py-2 bg-inherit"
              type="email"
              name="email"
              placeholder="Email ID"
            />

            <button
              type="submit"
              className="border-none rounded-full bg-[#404040] flex items-center justify-center gap-2 px-16 py-2 mt-3"
            >
              Continue
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
