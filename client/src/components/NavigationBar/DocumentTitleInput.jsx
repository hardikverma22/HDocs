import { useEffect, useState } from "react";
import { THEMES } from "../../context/ThemeContext";
import { useDocs } from "../../context/docContext";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import UserDropDownMenu from "./UserDropDownMenu";

const DocumentTitleInput = ({ theme }) => {
  const [docName, setDocName] = useState("Untitled Document");
  const { doc, renameDocument } = useDocs();
  const { id: documentId } = useParams();

  useEffect(() => {
    if (doc == null) return;
    setDocName(doc.docName);
  }, [doc]);

  const handleChangeDocName = (e) => {
    renameDocument(documentId, e.target.value);
  };

  return (
    <>
      <label htmlFor="searchInput" className="searchInputLabel">
        <FontAwesomeIcon icon={faEdit} className="label-icon" />
        <input
          type="text"
          className={`search-input ${
            theme == THEMES.DARK ? "bg-dark text-white" : ""
          }`}
          placeholder="Document Name"
          value={docName}
          onChange={handleChangeDocName}
        />
        <UserDropDownMenu />
      </label>
    </>
  );
};

export default DocumentTitleInput;
