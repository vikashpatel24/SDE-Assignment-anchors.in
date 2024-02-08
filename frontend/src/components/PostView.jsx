import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import LeftScreen from "./LeftScreen";

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postId, newComment, replyInputs]);

  const handleInputChange = (e, commentId) => {
    const { value } = e.target;
    setReplyInputs((prevState) => ({
      ...prevState,
      [commentId]: value,
    }));
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${postId}/comments`,
        {
          userId: currentUser,
          text: newComment,
        }
      );
      setPost(response.data);
      alert("Posted new comment");
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostReply = async (e, commentId) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${postId}/comments/${commentId}/replies`,
        {
          userId: currentUser,
          text: replyInputs[commentId],
        }
      );

      setPost(response.data);
      alert("Posted new reply");
      setReplyInputs((prevState) => ({
        ...prevState,
        [commentId]: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row justify-center h-screen  bg-[#000000] text-white">
      {/* Left Screen */}
      <LeftScreen />

      {/* Right Screen */}

      <div className="flex flex-col overflow-y-auto rounded-lg bg-[#0d0d0d] gap-4 px-6 pt-2">
        <div className="text-xl text-center font-bold">Post Details</div>
        {post ? (
          <div
            key={post._id}
            className="flex flex-col text-xl rounded-lg bg-[#191919] text-[#929292] px-8 py-3 gap-4"
          >
            <div className="text-xl font-bold">{post.title}</div>
            <div className="text-base">{post.description}</div>
            <p>Created by: {post.user.name}</p>
            <div className="flex flex-row italic text-base gap-4">
              <div>{post.commentCount} Comments</div>
              <div>{post.replyCount} Replies</div>
            </div>
            <div className="text-3xl font-extrabold">Comments:</div>
            {/* Add New Comment */}
            <div>
              <form
                className="flex flex-row justify-between text-base gap-4 bg-[#252525] border-none rounded-md"
                onSubmit={handlePostComment}
              >
                <input
                  className=" border-none rounded-lg focus:outline-none pl-6 pr-24 py-4 text-white  bg-[#252525]"
                  type="text"
                  name="newComment"
                  placeholder="Add new comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center gap-2 border-none rounded-lg bg-[#ffffff] text-[#000000] py-3 px-4"
                >
                  Post Comment <FaArrowRight />
                </button>
              </form>
            </div>

            {/* All comments */}
            {post.commentCount === 0 ? (
              <div>No comments</div>
            ) : (
              post.comments.map((comment) => (
                <div key={comment._id}>
                  <div className="flex flex-row gap-1">
                    <div className=" italic font-medium">
                      {comment.user.name && comment.user.name.split(" ")[0]}:
                    </div>
                    <div className="flex flex-col">
                      <div className="pb-4">{comment.text} </div>

                      {/* Add Reply Section */}
                      <div>
                        <form
                          className="flex flex-row justify-between text-base gap-4 bg-[#252525] border-none rounded-md"
                          onSubmit={(e) => handlePostReply(e, comment._id)}
                        >
                          <input
                            className="border-none rounded-lg focus:outline-none pl-6 pr-24 py-4 text-white bg-[#252525]"
                            type="text"
                            name={`newReply-${comment._id}`} // Use a unique name for each input
                            placeholder="Reply to this comment..."
                            value={replyInputs[comment._id] || ""} // Set value from state based on comment ID
                            onChange={(e) => handleInputChange(e, comment._id)} // Pass comment ID to handleInputChange
                          />
                          <button
                            type="submit"
                            className="flex flex-row items-center justify-center gap-2 border-none rounded-lg bg-[#ffffff] text-[#000000] py-3 px-4"
                          >
                            Post Reply <FaArrowRight />
                          </button>
                        </form>
                      </div>

                      {/* Diplay Replies on particular comment */}

                      {comment.replies.length === 0 ? (
                        <div className="text-xl font-extrabold">No Replies</div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <div className="text-xl font-extrabold">Replies:</div>
                          {comment.replies.map((reply) => (
                            <div
                              key={reply._id}
                              className="flex flex-col gap-1"
                            >
                              <div className="flex flex-row gap-1">
                                <div className="italic font-medium">
                                  {reply.user.name &&
                                    reply.user.name.split(" ")[0]}
                                  :
                                </div>
                                <div>{reply.text}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PostView;
