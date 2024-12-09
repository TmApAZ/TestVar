import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import flashcardAPI from "../../api/flashcardAPI";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Tooltip,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Divider,
  Radio,
  Drawer,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ControlPointDuplicateTwoToneIcon from '@mui/icons-material/ControlPointDuplicateTwoTone';
import FolderOpenTwoToneIcon from '@mui/icons-material/FolderOpenTwoTone';
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import BoxJoy from "@mui/joy/Box";
import TypographyJoy from "@mui/joy/Typography";
import ButtonJoy from "@mui/joy/Button";
import CreateNewFolderTwoToneIcon from '@mui/icons-material/CreateNewFolderTwoTone';
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';

const CreateCardPack = () => {
  const [packName, setPackName] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [isPublic, setIsPublic] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [progress, setProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [savedPacksModalOpen, setSavedPacksModalOpen] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [addCardDisabled, setAddCardDisabled] = useState(false);
  const [progressColor, setProgressColor] = useState("#388E3C"); // Default green
  const MAX_CARDS = 20;
  const navigate = useNavigate();

  const updateProgress = () => {
    const completedFields = cards.reduce(
      (count, card) => count + (card.question && card.answer ? 2 : 0),
      0
    );
    const totalFields = 40; // Maximum 20 cards, 2 fields per card
    const progress = Math.floor((completedFields / totalFields) * 100);
    setProgress(progress);
  
    // Set progress color based on card count
    if (cards.length > 18) {
      setProgressColor("red"); // Over limit
    } else if (cards.length >= 15) {
      setProgressColor("#FCC737"); // Near limit
    } else {
      setProgressColor("#388E3C"); // Safe zone (green)
    }
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
    updateProgress();
  };

  const handleSavedPacksModalToggle = () => {
    setSavedPacksModalOpen(!savedPacksModalOpen);
  };

   const addCard = () => {
    if (cards.length < MAX_CARDS) {
      setCards([...cards, { question: "", answer: "" }]);
      updateProgress();
    }
  };

  const duplicateCard = (index) => {
    if (cards.length < MAX_CARDS) {
      const cardToDuplicate = cards[index];
      setCards([...cards, { ...cardToDuplicate }]);
      updateProgress();
    }
  };


  const removeCard = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
    updateProgress();
  };

  // const updateProgress = () => {
  //   const completedFields = cards.reduce(
  //     (count, card) => count + (card.question && card.answer ? 2 : 0),
  //     0
  //   );
  //   const totalFields = cards.length * 2 + 1;
  //   setProgress(Math.floor((completedFields / totalFields) * 100));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!packName.trim()) {
      setAlert({ open: true, message: "Pack name is required!", severity: "error" });
      return;
    }

    if (cards.some((card) => !card.question.trim() || !card.answer.trim())) {
      setAlert({
        open: true,
        message: "All cards must have a question and an answer!",
        severity: "error",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await flashcardAPI.post(
        "/create",
        { name: packName, cards, isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlert({
        open: true,
        message: "Card pack created successfully!",
        severity: "success",
      });
      setTimeout(() => navigate("/cards"), 1500);
    } catch (err) {
      console.error(err);
      setAlert({ open: true, message: "Failed to create card pack!", severity: "error" });
    }
  };

  const resetForm = () => {
    setPackName("");
    setCards([{ question: "", answer: "" }]);
    setIsPublic(false);
    setProgress(0);
    setProgressColor("primary");
    setProgressMessage("");
    setAddCardDisabled(false);
  };

  const handleAssignAction = () => {
    // Logic to handle the save action (if any)
    console.log("Card pack assigned to the selected folder.");
  
    // Close the modal
    handleSavedPacksModalToggle();
  };
  

  const handleDragEnd = (event) => {
    const { source, destination } = event;
    if (!destination) return;

    const reorderedCards = Array.from(cards);
    const [moved] = reorderedCards.splice(source.index, 1);
    reorderedCards.splice(destination.index, 0, moved);
    setCards(reorderedCards);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "-5rem", textAlign: "left" }}>
      
      <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 5,
  }}
