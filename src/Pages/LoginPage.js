import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/operations";
import { setCredentials } from "../redux/slices";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="form-wrapper">
      <form
        className="general-form"
        name="login_form"
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <h2>Log In</h2>
        <div className="form-group row mb-2">
          <label>
            Email
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
}
