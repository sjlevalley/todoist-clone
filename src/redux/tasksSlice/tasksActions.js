import { taskActions } from './tasksSlice'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore'
import moment from 'moment'
import db from '../../firebase'
import { uiActions } from '../uiSlice/uiSlice'

export const getTasksAction = (selectedProject, projectId) => {
  return async dispatch => {
    const fetchData = async () => {
      let tasksRef = collection(db, 'tasks')
      let q = query(tasksRef, where('userId', '==', '123abc'))
      if (selectedProject === 'project') {
        q = query(tasksRef, where('projectId', '==', projectId))
      } else if (selectedProject === 'TODAY') {
        q = query(tasksRef, where('date', '==', moment().format('MM/DD/YYYY')))
      }
      let querySnapshot = await getDocs(q)
      let tasks = []
      querySnapshot.forEach(item => {
        const taskObj = {
          docId: item.id,
          ...item.data()
        }
        tasks.push(taskObj)
      })
      if (selectedProject === 'NEXT_7') {
        tasks.filter(
          task =>
            moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
            task.archived !== true
        )
      }
      tasks = tasks.filter(task => task.archived !== true)
      return tasks
    }

    try {
      dispatch(taskActions.setLoading(true))
      const tasks = await fetchData()
      dispatch(taskActions.setTasks({ tasks }))
    } catch (e) {
      console.error(e)
      dispatch(
        uiActions.addNotification({
          id: Math.random(),
          status: 'error',
          title: 'ERROR',
          text: 'An Error occurred while fetching tasks.'
        })
      )
    }
    dispatch(taskActions.setLoading(false))
  }
}

export const archiveTasksAction = checkedTasks => {
  return async dispatch => {
    const archiveTasks = async () => {
      checkedTasks.forEach(async taskId => {
        const docRef = doc(db, 'tasks', `${taskId}`)
        await updateDoc(docRef, {
          archived: true
        })
      })
    }

    try {
      dispatch(taskActions.setSubmitting(true))
      const tasks = await archiveTasks()
      dispatch(taskActions.archiveTasks({ checkedTasks }))
      const message =
        checkedTasks.length === 1
          ? 'Task Archived Successfully'
          : 'Tasks Archived Successfully'
      dispatch(
        uiActions.setNotification({
          level: 'success',
          message
        })
      )
    } catch (e) {
      console.error(e)
      dispatch(
        uiActions.addNotification({
          id: Math.random(),
          status: 'error',
          title: 'ERROR',
          text: 'An Error occurred while archiving tasks.'
        })
      )
    }
    dispatch(taskActions.setSubmitting(false))
  }
}
