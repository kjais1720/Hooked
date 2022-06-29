import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllPosts = createAsyncThunk("posts/getPosts", async () => {
  const { data } = await axios.get("/post");
  return data;
});

export const createPost = createAsyncThunk(
  "posts/createPosts",
  async (post) => {
    const { data } = await axios.post("/post", post);
    return data;
  }
);

export const getPost = createAsyncThunk("posts/getPost", async (postId) => {
  const { data } = await axios.get(`/post/${postId}`);
  return data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async ({updatedPost, postId}) => {
  const { data } = await axios.put(`/post/${postId}`, updatedPost)
  return {data, postId};
})

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, userId }) => {
    const { data } = await axios.put(`/post/${postId}/like`);
    return { postId, data, userId };
  }
);

export const postComment = createAsyncThunk(
  "posts/postComment",
  async ({ postId, formData }) => {
    const { data } = await axios.put(`/post/${postId}/comment`, formData);
    return { postId, data };
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId }) => {
    await axios.delete(`/post/${postId}/comment/${commentId}`);
    return { postId, commentId };
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    await axios.delete(`/post/${postId}`);
    return postId;
  }
);
