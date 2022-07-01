import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addTaskDialogOpen: false,
  loading: false,
  submitting: false,
  task: {},
  tasks: []
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    archiveTasks: (state, action) => {
      const checked = action.payload.checkedTasks
      const newTasks = state.tasks.filter(task => !checked.includes(task.docId))
      state.tasks = newTasks
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSubmitting: (state, action) => {
      state.submitting = action.payload
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks
    },
    toggleAddTask: (state, action) => {
      state.addTaskDialogOpen = action.payload
    }
  }
})

export const taskActions = tasksSlice.actions

export default tasksSlice
