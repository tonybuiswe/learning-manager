import "./App.css";
import PrivateRoute from "./components/routing/PrivateRoute";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Auth } from "./views/Auth";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard } from "./views/DashBoard";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth isLogin />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;