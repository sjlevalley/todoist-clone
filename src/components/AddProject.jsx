import React, { useState, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { projectActions } from "../redux/projectsSlice/projectsSlice";
import { getProjectsAction } from "../redux/projectsSlice/projectsActions";
import { taskActions } from "../redux/tasksSlice/tasksSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

const StyledAddBtn = styled(Button)`
  margin-right: 15px !important;
  background-color: #db4c3f !important;
  color: white !important;
  transition: all 0.1s;
  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }
`;
const StyledCancelBtn = styled(Button)`
  border-color: #db4c3f !important;
  color: #db4c3f !important;
  transition: transform 0.1s;
  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }
`;

function AddProject() {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const projects = useSelector((state) => state.projects.projects);

  const { setProjects, setProject } = projectActions;
  const { setTasks } = taskActions;

  const projectId = useId() + Math.random();

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const addProject = async () => {
    if (projectName.trim() === "") {
      return console.error("Must enter a Project Name");
    }
    try {
      const newProject = {
        projectId,
        name: projectName,
        userId: "123abc",
      };
      await addDoc(collection(db, "projects"), newProject);
      dispatch(getProjectsAction());
      setProjectName("");
      setDialogOpen(false);
      dispatch(setProject(projectName));
      dispatch(setTasks({ tasks: [] }));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Button
        size="small"
        style={{
          backgroundColor: "#dd4b39",
          border: "none",
          color: "white",
        }}
        startIcon={<AddIcon />}
        data-testid="add-project"
        variant="outlined"
        onClick={handleDialogOpen}
      >
        Add Project
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the fields below and click the 'Add Project' button.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            fullWidth
            variant="standard"
            required
            onChange={(e) => setProjectName(() => e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <StyledCancelBtn onClick={handleDialogClose} variant="outlined">
            Cancel
          </StyledCancelBtn>
          <StyledAddBtn onClick={addProject} variant="text">
            Add Project
          </StyledAddBtn>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};

export default AddProject;
