import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import IndividualProject from "./IndividualProject";
import { getProjectsAction } from "../redux/projectsSlice/projectsActions";

export const Projects = ({ activeValue = null }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  useEffect(() => {
    dispatch(getProjectsAction());
  }, []);

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
              onClick={() => {
                setActive(project.projectId);
                setSelectedProject(project.projectId);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActive(project.projectId);
                  setSelectedProject(project.projectId);
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
