// routes/auth.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const User = require("../models/User"); // Make sure path is correct

router.post("/login", verifyToken, async (req, res) => {
  try {
    const { uid, email } = req.firebaseUser;

    console.log("✅ UID:", uid);
    console.log("✅ Email:", email);

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      user = await User.create({ firebaseUid: uid, email });
      console.log("🆕 New user created:", user);
    } else {
      console.log("🙋 Existing user found:", user);
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Login failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
