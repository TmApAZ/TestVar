import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

const FlashCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <Card
      sx={{
        width: 400,
        height: 500,
        borderRadius: 3,
        backgroundColor: "#C0EBA6",
        boxShadow: flipped ? "6px 8px 0px #388E3C" : "6px 8px 0px #388E3C",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.6s, box-shadow 0.3s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        perspective: 1000, // to create a 3D flip effect
        border:'solid 3px #388E3C',
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          width: "95%",
          height: "80%",
          position: "absolute",
          backfaceVisibility: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Front Side */}
        {!flipped && (
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="#388E3C">
            Can a simple card change the way you learn? Flip to see the magic!
            </Typography>
          </CardContent>
        )}

        {/* Back Side */}
        {flipped && (
          <CardContent sx={{ textAlign: "center", transform: "rotateY(180deg)" }}>
            <Typography variant="h4" color="#388E3C">
            TestVar flashcards: Your knowledge, redefined—one card at a time.
            </Typography>
          </CardContent>
        )}
      </Box>
    </Card>
  );
};

export default FlashCard;
