import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  likePost,
  postComment,
  deletePost,
} from "services";
import { compareAsc } from "date-fns";
import { toast } from "react-hot-toast";

const initialState = {
  allPosts: [],
  timelinePosts: [],
  status: {
    type: "",
    value: "idle",
    payload: "",
  },
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status.type = "getAllPosts";
        state.status.value = "pending";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
        state.status.value = "success";
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.status.type = "createPost";
        state.status.value = "pending";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.allPosts.push(action.payload);
        state.status.value = "success";
        toast.success(`Post added!`);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      .addCase(likePost.pending, (state, { meta: { arg : postId } }) => {
        state.status.type = "likePost";
        state.status.value = "pending";
        state.status.payload = postId;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, data, userId } = action.payload;
        const postToLike = state.allPosts.find(({ _id }) => _id === postId);
        switch (data) {
          case "Post liked":
            postToLike.likes.push(userId);
            break;
          case "Post unliked":
            postToLike.likes = postToLike.likes.filter((id) => id !== userId);
            break;
          default:
            break;
        }
        state.status.value = "success";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      //Add a comment
      .addCase(postComment.pending, (state) => {
        state.status.type = "postComment";
        state.status.value = "pending";
      })
      .addCase(postComment.fulfilled, (state, action) => {
        const { data: newComment, postId } = action.payload;
        const postToUpdate = state.allPosts.find(({ _id }) => _id === postId);
        postToUpdate.comments.push(newComment);
        state.status.value = "success";
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      //Delete a post
      .addCase(deletePost.pending, (state, { meta: { arg : postId } }) => {
        state.status.type = "deletePost";
        state.status.value = "pending";
        state.status.payload = postId;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.status.value = "success";
        state.allPosts = state.allPosts.filter(({ _id }) => _id !== postId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      });
  },
});

export const getTimelinePosts = (state) => {
  const { allPosts } = state.posts;
  const { currentUser } = state.user;
  const userPosts = allPosts.filter(({ userId }) => userId === currentUser._id);
  const followingPosts = allPosts.filter(({ userId }) =>
    currentUser.following?.some((id) => id === userId)
  );
  return [...userPosts, ...followingPosts].sort((a, b) =>
    compareAsc(a.createdAt, b.createdAt)
  );
};

export const getPostById = (state, postId) => {
  const post = state.posts.allPosts.find(({ _id }) => _id === postId);
  return post;
};
export default postsSlice.reducer;
