import { useState } from "react";
import { useSignupMutation } from "../redux/operations";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices";

export default function SignupPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signup = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await signup({ name, email, password }).unwrap();
      dispatch(setCredentials(userData));
    } catch (err) {
      console.log(err);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form-wrapper">
      <form
        name="signup_form"
        autoComplete="on"
        className="general-form"
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        <div className="form-group row mb-2">
          <label>
            Name
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          </label>

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
          Sign Up
        </button>
      </form>
    </div>
  );
}
