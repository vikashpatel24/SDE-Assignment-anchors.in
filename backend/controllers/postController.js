// controllers/postController.js
const Post = require("../models/Post");
const User = require("../models/User");
const { validationResult } = require("express-validator");

exports.createPost = async (req, res) => {
  const { userId, title, description } = req.body;
  console.log(req.body);

  try {
    const user = await User.findById(userId);
    const newPost = new Post({
      user: user._id,
      title,
      description,
      comments: [],
    });
    const savedPost = await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//   Get all posts

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "postCreator",
        },
      },
      {
        $unwind: "$postCreator",
      },
      {
        $addFields: {
          commentCount: {
            $size: "$comments",
          },
          replyCount: {
            $sum: {
              $map: {
                input: "$comments",
                as: "comment",
                in: { $size: "$$comment.replies" },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          postCreator: "$postCreator.name",
          commentCount: 1,
          replyCount: 1,
        },
      },
    ]);

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//get post by id

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId)
      .populate("user", "name")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate({
        path: "comments.replies",
        populate: {
          path: "user",
          select: "name",
        },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentCount = post.comments.length;
    const replyCount = post.comments.reduce(
      (acc, comment) => acc + comment.replies.length,
      0
    );

    const detailedPost = {
      _id: post._id,
      title: post.title,
      description: post.description,
      user: post.user,
      comments: post.comments,
      commentCount,
      replyCount,
    };

    res.json(detailedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// get all commented post

exports.getCommentedPost = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch posts with comments for the given user
    const commentedPosts = await Post.find({ "comments.user": userId })
      .populate("user", "name")
      .populate({
        path: "comments.user",
        select: "name",
      })
      .populate({
        path: "comments.replies.user",
        select: "name",
      });

    // Modify the posts to include comment and reply counts
    const postsWithCounts = commentedPosts.map((post) => {
      const commentCount = post.comments.length;
      const replyCounts = post.comments.map(
        (comment) => comment.replies.length
      );
      const replyCount = replyCounts.reduce((acc, count) => acc + count, 0);

      return {
        ...post.toObject(),
        commentCount,
        replyCount,
      };
    });

    res.json(postsWithCounts);
    // console.log(postsWithCounts)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getRepliedPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find posts where the user has replied
    const repliedPosts = await Post.find({
      "comments.replies.user": userId,
    })
      .populate("user", "name")
      .populate({
        path: "comments.user",
        select: "name",
      })
      .populate({
        path: "comments.replies.user",
        select: "name",
      });

    const repliedPostData = repliedPosts.map((post) => {
      const commentCount = post.comments.length;
      const replyCounts = post.comments.map(
        (comment) => comment.replies.length
      );
      const replyCount = replyCounts.reduce((acc, count) => acc + count, 0);

      return {
        ...post.toObject(),
        commentCount,
        replyCount,
      };
    });

    res.json(repliedPostData);
    console.log(repliedPostData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// To comment

exports.postComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      return res.status(404).json({ message: "User or post not found" });
    }

    const newComment = {
      user: user._id,
      text,
      //   replies: [],
    };

    post.comments.push(newComment);
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// To reply

// Endpoint to add a reply to a comment on a post
exports.postReply = async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId, text } = req.body;

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      return res.status(404).json({ message: "User or post not found" });
    }

    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const newReply = {
      user: user._id,
      text,
    };

    post.comments[commentIndex].replies.push(newReply);
    const updatedPost = await post.save();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// exports.postComment = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const postId = req.params.postId;

//     // Validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Find the post to add a comment
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     // Add a comment to the post
//     const comment = {
//       user: req.user.id,
//       text,
//     };
//     post.comments.push(comment);

//     await post.save();

//     // Send email to the post creator
//     // const postCreator = await User.findById(post.user);
//     // sendEmail(postCreator.email, 'New comment on your post', `User commented: ${text}`);

//     return res.status(201).json({ message: 'Comment added successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.addReply = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const postId = req.params.postId;
//     const commentId = req.params.commentId;

//     // Validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Find the post and comment to add a reply
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }

//     const comment = post.comments.id(commentId);
//     if (!comment) {
//       return res.status(404).json({ message: 'Comment not found' });
//     }

//     // Add a reply to the comment
//     const reply = {
//       user: req.user.id,
//       text,
//     };
//     comment.replies.push(reply);

//     await post.save();

//     // Send email to the post creator and the original commenter
//     const postCreator = await User.findById(post.user);
//     sendEmail(postCreator.email, 'New reply on your post', `User replied: ${text}`);

//     const originalCommenter = await User.findById(comment.user);
//     sendEmail(originalCommenter.email, 'User replied to your comment', `User replied: ${text}`);

//     return res.status(201).json({ message: 'Reply added successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Example email sending function using nodemailer
// const sendEmail = (to, subject, text) => {
//   // Implement your email sending logic here
// };
