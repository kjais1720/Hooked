import { configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/userSlice";
import modalReducer from "slices/modalSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer
  },
});
