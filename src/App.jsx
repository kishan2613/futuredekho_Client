import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/Landing";

function App() {
const isLoggedIn = !!localStorage.getItem("user_id");

return (
<> <Navbar />


  <Routes>
    <Route path="/" element={<HomePage />} />

    <Route
      path="/palmistry"
      element={
        isLoggedIn ? (
          <Home />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Signup />} />
  </Routes>
</>


);
}

export default App;
