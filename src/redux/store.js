import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice/tasksReducer'
import projectsSlice from './projectsSlice/projectsSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        projects: projectsSlice.reducer,
    }
})