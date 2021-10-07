import { createSlice } from '@reduxjs/toolkit';

export const createModal = createSlice({
  name: 'modal',
  initialState: {
    value: {
      open : true,
      type : null
    } 
  },
  reducers: {
    setModal: (state, action) => {
      state.value.open = !state.value.open
      state.value.type = action.payload
    }
  }
})

export const { setModal } = createModal.actions
export default createModal.reducer