import { configureStore } from '@reduxjs/toolkit';
import createModal from './modal/createModal';
import createUser from './user/createUser';

export default configureStore({
  reducer: {
    modal: createModal,
    user: createUser
  },
})