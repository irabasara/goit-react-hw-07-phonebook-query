import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = '';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    getFiltersValue(state, action) {
      return (state = action.payload);
    },
  },
});

export const { getFiltersValue } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
