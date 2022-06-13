import React, { useState, useEffect, useId } from "react";
import Checkbox from "./Checkbox";
import { useTasks } from "../hooks";
import { projectTasks } from "../constants";
import { getTitle, getCollatedTitle, projectTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";

function Tasks() {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks, archivedTasks } = useTasks(selectedProject);

  let projectName = "";

  if (selectedProject && !projectTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject)?.name;
  }

  if (selectedProject && projectTasksExist(selectedProject)) {
    projectName = getCollatedTitle(projectTasks, selectedProject)?.name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, []);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      {tasks.length > 0 ? (
        <>
          <ul className="tasks__list">
            {tasks.map((task) => (
              <li key={`${task.id}`}>
                <Checkbox id={task.id} />
                <span>{task.task}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ul className="tasks__list">
          <li>
            <i>No Tasks Found</i>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Tasks;
