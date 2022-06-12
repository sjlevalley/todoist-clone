import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import { useTasks } from "../hooks";
import db from "../firebase";
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
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
