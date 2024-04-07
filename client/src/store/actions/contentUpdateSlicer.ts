import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IContentUpdate {
  // isShouldUpdate: boolean;
  shouldOperationMenuUpdate: boolean;
  shouldMainContentUpdate: boolean;
}

const initialState: IContentUpdate = {
  // isShouldUpdate: true,
  shouldOperationMenuUpdate: true,
  shouldMainContentUpdate: true,
};

const contentUpdateSlicer = createSlice({
  name: 'contentUpdate',
  initialState,
  reducers: {
    setIsContentUpdate: (state, action: PayloadAction<IContentUpdate>) => {
      // state.isShouldUpdate = action.payload.isShouldUpdate;
      state.shouldOperationMenuUpdate = action.payload.shouldOperationMenuUpdate;
      state.shouldMainContentUpdate = action.payload.shouldMainContentUpdate;
    },
  },
});

export const { setIsContentUpdate } = contentUpdateSlicer.actions;

export default contentUpdateSlicer.reducer;
