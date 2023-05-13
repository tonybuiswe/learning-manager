import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
  return (
      <p>
        Don't have an account ?
        <Link to="/register">
          <Button variant="info" size="sm" className="ms-2">
            Register
          </Button>
        </Link>
      </p>
  );
}

export default Login;