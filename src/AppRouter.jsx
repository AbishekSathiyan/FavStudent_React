import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

// Import your components
import Login from "./components/Login"; // Login page component
import StudentList from "./components/StudentList"; // Student List page component
import NotFound from "./components/NotFound"; // Import NotFound component

// Protected Route Component to check if the user is logged in
const ProtectedRoute = ({ element, isLoggedIn }) => {
  if (!isLoggedIn) {
    alert("You need to login first!");
    return <Login />; // Return to login page if not logged in
  }
  return element; // Return the element when the user is logged in
};

// Function to handle incorrect route / redirection
const HandleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("studentli")) {
      // Redirect to correct path if user types a partial path like '/studentli'
      navigate("/studentlist", { replace: true });
    }
  }, [navigate]);

  return null;
};

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This can be from state or context

  // You can set `isLoggedIn` to true when the user logs in successfully in Login.jsx
  const handleLogin = () => {
    setIsLoggedIn(true); // Simulate login action
  };

  return (
    <Router>
      {/* Check for any route that includes "studentli" and redirect to "/studentlist" */}
      <HandleRedirect />

      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Protected route for student list */}
        <Route
          path="/studentlist"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} element={<StudentList />} />
          }
        />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
