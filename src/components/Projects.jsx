// TODO: Fix css for Projects that is commented out
import React, { useState, useId } from "react";
import PropTypes from "prop-types";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import IndividualProject from "./IndividualProject";

export const Projects = ({ activeValue = null }) => {
  const id = useId();
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

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
