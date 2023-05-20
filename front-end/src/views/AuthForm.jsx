import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const AuthForm = ({ isRegister }) => {
  const { loginUser } = useContext(AuthContext);
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

  const login = async (event) => {
    event.preventDefault();
    try {
      const { confirmedPassword, ...loginFormValue } = authValue;
      const loginData = await loginUser(loginFormValue);
      if (loginData.success) {
        navigate("/dashboard");
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learning Tracker</h1>
          <h4>Keep track of you learning process</h4>
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
            {isRegister && (
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
            )}

            <Button variant="success" type="submit" onClick={login}>
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