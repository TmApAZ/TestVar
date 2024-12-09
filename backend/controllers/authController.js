const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const SECRET_KEY = "your_jwt_secret";

const executeQuery = (query, values = []) =>
    new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });

// Register User (Student)
exports.registerUser = async (req, res) => {
    const { fullName, email, password, mobile_number, grade, address } = req.body;
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (fullName, email, password, mobile_number, grade, address, profile_picture, role) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, 'student')`;
        await executeQuery(query, [fullName, email, hashedPassword, mobile_number, grade, address, profile_picture]);
        res.status(201).send("Student registered successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = "SELECT * FROM users WHERE email = ?";
        const results = await executeQuery(query, [email]);
        console.log("Database results:", results); // Debugging

        if (results.length === 0) return res.status(404).send("User not found");

        const user = results[0];
        console.log("User role:", user.role); // Debugging

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const token = jwt.sign(
            { id: user.id, fullName: user.fullName, role: user.role },
            SECRET_KEY,
            { expiresIn: "1h" }
        );
        console.log("Generated token:", token); // Debugging

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send("Server error");
    }
};


// Get User Data
exports.getUser = async (req, res) => {
    const { id } = req.user;

    try {
        const query = "SELECT fullName, email, mobile_number, grade, address, profile_picture, role FROM users WHERE id = ?";
        const results = await executeQuery(query, [id]);
        res.status(200).json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching user data");
    }
};

// Create Admin (Only Accessible by Admins)
exports.createAdmin = async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).send("Forbidden");

    const { fullName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (fullName, email, password, role) 
                       VALUES (?, ?, ?, 'admin')`;
        await executeQuery(query, [fullName, email, hashedPassword]);
        res.status(201).send("Admin created successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating admin");
    }
};

// Get All Users (Admin Only)
exports.getAllUsers = async (req, res) => {
    if (req.user.role !== "admin") return res.status(403).send("Forbidden");

    try {
        const query = "SELECT id, fullName, email, mobile_number, grade, address, role FROM users";
        const results = await executeQuery(query);
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching users");
    }
};
