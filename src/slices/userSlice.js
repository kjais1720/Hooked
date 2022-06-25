import { createSlice } from "@reduxjs/toolkit";
import {
  authenticateUser,
  getCurrentUserFromBackend,
  updateCurrentUser,
  getAllUsers,
  followUser,
  unfollowUser,
  bookmarkPost,
} from "services";
const initialState = {
  currentUser: {},
  allUsers: [],
  isLoggedIn: localStorage.getItem("USER_TOKEN") && true,
  status: {
    type: "",
    value: "idle",
    payload:""
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
      })
      //Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.status.type = "getAllUsers";
        state.status.value = "pending";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status.value = "success";
        const allOtherUsers = action.payload.filter(
          ({ _id }) => _id !== state.currentUser._id
        );
        state.allUsers = allOtherUsers;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status.value = "error";
      })
      //Follow a user
      .addCase(followUser.pending, (state, {meta}) => {
        state.status.type = "followUser";
        state.status.value = "pending";
        state.status.payload= meta.arg
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status.value = "success";
        const followUserId = action.payload;
        const followUser = state.allUsers.find(
          ({ _id }) => _id === followUserId
        );
        state.currentUser.following.push(followUserId);
        followUser.followers.push(state.currentUser._id);
      })
      .addCase(followUser.rejected, (state) => {
        state.status.value = "error";
      })
      //Unfollow a user
      .addCase(unfollowUser.pending, (state, {meta}) => {
        state.status.type = "unfollowUser";
        state.status.value = "pending";
        state.status.payload = meta.arg
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status.value = "success";
        const unfollowUserId = action.payload;
        const unfollowUser = state.allUsers.find(
          ({ _id }) => _id === unfollowUserId
        );
        state.currentUser.following = state.currentUser.following.filter(
          (id) => id !== unfollowUserId
        );
        unfollowUser.followers = unfollowUser.followers.filter(
          (id) => id !== state.currentUser._id
        );
      })
      .addCase(unfollowUser.rejected, (state) => {
        state.status.value = "error";
      })
      //Bookmark a Post
      .addCase(bookmarkPost.pending, (state) => {
        state.status.type = "bookmarkPost";
        state.status.value = "pending";
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        state.status.value = "success";
        const postId = action.payload;
        state.currentUser.savedPosts.push(postId);
      })
      .addCase(bookmarkPost.rejected, (state) => {
        state.status.value = "error";
      });
  },
});
export const getCurrentUser = (state) => state.user.currentUser;
export const getUserById = (state, userId) =>
  state.user.allUsers.find(({ _id }) => _id === userId);
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
