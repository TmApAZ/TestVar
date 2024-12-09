import { Grid } from '@mui/material';
import React from 'react';

import Navbar from '../../../NavBar/adminNavbar'

import Adduserf from './form';

const Index = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: '70px',
        overflowX: 'hidden', // Ensures no horizontal overflow
        width: 'calc(100% - 100px)' // Ensures it stays within the viewport minus the margin
      }}
    >

      {/* Middle Section */}
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12}>
        <Adduserf />
      </Grid>
    </Grid>
  );
};

export default Index;
