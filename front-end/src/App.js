import "./App.css";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Auth } from "./views/Auth";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth isRegister />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;