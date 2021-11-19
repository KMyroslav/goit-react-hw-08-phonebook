import UserMenu from "./components/UserMenu/UserMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./components/Contacts/Contacts";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <UserMenu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
