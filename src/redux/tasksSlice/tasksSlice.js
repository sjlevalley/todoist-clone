import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: [],
    task: {},
    loading: false,
    submitting: false
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload.tasks
        }
    },
})

export const taskActions = tasksSlice.actions

export default tasksSlice