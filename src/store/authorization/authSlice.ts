const { createSlice, isAnyOf } = require('@reduxjs/toolkit');
import { initialState } from "../initialState";
import {
    handleFulfilled,
    handleFulfilledLogIn,
    handleFulfilledLogOut,
    handleFulfilledReg,
    handleFulfilledcurrentLogin,
    handlePending,
    handleRejected,
  } from './funcSupportSliceAuth';
  import {
    currentUserThunk,
    logInThunk,
    logOutThunk,
    registerThunk,
  } from './thunkAuth';
  
  
  const authSlice = createSlice({
    name: 'auth',
    initialState: initialState.auth,
  
    extraReducers: (builder: any) => {
      builder
        .addCase(registerThunk.fulfilled, handleFulfilledReg)
        .addCase(logInThunk.fulfilled, handleFulfilledLogIn)
        .addCase(logOutThunk.fulfilled, handleFulfilledLogOut)
        .addCase(currentUserThunk.fulfilled, handleFulfilledcurrentLogin)
        .addMatcher(
          isAnyOf(
            registerThunk.pending,
            logInThunk.pending,
            logOutThunk.pending,
            currentUserThunk.pending
          ),
          handlePending
        )
        .addMatcher(
          isAnyOf(
              registerThunk.rejected,
              logInThunk.rejected,
              logOutThunk.rejected,
              currentUserThunk.rejected
          ),
          handleRejected
        )
        .addMatcher(
          isAnyOf(
              registerThunk.fulfilled,
              logInThunk.fulfilled,
              logOutThunk.fulfilled,
              currentUserThunk.fulfilled
          ),
          handleFulfilled
        );
    },
  });
  
  export const authReducer = authSlice.reducer;