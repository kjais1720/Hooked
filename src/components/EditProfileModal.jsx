import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { areObjectsEqual,isFileSizeInValid } from "utils";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "services";
import { useDispatch } from "react-redux";
import { ProfileImage } from "components";

export function EditProfileModal({ user, closeModal }) {
  const [formData, setFormData] = useState({ ...user });
  const [images, setImages] = useState({});
  const dispatch = useDispatch();
  const textChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const imageChangeHandler = (e) => {
    const { name, files } = e.target;
    const image = files[0];
    if (isFileSizeInValid(image, 2)) {
      toast.error("Image size cannot exceed more than 2MB");
      return;
    }
    const previewImgUrl = URL.createObjectURL(image);
    setImages((prev) => ({
      ...prev,
      [name]: image,
    }));
    setFormData((prev) => ({
      ...prev,
      [name]: {src:previewImgUrl},
    }));
  };
  const noPropertyEdited = areObjectsEqual(formData,user);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    const { firstname, lastname, about, location, website } = formData;
    if(!noPropertyEdited){
      data.append("firstname", firstname);
      data.append("lastname", lastname);
      data.append("about", about);
      data.append("location", location);
      data.append("website", website);
      if (images.profilePicture) {
        data.append("profilePicture", images.profilePicture);
      }
      if (images.coverPicture) {
        data.append("coverPicture", images.coverPicture);
      }
      dispatch(updateCurrentUser(data));
    }
    closeModal();
  };
  return (
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 bottom-0 z-20 flex w-screen justify-end overflow-y-auto overflow-x-hidden bg-gray-800/50"
      >
        <motion.form
          initial={{x:"100vw"}}
          animate={{x:0}}
          transition={{type:"tween", duration:0.5}}
          onSubmit={submitHandler}
          onClick={(e) => e.stopPropagation()}
          className="relative flex min-h-screen w-screen max-w-lg
                              flex-col gap-4 overflow-auto bg-light-200 p-4
                            dark:bg-dark-100 md:p-8
            "
      >
        <div className="relative flex items-center justify-center gap-4 md:justify-start">
          <button
            type="button"
            onClick={closeModal}
            className="text-md flex h-[2em] w-[2em] items-center justify-center rounded-full bg-light-100 p-2 align-middle font-extrabold dark:bg-dark-200 md:relative"
          >
            ✕
          </button>
          <h2 className="text-center text-2xl text-gray-600 dark:text-primary md:text-left">
            Edit Profile
          </h2>
          <button
              className={`w-50 ml-auto rounded-2xl px-4 py-2 ${noPropertyEdited?"cursor-not-allowed bg-gray-400 text-gray-500 dark:bg-gray-700 dark:text-gray-800":"bg-primary text-dark-200"}`}
              type="submit"
              disabled = {noPropertyEdited}
            >
              Save
            </button>
        </div>
        <div className="relative">
          <img
            className="h-[20vh] w-full rounded-2xl object-cover md:h-[25vh]"
            src={formData.coverPicture?.src || "/assets/cover.png"}
            alt="Cover"
          />
          <label
            className="absolute right-0 top-0 cursor-pointer rounded-full bg-gray-800/25
                                   p-2 text-lg text-gray-600 dark:text-gray-200"
            htmlFor="coverPic"
            type="button"
          >
            <FaEdit />
          </label>
          <input
            name="coverPicture"
            onChange={imageChangeHandler}
            id="coverPic"
            type="file"
            accept="image/*"
            hidden
          />
        </div>
        <div className="m-auto -mb-8 flex w-fit -translate-y-1/2">
          {formData.profilePicture?.src ? (
            <img
              className="m-auto h-32 w-32 rounded-full border-8
                                    border-light-200 object-cover dark:border-dark-100
                                    "
              src={formData.profilePicture.src}
              alt="Profile"
            />
          ) : (
            <div className="m-auto">
              <ProfileImage userId={formData._id} size="lg" bgShade="darker" />
            </div>
          )}
          <label
            htmlFor="proPic"
            className="absolute bottom-0 right-0 cursor-pointer text-lg text-gray-600 dark:text-gray-200"
          >
            <FaEdit />
          </label>
          <input
            name="profilePicture"
            onChange={imageChangeHandler}
            id="proPic"
            type="file"
            accept="image/*"
            hidden
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-grow flex-col gap-2">
            <label className="dark:text-gray-200">Firstname</label>
            <input
              onChange={textChangeHandler}
              name="firstname"
              value={formData.firstname}
              className="rounded-2xl bg-light-100 p-2 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
              type="text"
            />
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <label className="dark:text-gray-200">Lastname</label>
            <input
              onChange={textChangeHandler}
              name="lastname"
              value={formData.lastname}
              className="rounded-2xl bg-light-100 p-2 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-gray-200">Location</label>
          <input
            onChange={textChangeHandler}
            name="location"
            value={formData.location}
            className="rounded-2xl bg-light-100 p-2 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-gray-200">Website</label>
          <input
            onChange={textChangeHandler}
            name="website"
            value={formData.website}
            className="rounded-2xl bg-light-100 p-2 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="dark:text-gray-200">About</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={textChangeHandler}
            className="rounded-2xl bg-light-100 p-2 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
          ></textarea>
        </div>
      </motion.form>
    </div>
  );
}
