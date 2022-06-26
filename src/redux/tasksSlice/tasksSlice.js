import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    task: {},
    addTaskDialogOpen: false,
    loading: false,
    submitting: false
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks
        },
        toggleAddTask: (state, action) => {
            state.addTaskDialogOpen = action.payload
        }
    },
})

export const taskActions = tasksSlice.actions

export default tasksSlice