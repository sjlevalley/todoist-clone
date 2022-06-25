import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import styled from "styled-components";
import PropTypes from "prop-types";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { taskActions } from "../redux/tasksSlice/tasksSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const StyledAddBtn = styled(Button)`
  margin-right: 15px !important;
  background-color: #db4c3f !important;
  color: white !important;
  transition: all 0.1s;
  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }
`;
const StyledCancelBtn = styled(Button)`
  border-color: #db4c3f !important;
  color: #db4c3f !important;
  transition: transform 0.1s;
  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }
`;

function AddTask() {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedProject, setSelectedProject] = useState();

  const project = useSelector((state) => state.projects.project);
  const projects = useSelector((state) => state.projects.projects);
  const tasks = useSelector((state) => state.tasks.tasks);

  const { setTasks } = taskActions;

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const addTask = async () => {
    if (task.trim() === "") {
      return console.error("Must enter a Task");
    }
    let currentDate = moment().format("DD/MM/YYYY");

    if (project === "NEXT_7") {
      currentDate = moment().add(7, "days").format("DD/MM/YYYY");
    }
    if (task && project) {
      try {
        const newTask = {
          archived: false,
          projectId: selectedProject || "",
          task,
          date: currentDate || selectedDate,
          userId: "123abc",
        };
        // await addDoc(collection(db, "tasks"), newTask);
        // const updatedTasks = [newTask, ...tasks];
        // dispatch(setTasks({ tasks: updatedTasks }));
        // setTask("");
        // setSelectedProject("");
        // setShowMain("");
        // setShowProjectOverlay(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    if (project === "INBOX" || project === "TODAY" || project === "NEXT_7") {
      setSelectedProject(() => projects[0]?.docId);
    } else {
      const currentProject = projects.find((p) => p.name === project);
      setSelectedProject(currentProject?.docId);
    }
  }, [project]);

  const renderMenuItems = () =>
    projects.map((p) => (
      <MenuItem key={p?.docId} value={p?.docId}>
        {p.name}
      </MenuItem>
    ));

  return (
    <div>
      <Button
        size="small"
        style={{
          backgroundColor: "#dd4b39",
          border: "none",
          color: "white",
          margin: "10px 0",
        }}
        startIcon={<AddIcon />}
        data-testid="add-task-button"
        variant="outlined"
        onClick={handleDialogOpen}
      >
        Add Task
      </Button>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle style={{ width: "500px" }}>Add Task</DialogTitle>
        <DialogContent>
          <Stack spacing={4}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              variant="standard"
              required
              onChange={(e) => setTaskName(() => e.target.value)}
            />
            <div>
              <InputLabel id="task-project-select-label">Project</InputLabel>
              <Select
                labelId="task-project-select-label"
                id="task-project-select"
                fullWidth
                data-testid="task-project-select"
                value={selectedProject}
                label="Project"
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                {renderMenuItems()}
              </Select>
            </div>
            {/* <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              // value={value}
              // onChange={handleChange}
              // renderInput={(params) => <TextField {...params} />}
            /> */}
          </Stack>
        </DialogContent>
        <DialogActions>
          <StyledCancelBtn onClick={handleDialogClose} variant="outlined">
            Cancel
          </StyledCancelBtn>
          <StyledAddBtn
            // onClick={addTask}
            variant="text"
          >
            Add Task
          </StyledAddBtn>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func,
};

export default AddTask;
