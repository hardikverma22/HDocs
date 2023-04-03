import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const RenameModal = ({ show, onClose, onRenameDocument, docId, docName }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(docName);
  }, [docName]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="" controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              Document Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="Document Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus={true}
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button
          variant="primary"
          onClick={() => onRenameDocument(docId, title)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameModal;
