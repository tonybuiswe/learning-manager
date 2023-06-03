import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NavBarMenu from "../layout/NavBarMenu";

function PrivateRoute() {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <NavBarMenu />
      <Outlet />
    </>
  );
}

export default PrivateRoute;