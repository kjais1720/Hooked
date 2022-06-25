import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isModalOpen: false,
  modalName:""
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state,action) => {
      return { ...state,isModalOpen: true, modalName: action.payload };
    },
    closeModal: () => {
      return { isModalOpen: false };
    },
    toggleModal: (state) => {
      return { isModalOpen: !state.isModalOpen };
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
