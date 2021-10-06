import { createSlice } from '@reduxjs/toolkit';


const user = JSON.parse(localStorage.getItem('user'))

export const createUser = createSlice({
  name: 'user',
  initialState: {
    value: {
      user: user || false
    }
  },
  reducers: {
    setUser: (state) => {
      state.value = !state.value 
    }
  }
})

export const { setUser } = createUser.actions
export default createUser.reducer