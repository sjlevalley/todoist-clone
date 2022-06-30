import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  project: 'INBOX',
  loading: false,
  submitting: false,
  projectDialogOpen: false,
  addProjectName: ''
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setProjects: (state, action) => {
      state.projects = action.payload.projects
    },
    setProject: (state, action) => {
      state.project = action.payload
    },
    setProjectDialogOpen: (state, action) => {
      state.projectDialogOpen = action.payload
    },
    setSubmitting: (state, action) => {
      state.submitting = action.payload
    },
    setAddProjectName: (state, action) => {
      state.addProjectName = action.payload
    }
  }
})

export const projectActions = projectsSlice.actions

export default projectsSlice
