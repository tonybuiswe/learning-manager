import { useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { Outlet, Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function PrivateRoute() {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return <Outlet />;
}

export default PrivateRoute;