import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import googleIcon from "../../assets/g-normal.png";
import { useAuth } from "../../context/authContext";
import "./Login.css";

const Login = () => {
  const { signIn } = useAuth();

  const handleClick = () => {
    signIn();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="icon-container">
          <FontAwesomeIcon icon={faFile} className="login-icon" />
        </div>
        <div className="d-grid gap-2">
          <Button
            variant="light"
            className="signin-btn"
            size="lg"
            onClick={handleClick}
          >
            <img src={googleIcon} className="google-icon" />
            <span>Sign In With Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
