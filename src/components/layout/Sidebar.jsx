import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { Projects } from "../Projects";
import AddProject from "../AddProject";
import { getProjectsAction } from "../../redux/projectsSlice/projectsActions";
import { getTasksAction } from "../../redux/tasksSlice/tasksActions";
import { projectActions } from "../../redux/projectsSlice/projectsSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  const { setProject } = projectActions;

  useEffect(() => {
    dispatch(getProjectsAction());
  }, []);

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li
          data-testid="inbox"
          className={active === "inbox" ? "active" : undefined}
        >
          <div
            data-testid="inbox-action"
            aria-label="Show inbox tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("inbox");
              dispatch(setProject("INBOX"));
              dispatch(getTasksAction("INBOX"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("inbox");
                dispatch(setProject("INBOX"));
                dispatch(getTasksAction("INBOX"));
              }
            }}
          >
            <span>
              <FaInbox />
            </span>
            <span>Inbox</span>
          </div>
        </li>
        <li
          data-testid="today"
          className={active === "today" ? "active" : undefined}
        >
          <div
            data-testid="today-action"
            aria-label="Show today's tasks"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("today");
              dispatch(setProject("TODAY"));
              dispatch(getTasksAction("TODAY"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("today");
                dispatch(setProject("TODAY"));
                dispatch(getTasksAction("TODAY"));
              }
            }}
          >
            <span>
              <FaRegCalendar />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li
          data-testid="next_7"
          className={active === "next_7" ? "active" : undefined}
        >
          <div
            data-testid="next_7-action"
            aria-label="Show tasks for the next 7 days"
            tabIndex={0}
            role="button"
            onClick={() => {
              setActive("next_7");
              dispatch(setProject("NEXT_7"));
              dispatch(getTasksAction("NEXT_7"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setActive("next_7");
                dispatch(setProject("NEXT_7"));
                dispatch(getTasksAction("NEXT_7"));
              }
            }}
          >
            <span>
              <FaRegCalendarAlt />
            </span>
            <span>Next 7 days</span>
          </div>
        </li>
      </ul>
      <div
        className="sidebar__middle"
        aria-label="Show/hide projects"
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShowProjects(!showProjects);
        }}
        role="button"
        tabIndex={0}
      >
        <span>
          <FaChevronDown
            className={!showProjects ? "hidden-projects" : undefined}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">
        {showProjects && <Projects active={active} setActive={setActive} />}
      </ul>
      {showProjects && <AddProject />}
    </div>
  );
}

export default Sidebar;
