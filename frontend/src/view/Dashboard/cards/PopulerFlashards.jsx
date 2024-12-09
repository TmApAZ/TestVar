import React, { useRef, useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Chemestry from "../../../assets/Img/chem.jpg";
import Physics from "../../../assets/Img/phy.jpeg";
import Bio from "../../../assets/Img/bio.png";
import Maths from "../../../assets/Img/maths.png";
import Politics from "../../../assets/Img/politics.jpg";

const CardSet = () => {
  // Dummy data array for cards
  const cardData = [
    {
      id: 1,
      title: "Organic Chemistry",
      description: "67 terms",
      image: Chemestry,
      user: "quizlette255568",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      title: "Physics Basics",
      description: "45 terms",
      image: Physics,
      user: "sciencefan88",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      title: "Math Formulas",
      description: "30 terms",
      image: Bio,
      user: "mathgenius01",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      title: "Biology Basics",
      description: "50 terms",
      image: Maths,
      user: "naturelover22",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      title: "World History",
      description: "75 terms",
      image: Politics,
      user: "historian101",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 6,
      title: "Programming 101",
      description: "25 terms",
      image: Politics,
      user: "coderlife",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollContainer = (direction) => {
    if (containerRef.current) {
      const cardWidth = 320 + 16; // Card width + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

      // Update index
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + (direction === "left" ? -1 : 1);
        return Math.max(0, Math.min(newIndex, cardData.length - 1));
      });

      // Scroll manually
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Title */}
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="left"
        sx={{ marginBottom: 4, color: "#252525" }}
      >
        Popular flashcard sets
      </Typography>

      {/* Arrow Controls */}
      <Box sx={{ position: "relative" }}>
        {currentIndex > 0 && (
          <IconButton
            sx={{
              position: "absolute",
              left: -40,
              top: "50%",
              zIndex: 2,
              transform: "translateY(-50%)",
              backgroundColor: "#C0EBA6",
            }}
            onClick={() => scrollContainer("left")}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}
        {currentIndex < cardData.length - 1 && (
          <IconButton
            sx={{
              position: "absolute",
              right: -40,
              top: "50%",
              zIndex: 2,
              transform: "translateY(-50%)",
              backgroundColor: "#C0EBA6",
            }}
            onClick={() => scrollContainer("right")}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        )}

        {/* Card Container */}
        <Box
          ref={containerRef}
          sx={{
            display: "flex",
            gap: 4,
            overflow: "hidden", // Completely disable scrolling
            scrollBehavior: "smooth",
          }}
        >
          {cardData.map((card) => (
            <Box
              key={card.id}
              sx={{
                minWidth: 320,
                padding: 2,
                border: "2px solid #388E3C",
                borderRadius: "12px",
                boxShadow: "6px 8px 0px #388E3C",
                backgroundColor: "#C0EBA6",
                transition: "0.7s",
                "&:hover": {
                  boxShadow: "4px 6px 8px 0px #388E3C",
                  transition: "0.7s",
                },
              }}
            >
              {/* Card Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {card.title}
                </Typography>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: "154px",
                    height: "80px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Description */}
              <Typography variant="body1" color="textSecondary" mb={2}>
                {card.description}
              </Typography>

              {/* Footer Section */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar
                  src={card.avatar}
                  alt={card.user}
                  sx={{ width: 40, height: 40, mr: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  {card.user}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CardSet;
