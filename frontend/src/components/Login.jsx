import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRocket } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
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
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = (e) => {
    const { email } = values;
    if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      console.log(values);
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
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
        <div className="font-bold text-2xl p-5">Login Your Account</div>

        <form
          className="flex flex-col justify-center items-center gap-3 p-2"
          onSubmit={handleLogin}
        >
          <input
            className=" border rounded-full px-4 py-2 bg-inherit"
            type="email"
            name="email"
            placeholder="Email ID"
            required
            onChange={handleChange}
          />
          <input
            className=" border rounded-full px-4 py-2 bg-inherit "
            type="password"
            name="password"
            placeholder="Password"
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
        <div className="text-center">
          Forgot password?{" "}
          <Link to="/reset" className="underline">
            Reset
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
