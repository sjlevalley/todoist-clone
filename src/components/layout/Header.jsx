import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { FaPizzaSlice } from "react-icons/fa";

import { projectActions } from "../../redux/projectsSlice/projectsSlice";
import { taskActions } from "../../redux/tasksSlice/tasksSlice";

function Header({ darkMode, setDarkMode }) {
  const dispatch = useDispatch();

  const { setProject } = projectActions;
  const { toggleAddTask } = taskActions;

  return (
    <header className="header" data-test-id="header">
      <nav>
        <div className="logo" onClick={() => dispatch(setProject("INBOX"))}>
          <img src="/images/logo.png" alt="Todoist" />
        </div>
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                onClick={() => {
                  dispatch(toggleAddTask(true));
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                aria-label="Darkmode on/off"
                type="button"
                onClick={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default Header;
