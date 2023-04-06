import { ButtonGroup, Container, Form, Image } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavigationBar.css";

import { faFile, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/authContext";
import { THEMES, useTheme } from "../../context/ThemeContext";
import { useDocs } from "../../context/docContext";

const NavigationBar = () => {
  const [showTitleInput, setShowTitleInput] = useState(false);

  const { loggedInUser, signOut } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const { id: documentId } = useParams();

  const { theme, toggleTheme } = useTheme();

  const [docName, setDocName] = useState("Untitled Document");
  const { doc, renameDocument } = useDocs();

  useEffect(() => {
    if (doc == null) return;
    setDocName(doc.docName);
  }, [doc]);

  const handleChangeDocName = (e) => {
    renameDocument(documentId, e.target.value);
  };

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
      <Navbar bg={theme} expand="lg" sticky="top">
        <Container>
          <div className="left-bar-container">
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
                className={`docName-input ${
                  theme == THEMES.DARK ? "bg-dark text-white" : ""
                }`}
                placeholder="Document Name"
                value={docName}
                onChange={handleChangeDocName}
              />
            )}
          </div>

          <div className="ms-auto right-nav">
            <div id="custom-portal"></div>
            {loggedInUser && (
              <NavDropdown
                menuVariant={theme}
                align={({ lg: "end" }, { sm: "start" })}
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
                <div className="dropdown-item">{loggedInUser?.email}</div>
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

export default NavigationBar;
