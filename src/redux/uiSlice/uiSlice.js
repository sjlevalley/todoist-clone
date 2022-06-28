import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    notification: {}
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notification = action.payload
        },
        clearNotification: (state, action) => {
            state.notification = {}
        }
    },
})

export const uiActions = uiSlice.actions

export default uiSlice