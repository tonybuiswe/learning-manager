import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function Register() {
  return <p>
    Already have anm account ?
    <Link to="/login">
      <Button variant="info" size="sm" className="ms-2">
        Login
      </Button>
    </Link>
  </p>
}

export default Register;