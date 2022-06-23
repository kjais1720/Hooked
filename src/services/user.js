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