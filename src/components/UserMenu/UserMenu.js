import { Link } from "react-router-dom";

export default function UserMenu() {
  return (
    <div>
      <Link to="/">Home </Link>
      <Link to="/contacts"> Contacts </Link>
      <Link to="/login"> Log In </Link>
      <Link to="/signup"> Sign up</Link>
    </div>
  );
}
