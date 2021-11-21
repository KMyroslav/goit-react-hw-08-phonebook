const getFilter = (state) => state.filter;

const getUserName = (state) => state.auth.name;

const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const getToken = (state) => state.auth.token;

const selectors = { getFilter, getUserName, getIsLoggedIn, getToken };

export default selectors;
