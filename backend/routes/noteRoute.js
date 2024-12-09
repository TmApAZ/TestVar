const express = require("express");
const { saveNote, getNotes } = require("../controllers/noteController");

const router = express.Router();

router.post("/notes", saveNote);
router.get("/notes", getNotes);

module.exports = router;
