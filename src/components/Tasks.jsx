import React from "react";
import Checkbox from "./Checkbox";
import { useTasks } from "../hooks";
import db from "../firebase";

function Tasks() {
  const { tasks, archivedTasks } = useTasks("1");

  const projectName = "";

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
