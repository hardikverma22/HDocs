import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup } from "react-bootstrap";

const SearchInput = ({ onSearch }) => {
  return (
    <div className="mid-section">
      <InputGroup>
        <InputGroup.Text id="basic-addon1">
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </InputGroup>
    </div>
  );
};

export default SearchInput;
