import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import { projectActions } from "../redux/projectsSlice/projectsSlice";

import db from "../firebase";
import {
  doc,
  deleteDoc,
  where,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

const StyledDeleteBtn = styled(Button)`
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

function IndividualProject({ project }) {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const projects = useSelector((state) => state.projects.projects);

  const { setProjects, setProject } = projectActions;

  const deleteProject = async (docId) => {
    let tasksRef = collection(db, "tasks");
    let q = query(tasksRef, where("projectId", "==", docId));
    try {
      await deleteDoc(doc(db, "projects", docId));
      const updatedProjects = projects.filter(
        (project) => project.docId !== docId
      );
      const tasksSnapshot = await getDocs(q);
      tasksSnapshot.forEach((item) => {
        deleteDoc(item);
      });
      dispatch(setProjects({ projects: updatedProjects }));
      dispatch(setProject("INBOX"));
    } catch (error) {
      console.error(error);
    }
  };

  const styledProjectName = (
    <>
      <b>{project.name}</b>
    </>
  );

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button"
        aria-label="Confirm deletion of project"
      >
        <FaTrash />
        {showConfirm && (
          // <div className="project-delete-modal">
          //   <div className="project-delete-modal__inner">
          //     <p>Are you sure you want to delete this project?</p>
          //     <div className="btnContainer">
          //       <span
          //         onClick={() => setShowConfirm(!showConfirm)}
          //         onKeyDown={(e) => {
          //           if (e.key === "Enter") setShowConfirm(!showConfirm);
          //         }}
          //         tabIndex={0}
          //         role="button"
          //         aria-label="Cancel adding project, do not delete"
          //       >
          //         Cancel
          //       </span>
          //       <button
          //         type="button"
          //         onClick={() => deleteProject(project.docId)}
          //       >
          //         Delete
          //       </button>
          //     </div>
          //   </div>
          // </div>
          <Dialog
            open={showConfirm}
            onClose={() => setShowConfirm(!showConfirm)}
          >
            <DialogTitle>Delete Project</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete {styledProjectName}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <StyledCancelBtn variant="outlined">Cancel</StyledCancelBtn>
              <StyledDeleteBtn
                onClick={() => deleteProject(project.docId)}
                variant="text"
              >
                Delete Project
              </StyledDeleteBtn>
            </DialogActions>
          </Dialog>
        )}
      </span>
    </>
  );
}

export default IndividualProject;
