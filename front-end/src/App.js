import "./App.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AuthForm } from "./views/AuthForm";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard } from "./views/DashBoard";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm isRegister />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;