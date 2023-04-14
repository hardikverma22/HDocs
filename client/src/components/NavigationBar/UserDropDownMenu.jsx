import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonGroup, Form, Image, NavDropdown } from "react-bootstrap";
import { THEMES, useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/authContext";

const UserDropDownMenu = () => {
  const { theme, toggleTheme } = useTheme();

  const { loggedInUser, signOut } = useAuth();
  const handleLogout = () => {
    signOut();
  };

  return (
    <div id="user-icon-container-inside-input">
      <NavDropdown
        menuVariant={theme}
        align="end"
        as={ButtonGroup}
        title={
          <div className="icon-container logo">
            {!loggedInUser && (
              <FontAwesomeIcon icon={faUser} className="icon-size" />
            )}
            {loggedInUser && (
              <Image src={loggedInUser.photoURL} className="userImage" />
            )}
          </div>
        }
        id="basic-nav-dropdown"
      >
        <div className="dropdown-item">
          <div className="badge-container" key={loggedInUser.photoURL}>
            <div className="left-search-item-container">
              <div className="photo">
                <img alt={loggedInUser.email} src={loggedInUser.photoURL} />
              </div>
              <div className="data">
                <span>{loggedInUser.displayName}</span>
                <span>{loggedInUser.email}</span>
              </div>
            </div>
          </div>
        </div>
        <NavDropdown.Divider />
        <div className="dropdown-item">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Dark Mode"
            checked={theme == THEMES.DARK}
            onChange={(e) => toggleTheme(e.target.checked)}
          />
        </div>
        <div className="dropdown-item logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span style={{ marginLeft: "1em" }}>Log Out</span>
        </div>
      </NavDropdown>
    </div>
  );
};

export default UserDropDownMenu;
