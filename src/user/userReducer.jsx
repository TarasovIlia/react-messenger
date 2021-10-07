import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
  name: 'user',
  initialState: {
    value: {
      currentUser: {
        admin: false,
        email: null
      }
    }
  },
  reducers: {
    loginUser: (state, action) => {
      state.value.currentUser = action.payload
    }
  }
})

export const { loginUser } = userReducer.actions
export default userReducer.reducer