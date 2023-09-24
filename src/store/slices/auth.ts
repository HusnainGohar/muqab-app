import { createSlice } from '@reduxjs/toolkit'
import { AuthStoreType } from '../../utils/types'

const initialState: AuthStoreType = {
  token: undefined,
  user: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, { payload }) => {
      state.token = payload.accessToken
      state.user = payload.user
    },
    logout: state => {
      state.token = undefined
      state.user = undefined
    }
  }
})

export const { logIn, logout } = authSlice.actions
