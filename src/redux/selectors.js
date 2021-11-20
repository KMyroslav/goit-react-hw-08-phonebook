const getFilter = (state) => state.filter;

const getIsLoggedIn = (state) => state.auth.isLoggedIn;

const selectors = { getFilter, getIsLoggedIn };

export default selectors;
