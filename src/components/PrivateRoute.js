import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import selectors from "../redux/selectors";

export default function PrivateRoute({ children, redirectTo = "/" }) {
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
