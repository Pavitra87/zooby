const admin = require('../config/firebaseAdmin');

const verifyToken = async (req, res, next) => {
  const token = req.body.token || req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decodedToken; 
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
