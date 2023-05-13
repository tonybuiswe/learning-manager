import {useContext, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import {AuthContext} from "../contexts/AuthContext";

export const Auth = ({ isRegister }) => {

  const {loginUser} = useContext(AuthContext)
  const [authValue, setAuthValue] = useState({
    username: "",
    password: "",
    confirmedPassword: "",
  });

  const { username, password, confirmedPassword } = authValue;

  const onAuthChange = (event) => {
    setAuthValue({ ...authValue, [event.target.name]: event.target.value });
    console.log(authValue);
  };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learning Tracker</h1>
          <h4>Keep track of you learning process</h4>
          <Form >
            <Form.Group className="my-4">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                required
                value={username}
                onChange={onAuthChange}
              />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={onAuthChange}
              />
            </Form.Group>
            {isRegister && (
              <Form.Group className="my-4">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmedPassword"
                  required
                  value={confirmedPassword}
                  onChange={onAuthChange}
                />
              </Form.Group>
            )}

            <Button variant="success" type="submit">
              {isRegister ? "Register" : "Login"}
            </Button>
          </Form>
          {isRegister ? (
            <p>
              Already have an account ?
              <Link to="/login">
                <Button variant="info" size="sm" className="ms-2">
                  Login
                </Button>
              </Link>
            </p>
          ) : (
            <p>
              Don't have an account ?
              <Link to="/register">
                <Button variant="info" size="sm" className="ms-2">
                  Register
                </Button>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};