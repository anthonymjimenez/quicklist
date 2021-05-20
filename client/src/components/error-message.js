import { Alert } from "reactstrap";
const ErrorMessage = ({ message = false }) => {
  return message ? <Alert color="danger">{message}</Alert> : null;
};

export default ErrorMessage;
