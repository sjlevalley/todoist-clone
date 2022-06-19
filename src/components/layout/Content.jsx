import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../redux/tasksSlice/tasksReducer";
import { getProjects } from "../../redux/projectsSlice/projectsReducer";
import Sidebar from "./Sidebar";
import Tasks from "../Tasks";
import { useEffect } from "react";

function Content() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const projects = useSelector((state) => state.projects.projects);

  // console.log(tasks);
  // console.log(projects);

  // useEffect(() => {
  //   dispatch(getTasks());
  //   dispatch(getProjects());
  // }, []);

  return (
    <section className="content">
      <Sidebar />
      <Tasks />
    </section>
  );
}

export default Content;
