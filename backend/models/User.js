const pool = require("../config/db");

const createUser = async (fullName, email, hashedPassword) => {
    const [result] = await pool.query(
        "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
        [fullName, email, hashedPassword]
    );
    return result.insertId;
};

const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};

module.exports = { createUser, getUserByEmail };
