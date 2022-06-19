import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../redux/tasksSlice/tasksReducer";
import Sidebar from "./Sidebar";
import Tasks from "../Tasks";
import { useEffect } from "react";

function Content() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  console.log(tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  return (
    <section className="content">
      <Sidebar />
      <Tasks />
    </section>
  );
}

export default Content;
