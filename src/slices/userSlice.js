import { createSlice } from "@reduxjs/toolkit";
import {
  authenticateUser,
  getCurrentUserFromBackend,
  updateCurrentUser,
  getAllUsers,
  followUser,
  unfollowUser,
  bookmarkPost,
  getNotifications,
  deleteNotification,
  likePost,
} from "services";
import { BOOKMARK_ADDED, BOOKMARK_REMOVED, POST_LIKED, POST_UNLIKED } from "constants";

const initialState = {
  currentUser: {},
  allUsers: [],
  isLoggedIn: localStorage.getItem("USER_TOKEN") && true,
  status: {
    type: "",
    value: "idle",
    payload: "",
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
        state.status.type = "authenticateUser";
        state.status.value = "pending";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
        localStorage.setItem("USER_TOKEN", action.payload.authToken);
        localStorage.setItem("USER_ID", action.payload.user._id);
        state.status.value = "fulfilled";
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
        state.status.value = "fulfilled";
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
        state.status.value = "fulfilled";
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
        state.status.value = "fulfilled";
        const allOtherUsers = action.payload.filter(
          ({ _id }) => _id !== state.currentUser._id
        );
        state.allUsers = allOtherUsers;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status.value = "error";
      })
      //Follow a user
      .addCase(followUser.pending, (state, { meta }) => {
        state.status.type = "followUser";
        state.status.value = "pending";
        state.status.payload = meta.arg;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.status.value = "fulfilled";
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
      .addCase(unfollowUser.pending, (state, { meta }) => {
        state.status.type = "unfollowUser";
        state.status.value = "pending";
        state.status.payload = meta.arg;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.status.value = "fulfilled";
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
      .addCase(
        bookmarkPost.pending,
        ( state, { meta: { arg } }) => {
          state.status.type = "bookmarkPost";
          state.status.value = "pending";
          state.status.payload = arg;
        }
      )
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        state.status.value = "fulfilled";
        const { postId, data } = action.payload;
        switch (data) {
          case BOOKMARK_ADDED:
            state.currentUser.bookmarks.push(postId);
            break;
          case BOOKMARK_REMOVED:
            const indexOfPostToRemove = state.currentUser.bookmarks.findIndex((id)=> id === postId);
            state.currentUser.bookmarks.splice(indexOfPostToRemove,1)
            break;
          default:
            break;
        }
      })
      .addCase(bookmarkPost.rejected, (state) => {
        state.status.value = "error";
      })
      //Like a post
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, data } = action.payload;
        const {currentUser} = state
        switch (data) {
          case POST_LIKED:
            currentUser.likes.push(postId);
            break;
          case POST_UNLIKED:
            currentUser.likes = currentUser.likes.filter((id) => id !== postId);
            break;
          default:
            break;
        }
        state.status.value = "fulfilled";
      })
      //Get notifications
      .addCase(getNotifications.pending, (state) => {
        state.status.type = "getNotifications";
        state.status.value = "pending";
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status.value = "fulfilled";
        const notifications = action.payload.reverse();
        state.currentUser.notifications = notifications;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.status.value = "error";
      })
      //Delete notifications
      .addCase(deleteNotification.pending, (state) => {
        state.status.type = "deleteNotification";
        state.status.value = "pending";
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.status.value = "fulfilled";
        const deletedNotificationId = action.payload;
        state.currentUser.notifications =
          state.currentUser.notifications.filter(
            ({ _id }) => _id !== deletedNotificationId
          );
      })
      .addCase(deleteNotification.rejected, (state) => {
        state.status.value = "error";
      });
  },
});
export const getCurrentUser = (state) => state.user.currentUser;
export const getUserById = (state, userId) =>
  state.user.allUsers.find(({ _id }) => _id === userId);
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
