import { projectActions } from './projectsSlice'
import { taskActions } from '../tasksSlice/tasksSlice'
import { uiActions } from '../uiSlice/uiSlice'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'
import db from '../../firebase'

export const getProjectsAction = () => {
  return async dispatch => {
    const fetchData = async () => {
      let projectsRef = collection(db, 'projects')
      let q = query(projectsRef, where('userId', '==', '123abc'))
      let querySnapshot = await getDocs(q)
      let projects = []
      querySnapshot.forEach(item => {
        const projectObj = {
          docId: item.id,
          ...item.data()
        }
        projects.push(projectObj)
      })
      return projects
    }

    try {
      dispatch(projectActions.setLoading(true))
      const projects = await fetchData()
      dispatch(projectActions.setProjects({ projects }))
    } catch (e) {
      console.error(e)
      dispatch(
        uiActions.addNotification({
          id: Math.random(),
          status: 'error',
          title: 'ERROR',
          text: 'An Error occurred while fetching projects.'
        })
      )
    }
    dispatch(projectActions.setLoading(false))
  }
}

export const addProjectAction = newProjectInfo => {
  const { name } = newProjectInfo
  if (name.trim() === '') {
    return console.error('Must enter a Project Name')
  }
  return async dispatch => {
    const addProject = async () => {
      const add = await addDoc(collection(db, 'projects'), newProjectInfo)
      return true
    }
    try {
      dispatch(projectActions.setSubmitting(true))
      const addTest = await addProject()
      dispatch(getProjectsAction())
      dispatch(
        uiActions.setNotification({
          level: 'success',
          message: 'Project Added Successfully!'
        })
      )
      dispatch(projectActions.setAddProjectName(''))
      dispatch(projectActions.setProjectDialogOpen(false))
      dispatch(projectActions.setProject(newProjectInfo.name))
      dispatch(projectActions.setSubmitting(false))
      dispatch(taskActions.setTasks({ tasks: [] }))
    } catch (e) {
      console.error(e)
      dispatch(
        uiActions.addNotification({
          id: Math.random(),
          status: 'error',
          title: 'ERROR',
          text: 'An Error occurred while fetching projects.'
        })
      )
    }
    dispatch(projectActions.setLoading(false))
  }
}
