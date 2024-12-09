import React, { useState, useEffect } from 'react';
import { Grid, Box, Button, IconButton } from '@mui/material';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';

// Imports
import NavBar from '../../NavBar/index';
import MainBanner from './MainBanner';
import Mortivation from './quote';
import Cards from './pointCards';
import Carousel from './cardCarousel';
import Example from './cardSet';
import FutherDev from './futher';
import Footer from './footer';

const Index = () => {
  // State to track the visibility of the "Back to Top" button
  const [visible, setVisible] = useState(false);

  // Effect to track the scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to scroll back to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Grid container spacing={5} justifyContent="center" sx={{ mt: 12 }}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <MainBanner />
      </Grid>
      <Grid item xs={12} sx={{ mt: 10 }}>
        <Mortivation />
      </Grid>
      <Grid item xs={12}>
        <Cards />
      </Grid>
      <Grid item xs={12}>
        <Carousel />
      </Grid>
      <Grid item xs={12} sx={{ ml: 5 }}>
        <Example />
      </Grid>
      <Grid item xs={12}>
        <FutherDev />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>

      {/* Back to Top Button */}
      {visible && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
          }}
        >
          <IconButton
            variant="contained"
            onClick={scrollToTop}
            sx={{
              backgroundColor: '#388E3C',
              '&:hover': {
                backgroundColor: '#8FD14F',
              },
            }}
          >
            <KeyboardArrowUpTwoToneIcon sx={{
              color:'#f1f1f1'
            }}/>
          </IconButton>
        </Box>
      )}
    </Grid>
  );
};

export default Index;
