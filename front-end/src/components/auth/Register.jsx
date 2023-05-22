import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Register = ({ isRegister }) => {
  const { authState } = useContext(AuthContext);
  const { authLoading, isAuthenticated } = authState;

  const [authValue, setAuthValue] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
  });

  const navigate = useNavigate();

  const { username, password, confirmedPassword } = authValue;

  const onAuthChange = (event) => {
    setAuthValue({ ...authValue, [event.target.name]: event.target.value });
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
        <Form.Group className="my-4">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={onAuthChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>

      <p>
        Already have an account ?
        <Link to="/login">
          <Button variant="info" size="sm" className="ms-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};