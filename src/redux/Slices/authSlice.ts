import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState:any = {
  isAuthenticated: false,
  user: {} as any,
}

export const AuthSlice:any = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, actions: PayloadAction<any>) => {
      const { isAuthenticated, user } = actions.payload
      state.user = user
      state.isAuthenticated = isAuthenticated
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = AuthSlice.actions

export default AuthSlice.reducer
