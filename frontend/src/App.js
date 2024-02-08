import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Reset from "./components/Reset";
import OTP from "./components/OTP";
import UpdatePassword from "./components/UpdatePassword";
import AccountCreated from "./components/AccountCreated";
import CreatePost from "./components/CreatePost";
import AllPosts from "./components/AllPosts";
import PostView from "./components/PostView";
import ResetOTP from "./components/ResetOTP";
import CommentedPost from "./components/CommentedPost";
import RepliedPost from "./components/RepliedPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/reset", element: <Reset /> },
      { path: "/reset-otp", element: <ResetOTP /> },
      { path: "/update-password", element: <UpdatePassword /> },
      { path: "/otp", element: <OTP /> },
      { path: "/account-created", element: <AccountCreated /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/posts", element: <AllPosts /> },
      { path: "/post/:postId", element: <PostView /> },
      { path: "/commented-post", element: <CommentedPost /> },
      { path: "/replied-post", element: <RepliedPost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
