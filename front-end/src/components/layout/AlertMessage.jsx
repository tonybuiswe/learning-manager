import { Alert } from "react-bootstrap";

const AlertMessage = ({ alert }) => {
  if (!alert) return null;

  return <Alert variant={alert.type}>{alert.message}</Alert>;
};

export default AlertMessage;