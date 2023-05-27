import "./App.css";
import PrivateRoute from "./components/routing/PrivateRoute";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PostContextProvider } from "./contexts/PostContext";
import About from "./views/About";
import { Auth } from "./views/Auth";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashBoard } from "./views/DashBoard";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth isLogin />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashBoard />} />
            </Route>
            <Route path="/about" element={<PrivateRoute />}>
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;