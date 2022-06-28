import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './tasksSlice/tasksSlice'
import projectsSlice from './projectsSlice/projectsSlice'
import uiSlice from './uiSlice/uiSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksSlice.reducer,
        projects: projectsSlice.reducer,
        ui: uiSlice.reducer
    }
})