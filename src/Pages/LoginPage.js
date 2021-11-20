import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/operations";
import { setCredentials } from "../redux/slices";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useLogin] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const userData = await useLogin({ email, password }).unwrap();
      dispatch(setCredentials(userData));
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form name="login_form" autoComplete="on" onSubmit={handleSubmit}>
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

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
