import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Grid,
    Box,
    Typography,
    Divider,
    CircularProgress,
    Alert,
    InputBase,
    IconButton,
    Rating,
} from "@mui/material";
import { Favorite, Share, WhatsApp, Facebook, Instagram, Twitter } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import XIcon from '@mui/icons-material/X';

const PopularFlashcards = () => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false); // Modal state

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found. Please log in again.");
                }

                const response = await axios.get(
                    "http://localhost:5000/api/flashcards/all-cards",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setCards(response.data);
                setFilteredCards(response.data); // Initialize filtered cards with all cards
            } catch (err) {
                console.error("Error fetching cards:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Failed to fetch cards.");
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);

        const filtered = cards.filter((card) =>
            card.question.toLowerCase().includes(query)
        );
        setFilteredCards(filtered);
    };

    const toggleModal = () => setModalOpen(!modalOpen);

    const shareContent = {
        message: "Check out this amazing flashcard site to boost your learning! 🌟",
        link: "www.testvar.com/vedha8/",
    };

    const handleShare = (platform) => {
        const { message, link } = shareContent;
        const encodedMessage = encodeURIComponent(`${message} ${link}`);
        let shareUrl = "";

        switch (platform) {
            case "whatsapp":
                shareUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
                break;
            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
                break;
            case "instagram":
                alert("Instagram does not support direct URL sharing. Share this link manually: " + link);
                return;
            case "twitter":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
                break;
            default:
                console.error("Unsupported platform");
                return;
        }

        window.open(shareUrl, "_blank");
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box p={4}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                sx={{ marginTop: "-140px", marginLeft: "50px" }}
            >
                <Typography variant="h4" gutterBottom color="success">
                    Most Popular Flashcards
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#F6FBF4",
                        borderRadius: "12px",
                        padding: "4px 8px",
                        width: "40%",
                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                        border: "solid 1px #388E3C",
                    }}
                >
                    <SearchIcon
                        sx={{ color: "#388E3C", marginRight: "8px", cursor: "pointer" }}
                    />
                    <InputBase
                        placeholder="Search..."
                        onChange={handleSearch}
                        sx={{
                            flex: 1,
                            fontSize: "16px",
                            color: "#333",
                        }}
                    />
                </Box>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={9} sx={{ marginLeft: "150px" }}>
                    {filteredCards.length === 0 ? (
                        <Typography variant="h6" align="center">
                            No flashcards found.
                        </Typography>
                    ) : (
                        <Grid container spacing={4}>
                            {filteredCards.map((pack) => (
                                <Grid item xs={12} sm={6} md={4} lg={12} key={pack.id}>
                                    <Box
                                        sx={{
                                            border: "3px solid #388E3C",
                                            borderRadius: "12px",
                                            padding: "16px",
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            backgroundColor: "#C0EBA6",
                                            position: "relative",
                                        }}
                                    >
                                        {/* Top-right Icons */}
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: "8px",
                                                right: "8px",
                                                display: "flex",
                                                gap: "8px",
                                            }}
                                        >
                                            <IconButton aria-label="share" size="small" 
                        onClick={toggleModal}>
                                                <Share />
                                            </IconButton>
                                            <IconButton aria-label="favorite" size="small">
                                                <Favorite />
                                            </IconButton>
                                        </Box>

                                        <Box display="flex" alignItems="center" flexGrow={1}>
                                            <Typography
                                                variant="h6"
                                                sx={{ flex: 1, wordBreak: "break-word" }}
                                            >
                                                {pack.question}
                                            </Typography>
                                            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                                            <Typography
                                                variant="h6"
                                                sx={{ flex: 1, wordBreak: "break-word" }}
                                            >
                                                {pack.answer}
                                            </Typography>
                                        </Box>
                                        <Divider sx={{ my: 2 }} />
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography variant="caption">
                                                Created by: {pack.user_name}
                                            </Typography>
                                            <Rating name="rating" value={4} size="small" controlled />
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>

            {/* Modal for Social Media Icons */}
            {/* Modal for Social Media Icons */}
<Modal open={modalOpen} onClose={toggleModal}>
                <ModalDialog
                    aria-labelledby="social-modal-title"
                    aria-describedby="social-modal-description"
                    sx={{
                        borderRadius: "20px",
                        padding: "24px",
                        maxWidth: "450px",
                        bgcolor: "linear-gradient(135deg, #e0f7fa, #c8e6c9)",
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
                    }}
                >
                    <Typography
                        id="social-modal-title"
                        variant="h5"
                        textAlign="center"
                        fontWeight="bold"
                        color="#2e7d32"
                        mb={2}
                    >
                        Share This Flashcard!
                    </Typography>
                    <Typography
                        id="social-modal-description"
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                        mb={3}
                    >
                        Spread the word on your favorite social platforms.
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <IconButton
                            onClick={() => handleShare("whatsapp")}
                            sx={{
                                bgcolor: "#25d366",
                                color: "#fff",
                                "&:hover": { bgcolor: "#1da755" },
                                width: "60px",
                                height: "60px",
                            }}
                            aria-label="WhatsApp"
                        >
                            <WhatsApp fontSize="large" />
                        </IconButton>
                        <IconButton
                            onClick={() => handleShare("facebook")}
                            sx={{
                                bgcolor: "#4267B2",
                                color: "#fff",
                                "&:hover": { bgcolor: "#365899" },
                                width: "60px",
                                height: "60px",
                            }}
                            aria-label="Facebook"
                        >
                            <Facebook fontSize="large" />
                        </IconButton>
                        <IconButton
                            onClick={() => handleShare("instagram")}
                            sx={{
                                bgcolor: "#E1306C",
                                color: "#fff",
                                "&:hover": { bgcolor: "#bc005c" },
                                width: "60px",
                                height: "60px",
                            }}
                            aria-label="Instagram"
                        >
                            <Instagram fontSize="large" />
                        </IconButton>
                        <IconButton
                            onClick={() => handleShare("twitter")}
                            sx={{
                                bgcolor: "#1DA1F2",
                                color: "#fff",
                                "&:hover": { bgcolor: "#1991da" },
                                width: "60px",
                                height: "60px",
                            }}
                            aria-label="Twitter"
                        >
                            <Twitter fontSize="large" />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            textAlign: "center",
                            marginTop: "16px",
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary", fontStyle: "italic" }}
                        >
                            Sharing is caring. Let others benefit too!
                        </Typography>
                    </Box>
                </ModalDialog>
            </Modal>

        </Box>
    );
};

export default PopularFlashcards;
