import {
  faEllipsisVertical,
  faFileWord,
  faTextHeight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { deleteDocument } from "../../auth/firestore";
import { THEMES, useTheme } from "../context/ThemeContext";
// import Thumbnail from "react-webpage-thumbnail";

const DocCard = ({
  docName,
  docId,
  userId,
  refreshList,
  handleShow,
  allowActions,
}) => {
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);

  const { theme } = useTheme();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/document/${docId}`);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropDown((prev) => !prev);
  };

  const handleDelete = () => {
    if (userId == null || docId == null) return;

    deleteDocument(docId)
      .then(() => {
        refreshList(docId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRename = () => {
    handleShow(docId, docName);
  };

  return (
    <>
      <Card onClick={handleClick} bg={theme}>
        <div className="card-icon">
          <FontAwesomeIcon icon={faFileWord} />
          {/* <Thumbnail url={`http:/localhost:5173/document${docId}`} />; */}
        </div>
        <Card.Body>
          <div className="card-bottom-container">
            <Card.Title className="card-title" title={docName}>
              {docName}
            </Card.Title>
            {allowActions && (
              <DropdownButton
                title={<FontAwesomeIcon icon={faEllipsisVertical} />}
                bsPrefix="dots-menu"
                onClick={(e) => toggleDropdown(e)}
                onBlur={(e) => setShowDropDown(false)}
                autoClose={true}
              >
                <Dropdown.Item
                  as="button"
                  onClick={handleDelete}
                  bsPrefix={`delete-menu-item ${
                    theme == THEMES.DARK ? "bg-dark text-white" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span>Delete</span>
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={handleRename}
                  bsPrefix={`delete-menu-item ${
                    theme == THEMES.DARK ? "bg-dark text-white" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faTextHeight} />
                  <span>Rename</span>
                </Dropdown.Item>
              </DropdownButton>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default DocCard;
