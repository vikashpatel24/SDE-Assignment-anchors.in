import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeftScreen from "./LeftScreen";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://backend-anchors-in.vercel.app/api/posts/getAllPosts"
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-center h-screen bg-[#000000] text-white">
        {/* Left Screen */}
        <LeftScreen />

        {/* Right Screen */}
        <div className="flex flex-col rounded-lg w-[40%] bg-[#0d0d0d] gap-4 px-6 pt-2 overflow-y-auto">
          <div className="text-xl text-center font-bold">
            All Posts ({posts.length})
          </div>
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col text-xl rounded-lg bg-[#191919] text-[#929292] px-8 py-3 gap-4"
            >
              <Link to={`/post/${post._id}`}>
                <div className="text-xl font-bold">{post.title}</div>
                <div className="flex flex-row text-base gap-4">
                  <div> {post.commentCount} Comments</div>
                  <div> {post.replyCount} Replies</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPosts;
