import { taskActions } from './tasksSlice'
import {
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore'
import moment from 'moment'
import db from '../../firebase'

// Action Creator Thunk (A function that can return another function as well as execute asynchronous functions). This action creator is used to fetch the cart data from the Firebase database.
export const getTasksAction = (selectedProject, projectId) => {
    return async (dispatch) => {
        const fetchData = async () => {
            // 'INBOX' default
            let tasksRef = collection(db, 'tasks')
            let q = query(tasksRef, where('userId', '==', '123abc'))
            if (selectedProject === 'project') {
                q = query(tasksRef, where('projectId', '==', projectId))
            } else if (selectedProject === 'TODAY') {
                q = query(tasksRef, where('date', '==', moment().format('DD/MM/YYYY')))
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
            console.log(tasks)
            if (selectedProject === 'NEXT_7') {
                tasks.filter(task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true)
            } else {
                tasks.filter((task) => task.archived !== true)
            }
            return tasks
        };

        try {
            const tasks = await fetchData();
            dispatch(
                taskActions.setTasks({ tasks })
            );
        } catch (error) {
            console.error(error)

            // Set the notification component to 'error' status
            // dispatch(
            //     uiActions.showNotification({
            //         status: 'error',
            //         title: 'Error!',
            //         message: 'Fetching cart data failed!',
            //     })
            // );
        }
    };
};
