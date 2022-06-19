import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice/tasksReducer'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    }
})