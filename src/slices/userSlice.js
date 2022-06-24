import { createSlice } from "@reduxjs/toolkit";
import { authenticateUser, getCurrentUserFromBackend, updateCurrentUser } from "services";
const initialState = {
  currentUser: {},
  allUsers: [],
  isLoggedIn: localStorage.getItem("USER_TOKEN") && true,
  status: {
    type: "",
    value: "idle",
  },
  error: {
    status: 0,
    message: "",
  },
};

const getErrorStatus = (errorMessage) => errorMessage.split(" ").slice(-1)[0];

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload?.user ?? {};
    },
    logout: () => {
      localStorage.removeItem("USER_TOKEN");
      localStorage.removeItem("USER_ID");
      return { ...initialState, isLoggedIn: false };
    },
  },
  extraReducers: (builder) => {
    builder
      //Login/Signup
      .addCase(authenticateUser.pending, (state) => {
        state.status.type = "authentication";
        state.status.value = "pending";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
        localStorage.setItem("USER_TOKEN", action.payload.authToken);
        localStorage.setItem("USER_ID", action.payload.user._id);
        state.status.value = "success";
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status.value = "error";
        state.error.status = getErrorStatus(action.error.message);
        state.error.message = action.error.message;
      })
      //Get Current User
      .addCase(getCurrentUserFromBackend.pending, (state) => {
        state.status.type = "getCurrentUser";
        state.status.value = "pending";
      })
      .addCase(getCurrentUserFromBackend.fulfilled, (state, action) => {
        state.status.value = "success";
        state.currentUser = action.payload.user;
      })
      .addCase(getCurrentUserFromBackend.rejected, (state) => {
        state.status.value = "error";
      })
      //Update Current User
      .addCase(updateCurrentUser.pending, (state) => {
        state.status.type = "updateUser";
        state.status.value = "pending";
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.status.value = "success";
        state.currentUser = action.payload;
      })
      .addCase(updateCurrentUser.rejected, (state) => {
        state.status.value = "error";
      });
  },
});
export const getCurrentUser = (state) => state.user.currentUser;
export const getUserById = (state, userId) =>
  state.user.allUsers.find(({ _id }) => _id === userId);
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
