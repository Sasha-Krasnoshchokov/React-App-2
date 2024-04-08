import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IContentUpdate {
  shouldOperationMenuUpdate: boolean;
  shouldMainContentUpdate: boolean;
}

const initialState: IContentUpdate = {
  shouldOperationMenuUpdate: true,
  shouldMainContentUpdate: true,
};

const contentUpdateSlicer = createSlice({
  name: 'contentUpdate',
  initialState,
  reducers: {
    setIsContentUpdate: (state, action: PayloadAction<IContentUpdate>) => {
      state.shouldOperationMenuUpdate = action.payload.shouldOperationMenuUpdate;
      state.shouldMainContentUpdate = action.payload.shouldMainContentUpdate;
    },
  },
});

export const { setIsContentUpdate } = contentUpdateSlicer.actions;

export default contentUpdateSlicer.reducer;
