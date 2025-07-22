const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const admin = require('../config/firebaseAdmin');
const User = require('../model/userModel');

// POST /api/auth/registerwithemail
router.post('/register', async (req, res) => {
  const { email, password, name, mobile } = req.body;

  // Validation
  if (!email || !password || !name || !mobile) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists in MongoDB
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered." });
    }

    // Create user in Firebase
    const firebaseUser = await admin.auth().createUser({
      email,
      password
    });

    const firebaseUid = firebaseUser.uid;

    // Optionally hash the password before saving (for non-Firebase login)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in MongoDB
    const newUser = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      firebaseUid
    });

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});


//login
router.post('/login', async (req, res) => {
  const { token, firebaseUid } = req.body;

  if (!token || !firebaseUid) {
    return res.status(400).json({ message: 'Token and Firebase UID are required' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken.uid !== firebaseUid) {
      return res.status(403).json({ message: 'Token UID mismatch' });
    }

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    return res.status(200).json({ message: 'Authenticated', user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
});






module.exports = router;