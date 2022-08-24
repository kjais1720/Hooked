import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  updatePost,
  getAllPosts,
  likePost,
  postComment,
  deletePost,
  deleteComment,
  editComment,
} from "services";
import { sortPostsByDate, sortPostsByLikes } from "utils";
import { POST_LIKED, POST_UNLIKED } from "constants";
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
        toast.error("An error occurred please try again!!");
        state.error = action.error.message;
      })
      //Update a post
      .addCase(updatePost.pending, (state) => {
        state.status.type = "updatePost";
        state.status.value = "pending";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { data: updatedPost, postId } = action.payload;
        state.status.value = "fulfilled";
        toast.success(`Post updated!`);
        state.allPosts = state.allPosts.map((post) =>
          post._id === postId ? updatedPost : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
        toast.error("An error occurred please try again!!");
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
          case POST_LIKED:
            postToLike.likes.push(userId);
            break;
          case POST_UNLIKED:
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
      })
      //Delete a comment
      .addCase(deleteComment.pending, (state, { meta: { arg: postId } }) => {
        state.status.type = "deleteComment";
        state.status.value = "pending";
        state.status.payload = postId;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        state.status.value = "fulfilled";
        const postToUpdate = state.allPosts.find(({ _id }) => _id === postId);
        postToUpdate.comments = postToUpdate.comments.filter(
          ({ _id }) => _id !== commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      })
      //Edit a comment
      .addCase(editComment.pending, (state, { meta: { arg: postId } }) => {
        state.status.type = "editComment";
        state.status.value = "pending";
        state.status.payload = postId;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const { postId, updatedCommentsList } = action.payload;
        state.status.value = "fulfilled";
        const postToUpdate = state.allPosts.find(({ _id }) => _id === postId);
        postToUpdate.comments = updatedCommentsList;
      })
      .addCase(editComment.rejected, (state, action) => {
        state.status.value = "error";
        state.error = action.error.message;
      });
  },
});

export const sortPosts = (state, posts) => {
  const { sortBy } = state.posts;
  const postsToShow = [...posts];
  switch (sortBy) {
    case "TRENDING":
      return sortPostsByLikes(postsToShow);
    case "DATE":
      return sortPostsByDate(postsToShow);
    default:
      return postsToShow;
  }
};

export const getTimelinePosts = (state) => {
  const { allPosts } = state.posts;
  const { currentUser } = state.user;
  const userPosts = allPosts.filter(({ userId }) => userId === currentUser._id);
  const followingPosts = allPosts.filter(({ userId }) =>
    currentUser.following?.some((id) => id === userId)
  );
  let postsToShow = [...userPosts, ...followingPosts];
  return sortPosts(state, postsToShow);
};

export const getExploreFeedPosts = (state) => {
  const { allPosts } = state.posts;
  return sortPosts(state, allPosts);
};

export const getPostById = (state, postId) => {
  const post = state.posts.allPosts.find(({ _id }) => _id === postId);
  return post;
};

export const getUserPosts = (state, userId) => {
  const userPosts = state.posts.allPosts
    .filter((post) => post.userId === userId)
    .reverse();
  return userPosts;
};

export const getUserBookmarks = (state, bookmarkedPostIds) => {
  const bookmarkedPosts = bookmarkedPostIds
    .map((id) => state.posts.allPosts.find((post) => post._id === id))
    .reverse();
  return bookmarkedPosts;
};

export const getUserLikes = (state, userLikes) => {
  const likedPosts = userLikes
    ?.map((postId) => state.posts.allPosts.find(({ _id }) => _id === postId))
    .reverse();
  return likedPosts;
};

export const { setSortingOrder } = postsSlice.actions;
export default postsSlice.reducer;
