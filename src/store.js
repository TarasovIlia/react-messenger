import { configureStore } from '@reduxjs/toolkit';
import createModal from './modal/createModal';

export default configureStore({
  reducer: {
    modal: createModal
  },
})