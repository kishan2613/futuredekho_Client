import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
      <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Signup />}
      />
    </Routes>
  </>
  );
}

export default App;