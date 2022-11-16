import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
// Local imports
import { projectActions } from "../../redux/projectsSlice/projectsSlice";
import { taskActions } from "../../redux/tasksSlice/tasksSlice";
// Mui & icon imports
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
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
              <Tooltip title="Add Task">
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
              </Tooltip>
            </li>
            <li className="settings__darkmode">
              <Tooltip
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <button
                  data-testid="dark-mode-action"
                  aria-label="Darkmode on/off"
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <MdOutlineDarkMode /> : <MdDarkMode />}
                </button>
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};

export default Header;
