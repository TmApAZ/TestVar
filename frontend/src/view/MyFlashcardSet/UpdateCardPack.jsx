import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, IconButton, Grid, Divider } from "@mui/material";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import flashcardAPI from "../../api/flashcardAPI";

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

const UpdateCardPack = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardPack, setCardPack] = useState({ name: "", cards: [] });
  const [newCard, setNewCard] = useState({ question: "", answer: "" });

  useEffect(() => {
    const fetchCardPackDetails = async () => {
      try {
        const { data } = await flashcardAPI.get(`/packs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCardPack({ name: data.pack.name, cards: data.cards });
      } catch (err) {
        console.error(err);
        alert("Error fetching card pack details");
      } 
    };

    fetchCardPackDetails();
  }, [id]);

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cardPack.cards];
    updatedCards[index][field] = value;
    setCardPack({ ...cardPack, cards: updatedCards });
  };

  const handleNewCardChange = (field, value) => {
    setNewCard({ ...newCard, [field]: value });
  };

  const addNewCard = () => {
    if (newCard.question && newCard.answer) {
      setCardPack({ ...cardPack, cards: [...cardPack.cards, newCard] });
      setNewCard({ question: "", answer: "" });
    } else {
      alert("Both question and answer are required");
    }
  };

  const removeCard = (index) => {
    const updatedCards = cardPack.cards.filter((_, i) => i !== index);
    setCardPack({ ...cardPack, cards: updatedCards });
  };

  const handleSubmit = async () => {
    try {
        const payload = {
            name: cardPack.name,
            cards: cardPack.cards.map(({ question, answer }) => ({ question, answer })), // Filter out unwanted fields
        };

        const response = await flashcardAPI.put(`/packs/${id}`, payload, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        alert("Card pack updated successfully");
        navigate("/cards");
    } catch (err) {
        console.error("Update failed:", err.response || err.message);
        alert("Error updating card pack");
    }
};

  

  return (
    <Box p={8} sx={{ marginTop:'-156px', marginLeft:'40px' }}>
      <Typography variant="h4" gutterBottom color="success">
        Update Card Pack
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        label="Card Pack Name"
        variant="outlined"
        fullWidth
        value={cardPack.name}
        onChange={(e) => setCardPack({ ...cardPack, name: e.target.value })}
        sx={{ mb: 3 }}
      />

      <Typography variant="h6" gutterBottom>
        Cards
      </Typography>
      {cardPack.cards.map((card, index) => (
        <Box key={index} mb={2} display="flex" alignItems="center" gap={2}>
          <TextField
            label={`Question ${index + 1}`}
            variant="outlined"
            fullWidth
            value={card.question}
            onChange={(e) => handleCardChange(index, "question", e.target.value)}
          />
          <TextField
            label={`Answer ${index + 1}`}
            variant="outlined"
            fullWidth
            value={card.answer}
            onChange={(e) => handleCardChange(index, "answer", e.target.value)}
          />
          <IconButton onClick={() => removeCard(index)} color="error">
            <DeleteTwoToneIcon />
          </IconButton>
        </Box>
      ))}

      <Typography variant="h6" gutterBottom>
        Add New Card
      </Typography>
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <TextField
          label="New Question"
          variant="outlined"
          fullWidth
          value={newCard.question}
          onChange={(e) => handleNewCardChange("question", e.target.value)}
        />
        <TextField
          label="New Answer"
          variant="outlined"
          fullWidth
          value={newCard.answer}
          onChange={(e) => handleNewCardChange("answer", e.target.value)}
        />
        <Button variant="contained" onClick={addNewCard} startIcon={<AddTwoToneIcon/>} color="success">
          Add
        </Button>
      </Box>

      <Button variant="contained" color="success" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
};

export default UpdateCardPack;
