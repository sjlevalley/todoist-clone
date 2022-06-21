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
        setProjects: (state, action) => {
            state.projects = action.payload.projects
        }
    },
})

export const projectActions = projectsSlice.actions

export default projectsSlice