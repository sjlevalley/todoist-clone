import { projectTasks } from '../constants'

export const projectTasksExist = selectedProject => {
  const project = projectTasks.find(task => task.key === selectedProject)
  return project ? project.name : null
}

export const getTitle = (projects, projectId) => (
  projects.find(obj => obj.projectId === projectId)
)

export const getCollatedTitle = (projects, key) => (
  projects.find(obj => obj.key === key)
)
