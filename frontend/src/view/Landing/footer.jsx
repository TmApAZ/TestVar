import React from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import Logo from '../../assets/Logo/1.png';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <Box
      sx={{
        backgroundColor: '#2b2b2b',
        color: '#d3d3d3',
        px: { xs: 2, md: 4 },
        py: { xs: 2, md: 4 },
        width: '100%', // Full width
        overflow: 'hidden', // Prevent overflow
        position: 'relative', // Stay in flow
        left: 0,
        margin: 0, // Remove unnecessary margins
        padding: 0,
      }}
    >
      <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
        <Grid item xs={12} sm={6} md={3}>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: '100px', backgroundColor: '#ffffff', borderRadius: '25px' }}
          />
          <Typography variant="h4">TestVar</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Your one-stop platform for AI-driven flashcard and MCQ test creation. Empower your learning with customized content and real-time feedback.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Link href="#" color="inherit"><i className="fab fa-facebook"></i></Link>
            <Link href="#" color="inherit"><i className="fab fa-instagram"></i></Link>
            <Link href="#" color="inherit"><i className="fab fa-twitter"></i></Link>
            <Link href="#" color="inherit"><i className="fab fa-youtube"></i></Link>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Typography variant="subtitle1" gutterBottom>Features</Typography>
          <Link href="#" color="inherit" display="block">AI-Powered Flashcards</Link>
          <Link href="#" color="inherit" display="block">Custom MCQ Creation</Link>
          <Link href="#" color="inherit" display="block">Instant Feedback</Link>
          <Link href="#" color="inherit" display="block">Performance Tracking</Link>
          <Link href="#" color="inherit" display="block">Mobile Friendly</Link>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Typography variant="subtitle1" gutterBottom>Resources</Typography>
          <Link href="#" color="inherit" display="block">Blog</Link>
          <Link href="#" color="inherit" display="block">Guides & Tutorials</Link>
          <Link href="#" color="inherit" display="block">Help Center</Link>
          <Link href="#" color="inherit" display="block">What's New</Link>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Typography variant="subtitle1" gutterBottom>Pages</Typography>
          <Link href="#" color="inherit" display="block">Landing Page</Link>
          <Link href="#" color="inherit" display="block">Dashboard</Link>
          <Link href="#" color="inherit" display="block">Sign In & Sign Up</Link>
          <Link href="#" color="inherit" display="block">MCQ Test</Link>
          <Link href="#" color="inherit" display="block">Flashcards</Link>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Typography variant="subtitle1" gutterBottom>TestVar</Typography>
          <Link href="#" color="inherit" display="block">About Us</Link>
          <Link href="#" color="inherit" display="block">Contact Support</Link>
          <Link href="#" color="inherit" display="block">Privacy Policy</Link>
          <Link href="#" color="inherit" display="block">Terms of Service</Link>
        </Grid>
      </Grid>
      <Box sx={{ borderTop: '1px solid #444', mt: 4, pt: 2, textAlign: 'center' }}>
        <Typography variant="body2">Copyright © {currentYear} | Thevinu Mapatuna. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
