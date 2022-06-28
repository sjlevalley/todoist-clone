import { projectActions } from './projectsSlice'
import { uiActions } from '../uiSlice/uiSlice'
import {
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore'
import db from '../../firebase'

export const getProjectsAction = () => {
    return async (dispatch) => {
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
        };

        try {
            dispatch(
                projectActions.setLoading(true)
            );
            const projects = await fetchData();
            dispatch(
                projectActions.setProjects({ projects })
            );
        } catch (e) {
            console.error(e)
            dispatch(uiActions.addNotification({
                id: Math.random(),
                status: 'error',
                title: 'ERROR',
                text: 'An Error occurred while fetching projects.',
            }))
        }
        dispatch(
            projectActions.setLoading(false)
        );
    };
};
