import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: [],
    project: 'INBOX',
    loading: false,
    submitting: false
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload.projects
        },
        setProject: (state, action) => {
            state.project = action.payload
        }
    },
})

export const projectActions = projectsSlice.actions

export default projectsSlice