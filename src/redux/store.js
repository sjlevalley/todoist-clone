import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice/tasksReducer'
import projectsReducer from './projectsSlice/projectsReducer'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        projects: projectsReducer,
    }
})