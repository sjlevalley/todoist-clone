import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: [],
    project: {},
    loading: false,
    submitting: false
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        getProjects: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.projects = [{ project: 'HelloProject' }]
        }
    },
})

// Action creators are generated for each case reducer function
export const { getProjects } = projectsSlice.actions

export default projectsSlice.reducer