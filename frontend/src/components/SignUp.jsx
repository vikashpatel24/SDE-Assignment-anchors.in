import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("my-app-user")) {
      navigate("/posts");
    }
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = (e) => {
    const { name, email, password, confirmPassword } = values;
    if (name.length < 4) {
      toast.error("Name should be greater than 3 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater or equal to 8 characters",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "password and confirm password should be the same",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { name, email, password } = values;
      const { data } = await axios.post(
        "https://backend-anchors-in.vercel.app/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("my-app-user", JSON.stringify(data.user));
        navigate("/posts");
      }
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center">
      <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-[#191919] p-12 mt-12">
        <FaRocket className="text-2xl" />
        <div className="font-bold text-2xl p-5">Create Your Account</div>
        <form
          className="flex flex-col justify-center items-center gap-3 p-2"
          onSubmit={handleSignup}
        >
          <input
            className=" border rounded-full px-4 py-2 bg-inherit"
            type="text"
            name="name"
            placeholder="Enter Your Name"
            required
            onChange={handleChange}
          />
          <input
            className=" border rounded-full px-4 py-2 bg-inherit"
            type="email"
            name="email"
            placeholder="Enter Email ID"
            required
            onChange={handleChange}
          />
          <input
            className=" border rounded-full px-4 py-2 bg-inherit"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
            onChange={handleChange}
          />
          <input
            className=" border rounded-full px-4 py-2 bg-inherit"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
          />

          <button
            type="submit"
            className="border-none rounded-full bg-[#404040] flex items-center justify-center gap-2 px-16 py-2 mt-3"
          >
            Continue
            <FaArrowRight />
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
