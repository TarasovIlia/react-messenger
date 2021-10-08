import { createSlice } from '@reduxjs/toolkit';

export const createModal = createSlice({
  name: 'modal',
  initialState: {
    value: {
      open : true,
      path : null,
      name: null
    } 
  },
  reducers: {
    setModal: (state, action) => {
      state.value.open = action.payload.open
      state.value.path = action.payload.path
      state.value.name = action.payload.modalName
    }
  }
})

export const { setModal } = createModal.actions
export default createModal.reducer