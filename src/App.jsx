import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import StudentList from "./components/StudentList";
import FavStudentList from "./components/FavStudentList";
import Auth from "./components/Login"; // Fixed import (Login.js exports 'Auth')

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/studentlist" element={<StudentList />} />
      </Routes>
    </Router>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser"); // Fixed login check
    if (!loggedIn) {
      navigate("/"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const addStudent = () => {
    if (newStudent.trim() === "") {
      alert("Student name cannot be empty!");
      return;
    }
    setStudents([...students, { name: newStudent.trim(), favorite: false }]);
    setNewStudent("");
  };

  const toggleFavorite = (name) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.name === name ? { ...student, favorite: !student.favorite } : student
      )
    );
  };

  const deleteStudent = (name) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.name !== name)
    );
  };

  const editStudent = (oldName, newName) => {
    if (newName.trim() === "") {
      alert("Student name cannot be empty!");
      return;
    }
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.name === oldName ? { ...student, name: newName } : student
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Fixed logout
    navigate("/");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Favorite Student List</Typography>

      <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
        Logout
      </Button>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          label="Add New Student"
          variant="outlined"
          value={newStudent}
          onChange={(e) => setNewStudent(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addStudent}>
          Add
        </Button>
      </Box>

      <StudentList students={students} onToggleFavorite={toggleFavorite} onDelete={deleteStudent} onEdit={editStudent} />
      <FavStudentList students={students} onToggleFavorite={toggleFavorite} />
    </Container>
  );
};

export default App;
