import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IMenu } from '../../types/common';

const initialState: { activeMenu: IMenu; activeOperationMenu: IMenu } = {
  activeMenu: {
    id: '',
    title: '',
    iconUrl: '',
  },
  activeOperationMenu: {
    id: '',
    title: '',
    iconUrl: '',
  },
};

const activeMenuSlicer = createSlice({
  name: 'activeMenu',
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<IMenu | undefined>) => {
      if (!action.payload) {
        state.activeMenu = { ...initialState.activeMenu };
        return;
      }
      state.activeMenu = { ...action.payload };
    },
    resetActiveMenu: (state) => {
      state.activeMenu = initialState.activeMenu;
    },
    setActiveOperationMenu: (state, action: PayloadAction<IMenu | undefined>) => {
      if (!action.payload) {
        state.activeOperationMenu = { ...initialState.activeOperationMenu };
        return;
      }
      state.activeOperationMenu = { ...action.payload };
    },
    resetActiveOperationMenu: (state) => {
      state.activeOperationMenu.id = initialState.activeOperationMenu.id;
      state.activeOperationMenu.title = initialState.activeOperationMenu.title;
      state.activeOperationMenu.iconUrl = initialState.activeOperationMenu.iconUrl;
    },
  },
});

export const { setActiveMenu, resetActiveMenu, setActiveOperationMenu, resetActiveOperationMenu } =
  activeMenuSlicer.actions;

export default activeMenuSlicer.reducer;
