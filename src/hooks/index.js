import React, { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import moment from 'moment'
import db from '../firebase'
import { projectTasksExist } from '../helpers'

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])

  const tasksFunction = async () => {
    let tasksRef = collection(db, 'tasks')
    let q = query(tasksRef, where('userId', '==', '123abc'))

    if (
      selectedProject &&
      !projectTasksExist(selectedProject) &&
      selectedProject !== 'INBOX' &&
      selectedProject !== 'TODAY'
    ) {
      q = query(tasksRef, where('projectId', '==', selectedProject))
    } else if (selectedProject === 'TODAY') {
      q = query(tasksRef, where('date', '==', moment().format('DD/MM/YYYY')))
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      q = query(tasksRef, where('date', '==', ''))
    }

    let querySnapshot = await getDocs(q)
    let newTasks = []
    querySnapshot.forEach(item => {
      const newTask = {
        id: item.id,
        ...item.data()
      }
      newTasks.push(newTask)
      if (selectedProject === 'NEXT_7') {
        newTasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true)
      } else {
        newTasks.filter((task) => task.archived !== true)
      }
    })
    setTasks(() => newTasks)
    setArchivedTasks(newTasks.filter((task) => task.archived !== false))
  }

  useEffect(() => {
    tasksFunction()
  }, [selectedProject])

  return { tasks, archivedTasks }
}

export const useProjects = () => {
  const [projects, setProjects] = useState([])

  const projectsFunction = async () => {
    let projectsRef = collection(db, 'projects')
    let q = query(projectsRef, where('userId', '==', '123abc'))

    let querySnapshot = await getDocs(q)
    let allProjects = []
    querySnapshot.forEach(item => {
      const projectObj = {
        docId: item.id,
        ...item.data()
      }
      return allProjects.push(projectObj)
    })
    if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
      setProjects(() => allProjects)
    }
  }
  useEffect(() => {
    projectsFunction()
  }, [projects])


  return { projects, setProjects }
}
