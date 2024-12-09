import React, { useState } from "react";
import { Box, TextField, Button, IconButton, Snackbar, Alert } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import StickyNote2TwoToneIcon from "@mui/icons-material/StickyNote2TwoTone";
import axios from "axios";
import NotesList from "./seeNotes"; // Import the NotesList component
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

const PostField = () => {
  const [inputValue, setInputValue] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [modalOpen, setModalOpen] = useState(false); // State for modal

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePost = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/short/notes", {
        noteContent: inputValue,
      });

      if (response.status === 201) {
        setAlertMessage("Note saved successfully!");
        setAlertSeverity("success");
        setAlertOpen(true);
        setInputValue(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error saving note:", error);
      setAlertMessage("Failed to save note. Please try again.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        borderRadius: "12px",
        padding: 2,
        boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        margin: "0 auto",
        mt: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={3}
        placeholder="What's on your mind?"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        sx={{
          bgcolor: "#F6FBF4",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#02824f",
            },
            "&:hover fieldset": {
              borderColor: "#02824f",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#02824f",
            },
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <IconButton
          aria-label="View Notes"
          onClick={() => setModalOpen(true)}
          sx={{
            bgcolor: "#F6FBF4",
            border: "1px solid #02824f",
            borderRadius: "8px",
            color: "#02824f",
            "&:hover": {
              bgcolor: "#E3F5E8",
            },
          }}
        >
          <StickyNote2TwoToneIcon />
        </IconButton>

        <Button
          variant="contained"
          startIcon={<AttachFileIcon />}
          onClick={handlePost}
          sx={{
            bgcolor: "#02824f",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#508D4E",
            },
          }}
        >
          Post
        </Button>
      </Box>

      {/* Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{
            bgcolor: "rgba(0, 100, 0, 0.9)", // Dark green with transparency
            border: "1px solid lightgreen", // Light green border
            color: "#f1f1f1", // Light green content
            fontWeight: "bold",
            borderRadius: "8px",
            "& .MuiAlert-icon": {
              color: "#f1f1f1", // Matching icon color
            },
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      {/* Notes Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalDialog
          aria-labelledby="notes-modal-title"
          aria-describedby="notes-modal-description"
          sx={{
            width: "90%",
            height: "90%",
            overflowY: "auto",
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            bgcolor: "#ffffff",
          }}
        >
          <Box id="notes-modal-description">
            <NotesList /> {/* Render NotesList inside the modal */}
          </Box>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default PostField;
