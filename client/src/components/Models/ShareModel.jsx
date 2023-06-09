import { useEffect, useState } from "react";

import { faClose, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { THEMES, useTheme } from "../../context/ThemeContext";
import { useDocs } from "../../context/docContext";
import TypeheadFilter from "../TypeheadFilter";
import "./Models.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ShareModel = ({ show, onClose, onClickShare }) => {
  const [emailList, setEmailList] = useState([]);

  const { doc, updateFullSharedEmailDetailsList } = useDocs();

  const { theme } = useTheme();

  useEffect(() => {
    if (doc == null) return;
    const sharedList =
      doc.fullSharedEmailDetailsList.length == 0
        ? []
        : doc.fullSharedEmailDetailsList.map((l) => JSON.parse(l));
    setEmailList(sharedList);
  }, [doc]);

  const handleChangeEmailList = () => {
    updateFullSharedEmailDetailsList(emailList);
    onClose();
  };

  const handleDeleteEmail = (email) => {
    setEmailList((prevEmails) => {
      return prevEmails.filter((e) => e.email != email);
    });
  };

  const handleItemSelected = (e) => {
    setEmailList((prevList) => {
      return [...prevList, e[0]];
    });
  };

  return (
    <>
      <div className="share-btn-parent">
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id={`tooltip-left`}>Share Doc</Tooltip>}
        >
          <Button
            id="share-btn"
            className="share-btn-cls"
            variant={`${theme == THEMES.DARK ? "light" : "primary"}`}
            onClick={onClickShare}
          >
            <span>Share</span> <FontAwesomeIcon icon={faShareNodes} />
          </Button>
        </OverlayTrigger>
      </div>

      <Modal show={show} onHide={onClose} dialogClassName="bg-dark">
        <Modal.Header closeButton>
          <Modal.Title>Share Document</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          <TypeheadFilter onItemSelected={handleItemSelected} />
          {emailList && emailList.length != 0 && (
            <div className="mt-3 badges-container">
              {emailList.map((user) => (
                <div className="badge-container" key={user.photoURL}>
                  <div className="left-search-item-container">
                    <div className="photo">
                      <img
                        alt="user_img"
                        src={user.photoURL}
                        referrerpolicy="no-referrer"
                      />
                    </div>
                    <div className="data">
                      <span>{user.name}</span>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <div className="right-search-item-container">
                    <button
                      className="delete-email-btn"
                      onClick={() => handleDeleteEmail(user.email)}
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleChangeEmailList}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareModel;
