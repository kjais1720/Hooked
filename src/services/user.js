import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async ({ formData, endpoint }) => {
    const { data } = await axios.post(endpoint, {
      ...formData,
    });
    return data;
  }
);

export const getCurrentUserFromBackend = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const currentUserId = localStorage.getItem("USER_ID");
    const { data } = await axios.get(`/user/${currentUserId}`);
    return data;
  }
);

export const updateCurrentUser = createAsyncThunk(
  "user/updatCurrentUser",
  async (formData) => {
    const { data } = await axios.put("/user", formData);
    return data;
  }
);

export const getAllUsers = createAsyncThunk("/user/getAllUsers", async () => {
  const { data } = await axios.get("/user");
  return data;
});

export const followUser = createAsyncThunk("user/followUser",async (followUserId) => {
  await axios.put(`/user/follow/${followUserId}`)
  return followUserId;
})

export const unfollowUser = createAsyncThunk("user/unfollowUser",async (unfollowUserId) => {
  await axios.put(`/user/unfollow/${unfollowUserId}`)
  return unfollowUserId;
})

export const bookmarkPost = createAsyncThunk("user/bookmarkPost",async (postId) => {
  const { data } = await axios.put(`/user/bookmarkPost/${postId}`);
  return {postId, data}
})

export const getNotifications = createAsyncThunk("user/getNotifications", async ()=>{
  const { data } = await axios.get("/user/notifications")
  return data;
})

export const deleteNotification = createAsyncThunk("user/deleteNotification", async (notificationId) => {
  await axios.delete(`/user/notifications/${notificationId}`)
  return notificationId;
})