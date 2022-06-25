import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getAllPosts,
  likePost,
  postComment,
  deletePost,
} from "services";
import { sortPostsByDate, sortPostsByLikes } from "utils";
import { toast } from "react-hot-toast";

const initialState = {
  allPosts: [],
  timelinePosts: [],
  sortBy: "DATE",
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
  reducers: {
    setSortingOrder: (state, { payload }) => {
      return { ...state, sortBy: payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status.type = "getAllPosts";
        state.status.value = "pending";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
        state.status.value = "fulfilled";
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      //Create a Post
      .addCase(createPost.pending, (state) => {
        state.status.type = "createPost";
        state.status.value = "pending";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.allPosts.push(action.payload);
        state.status.value = "fulfilled";
        toast.success(`Post added!`);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      //Like a post
      .addCase(
        likePost.pending,
        (
          state,
          {
            meta: {
              arg: { postId },
            },
          }
        ) => {
          state.status.type = "likePost";
          state.status.value = "pending";
          state.status.payload = postId;
        }
      )
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
        state.status.value = "fulfilled";
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
        state.status.value = "fulfilled";
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      //Delete a post
      .addCase(deletePost.pending, (state, { meta: { arg: postId } }) => {
        state.status.type = "deletePost";
        state.status.value = "pending";
        state.status.payload = postId;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.status.value = "fulfilled";
        state.allPosts = state.allPosts.filter(({ _id }) => _id !== postId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      });
  },
});

export const getTimelinePosts = (state) => {
  const { allPosts, sortBy } = state.posts;
  const { currentUser } = state.user;
  const userPosts = allPosts.filter(({ userId }) => userId === currentUser._id);
  const followingPosts = allPosts.filter(({ userId }) =>
    currentUser.following?.some((id) => id === userId)
  );
  let postsToShow = [...userPosts, ...followingPosts];
  switch (sortBy) {
    case "TRENDING":
      return sortPostsByLikes(postsToShow);
    case "DATE":
      return sortPostsByDate(postsToShow);
    default:
      return postsToShow;
  }
};

export const getPostById = (state, postId) => {
  const post = state.posts.allPosts.find(({ _id }) => _id === postId);
  return post;
};

export const { setSortingOrder } = postsSlice.actions;
export default postsSlice.reducer;
