import { configureStore } from '@reduxjs/toolkit';
import createModal from './modal/createModal';
import userReducer from './user/userReducer';

export default configureStore({
  reducer: {
    modal: createModal,
    user: userReducer
  },
})