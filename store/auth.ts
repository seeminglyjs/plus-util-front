import { AuthState } from '../interface/Auth/AuthState';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthData } from "@/interface/Auth/AuthData";

export const initialState: AuthState = {
    authData: null,
  };

  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setAuthData: (state, action: PayloadAction<AuthData>) => {
        state.authData = action.payload;
      },
      clearAuthData: (state) => {
        state.authData = null;
      },
    },
  });
  
  export const { setAuthData, clearAuthData } = authSlice.actions;
  
  export default authSlice.reducer;