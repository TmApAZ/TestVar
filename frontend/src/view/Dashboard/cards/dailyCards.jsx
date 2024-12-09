import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import flashcardAPI from "../../../api/flashcardAPI";
import { useNavigate } from "react-router-dom";

const CardSet = () => {
    const [cardPacks, setCardPacks] = useState([]);
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); // Updated hook

    useEffect(() => {
        const fetchCardPacks = async () => {
            try {
                const { data } = await flashcardAPI.get("/packs", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCardPacks(data);
            } catch (err) {
                console.error(err);
                alert("Error fetching card packs");
            }
        };

        fetchCardPacks();
    }, []);

    const scrollContainer = (direction) => {
        if (containerRef.current) {
            const cardWidth = 320 + 16; // Card width + gap
            const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

            setCurrentIndex((prevIndex) => {
                const newIndex = prevIndex + (direction === "left" ? -1 : 1);
                return Math.max(0, Math.min(newIndex, cardPacks.length - 1));
            });

            containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                textAlign="left"
                sx={{ marginBottom: 4, color: "#252525" }}
            >
                Your Flashcard Sets
            </Typography>

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
                {currentIndex < cardPacks.length - 1 && (
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

                <Box
                    ref={containerRef}
                    sx={{
                        display: "flex",
                        gap: 4,
                        overflow: "hidden",
                        scrollBehavior: "smooth",
                    }}
                >
                    {cardPacks.map((pack) => (
                        <Box
                            key={pack.id}
                            sx={{
                                minWidth: 320,
                                padding: 2,
                                border: "2px solid #388E3C",
                                borderRadius: "12px",
                                boxShadow: "6px 8px 0px #388E3C",
                                backgroundColor: "#C0EBA6",
                                transition: "0.7s",
                                    cursor:'pointer',
                                "&:hover": {
                                    boxShadow: "4px 6px 8px 0px #388E3C",
                                    transition: "0.7s",
                                },
                            }}
                        >
                            <Box
                                onClick={() => navigate(`/cards/${pack.id}`)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    {pack.name || "Untitled Pack"}
                                </Typography>
                            </Box>

                            <Typography variant="body1" color="textSecondary" mb={2}>
                                {pack.card_count
                                    ? `${pack.card_count} terms`
                                    : "No terms available"}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default CardSet;
