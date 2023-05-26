import { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { useAuth } from "../contexts/AuthContext";

export const Auth = ({ isLogin }) => {
  const { authState } = useAuth();
  const { authLoading, isAuthenticated } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const body = (() => {
    switch (true) {
      case authLoading:
        return (
          <div className="d-flex justify-content-center mt-2">
            <Spinner animation="border" variant="info" />
          </div>
        );
      case isLogin:
        return <Login />;
      default:
        return <Register />;
    }
  })();

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learning Tracker</h1>
          <h4>Keep track of your learning process</h4>
          {body}
        </div>
      </div>
    </div>
  );
};