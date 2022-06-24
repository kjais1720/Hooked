import { useSelector } from "react-redux";
import { getUserById, getCurrentUser } from "slices";

export function ProfileImage({ userId, size, bgShade }) {
  const imageSizes = {
    sm: "1rem",
    md: "3rem",
    lg: "8rem",
  };
  const fontSizes = {
      sm:"text-xl",
      md:"text-2xl",
      lg:"text-4xl"
  }
  const bgVariants = {
    "lighter": "bg-light-100 dark:bg-dark-100",
    "darker":"bg-light-200 dark:bg-dark-200"
  }
  let user;
  const currentUser = useSelector(getCurrentUser);
  user = useSelector(state=> getUserById(state,userId)) ?? {};
  if(currentUser._id === userId){
    user = {...currentUser}
  }
  
  const { firstname, lastname, profilePicture } = user;
  return profilePicture ? (
    <img
      className={`rounded-full object-cover`}
      style={{height:imageSizes[size], width:imageSizes[size]}}
      src={profilePicture}
      alt={`${firstname} ${lastname}`}
    />
  ) : (
    <span
      className={`flex items-center justify-center 
                  min-w-[2em] min-h-[2em] h-${imageSizes[size]} w-${imageSizes[size]}  rounded-full border-none
                  select-none ${bgVariants[bgShade]}
                  ${fontSizes[size]} font-bold text-primary`}
    >
      {firstname && firstname[0]}
      {lastname && lastname[0]}
    </span>
  );
}
