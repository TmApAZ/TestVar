const express = require("express");
const { 
    registerUser, 
    loginUser, 
    getUser, 
    createAdmin, 
    getAllUsers // Import the new controller function
} = require("../controllers/authController");
const { verifyToken, verifyAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Register Route
router.post("/register", upload.single("profile_picture"), registerUser);

// Login Route
router.post("/login", loginUser);

// Get User Data Route
router.get("/user", verifyToken, getUser);

// Create Admin Route
router.post("/admin", verifyToken, verifyAdmin, upload.single("profile_picture"), createAdmin);

// Get All Users Route (Admin Only)
router.get("/users", verifyToken, verifyAdmin, getAllUsers);

module.exports = router;