>
  <Typography variant="h4" color="green" gutterBottom>
    {packName.trim() ? `Edit "${packName}"` : "Create a New Card Pack"}
  </Typography>
  <Tooltip title="Add to folder" arrow>
    <IconButton
      color="success"
      onClick={handleSavedPacksModalToggle}
      sx={{ border:'solid 1px #388E3C' }}
    >
      <CreateNewFolderTwoToneIcon />
    </IconButton>
  </Tooltip>
</Box>
{/* Modal for Saved Packs */}
<Modal open={savedPacksModalOpen} onClose={handleSavedPacksModalToggle}>
  <ModalDialog
    aria-labelledby="saved-packs-title"
    aria-describedby="saved-packs-description"
    sx={(theme) => ({
      width: "600px",
      maxWidth: "90%",
      [theme.breakpoints.only("xs")]: {
        top: "unset",
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 0,
        transform: "none",
        maxWidth: "unset",
      },
    })}
  >
    <TypographyJoy id="saved-packs-title" level="h2" color="success">
      Assign to Folder
    </TypographyJoy>
    <TypographyJoy id="saved-packs-description" textColor="text.tertiary">
      Select a folder to assign your saved card packs or manage your folders.
    </TypographyJoy>
    <Divider sx={{ height: 3, my: 2 }} />

    <BoxJoy
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Example Folders */}
      {[1, 2, 3].map((folder, index) => (
        <BoxJoy
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 3px 5px rgba(0,0,0,0.1)",
          }}
        >
          <BoxJoy display="flex" alignItems="center" gap={2}>
            <FolderOpenTwoToneIcon
              sx={{ fontSize: 40, color: ["#3f51b5", "#ff9800", "#4caf50"][index] }}
            />
            <BoxJoy>
              <TypographyJoy level="body1">Folder {folder}</TypographyJoy>
              <TypographyJoy level="body2" textColor="text.secondary">
                {`Contains ${folder * 5} card packs`}
              </TypographyJoy>
            </BoxJoy>
          </BoxJoy>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton>
              <ModeTwoToneIcon color="success"/>
            </IconButton>
            <Radio
              color="default"
              sx={{
                "&.Mui-checked": {
                  color: "#388E3C",
                },
              }}
            />
          </Stack>
        </BoxJoy>
      ))}
      
    {/* Action Buttons */}
    <Stack direction="row" spacing={3} justifyContent="flex-end">
      <ButtonJoy
        variant="outlined"
        color="neutral"
        onClick={handleSavedPacksModalToggle}
        sx={{
          marginTop: 2,
          backgroundColor: "#f8f9fa",
          color: "#333",
          "&:hover": {
            backgroundColor: "#e0e0e0",
          },
        }}
      >
        Cancel
      </ButtonJoy>
      <ButtonJoy
        variant="contained"
        onClick={handleAssignAction}
        sx={{
          marginTop: 2,
          backgroundColor: "#388E3C",
          color: "#f1f1f1",
          "&:hover": {
            backgroundColor: "#2c6b29",
          },
        }}
      >
        Assign
      </ButtonJoy>
    </Stack>
    </BoxJoy>

    <Divider sx={{ my: 2 }} />

  </ModalDialog>
</Modal>



        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Card Pack Name"
            variant="outlined"
            color="#388E3C"
            value={packName}
            onChange={(e) => setPackName(e.target.value)}
            helperText="Give your card pack a unique and descriptive name."
            style={{ marginBottom: "1.5rem" }}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "green", // Default border color
                  color:'#388E3C'
                },
                "&:hover fieldset": {
                  borderColor: "darkgreen",// Default border color
                  color:'#388E3C' // Hover state
                },
                "&.Mui-focused fieldset": {
                  borderColor: "limegreen", // Default border color
                  color:'#388E3C'// Focused state
                },
              },
            }}
          />
          <TextField
  fullWidth
  label="Add a description..."
  variant="outlined"
  color="#388E3C"
  style={{ marginBottom: "1.5rem" }}
  required
  multiline
  minRows={2} // Minimum height
  sx={{
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "green", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "darkgreen", // Hover state border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "limegreen", // Focused state border color
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px", // Adjust the padding
    },
  }}
