// src/components/NotFound.jsx
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Sorry, the page you are looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
