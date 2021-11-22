import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import selectors from "../../redux/selectors";
import { useLogoutMutation } from "../../redux/operations";
import { setLogout } from "../../redux/slices";

function UserMenu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  const userName = useSelector(selectors.getUserName);
  const [useLogout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const handleClick = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLogout();
    dispatch(setLogout());
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="px-4 rounded-pill"
    >
      <Navbar.Brand>Phonebook</Navbar.Brand>
      <Nav className="mr-auto">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/contacts" className="nav-link">
          Contacts
        </NavLink>
      </Nav>

      {isLoggedIn ? (
        <div className="d-flex align-items-center">
          <span className="text-light user-name">Welcome {userName}!</span>
          <Button
            variant="secondary"
            onClick={handleClick}
            disabled={isLoading}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <Nav>
          <Button
            variant="light"
            className="mx-3"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
          <Button onClick={() => navigate("/signup")}>Sign up</Button>
        </Nav>
      )}
    </Navbar>
  );
}

export default UserMenu;