/>

<LinearProgress
  variant="determinate"
  value={progress}
  sx={{
    marginBottom: "2rem",
    height: "8px",
    borderRadius: "4px",
    "& .MuiLinearProgress-bar": {
      backgroundColor: progressColor, // Dynamic color
    },
    backgroundColor: "rgba(56, 142, 60, 0.3)", // Lighter green for the background
  }}
/>
{cards.length > 20 ? (
  <Typography color="red" sx={{ mt: 1 }}>
    Limit exceeded! Maximum cards allowed: 20.
  </Typography>
) : cards.length >= 15 ? (
  <Typography color="yellow" sx={{ mt: 1 }}>
    Warning: You are nearing the card limit (20 cards).
  </Typography>
) : (
  <Typography color="green" sx={{ mt: 1 }}>
    You can add up to 20 cards.
  </Typography>
)}


{cards.map((card, index) => (
  <Paper
    key={index}
    elevation={3}
    sx={{
      padding: "1rem",
      marginBottom: "1rem",
      borderRadius: "8px",
      boxShadow: "0px 3px -1px #252525",
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem",
      }}
    >
      <Typography variant="h6" color="textSecondary">
       {index + 1}
      </Typography>
      <DragIndicatorIcon sx={{cursor:'grab', color:'#388E3C'}}/>
    </Box>
    <Divider sx={{ mb:2 }}/>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <Tooltip title="Enter the question" arrow>
          <TextField
            fullWidth
            label={`Question ${index + 1}`}
            variant="outlined"
            value={card.question}
            onChange={(e) => {
              const updatedCards = [...cards];
              updatedCards[index].question = e.target.value;
              setCards(updatedCards);
              updateProgress();
            }}
            required
          />
        </Tooltip>
      </Grid>
      <Grid item xs={5}>
        <Tooltip title="Enter the answer" arrow>
          <TextField
            fullWidth
            label={`Answer ${index + 1}`}
            variant="outlined"
            value={card.answer}
            onChange={(e) => {
              const updatedCards = [...cards];
              updatedCards[index].answer = e.target.value;
              setCards(updatedCards);
              updateProgress();
            }}
            required
          />
        </Tooltip>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Duplicate this card" arrow>
          <IconButton
            color="success"
            onClick={() => duplicateCard(index)}
            aria-label="duplicate"
            size="large"
          >
            <ControlPointDuplicateTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={1}>
        <Tooltip title="Remove this card" arrow>
          <IconButton
            color="error"
            onClick={() => removeCard(index)}
            aria-label="delete"
            size="large"
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  </Paper>
))}

          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
          <Grid item xs={6}>
  <Button
    startIcon={<AddCircleOutlineIcon />}
    color="success"
    variant="outlined"
    fullWidth
    onClick={addCard}
    disabled={cards.length >= 20} // Disable when limit is reached
  >
    Add Card
  </Button>
</Grid>

            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    color="success"
                  />
                }
                label="Public"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" marginTop="2rem" marginBottom="2rem">
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{textTransform:'capitalize', fontSize:'18px'}}
            >
              Create Card Pack
            </Button>
            <Button
              color="error"
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={resetForm}
            >
              Reset
            </Button>
          </Box>
        </form>
        <Snackbar
          open={alert.open}
          autoHideDuration={4000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert
            onClose={() => setAlert({ ...alert, open: false })}
            severity={alert.severity}
            variant="filled"
          >
            {alert.message}
          </Alert>
        </Snackbar>
    </Container>
  );
};

export default CreateCardPack;
