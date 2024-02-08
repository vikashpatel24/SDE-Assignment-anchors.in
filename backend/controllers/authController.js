// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { request } = require("express");

// const generateAuthToken = (userId) => {
//   return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
// };

// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// const sendOTP = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.your-email-provider.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'your-email@example.com',
//       pass: 'your-email-password',
//     },
//   });

//   const mailOptions = {
//     from: 'your-email@example.com',
//     to: email,
//     subject: 'OTP Verification',
//     text: `Your OTP for verification is: ${otp}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log(`OTP sent to ${email}`);
//   } catch (error) {
//     console.error(`Error sending OTP to ${email}: ${error.message}`);
//   }
// };

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "Email doesn't exist", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && !isPasswordValid)
      return res.json({ msg: "Password is incorrect", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Check if user with the email already exists
//     let existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists with this email' });
//     }

//     // Generate OTP
//     // const otp = generateOTP();

//     // Create a new user
//     const user = new User({
//       name,
//       email,
//       password, // Password should be hashed, but for simplicity, we're skipping it here
//       otp,
//       otpExpiration: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
//     });

//     await user.save();

//     // Send OTP to the user's email
//     // await sendOTP(email, otp);

//     return res.status(201).json({ message: 'User registered successfully. OTP sent to email.' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// exports.verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     // Validation
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Check if user with the email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if OTP is valid and not expired
//     if (user.otp === otp && user.otpExpiration > Date.now()) {
//       // OTP is valid, generate JWT token
//       const token = generateAuthToken(user._id);

//       // Clear OTP and expiration fields
//       user.otp = undefined;
//       user.otpExpiration = undefined;
//       await user.save();

//       return res.status(200).json({ token });
//     } else {
//       return res.status(401).json({ message: 'Invalid OTP or OTP expired' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
