import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserDropDownMenu from "./NavigationBar/UserDropDownMenu";

const SearchInput = ({ onSearch }) => {
  return (
    <div className="mid-section">
      <label htmlFor="searchInput" className="searchInputLabel">
        <FontAwesomeIcon icon={faSearch} className="label-icon" />
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search"
          className="search-input"
        />
        <UserDropDownMenu />
      </label>
    </div>
  );
};

export default SearchInput;
