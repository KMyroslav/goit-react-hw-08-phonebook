import UserMenu from "./components/UserMenu/UserMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";
import Contacts from "./components/Contacts/Contacts";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import { useEffect } from "react";
import { useGetUserQuery } from "./redux/operations";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices";

function App() {
  const dispatch = useDispatch();
  const { data } = useGetUserQuery();

  useEffect(() => {
    data && dispatch(setUser(data));
  }, [data, dispatch]);

  return (
    <div className="container">
      <BrowserRouter>
        <UserMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <Contacts />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="signup"
            element={
              <RestrictedRoute>
                <SignupPage />
              </RestrictedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
