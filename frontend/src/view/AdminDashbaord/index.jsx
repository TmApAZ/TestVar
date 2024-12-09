import { Grid } from '@mui/material';
import React from 'react';

import Navbar from '../../NavBar/adminNavbar'
import Users from './AllUsers'
const Index = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: '70px', // Adjust margin if needed
        marginTop: '-100px', // Adjust to avoid overflow-y issues
        overflowX: 'hidden', // Ensures no horizontal overflow
        width: 'calc(100% - 100px)' // Ensures it stays within the viewport minus the margin
      }}
    >

      {/* Middle Section */}
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12} sx={{marginTop:'200px'}}>
        <Users />
      </Grid>
    </Grid>
  );
};

export default Index;
