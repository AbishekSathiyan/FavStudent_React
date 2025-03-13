import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  List,
  TextField,
  IconButton,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField as MuiTextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StudentItem from "./StudentItem";  // Ensure this is correctly imported
import FavStudentList from "./FavStudentList";  // Ensure this is correctly imported
import Login from "./Login";  // Correct path to Login.jsx


const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // To control the dialog visibility
  const [confirmText, setConfirmText] = useState(""); // Text input for confirmation
  const [filter, setFilter] = useState("all");  // To control which students to display

  // Check if user is logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/"); // Redirect to login if not logged in
    } else {
      setUsername(loggedInUser); // Set username if logged in
      // Load students from localStorage
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
      setStudents(storedStudents);
    }
  }, [navigate]); // Add navigate to the dependency array

  // Add new student
  const handleAddStudent = () => {
    if (!newStudentName.trim()) {
      setAlertOpen(true); // Show alert if empty
      return;
    }

    const newStudent = { name: newStudentName, favorite: false };
    const updatedStudents = [...students, newStudent];

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setNewStudentName(""); // Clear input field
  };

  // Delete student
  const handleDelete = (name) => {
    const updatedStudents = students.filter((student) => student.name !== name);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  // Toggle favorite
  const handleToggleFavorite = (name) => {
    const updatedStudents = students.map((student) =>
      student.name === name
        ? { ...student, favorite: !student.favorite }
        : student
    );
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  // Edit student
  const handleEdit = (oldName, newName) => {
    if (!newName.trim()) return;

    const updatedStudents = students.map((student) =>
      student.name === oldName ? { ...student, name: newName } : student
    );

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  // Open the confirmation dialog
  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  // Handle the confirmation
  const handleLogoutConfirm = () => {
    if (confirmText === "CONFIRM") {
      localStorage.removeItem("loggedInUser");
      navigate("/");
    } else {
      setOpenDialog(false); // Close the dialog if the user doesn't confirm
    }
  };

  // Handle the cancel action
  const handleDialogCancel = () => {
    setOpenDialog(false);
  };

  // Count of all students and favorite students
  const totalStudentsCount = students.length;
  const favoriteStudentsCount = students.filter(
    (student) => student.favorite
  ).length;

  // Filter students based on selection
  const filteredStudents =
    filter === "all"
      ? students
      : filter === "fav"
      ? students.filter((student) => student.favorite)
      : students.filter((student) => !student.favorite);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Hello, {username}!</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        All Students: {totalStudentsCount} | Favorite Students: {favoriteStudentsCount}
      </Typography>

      {/* Filter students dropdown */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Filter Students</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter Students"
        >
          <MenuItem value="all">All Students</MenuItem>
          <MenuItem value="fav">Favorite Students</MenuItem>
          <MenuItem value="unfav">Unfavorite Students</MenuItem>
        </Select>
      </FormControl>

      {/* Add Student Input */}
      <div style={{ display: "flex", marginTop: "10px" }}>
        <TextField
          label="Add Student"
          variant="outlined"
          fullWidth
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <IconButton color="primary" onClick={handleAddStudent}>
          <AddIcon />
        </IconButton>
      </div>

      {/* Empty input alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Please enter a student name!
        </Alert>
      </Snackbar>

      {/* Student List */}
      {filteredStudents.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Students List
          </Typography>
          <List>
            {filteredStudents.map((student) => (
              <StudentItem
                key={student.name}
                student={student}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
                onEdit={handleEdit}
              />
            ))}
          </List>
        </>
      )}

      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        onClick={handleLogoutClick}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Type "CONFIRM" to logout:</Typography>
          <MuiTextField
            autoFocus
            fullWidth
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentList;
