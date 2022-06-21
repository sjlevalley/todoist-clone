import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasksSlice/tasksSlice'
import projectsSlice from './projectsSlice/projectsSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        projects: projectsSlice.reducer,
    }
})