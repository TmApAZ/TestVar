import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  Alert,
  Fade,
  IconButton,
  Button,
} from "@mui/material";
import LightbulbTwoToneIcon from "@mui/icons-material/LightbulbTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const quotes = [
    {
      text: "What we think, we become.",
      author: "Gautama Buddha",
      icon: <LightbulbTwoToneIcon />,
      bgcolor: "#FCF596",
      borderColor: "#FFE31A",
    },
    {
      text: "The only source of knowledge is experience.",
      author: "Albert Einstein",
      icon: null,
      bgcolor: "#9694FF",
      borderColor: "#133E87",
    },
    {
      text: "Nothing will work unless you do.",
      author: "Maya Angelou",
      icon: null,
      bgcolor: "#C0EBA6",
      borderColor: "#347928",
    },
    {
      text: "The roots of education are bitter, but the fruit is sweet.",
      author: "Aristotle",
      icon: null,
      bgcolor: "#F0C1E1",
      borderColor: "#9B7EBD",
    },
    {
      text: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      icon: null,
      bgcolor: "#D7D3BF",
      borderColor: "#9A7E6F",
    },
  ];

  const achievements = [
    { title: "Top Performer in Mathematics", description: "Achieved the highest score in the class.", icon: <CheckCircleTwoToneIcon color="success" /> },
    { title: "Perfect Attendance", description: "Maintained perfect attendance for the year.", icon: <CheckCircleTwoToneIcon color="success" /> },
    { title: "Project Excellence", description: "Led the team to win the national science fair.", icon: <CheckCircleTwoToneIcon color="success" /> },
  ];

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

  useEffect(() => {
    const changeQuote = () => {
      setFadeIn(false); // Start fade-out
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setFadeIn(true); // Start fade-in
      }, 500); // Match the fade-out duration
    };

    const interval = setInterval(changeQuote, 15000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[currentQuoteIndex];

  if (!user) return <h2>Loading...</h2>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        flexDirection: { xs: "column", md: "row" }, // Adjust flex direction for small screens
        gap: { xs: 2, md: 0 }, // Add gap for small screens
      }}
    >
      <Card
        sx={{
          bgcolor: "#ffffff",
          boxShadow: "0px 4px 17px rgba(0, 0, 0, 0.1)",
          borderRadius: "18px",
          width: "100%",
          padding: { xs: 2, md: 3 }, // Adjust padding for small screens
          position: "relative",
        }}
      >
        {/* IconButton in the top-right corner */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: 10, md: 16 }, // Adjust position for small screens
            right: { xs: 10, md: 16 },
          }}
        >
          <IconButton
            onClick={() => setModalOpen(true)}
            sx={{
              bgcolor: "#02824f",
              "&:hover": {
                bgcolor: "#508D4E",
              },
            }}
          >
            <WorkspacePremiumTwoToneIcon
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
        </Box>
        {/* Modal for Achievements */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <ModalDialog>
            <DialogTitle>
              <Typography variant="h5" fontWeight="bold">
                Achievements
              </Typography>
            </DialogTitle>
            <DialogContent>
              {achievements.map((achievement, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    marginBottom: 2,
                  }}
                >
                  {achievement.icon}
                  <Box>
                    <Typography variant="body1" fontWeight="bold">
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2">{achievement.description}</Typography>
                  </Box>
                </Box>
              ))}
            </DialogContent>
          </ModalDialog>
        </Modal>

        {/* Create New Flashcard Button */}
        <Box
  sx={{
    position: "absolute",
    bottom: { xs: 20, md: 37 }, // Adjust position for small screens
    right: { xs: 10, md: 16 },
    transform: "translateY(-50%)",
    display: { xs: "none", md: "block" }, // Hide button on small screens
  }}
>
  <Button
    variant="contained"
    startIcon={<AddTwoToneIcon />}
    LinkComponent={Link}
    to={'/createcard'}
    sx={{
      bgcolor: "#02824f",
      "&:hover": { bgcolor: "#508D4E" },
      fontSize: { xs: "0.8rem", md: "1rem" }, // Adjust font size for small screens
      fontWeight: "bold",
      padding: { xs: "8px 16px", md: "10px 20px" }, // Adjust padding for small screens
      borderRadius: "10px",
    }}
  >
    Create New Set
  </Button>
</Box>


        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Stack items vertically on small screens
              alignItems: "center",
              gap: { xs: 2, md: 3 }, // Add gap for small screens
            }}
          >
            <Avatar
              alt="Student Profile"
              src="https://upload.wikimedia.org/wikipedia/commons/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg"
              sx={{
                width: { xs: 150, md: 250 }, // Adjust size for small screens
                height: { xs: 150, md: 250 },
              }}
            />
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" }, // Adjust font size for small screens
                  fontWeight: "bold",
                }}
              >
                Hello,
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" }, // Adjust font size for small screens
                  fontWeight: "medium",
                }}
              >
                {user.fullName}
              </Typography>
              <Box
                sx={{
                  marginTop: { xs: 2, md: 4 }, // Adjust margin for small screens
                  padding: 0.2,
                  border: `2px solid ${currentQuote.borderColor}`,
                  borderRadius: "12px",
                  bgcolor: currentQuote.bgcolor,
                }}
              >
                <Fade in={fadeIn} timeout={500}>
                  <Alert
                    icon={
                      <LightbulbTwoToneIcon
                        sx={{
                          fontSize: { xs: "2rem", md: "2.5rem" }, // Adjust icon size for small screens
                          borderColor: currentQuote.borderColor,
                          borderRadius: "50%",
                          padding: "5px",
                          color: "#000",
                          backgroundColor: currentQuote.bgcolor,
                        }}
                      />
                    }
                    severity="info"
                    sx={{
                      backgroundColor: currentQuote.bgcolor,
                      borderColor: currentQuote.borderColor,
                      color: "#000",
                      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Typography variant="body1">
                      <strong>{currentQuote.text}</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                      - {currentQuote.author}
                    </Typography>
                  </Alert>
                </Fade>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
