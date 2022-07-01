import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// Local imports
import {
  addTaskAction,
  archiveTasksAction
} from '../redux/tasksSlice/tasksActions'
import { taskActions } from '../redux/tasksSlice/tasksSlice'
// MUI imports
import AddIcon from '@mui/icons-material/Add'
import ArchiveIcon from '@mui/icons-material/Archive'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const StyledAddBtn = styled(Button)`
  background-color: #db4c3f !important;
  border: 1px solid #db4c3f !important;
  color: white !important;
  font-size: 12px !important;
  margin: 15px 15px 15px 0 !important;
  transition: all 0.1s;
  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }
`
const StyledCancelBtn = styled(Button)`
  border-color: #db4c3f !important;
  color: #db4c3f !important;
  font-size: 12px !important;
  margin-right: 10px !important;
  transition: transform 0.1s;
  :hover {
    transform: scale(1.02);
  }
  :active {
    transform: scale(0.98);
  }
`

function AddTask ({ checkedTasks }) {
  const dispatch = useDispatch()

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedProject, setSelectedProject] = useState({})
  const [taskName, setTaskName] = useState('')

  const addTaskDialogOpen = useSelector(state => state.tasks.addTaskDialogOpen)
  const project = useSelector(state => state.projects.project)
  const projects = useSelector(state => state.projects.projects)
  const submitting = useSelector(state => state.tasks.submitting)
  const tasks = useSelector(state => state.tasks.tasks)

  const { toggleAddTask } = taskActions

  useEffect(() => {
    setInitialProject()
  }, [project, projects])

  const setInitialProject = () => {
    if (project === 'INBOX' || project === 'TODAY' || project === 'NEXT_7') {
      setSelectedProject(() => projects[0]?.projectId)
    } else {
      const currentProject = projects.find(p => p.name === project)
      setSelectedProject(currentProject?.projectId)
    }
  }

  const handleDialogClose = () => {
    setTaskName(() => '')
    setSelectedDate(() => new Date())
    setInitialProject()
    dispatch(toggleAddTask(false))
  }

  const renderMenuItems = () =>
    projects.map(p => (
      <MenuItem key={p?.projectId} value={p?.projectId}>
        {p.name}
      </MenuItem>
    ))

  const addTask = async () => {
    let taskDate = moment(selectedDate).format('MM/DD/YYYY')
    const newTask = {
      archived: false,
      projectId: selectedProject || '',
      task: taskName,
      date: taskDate,
      userId: '123abc'
    }
    dispatch(
      addTaskAction(
        newTask,
        setTaskName,
        setSelectedDate,
        setSelectedProject,
        tasks
      )
    )
  }

  return (
    <div>
      <StyledAddBtn
        size='small'
        startIcon={<AddIcon />}
        data-testid='add-task-button'
        variant='outlined'
        onClick={() => dispatch(toggleAddTask(true))}
      >
        Add Task
      </StyledAddBtn>

      {checkedTasks.length > 0 && (
        <StyledAddBtn
          size='small'
          onClick={() => dispatch(archiveTasksAction(checkedTasks))}
          startIcon={<ArchiveIcon />}
          data-testid='archive-task-button'
          variant='outlined'
        >
          Archive
        </StyledAddBtn>
      )}

      <Dialog open={addTaskDialogOpen} onClose={handleDialogClose}>
        <DialogTitle style={{ width: '500px' }}>Add Task</DialogTitle>
        <DialogContent>
          {!submitting ? (
            <Stack spacing={4}>
              <TextField
                autoFocus
                fullWidth
                id='name'
                inputProps={{ maxLength: 150 }}
                label='Task Name'
                margin='dense'
                onChange={e => setTaskName(() => e.target.value)}
                required
                variant='standard'
              />
              <div>
                <InputLabel id='task-project-select-label'>Project</InputLabel>
                <Select
                  data-testid='task-project-select'
                  fullWidth
                  id='task-project-select'
                  label='Project'
                  labelId='task-project-select-label'
                  onChange={e => setSelectedProject(e.target.value)}
                  value={selectedProject}
                >
                  {renderMenuItems()}
                </Select>
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label='Date desktop'
                  inputFormat='MM/dd/yyyy'
                  value={selectedDate}
                  onChange={newValue => setSelectedDate(newValue)}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '15px 0 0 0'
              }}
            >
              <CircularProgress size={25} sx={{ color: '#ca2100' }} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <StyledCancelBtn onClick={handleDialogClose} variant='outlined'>
            Cancel
          </StyledCancelBtn>
          <StyledAddBtn onClick={addTask} variant='text'>
            Add Task
          </StyledAddBtn>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddTask.propTypes = {
  showAddTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickAddTask: PropTypes.bool,
  setShowQuickAddTask: PropTypes.func
}

export default AddTask
