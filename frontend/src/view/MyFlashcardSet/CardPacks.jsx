import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    Grid,
    Typography,
    IconButton,
    Box,
    Divider,
    TextField,
    InputBase,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import GridViewIcon from "@mui/icons-material/GridView";
import ListViewIcon from "@mui/icons-material/ViewList";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

import flashcardAPI from "../../api/flashcardAPI";

const CardPacks = () => {
    const [cardPacks, setCardPacks] = useState([]);
    const [filteredCardPacks, setFilteredCardPacks] = useState([]);
    const [isGridView, setIsGridView] = useState(false); // State to toggle view
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCardPacks = async () => {
            try {
                const { data } = await flashcardAPI.get("/packs", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCardPacks(data);
                setFilteredCardPacks(data);
            } catch (err) {
                console.error(err);
                alert("Error fetching card packs");
            }
        };

        fetchCardPacks();
    }, []);

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);

        const filtered = cardPacks.filter((pack) =>
            pack.name.toLowerCase().includes(searchValue)
        );

        // Sort alphabetically
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        setFilteredCardPacks(filtered);
    };

    const handleDelete = async (packId) => {
        if (!window.confirm("Are you sure you want to delete this card pack?")) return;

        try {
            await flashcardAPI.delete(`/packs/${packId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setCardPacks((prevPacks) => prevPacks.filter((pack) => pack.id !== packId));
            setFilteredCardPacks((prevPacks) => prevPacks.filter((pack) => pack.id !== packId));

            alert("Card pack deleted successfully!");
        } catch (err) {
            console.error(err);
            alert("Error deleting card pack");
        }
    };

    const toggleView = () => {
        setIsGridView((prev) => !prev);
    };

    return (
        <div
            style={{
                marginLeft: "80px",
                marginTop: "-100px",
                overflowX: "hidden",
                width: "calc(100% - 100px)",
            }}
        >
            {/* Header with Search Bar */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h4" fontWeight={600} color="success">
                    Your Card Packs
                </Typography>
                <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#F6FBF4',
                            borderRadius: '12px',
                            padding: '4px 8px',
                            width: '40%',
                            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                            border: 'solid 1px #388E3C',
                        }}
                    >
                        <SearchIcon sx={{ color: '#388E3C', marginRight: '8px' }} />
                        <InputBase
                            placeholder="Search..."
                        onChange={handleSearch}
                            sx={{
                                flex: 1,
                                fontSize: '16px',
                                color: '#333',
                            }}
                        />
                    </Box>
            </div>

            <Divider sx={{ mb: 5 }} />

            {/* Grid/List Toggle Button */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "16px",
                }}
            >
                <IconButton
                    onClick={toggleView}
                    sx={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                        "&:hover": { backgroundColor: "#e0e0e0" },
                    }}
                >
                    {isGridView ? (
                        <ListViewIcon sx={{ color: "#02824f" }} />
                    ) : (
                        <GridViewIcon sx={{ color: "#02824f" }} />
                    )}
                </IconButton>
            </Box>

            {/* Cards Grid */}
            <Grid container spacing={3}>
                {filteredCardPacks.map((pack) => (
                    <Grid
                        item
                        xs={12}
                        sm={isGridView ? 6 : 12} // Conditionally render grid size
                        md={isGridView ? 4 : 12} // Conditionally render grid size
                        key={pack.id}
                    >
                        <Card
                            sx={{
                                backgroundColor: "#C0EBA6",
                                border: "solid #02824f",
                                borderRadius: "16px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                cursor: "pointer",
                                position: "relative",
                                transition: "transform 0.3s",
                                "&:hover": {
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                        >
                            {/* Card Content */}
                            <CardContent onClick={() => navigate(`/cards/${pack.id}`)}>
                                <Typography variant="h4" fontWeight="bold" gutterBottom>
                                    {pack.name || "Untitled Pack"}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                                    {pack.card_count ? `${pack.card_count} terms` : "No terms available"}
                                </Typography>
                            </CardContent>

                            {/* Delete Button */}
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(pack.id);
                                }}
                                sx={{
                                    position: "absolute",
                                    top: "8px",
                                    right: "8px",
                                    backgroundColor: "#ffdddd",
                                    "&:hover": {
                                        backgroundColor: "#ffcccc",
                                    },
                                }}
                            >
                                <DeleteIcon color="error" />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CardPacks;
