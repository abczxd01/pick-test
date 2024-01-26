import { createSlice } from '@reduxjs/toolkit';
import { sendForm } from './actions';
import { SendFormResponse } from '../types';

interface FormState {
  data: SendFormResponse | null;
  loading: boolean;
  error: null | any;
}

const initialState: FormState = {
  data: null,
  loading: false,
  error: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(sendForm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      });
  },
});

export default formSlice.reducer;
