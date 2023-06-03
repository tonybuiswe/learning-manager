import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

export const Register = ({ isRegister }) => {
  const [authValue, setAuthValue] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
  });

  const { registerUser } = useAuth();

  const { username, password, confirmedPassword } = authValue;
  const [alert, setAlert] = useState(null);

  const onAuthChange = (event) => {
    setAuthValue({ ...authValue, [event.target.name]: event.target.value });
    setAlert(null);
  };

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmedPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      return;
    }

    try {
      const { confirmedPassword, ...registerUserInfo } = authValue;
      const registerData = await registerUser(registerUserInfo);
      if (!registerData.success) {
        setAlert({ type: "danger", message: registerData.message });
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

        <Button variant="success" type="submit" onClick={register}>
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