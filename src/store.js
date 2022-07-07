import { configureStore } from "@reduxjs/toolkit";
import userReducer from "slices/userSlice";
import modalReducer from "slices/modalSlice"
import postsReducer from "slices/postsSlice";
import themeReducer from "slices/themeSlice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    posts:postsReducer,
    theme: themeReducer,
  },
});
