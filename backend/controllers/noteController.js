const db = require("../config/db");

exports.saveNote = (req, res) => {
    const { noteContent } = req.body;

    if (!noteContent) {
        return res.status(400).json({ message: "Note content is required" });
    }

    const query = "INSERT INTO notes (content) VALUES (?)";
    db.query(query, [noteContent], (err, result) => {
        if (err) {
            console.error("Error saving note:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "Note saved successfully", noteId: result.insertId });
    });
};

exports.getNotes = (req, res) => {
    const query = "SELECT * FROM notes ORDER BY id DESC";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching notes:", err);
            return res.status(500).json({ message: "Server error" });
        }
        res.status(200).json(results);
    });
};
