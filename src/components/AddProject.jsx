import React, { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// Local imports
import { projectActions } from "../redux/projectsSlice/projectsSlice";
import { addProjectAction } from "../redux/projectsSlice/projectsActions";
// Mui imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

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
const StyledBtn = styled(Button)`
  background-color: #dd4b39 !important;
  border: none !important;
  color: white !important;
  font-size: 12px !important;
`;
const StyledBox = styled(Box)`
  display: flex !important;
  margin: 20px 0 20px 0 !important;
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
const StyledProgress = styled(CircularProgress)`
  color: #ca2100 !important;
`;

function AddProject() {
  const dispatch = useDispatch();
  const addProjectName = useSelector((state) => state.projects.addProjectName);
  const projectDialogOpen = useSelector(
    (state) => state.projects.projectDialogOpen
  );
  const submitting = useSelector((state) => state.projects.submitting);
  const { setAddProjectName, setProjectDialogOpen } = projectActions;

  const projectId = useId() + Math.random();

  const handleDialogOpen = () => {
    dispatch(setProjectDialogOpen(true));
  };

  const handleDialogClose = () => {
    dispatch(setProjectDialogOpen(false));
  };

  const addProject = () => {
    const newProjectInfo = {
      projectId,
      name: addProjectName,
      userId: "123abc",
    };
    dispatch(addProjectAction(newProjectInfo));
  };

  const submittingDiv = (
    <StyledBox>
      <StyledProgress size={25} />
    </StyledBox>
  );

  return (
    <div>
      <StyledBtn
        size="small"
        startIcon={<AddIcon />}
        data-testid="add-project"
        variant="outlined"
        onClick={handleDialogOpen}
      >
        Add Project
      </StyledBtn>
      <Dialog open={projectDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill out the fields below and click the 'Add Project' button.
          </DialogContentText>
          {!submitting ? (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Project Name"
              fullWidth
              variant="standard"
              required
              onChange={(e) => dispatch(setAddProjectName(e.target.value))}
            />
          ) : (
            submittingDiv
          )}
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

export default AddProject;
