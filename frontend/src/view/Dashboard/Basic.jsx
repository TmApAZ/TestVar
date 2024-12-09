import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { Card, CardContent, Box, Typography, Avatar, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import AutoAwesomeMotionTwoToneIcon from '@mui/icons-material/AutoAwesomeMotionTwoTone';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await API.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        console.error(err);
        alert("Session expired, please log in again.");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) return <h2>Loading...</h2>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        maxWidth: 400, // Limit width of cards
      }}
    >
      {/* Friends Card */}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              backgroundColor: "#E3F2FD", // Light blue background
              color: "#2196F3", // Blue icon color
              width: 48,
              height: 48,
            }}
          >
            <AutoAwesomeMotionTwoToneIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              58
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Flashcards
            </Typography>
          </Box>
        </Box>
        <IconButton aria-label="" >
          <ArrowForwardIosTwoToneIcon/>
        </IconButton>
      </Card>

      {/* Followers Card */}
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            sx={{
              backgroundColor: "#F3E5F5", // Light purple background
              color: "#9C27B0", // Purple icon color
              width: 48,
              height: 48,
            }}
          >
            <BadgeIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              8
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completed
            </Typography>
          </Box>
        </Box>
        <IconButton aria-label="" >
          <ArrowForwardIosTwoToneIcon/>
        </IconButton>
      </Card>
    </Box>
  );
};

export default Profile;
