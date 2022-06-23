import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import IndividualProject from "./IndividualProject";
import { getProjectsAction } from "../redux/projectsSlice/projectsActions";
import { projectActions } from "../redux/projectsSlice/projectsSlice";
import { getTasksAction } from "../redux/tasksSlice/tasksActions";

export const Projects = ({ activeValue = null }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(activeValue);
  const projects = useSelector((state) => state.projects.projects);

  const { setProject } = projectActions;

  useEffect(() => {
    dispatch(getProjectsAction());
  }, []);

  const handleClick = (project) => {
    setActive(project.projectId);
    dispatch(setProject(project.name));
    dispatch(getTasksAction("project", `${project.projectId}`));
  };

  return (
    <>
      {projects &&
        projects.map((project) => (
          <li
            key={Math.random()}
            data-testid="project-action-parent"
            data-doc-id={project.docId}
            className={
              active === project.projectId
                ? "active sidebar__project"
                : "sidebar__project"
            }
          >
            <div
              role="button"
              data-testid="project-action"
              tabIndex={0}
              aria-label={`Select ${project.name} as the task project`}
              onClick={() => handleClick(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick(project);
                }
              }}
            >
              <IndividualProject project={project} key={Math.random()} />
            </div>
          </li>
        ))}
    </>
  );
};

Projects.propTypes = {
  activeValue: PropTypes.bool,
};
