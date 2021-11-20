import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import selectors from "../../redux/selectors";
import { useLogoutMutation } from "../../redux/operations";
import { setLogout } from "../../redux/slices";

function UserMenu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
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

export default UserMenu;
