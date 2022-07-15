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

export const stopBubbling = e => e.stopPropagation();

export const areObjectsEqual = (obj1, obj2) => {
  for (const key in obj1){
    if(typeof(obj1[key]) === "object" && obj2[key] === "object"){
      if(!areObjectsEqual(obj1[key], obj2[key])){
        return false;
      }
    }
    else if(obj1[key] !== obj2[key]){
      return false;
    }
  }
  return true;
}