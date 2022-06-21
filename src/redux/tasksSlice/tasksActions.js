import { projectActions } from './projectsSlice'
import {
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore'
import moment from 'moment'
import db from '../../firebase'

// Action Creator Thunk (A function that can return another function as well as execute asynchronous functions). This action creator is used to fetch the cart data from the Firebase database.
export const getTasksAction = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            let tasksRef = collection(db, 'tasks')
            let q = query(tasksRef, where('userId', '==', '123abc'))
            let querySnapshot = await getDocs(q)
            // let tasks = []
            // querySnapshot.forEach(item => {
            //     const taskObj = {
            //         docId: item.id,
            //         ...item.data()
            //     }
            //     tasks.push(taskObj)
            // })
            // return tasks
        };

        try {
            const projects = await fetchData();
            console.log(projects)
            dispatch(
                projectActions.setProjects({ projects })
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
