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
            const projects = await fetchData();
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


// // Action Creator Thunk (A function that can return another function as well as execute asynchronous functions). This action creator is used to send the cart data to the Firebase database.
// export const sendCartData = (cart) => {
//     // Returns this async function
//     return async (dispatch) => {
//         // Set the notification component to 'pending' status.
//         dispatch(
//             uiActions.showNotification({
//                 status: 'pending',
//                 title: 'Sending...',
//                 message: 'Sending cart data!',
//             })
//         );

//         // Send the updated cart data asynchronously
//         const sendRequest = async () => {
//             // Make the database call and set the method to 'PUT' to replace the existing data
//             const response = await fetch(
//                 'https://react-http-2d840-default-rtdb.firebaseio.com/cart.json',
//                 {
//                     method: 'PUT',
//                     body: JSON.stringify({
//                         items: cart.items,
//                         totalQuantity: cart.totalQuantity,
//                     }),
//                 }
//             );

//             // If the response is not ok, throw an error
//             if (!response.ok) {
//                 throw new Error('Sending cart data failed.');
//             }
//         };


//         // Call the function in a try catch block.
//         try {
//             await sendRequest();
//             // If the response is ok, set the notification to success
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'success',
//                     title: 'Success!',
//                     message: 'Sent cart data successfully!',
//                 })
//             );
//             // Catch any errors from the sendRequest function and set the notification to error status.
//         } catch (error) {
//             dispatch(
//                 uiActions.showNotification({
//                     status: 'error',
//                     title: 'Error!',
//                     message: 'Sending cart data failed!',
//                 })
//             );
//         }
//     };
// };
