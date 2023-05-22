import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Login = () => {
  const { loginUser, authState } = useContext(AuthContext);
  const { authLoading, isAuthenticated } = authState;

  const [authValue, setAuthValue] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { username, password } = authValue;

  const onAuthChange = (event) => {
    setAuthValue({ ...authValue, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(authValue);
      if (loginData.success) {
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="my-4">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onAuthChange}
            required
          />
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onAuthChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit" onClick={login}>
          Login
        </Button>
      </Form>

      <p>
        Don't have an account ?
        <Link to="/register">
          <Button variant="info" size="sm" className="ms-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};