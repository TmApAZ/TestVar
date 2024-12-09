import React, { useState } from "react";
import { Box, IconButton, Typography, Container } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Flashcard from './flashCard';
import Card1 from './cards/card1';
import Card2 from './cards/card2';
import Card3 from './cards/card3';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Combine the cards into an array
  const cards = [<Card3 />, <Card2 />, <Card1 />];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length); // Loop back to start
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: 250, sm: 300, md: 400 }, // Responsive height
          overflow: "hidden",
          marginBottom: 4, // Space between carousel and paragraph
        }}
      >
        {/* Slider Content */}
        <Box
          sx={{
            display: "flex",
            transform: `translateX(${-currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
            width: `${cards.length * 100}%`,
          }}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 100%", // Ensure each card takes up the full width
                display: "flex",
                justifyContent: "center", // Center-align the card
              }}
            >
              {card}
            </Box>
          ))}
        </Box>

        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            bottom: 10,
            left: { xs: "30%", sm: "40%" }, // Responsive positioning
            zIndex: 10,
            color: "green",
            backgroundColor: "#C0EBA6",
            border: 'solid 2px #388E3C',
            "&:hover": { backgroundColor: "#AED581" },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            bottom: 10,
            right: { xs: "30%", sm: "40%" }, // Responsive positioning
            zIndex: 10,
            color: "green",
            backgroundColor: "#C0EBA6",
            border: 'solid 2px #388E3C',
            "&:hover": { backgroundColor: "#AED581" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Values Paragraph */}
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography variant="h6" component="p" gutterBottom>
          At TestVar, we believe in empowering minds and creating meaningful experiences. Our values center on innovation, curiosity, and growth, helping you unlock your potential through knowledge and creativity. Each card in this journey represents a new opportunity—an invitation to explore, learn, and excel. We are committed to delivering value with every flip, inspiring you to think beyond boundaries and take bold steps toward success. Together, let’s turn every challenge into a stepping stone for greatness.
        </Typography>
      </Box>
    </Container>
  );
};

export default Carousel;     
