import { useEffect, useState } from "react";

import { faClose, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import TypeheadFilter from "../TypeheadFilter";

const ShareModel = ({
  show,
  onClose,
  onClickShare,
  sharedEmailList,
  onChangeEmailList,
}) => {
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    setEmailList(sharedEmailList);
  }, []);

  const handleChangeEmailList = () => {
    onChangeEmailList(emailList);
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
      <Button variant="primary" onClick={onClickShare}>
        Share <FontAwesomeIcon icon={faShareNodes} />
      </Button>
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
                      <img alt={user.email} src={user.photoURL} />
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
