import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LeftScreen from "./LeftScreen";

const CreatePost = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("my-app-user")) {
      navigate("/login");
    } else {
      const storedData = localStorage.getItem("my-app-user");
      if (storedData) {
        const parsedData = JSON.parse(storedData) || [];
        const user = parsedData._id;
        setCurrentUser(user);
        console.log(user);
      }
    }
  }, [navigate]);

  const [postData, setPostData] = useState({
    user: currentUser,
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    const { title, description } = postData;
    if (title.length < 3) {
      toast.error("Title should be greater than 3 characters", toastOptions);
      return false;
    } else if (description === "") {
      toast.error("Description is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { title, description } = postData;
      try {
        const response = await axios.post(
          "https://backend-anchors-in.vercel.app/api/posts/create",
          {
            userId: currentUser,
            title,
            description,
          }
        );

        console.log(response.data);
        alert(response.data.message);
        navigate("/posts");
      } catch (error) {
        console.error("Error creating post:", error);
        return;
      }
    }
  };

  return (
    <div className="flex flex-row justify-center h-screen bg-[#000000] text-white">
      {/* Left Screen */}
      <LeftScreen />

      {/* Right Screen */}
      <div className=" flex flex-col rounded-lg w-[40%] bg-[#0d0d0d] gap-4 px-6 pt-2">
        <div className="text-xl text-center font-bold">Create Post</div>
        <form
          className="flex flex-col text-xl  gap-10"
          onSubmit={handleCreatePost}
        >
          <div className="flex flex-col gap-4">
            <input
              className=" border-none rounded-lg px-6 py-4  bg-[#191919] text-[#8c8c8c]"
              type="text"
              name="title"
              placeholder="Post Title..."
              required
              onChange={handleChange}
            />
            <textarea
              className=" border-none rounded-lg px-6 py-4 pb-24 bg-[#191919] text-[#8c8c8c]"
              type="text"
              name="description"
              placeholder="Describe your post..."
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="border-none rounded-lg bg-[#252525] text-[#929292] px-12 py-3"
            >
              Post Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
