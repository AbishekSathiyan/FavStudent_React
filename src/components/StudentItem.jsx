import React, { useState } from "react";
import { ListItem, ListItemText, IconButton, TextField, ListItemSecondaryAction } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const StudentItem = ({ student, onDelete, onToggleFavorite, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(student.name);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleEditSubmit = () => {
    onEdit(student.name, newName);
    setIsEditing(false);
  };

  return (
    <ListItem>
      {isEditing ? (
        <TextField
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleEditSubmit}
          autoFocus
        />
      ) : (
        <ListItemText primary={student.name} />
      )}
      <ListItemSecondaryAction>
        <IconButton onClick={() => onToggleFavorite(student.name)}>
          {student.favorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
        </IconButton>
        <IconButton onClick={handleEditToggle}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(student.name)}>
          <DeleteIcon color="error" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default StudentItem;
