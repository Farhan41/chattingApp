import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'loginUser',
  initialState: {
    value: null
  },
  reducers: {
    loggedUser: (state, action) => {
      state.value = action.payload
    }
  }
})


export const { loggedUser } = userSlice.actions

export default userSlice.reducer