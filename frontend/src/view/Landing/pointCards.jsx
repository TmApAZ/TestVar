import { Grid, Box, Typography } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import LightbulbTwoToneIcon from '@mui/icons-material/LightbulbTwoTone';
import AirlineStopsTwoToneIcon from '@mui/icons-material/AirlineStopsTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';

const PointCards = () => {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        textAlign: 'center', // Center text on all screen sizes
        padding: 4, // Add padding around the grid
      }}
    >
      {/* First Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2, // Space between items
          }}
        >
          <IconButton
            sx={{
              width: 80,
              height: 80,
              backgroundColor: '#E3F2FD', // Light blue background
              borderRadius: '50%',
            }}
          >
            <LightbulbTwoToneIcon sx={{ fontSize: 40, color: '#7E57C2' }} />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Learn
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Discover new topics and ideas effortlessly with flashcards tailored to your needs.
          </Typography>
        </Box>
      </Grid>

      {/* Second Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2, // Space between items
          }}
        >
          <IconButton
            sx={{
              width: 80,
              height: 80,
              backgroundColor: '#E1F5FE', // Light blue background
              borderRadius: '50%',
            }}
          >
            <AirlineStopsTwoToneIcon sx={{ fontSize: 40, color: '#42A5F5' }} />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Practice
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Reinforce your knowledge through repeated active recall and spaced repetition.
          </Typography>
        </Box>
      </Grid>

      {/* Third Card */}
      <Grid item xs={12} sm={6} md={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2, // Space between items
          }}
        >
          <IconButton
            sx={{
              width: 80,
              height: 80,
              backgroundColor: '#E8F5E9', // Light green background
              borderRadius: '50%',
            }}
          >
            <EmojiEventsTwoToneIcon sx={{ fontSize: 40, color: '#66BB6A' }} />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Achieve
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Turn your learning into results—excel in exams, skills, and personal growth.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PointCards;
