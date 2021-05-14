const ErrorMessage = ({ message = false }) => {
  return message ? <> {message} </> : null;
};

export default ErrorMessage;
