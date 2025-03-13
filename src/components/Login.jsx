// src/components/Auth.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter a valid username and password!");
      return;
    }

    if (isRegistering) {
      // Registration logic
      const existingUser = localStorage.getItem(`user_${username}`);
      if (existingUser) {
        alert("Username already exists! Please log in.");
      } else {
        localStorage.setItem(`user_${username}`, password);
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
      }
    } else {
      // Login logic
      const storedPassword = localStorage.getItem(`user_${username}`);
      if (storedPassword === password) {
        localStorage.setItem("loggedInUser", username);
        navigate("/studentlist"); // Redirect after login
      } else {
        alert("Invalid username or password!");
      }
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{isRegistering ? "Register" : "Login"}</Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAuth}>
          {isRegistering ? "Register" : "Login"}
        </Button>
        <Button
          variant="text"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Already have an account? Login" : "New user? Register"}
        </Button>
      </Box>
    </Container>
  );
};

export default Auth;
