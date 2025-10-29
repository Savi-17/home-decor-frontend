import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id: number;
    name: string;
    email: string;
  } | null;
  token: string | null;
  isLoggedIn: boolean;
  isModalOpen: boolean;
  isRegisterModalOpen: boolean;
}
const initialState: UserState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isModalOpen: false,
  isRegisterModalOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsModalOpen: (
      state,
      action: PayloadAction<UserState["isModalOpen"]>
    ) => {
      state.isModalOpen = action.payload;
    },
    setIsRegisterModalOpen: (
      state,
      action: PayloadAction<UserState["isModalOpen"]>
    ) => {
      state.isRegisterModalOpen = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { logout, setIsModalOpen, setIsRegisterModalOpen } =
  userSlice.actions;

export default userSlice.reducer;
