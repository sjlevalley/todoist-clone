import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: {
        error: false,
        errorsArray: [],
        loading: false,
        submitting: false
    },
    tasks: {
        error: false,
        errorsArray: [],
        loading: false,
        submitting: false
    }
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        // setTasks: (state, action) => {
        //     state.tasks = action.payload.tasks
        // }
    },
})

export const uiActions = uiSlice.actions

export default uiSlice