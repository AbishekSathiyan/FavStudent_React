import React from "react";
import { List } from "@mui/material";
import StudentItem from "./StudentItem";

const FavStudentList = ({ students, onToggleFavorite }) => {
  return (
    <div>
      <Typography variant="h6">Favorite Students</Typography>
      <List>
        {students
          .filter((student) => student.favorite)
          .map((student) => (
            <StudentItem
              key={student.name}
              student={student}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
      </List>
    </div>
  );
};

export default FavStudentList;
