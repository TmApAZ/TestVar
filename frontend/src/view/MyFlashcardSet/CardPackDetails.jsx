import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  Container,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import EditIcon from "@mui/icons-material/Edit";
import flashcardAPI from "../../api/flashcardAPI"; // Adjust the import path for your API

const CardPackDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await flashcardAPI.get(`/packs/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          setCards(data.cards || []);
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching cards");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [id]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const flipCard = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, flipped: !card.flipped } : card
      )
    );
  };

  const handleFullscreen = () => {
    if (cardContainerRef.current) {
      if (!document.fullscreenElement) {
        cardContainerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Container>
      <Box
        ref={cardContainerRef}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: 300, sm: 350, md: 400 },
          overflow: "hidden",
          marginBottom: 4,
          marginTop:'-110px'
        }}
      >
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
              key={card.id || index}
              sx={{
                flex: "0 0 100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: currentIndex === index ? 1 : 0.5,
                transition: "opacity 0.5s",
              }}
              onClick={() => flipCard(index)}
            >
              <Card
                sx={{
                  width: 400,
                  height: 250,
                  borderRadius: 3,
                  backgroundColor: card.flipped ? "#E8F5E9" : "#C8E6C9",
                  boxShadow: card.flipped
                    ? "6px 8px 0px #2E7D32"
                    : "6px 8px 0px #388E3C",
                  transform: card.flipped
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                  transition: "transform 0.6s, box-shadow 0.3s, background-color 0.3s",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  perspective: 1000,
                  border: "solid 3px #388E3C",
                }}
              >
                <Box
                  sx={{
                    width: "95%",
                    height: "80%",
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Front Side */}
                  {!card.flipped && (
                    <CardContent sx={{ textAlign: "center" }}>
                      <Typography variant="h4" color="#388E3C">
                        {card.question}
                      </Typography>
                    </CardContent>
                  )}

                  {/* Back Side */}
                  {card.flipped && (
                    <CardContent
                      sx={{
                        textAlign: "center",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <Typography variant="h5" color="#388E3C">
                        {card.answer}
                      </Typography>
                    </CardContent>
                  )}
                </Box>
              </Card>
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "green",
            backgroundColor: "#C0EBA6",
            border: "solid 2px #388E3C",
            "&:hover": { backgroundColor: "#AED581" },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "green",
            backgroundColor: "#C0EBA6",
            border: "solid 2px #388E3C",
            "&:hover": { backgroundColor: "#AED581" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Fullscreen and Update Buttons */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            gap: 3,
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={handleFullscreen}
            sx={{
              color: "green",
              backgroundColor: "#C0EBA6",
              border: "solid 2px #388E3C",
              "&:hover": { backgroundColor: "#AED581" },
            }}
          >
            <FullscreenIcon />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/cards/update/${id}`)}
            sx={{
              color: "green",
              backgroundColor: "#C0EBA6",
              border: "solid 2px #388E3C",
              "&:hover": { backgroundColor: "#AED581" },
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", my: 2, width: "80%", marginLeft:'122px' }}>

<LinearProgress
  variant="determinate"
  value={((currentIndex + 1) / cards.length) * 100}
  sx={{ height: 8, borderRadius: 5, backgroundColor: "#e0f2f1", marginTop:'-50px', mb:2 }}
  color="success"
/>
        <Typography variant="subtitle1" color="gray">
          Card {currentIndex + 1} of {cards.length}
        </Typography>
      </Box>

    </Container>
  );
};

export default CardPackDetails;
