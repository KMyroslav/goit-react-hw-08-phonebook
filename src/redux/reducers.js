import { createReducer, createSlice } from "@reduxjs/toolkit";
import actions from "./actions";
import { useSignupMutation } from "./contactsSlice";

export const filterReducer = createReducer("", {
  [actions.setFilter]: (state, action) => action.payload,
});

const initialState = {
  user: {
    name: "",
    token: "",
    isLoggedIn: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [useSignupMutation.data](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
  },
});

// const todosSlice = createSlice({
//   name: "todos",
//   initialState,
//   extraReducers: {
//   [authOperations.register.fulfilled](state, action) {
// state.user = action.payload.user;
// state.token = action.payload.token;
// state.isLoggedIn = true;
//   },
//   [authOperations.logIn.fulfilled](state, action) {
//     state.user = action.payload.user;
//     state.token = action.payload.token;
//     state.isLoggedIn = true;
//   },
//   [authOperations.logOut.fulfilled](state) {
//     state.user = { name: null, email: null };
//     state.token = null;
//     state.isLoggedIn = false;
//   },
//   [authOperations.fetchCurrentUser.pending](state) {
//     state.isFetchingCurrentUser = true;
//   },
//   [authOperations.fetchCurrentUser.fulfilled](state, action) {
//     state.user = action.payload;
//     state.isLoggedIn = true;
//     state.isFetchingCurrentUser = false;
//   },
//   [authOperations.fetchCurrentUser.rejected](state) {
//     state.isFetchingCurrentUser = false;
//   },
// },
// });

// export const { todoAdded, todoToggled, todosLoading } = todosSlice.actions;

// export default todosSlice.reducer;
