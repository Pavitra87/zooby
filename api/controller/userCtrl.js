const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const admin = require('../config/firebaseAdmin');
const User = require('../model/userModel');
const { verifyToken } = require('../middleware/verifyToken');

// POST /api/auth/registerwithemail
router.post('/register', async (req, res) => {
  const { firebaseUid, email, name, mobile } = req.body;

  if (!firebaseUid || !email || !name || !mobile) {
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
      firebaseUid
    });

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});



//login
router.post("/login", verifyToken, async (req, res) => {
  const { uid, email } = req.firebaseUser;

  console.log("Received UID:", uid);
  console.log("Received Email:", email);

  try {
    let user = await User.findOne({ firebaseUid: uid });
    console.log("User from DB:", user);

    if (!user) {
      user = await User.create({ firebaseUid: uid, email });
      console.log("New user created:", user);
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login failed:", err); // log entire error
    res.status(500).json({ message: "Server error", error: err.message });
  }
});






module.exports = router;