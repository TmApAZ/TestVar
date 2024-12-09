import { Grid } from '@mui/material';
import React from 'react';

// project imports
// import TaskCard from './cards/ProjectTaskCard';
import DaylyAchives from './cards/dailyCards';
import PoppulerFlashcards from './cards/PopulerFlashards';
import ProfileSection from './Profile';
import StudentDetsils from './Basic';
import ShortNotos from './note';

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
      {/* <Grid item xs={12}>
        <TaskCard />
      </Grid> */}
      <Grid item xs={12}>
        <ProfileSection />
      </Grid>
      <Grid item xs={4}>
        <StudentDetsils />
      </Grid>
      <Grid item xs={8}>
        <ShortNotos />
      </Grid>
      <Grid item xs={12}>
        <DaylyAchives />
      </Grid>
      <Grid item xs={12}>
        <PoppulerFlashcards />
      </Grid>
    </Grid>
  );
};

export default Index;
