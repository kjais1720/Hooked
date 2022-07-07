import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkModePreferred : localStorage.getItem("DARK_MODE_PREFERRED") ?? true
}

const themeSlice = createSlice({
  name:"theme",
  initialState,
  reducers:{
    toggleTheme : (state) => {
      localStorage.setItem("DARK_MODE_PREFERRED",!state.darkModePreferred)
      state.darkModePreferred = !state.darkModePreferred;
    }
  }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer