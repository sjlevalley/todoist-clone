import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "./Checkbox";
import AddTask from "./AddTask";

function Tasks() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const projectName = useSelector((state) => state.projects.project);

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      {tasks.length > 0 ? (
        <>
          <ul className="tasks__list">
            {tasks.map((task) => (
              <li key={task.id}>
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
      <AddTask />
    </div>
  );
}

export default Tasks;
