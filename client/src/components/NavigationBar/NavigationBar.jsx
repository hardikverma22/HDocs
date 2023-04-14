import { ButtonGroup, Container, Form, Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavigationBar.css";

import {
  faFile,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/authContext";
import { THEMES, useTheme } from "../../context/ThemeContext";
import { useDocs } from "../../context/docContext";
import SearchInput from "../SearchInput";
import DocumentTitleInput from "./DocumentTitleInput";

const NavigationBar = () => {
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const { loggedInUser, signOut } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const { setSearchTerm } = useDocs();

  useEffect(() => {
    if (location.pathname.match("/document/")) {
      setShowTitleInput(true);
    } else {
      setShowTitleInput(false);
    }
    if (location.pathname.match(/^\/$/)) {
      setShowSearchInput(true);
    } else {
      setShowSearchInput(false);
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
      <Navbar bg={theme} expand="lg" sticky="top">
        <Container>
          <div className="left-bar-container">
            <div className="logo" onClick={handleClickAllDocs}>
              <div className="icon-container">
                <FontAwesomeIcon
                  icon={faFile}
                  className="login-icon"
                  style={{ width: "30px", height: "40px" }}
                />
              </div>
              <span className="brand-text">HDocs</span>
            </div>
            {showTitleInput && <DocumentTitleInput theme={theme} />}
          </div>
          {showSearchInput && <SearchInput onSearch={setSearchTerm} />}

          <div className="right-nav">
            <div id="custom-portal"></div>
            {loggedInUser && (
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
                      <Image
                        src={loggedInUser.photoURL}
                        className="userImage"
                      />
                    )}
                  </div>
                }
                id="basic-nav-dropdown"
              >
                <div className="dropdown-item">
                  <div className="badge-container" key={loggedInUser.photoURL}>
                    <div className="left-search-item-container">
                      <div className="photo">
                        <img
                          alt={loggedInUser.email}
                          src={loggedInUser.photoURL}
                        />
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
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
