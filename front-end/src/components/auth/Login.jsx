import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

export const Login = () => {
  const { loginUser } = useAuth();

  const [authValue, setAuthValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = authValue;

  const [alert, setAlert] = useState(null);

  const onAuthChange = (event) => {
    setAuthValue({ ...authValue, [event.target.name]: event.target.value });
    setAlert(null);
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(authValue);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Form>
        <AlertMessage alert={alert}></AlertMessage>
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