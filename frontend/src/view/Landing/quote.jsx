import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import video from '../../assets/video/back01.mp4';

const VideoSection = () => {
  return (
    <Grid 
      container 
      spacing={2} 
      sx={{
        alignItems: { xs: 'center', md: 'flex-start' }, // Center on small screens
        textAlign: { xs: 'center', md: 'left' }, // Center text on small screens
      }}
    >
      {/* Left Side: Video */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }} // Center video on small screens
      >
        <Box
          component="video"
          sx={{
            width: { xs: '90%', md: '70%' }, // Adjust width for small screens
            height: 'auto',
            borderRadius: 2,
            boxShadow: 0,
          }}
          loop
          autoPlay
          muted
        >
          <source src={video} type="video/mp4" />
        </Box>
      </Grid>

      {/* Right Side: Content */}
      <Grid 
        item 
        xs={12} 
        md={6} 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' }, // Center content on small screens
          padding: 2,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={100}
          sx={{
            mt: { xs: 5, md: 16 }, // Adjust margin for small screens
            fontSize: { xs: '28px', md: '35px' }, // Adjust font size for small screens
            letterSpacing: '2px',
          }}
        >
          "Education is the most powerful weapon which you can use to change the world."
        </Typography>
        <Typography
        color='#388E3C'
          variant="subtitle1"
          fontWeight={100}
          fontFamily="cursive"
          fontSize={{ xs: 18, md: 22 }} // Adjust font size for small screens
          sx={{ mt: { xs: 3, md: 5 } }} // Adjust margin for small screens
        >
          – Leonardo da Vinci
        </Typography>
      </Grid>
    </Grid>
  );
};

export default VideoSection;
