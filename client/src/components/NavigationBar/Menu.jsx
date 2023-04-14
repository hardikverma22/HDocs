import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ShareModel from "../Models/ShareModel";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Menu = ({ onClose, show, onClickShare }) => {
  const navigate = useNavigate();

  const handleClickAllNotes = () => {
    navigate("/");
  };
  return (
    <>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip id={`tooltip-left`}>Go to All Docs</Tooltip>}
      >
        <button onClick={handleClickAllNotes} className="menu-floating-btn">
          <FontAwesomeIcon icon={faFile} />
        </button>
      </OverlayTrigger>
      <ShareModel onClose={onClose} show={show} onClickShare={onClickShare} />
    </>
  );
};

export default Menu;
