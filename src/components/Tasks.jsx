import React from 'react'
import Checkbox from './Checkbox'
import { useTasks } from '../hooks'
import db from '../firebase'

function Tasks () {
  const { tasks } = useTasks('1')
  // const tasks = [];

  console.log(tasks)

  const projectName = ''

  return (
    <div className='tasks' data-testid='tasks'>
      <h2 data-testid='project-name'>{projectName}</h2>
      <ul className='tasks__list'>
        {tasks.map(task => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tasks
