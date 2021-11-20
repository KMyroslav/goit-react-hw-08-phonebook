const getFilter = (state) => state.filter;

const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const getToken = (state) => state.auth.token;

const selectors = { getFilter, getIsLoggedIn, getToken };

export default selectors;
