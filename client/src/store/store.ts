import { configureStore } from '@reduxjs/toolkit';

import modalPopupSlicer from './actions/modalPopupSlicer';
import contentUpdateSlicer from './actions/contentUpdateSlicer';
import activeMenuSlicer from './actions/activeMenuSlicer';

export const store = configureStore({
  reducer: {
    modalPopup: modalPopupSlicer,
    contentUpdate: contentUpdateSlicer,
    activeMenu: activeMenuSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
