import React, { useState, useEffect } from 'react'
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import moment from 'moment'
import db from '../firebase'
import { collatedTasksExist } from '../helpers'

export const useTasks = selectedProject => {

    const [tasks, setTasks] = useState([])
    const [archivedTasks, setArchivedTasks] = useState([])


    useEffect(() => {

        const testFunction = async () => {
            let q = query(collection(db, 'tasks'), where('userId', '==', '123abc'))
            const unsubscribe = await getDocs(q)
            unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ?
                (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
                : selectedProject === 'TODAY' ?
                    (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
                    : (selectedProject === 'INBOX' || selectedProject === 0) ?
                        (unsubscribe = unsubscribe.where('date', '==', ''))
                        : unsubscribe;
            unsubscribe = unsubscribe.onSnapshot(snapshot => {
                const newTasks = snapshot.docs.map(task => ({
                    id: task.id,
                    ...task.data()
                }))
                setTasks(
                    selectedProject === 'NEXT_7'
                        ? newTasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                            task.archived !== true
                        )
                        : newTasks.filter((task) => task.archived !== true)
                )
                setArchivedTasks(newTasks.filter((task) => task.archived !== false))
            })
        }
        testFunction()
        // return () => unsubscribe()
    }, [selectedProject])

    return { tasks, archivedTasks }
    // The lines below should return all the current and archived tasks for the selected project with an Id of 1
    // const selectedProject = 1
    // const {tasks, archivedTasks} = useTasks(selectedProject)
}


export const useProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        db
            .firestore()
            .collection('projects')
            .where('userId', '==', '123abc')
            .orderBy('projectId')
            .get()
            .then((snapshot) => {
                const allProjects = snapshot.docs.map((project) => ({
                    ...project.data(),
                    docId: project.id
                }))
                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects)
                }
            })
    }, [projects])

    return { projects, setProjects }
}

