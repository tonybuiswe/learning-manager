import "./App.css";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Login isRegister />} />
      </Routes>
    </Router>
  );
}

export default App;