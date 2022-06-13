// TODO: Fix Delete Modal
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import db from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

function IndividualProject({ project }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = async (docId) => {
    try {
      await deleteDoc(doc(db, "projects", docId));
      const updatedProjects = projects.filter(
        (project) => project.docId !== docId
      );
      setProjects([...updatedProjects]);
      setSelectedProject("INBOX");
    } catch (error) {
      console.error(error);
    }
  };

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
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                aria-label="Cancel adding project, do not delete"
              >
                Cancel
              </span>
            </div>
          </div>
        )}
      </span>
    </>
  );
}

export default IndividualProject;
