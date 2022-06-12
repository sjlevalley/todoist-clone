import React, { useState, useId } from "react";
import PropTypes from "prop-types";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useProjectsValue } from "../context";

function AddProject({ shouldShow = false }) {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const projectId = useId();
  const { projects, setProjects } = useProjectsValue();

  const addProject = async () => {
    if (projectName.trim() === "") {
      return console.error("Must enter a Project Name");
    }
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        projectId,
        name: projectName,
        userId: "123abc",
      });
      setProjects([...projects]);
      setProjectName("");
      setShow(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add Project
          </button>
          <span
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShow(false);
            }}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
        {" "}
        Add Project
      </span>
    </div>
  );
}

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};

export default AddProject;
