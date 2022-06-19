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
        getTasks: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.tasks = [{ hello: 'Hello' }]
        }
    },
})

// Action creators are generated for each case reducer function
export const { getTasks } = tasksSlice.actions

export default tasksSlice.reducer