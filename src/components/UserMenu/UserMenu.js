import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLogoutMutation } from "../../redux/contactsSlice";
import { setLogout } from "../../redux/reducers";

function UserMenu({ isLoggedIn }) {
  const dispatch = useDispatch();
  const [useLogout, { isLoading }] = useLogoutMutation();
  const handleClick = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLogout();
    dispatch(setLogout());
  };
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/contacts"> Contacts </Link>
      {isLoggedIn ? (
        <button type="button" onClick={handleClick} disabled={isLoading}>
          Log Out
        </button>
      ) : (
        <ul>
          <li>
            <Link to="/login"> Log In </Link>
          </li>
          <li>
            <Link to="/signup"> Sign up</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(UserMenu);
