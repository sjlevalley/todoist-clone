import React, { useState, useEffect } from 'react'
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
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

  useEffect(() => {
    const testFunction = async () => {
      // // Get tasks where userId is equal to 123abc
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

      // let querySnapshot = await getDocs(q);
      let querySnapshot = await getDocs(q)
      querySnapshot.forEach(item => {
        const unsubscribe = onSnapshot(doc(db, 'tasks', item.id), doc => {
          console.log('Current data: ', doc.data())
        })
      })
      // querySnapshot.forEach((doc) => {
      //     console.log("Current data: ", doc.data());
      // });
      // unsubscribe()
      // unsubscribe.onSnapshot(snapshot => {
      //     const newTasks = snapshot.docs.map(task => ({
      //         id: task.id,
      //         ...task.data()
      //     }))
      //     setTasks(
      //         selectedProject === 'NEXT_7'
      //             ? newTasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
      //                 task.archived !== true
      //             )
      //             : newTasks.filter((task) => task.archived !== true)
      //     )
      //     setArchivedTasks(newTasks.filter((task) => task.archived !== false))
      // })
      // return unsubscribe
      return null
    }
    testFunction()
  }, [selectedProject])

  return { tasks, archivedTasks }
  // The lines below should return all the current and archived tasks for the selected project with an Id of 1
  // const selectedProject = 1
  // const {tasks, archivedTasks} = useTasks(selectedProject)
}

export const useProjects = () => {
  const [projects, setProjects] = useState([])

  // useEffect(() => {
  //     db
  //         .firestore()
  //         .collection('projects')
  //         .where('userId', '==', '123abc')
  //         .orderBy('projectId')
  //         .get()
  //         .then((snapshot) => {
  //             const allProjects = snapshot.docs.map((project) => ({
  //                 ...project.data(),
  //                 docId: project.id
  //             }))
  //             if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
  //                 setProjects(allProjects)
  //             }
  //         })
  // }, [projects])

  return { projects, setProjects }
}
