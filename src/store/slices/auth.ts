import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null
  },
  reducers: {
    logIn: (state, {payload}) => {
      state.token = payload.accessToken
      state.user = payload.user
    },
    logout: state => {
      state.token = null
      state.user = null
    }
  }
})

export const { logIn, logout } = authSlice.actions
