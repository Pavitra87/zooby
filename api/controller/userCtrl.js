const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const admin = require('../config/firebaseAdmin');
const User = require('../model/userModel');
const { verifyToken } = require('../middleware/verifyToken');

// POST /api/auth/registerwithemail
router.post('/register', verifyToken, async (req, res) => {
  const { name, mobile } = req.body;
  const { uid, email } = req.firebaseUser;

  if (!email || !name || !mobile) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered." });
    }

    const newUser = await User.create({
      name,
      email,
      mobile,
      firebaseUid: uid,
    });

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});



//login
router.post('/login', verifyToken, async (req, res) => {
  const { uid, email } = req.firebaseUser;

  try {
    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({ firebaseUid: uid, email });
      console.log("New user created:", user);
    }

    return res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});






module.exports = router;