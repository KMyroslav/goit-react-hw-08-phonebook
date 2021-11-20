import { useState } from "react";
import { useSignupMutation } from "../redux/operations";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices";

export default function SignupPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useSignup] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const userData = await useSignup({ name, email, password }).unwrap();
      dispatch(setCredentials(userData));
    } catch (err) {
      console.log(err);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form name="signup_form" autoComplete="on" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}