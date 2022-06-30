import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Local imports
import AddTask from './AddTask'
import { getTasksAction } from '../redux/tasksSlice/tasksActions'
// Mui imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'

function Tasks () {
  const dispatch = useDispatch()
  const [checkedTasks, setCheckedTasks] = useState([])
  const projects = useSelector(state => state.projects.projects)
  const projectName = useSelector(state => state.projects.project)
  const tasks = useSelector(state => state.tasks.tasks)
  const tasksLoading = useSelector(state => state.tasks.loading)

  useEffect(() => {
    document.title = `${projectName}: Todoist`
  }, [projectName])

  useEffect(() => {
    dispatch(getTasksAction(projectName))
  }, [])

  const handleCheckboxClick = id => {
    let updated = [...checkedTasks]
    if (updated.includes(id)) {
      updated = updated.filter(taskId => taskId !== id)
    } else {
      updated.push(id)
    }
    setCheckedTasks(updated)
  }

  const renderTasks = () => {
    let taskObjects = tasks.map(t => {
      const found = projects.find(p => p.projectId === t.projectId)
      return {
        ...t,
        projectName: found?.name
      }
    })
    const taskItems = taskObjects.map(task => (
      <li
        key={task.id}
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Checkbox
          size='small'
          checked={checkedTasks.includes(task.docId)}
          onChange={() => handleCheckboxClick(task.docId)}
          sx={{
            color: '#db4c3f',
            '&.Mui-checked': {
              color: '#db4c3f'
            },
            margin: '0 5px 0 0'
          }}
        />
        <span>{task.task}</span>
        <small style={{ marginLeft: 'auto' }}>
          {task.projectName ? task.projectName : '(No Project)'}
        </small>
      </li>
    ))
    return taskItems
  }

  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>
      {tasksLoading ? (
        <ul className='tasks__list'>
          <Box sx={{ display: 'flex', margin: '0 0 20px 15px' }}>
            <CircularProgress size={25} sx={{ color: '#ca2100' }} />
          </Box>
        </ul>
      ) : !tasksLoading && tasks.length > 0 ? (
        <>{<ul className='tasks__list'>{renderTasks()}</ul>}</>
      ) : (
        <ul className='tasks__list'>
          <li>
            <i>No Tasks Found</i>
          </li>
        </ul>
      )}
      <AddTask checkedTasks={checkedTasks} />
    </div>
  )
}

export default Tasks
