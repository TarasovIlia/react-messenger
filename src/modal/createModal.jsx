import { createSlice } from '@reduxjs/toolkit';

export const createModal = createSlice({
  name: 'modal',
  initialState: {
    value: true,
  },
  reducers: {
    setModal: (state) => {
      state.value = !state.value;
    }
  }
})

export const { setModal } = createModal.actions
export default createModal.reducer