import { Container, Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { faFile, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

const NavBar = ({ docName, setDocName }) => {
  const [showTitleInput, setShowTitleInput] = useState(false);

  const { loggedInUser, signOut } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.match("/document/")) {
      setShowTitleInput(true);
    } else {
      setShowTitleInput(false);
    }
  }, [location]);

  const handleLogout = () => {
    signOut();
  };

  const handleClickAllDocs = (e) => {
    e.stopPropagation();
    navigate("/");
  };

  // TODO: Debounce this
  // let timeout;

  // const handleChange = (e) => {
  //   clearTimeout(timeout);

  //   timeout = setTimeout(() => {
  //     setDocName(e.target.value);
  //   }, 500);
  // };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <div className="left-bar-container">
            {/* <img src={logo} className="logo" /> */}
            <div className="icon-container logo" onClick={handleClickAllDocs}>
              <FontAwesomeIcon
                icon={faFile}
                className="login-icon"
                style={{ width: "30px", height: "40px" }}
              />
            </div>
            {showTitleInput && (
              <input
                type="text"
                className="docName-input"
                placeholder="Enter email"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            )}
          </div>

          <div className="ms-auto right-nav">
            <div id="custom-portal"></div>
            {loggedInUser && (
              <NavDropdown
                title={
                  <div className="icon-container logo">
                    {!loggedInUser && (
                      <FontAwesomeIcon icon={faUser} className="icon-size" />
                    )}
                    {loggedInUser && (
                      <Image
                        src={loggedInUser.photoURL}
                        className="userImage"
                      />
                    )}
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <div className="dropdown-item">{loggedInUser?.email}</div>
                <NavDropdown.Divider />
                <div className="dropdown-item logout" onClick={handleLogout}>
                  Log Out
                </div>
              </NavDropdown>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
