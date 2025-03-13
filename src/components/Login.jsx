// src/components/Auth.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          p: 4,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Welcome to Favorite Student App
        </Typography>

        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          {isRegistering ? "Register" : "Login"}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
      </Box>
    </Box>
  );
};

export default Auth;
