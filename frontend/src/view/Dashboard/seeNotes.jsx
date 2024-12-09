import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

// Predefined note colors
const noteColors = ["#FFF9C4", "#FFECB3", "#D7CCC8", "#B3E5FC", "#C8E6C9"];

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/short/notes");
        const updatedNotes = response.data.map((note) => ({
          ...note,
          color: noteColors[Math.floor(Math.random() * noteColors.length)],
        }));
        setNotes(updatedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        alert("Failed to fetch notes. Please try again.");
      }
    };

    fetchNotes();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#02824f",
          fontWeight: "bold",
        }}
      >
        My Notes
      </Typography>

      {/* Notes Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 2,
          padding: 2,
        }}
      >
        {notes.map((note) => (
          <Card
            key={note.id}
            sx={{
              bgcolor: note.color,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
              transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.01)", // Slight zoom effect
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)", // Stronger shadow
              },
            }}
          >
            <CardContent>
              <Typography
                variant="body1"
                sx={{
                  color: "#333", // Darker text color for better readability
                  wordWrap: "break-word",
                  fontSize: "1rem",
                  fontWeight: "500",
                  lineHeight: 1.5,
                }}
              >
                {note.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default NotesList;
