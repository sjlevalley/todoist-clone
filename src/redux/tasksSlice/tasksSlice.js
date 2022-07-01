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
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks
    },
    toggleAddTask: (state, action) => {
      state.addTaskDialogOpen = action.payload
    },
    setSubmitting: (state, action) => {
      state.submitting = action.payload
    },
    archiveTasks: (state, action) => {
      const checked = action.payload.checkedTasks
      const newTasks = state.tasks.filter(task => !checked.includes(task.docId))
      state.tasks = newTasks
    }
  }
})

export const taskActions = tasksSlice.actions

export default tasksSlice
