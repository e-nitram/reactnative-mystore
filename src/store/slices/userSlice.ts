import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  token: null,
  status: 'idle',
};

export const loginUser = createAsyncThunk('user/login', async (credentials: { username: string; password: string }) => {
  const response = await axios.post('https://fakestoreapi.com/auth/login', credentials);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.status = 'succeeded';
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export default userSlice.reducer;
