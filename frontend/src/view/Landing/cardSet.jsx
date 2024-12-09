import { Grid, Box, Typography, Avatar, Button } from '@mui/material';
import React from 'react';
import Chemestry from '../../assets/Img/chem.jpg'
import Physics from '../../assets/Img/phy.jpeg'
import Bio from '../../assets/Img/bio.png'
import Maths from '../../assets/Img/maths.png'
import Politics from '../../assets/Img/politics.jpg'

const CardSet = () => {
  // Dummy data array for cards
  const cardData = [
    {
      id: 1,
      title: 'Organic Chemistry',
      description: '67 terms',
      image: Chemestry, // Replace with actual image URLs
      user: 'quizlette255568',
      avatar: 'https://via.placeholder.com/40', // Replace with actual avatar URLs
    },
    {
      id: 2,
      title: 'Physics Basics',
      description: '45 terms',
      image: Physics,
      user: 'sciencefan88',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      title: 'Math Formulas',
      description: '30 terms',
      image: Bio,
      user: 'mathgenius01',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 4,
      title: 'Biology Basics',
      description: '50 terms',
      image: Maths,
      user: 'naturelover22',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 5,
      title: 'World History',
      description: '75 terms',
      image: Politics,
      user: 'historian101',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 6,
      title: 'Programming 101',
      description: '25 terms',
      image: Politics,
      user: 'coderlife',
      avatar: 'https://via.placeholder.com/40',
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {/* Title */}
      <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
        sx={{ marginBottom: 8, color: '#388E3C' }}
      >
        Explore Card Sets
      </Typography>

      {/* Card Grid */}
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Map through the card data to generate cards */}
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Box
              sx={{
                width: '100%',
                maxWidth: 320,
                padding: '16px',
                border: '2px solid #388E3C',
                borderRadius: '12px',
                boxShadow: '6px 8px 0px #388E3C',
                textAlign: 'left',
                backgroundColor: '#C0EBA6',
                transition:'0.7s',
                '&:hover': {
                boxShadow: '4px 6px 8px 0px #388E3C',
                transition:'0.7s',
                }
              }}
            >
              {/* Card Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {card.title}
                </Typography>
                <img
                  src={card.image}
                  alt={card.title}
                  style={{
                    width: '154px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    position: 'relative',
                    top:'54px'
                  }}
                />
              </Box>

              {/* Description */}
              <Typography variant="body1" color="textSecondary" mb={2}>
                {card.description}
              </Typography>

              {/* Footer Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Avatar src={card.avatar} alt={card.user} sx={{ width: 40, height: 40, mr: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  {card.user}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Centered Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#F6FBF4',
            color: '#388E3C',
            border: 'solid 1px #388E3C',
          }}
        >
          Explore More
        </Button>
      </Box>
    </Box>
  );
};

export default CardSet;
