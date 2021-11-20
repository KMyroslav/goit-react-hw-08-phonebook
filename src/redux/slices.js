import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

const initialState = {
  name: "",
  token: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.name = user.name;
      state.token = token;
      state.isLoggedIn = true;
    },
    setUser: (state, payload) => {
      state.name = payload.name;
      state.isLoggedIn = true;
    },
    setLogout: (state, payload) => {
      state.name = "";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const { setCredentials, setUser, setLogout } = authSlice.actions;
