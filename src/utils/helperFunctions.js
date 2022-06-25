import { toDate, parseISO, compareAsc } from "date-fns";

export const isFileSizeInValid = (file, allowedFileSizeInMB) =>
  Math.round(file.size / 1024000) > allowedFileSizeInMB;

export const navigateToPreviousPage = (navigate) => navigate(-1);

export const sortPostsByLikes = (posts) =>
  posts.sort((a, b) => b.likes.length - a.likes.length);

export const sortPostsByDate = (posts) =>
  posts.sort((a, b) =>
    compareAsc(parseISO(b.createdAt), parseISO(a.createdAt))
  );

export const formatDate = (dateInISO) =>
  toDate(parseISO(dateInISO).toString().slice(0, 24));
