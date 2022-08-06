import { useSelector } from "react-redux";
import { getUserById, getCurrentUser } from "slices";

export function ProfileImage({ userId, size, bgShade, isCurrentUserProfile }) {
  const imageSizes = {
    sm: "2rem",
    md: "3rem",
    lg: "8rem",
  };
  const fontSizes = {
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-4xl",
  };
  const bgVariants = {
    lighter: "bg-light-100 dark:bg-dark-100",
    darker: "bg-light-200 dark:bg-dark-200",
  };
  let user;
  const currentUser = useSelector(getCurrentUser);
  user = useSelector((state) => getUserById(state, userId)) ?? {};
  if(isCurrentUserProfile || currentUser._id === userId) {
    user = currentUser
  }

  const { firstname, lastname, profilePicture } = user;
  return profilePicture?.src ? (
    <img
      className={`rounded-full object-cover`}
      style={{ height: imageSizes[size], width: imageSizes[size] }}
      src={profilePicture.src}
      alt={`${firstname} ${lastname}`}
    />
  ) : (
    <span
      className={`flex select-none items-center  
                  justify-center rounded-full
                  border-none ${bgVariants[bgShade]}
                  ${fontSizes[size]} font-bold text-primary`}
      style={{ height: imageSizes[size], width: imageSizes[size] }}
    >
      {firstname && firstname[0]}
      {lastname && lastname[0]}
    </span>
  );
}
