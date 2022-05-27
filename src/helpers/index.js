import { projectTasks } from '../constants'

export const projectTasksExist = selectedProject => {
  projectTasks.find(task => task.key === selectedProject)
}
