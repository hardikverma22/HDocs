import axios from "axios";
import { useRef, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { useAuth } from "../context/authContext";

const API_URL = "http://localhost:3000/fetchUsers";

const TypeheadFilter = ({ onItemSelected }) => {
  const ref = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const { loggedInUser } = useAuth();

  const filterBy = () => true;

  const handleItemSelected = (e) => {
    onItemSelected(e);
    ref.current?.clear();
  };

  const fetchUsers = (searchTerm) => {
    axios
      .get(API_URL, {
        params: {
          serachTerm: searchTerm,
          currentUserEmail: loggedInUser.email,
        },
      })
      .then((response) => {
        if (response.status >= 400) {
          console.log(response.status);
          throw new Error("Bad response from server");
        } else {
          console.log(response.data);
          setOptions(response.data);
          setIsLoading(false);
        }
      });
  };

  return (
    <AsyncTypeahead
      id="typeheadFilter"
      ref={ref}
      filterBy={filterBy}
      isLoading={isLoading}
      labelKey={(option) => `${option.email}`}
      onSearch={fetchUsers}
      options={options}
      placeholder="Search for a user"
      onChange={handleItemSelected}
      renderMenuItemChildren={(option) => (
        <>
          <div className="search-item-container">
            <div className="photo">
              <img alt={option.email} src={option.photoURL} />
            </div>
            <div className="data">
              <span>{option.name}</span>
              <span>{option.email}</span>
            </div>
          </div>
        </>
      )}
    />
  );
};

export default TypeheadFilter;
