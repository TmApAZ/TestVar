import React from "react";
import { Container, Typography, Box } from "@mui/material";

import CommingMsg from '../../assets/Img/uncon.png'

const ComingSoonPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src={CommingMsg} // Replace with your construction image URL
        alt="Under Construction"
        sx={{
          width: "60%",
          maxWidth: 472,
          marginBottom: "-30px",
        }}
      />
      <Typography variant="h4" gutterBottom>
        Coming Soon!
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        We are working hard to bring you an amazing experience. Stay tuned!
      </Typography>
    </Container>
  );
};

export default ComingSoonPage;
