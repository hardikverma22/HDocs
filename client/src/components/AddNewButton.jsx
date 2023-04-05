import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddNewButton = () => {
  const navigate = useNavigate();

  const handleNewDoc = () => {
    navigate(`/document/${uuidv4()}`);
  };

  return (
    <div className="add-new">
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip id={`tooltip-left`}>Add New Doc</Tooltip>}
      >
        <button type="button" className="add-new-btn" onClick={handleNewDoc}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
      </OverlayTrigger>
    </div>
  );
};

export default AddNewButton;
