import React from 'react';
import { Grid, Typography, Box, useMediaQuery, useTheme, Button } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
import FlashCard from './flashCard';

const AnalyticsBanner = () => {
  const theme = useTheme(); // Access the MUI theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        px: 2, // Add padding for smaller screens
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={4}
        maxWidth="lg"
        direction={isSmallScreen ? 'column-reverse' : 'row'} // Reverse the order for small screens
        sx={{
          textAlign: 'center',
        }}
      >
        {/* Content Section */}
        <Grid
          item
          xs={12}
          sm={6}
          order={isSmallScreen ? 1 : 0} // Ensure content is on top for small screens
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            sx={{
              flexDirection: isSmallScreen ? 'column' : 'row', // Stack icons vertically on small screens
            }}
          >
            {/* Conditionally render icons only for large screens */}
            {!isSmallScreen && (
              <>
                <FlashOnIcon
                  sx={{
                    color: '#388E3C',
                    fontSize: '5rem',
                    backgroundColor: '#f1f1f1',
                    padding: '5px',
                    borderRadius: '50%',
                    border: 'solid 2px',
                  }}
                />
                <TimelineTwoToneIcon
                  sx={{
                    color: '#f1f1f1',
                    fontSize: '5rem',
                    backgroundColor: '#388E3C',
                    padding: '5px',
                    borderRadius: '50%',
                  }}
                />
              </>
            )}
            <Typography
              variant={isSmallScreen ? 'h4' : 'h1'} // Smaller font size for small screens
              fontWeight="500"
            >
              Learn,
            </Typography>
          </Box>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              ml: { sm: 20, xs: 0 },
            }}
          >
            <Typography
              variant={isSmallScreen ? 'h6' : 'h3'} // Smaller font size for small screens
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
                gap: '1rem',
                lineHeight: isSmallScreen ? '40px' : '65px',
                fontWeight: '600',
              }}
            >
              Smarter.
              <Box
                component="span"
                fontWeight="medium"
                color="#388E3C"
                sx={{
                  fontSize: isSmallScreen ? '1.2rem' : 'inherit', // Smaller span size for small screens
                }}
              >
                Faster.
              </Box>
              Anywhere.
            </Typography>
          </Grid>
        </Grid>

        {/* Card Section */}
        <Grid
          item
          xs={12}
          sm={6}
          order={isSmallScreen ? 2 : 1} // Ensure card is below content for small screens
        >
          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: isSmallScreen ? 2 : 0, // Add top margin for better spacing on small screens
            }}
          >
            <FlashCard
              sx={{
                width: isSmallScreen ? 200 : 400, // Smaller card width for small screens
                height: isSmallScreen ? 150 : 250, // Smaller card height for small screens
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsBanner;
