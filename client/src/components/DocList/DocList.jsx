import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

import DocCard from "../DocCard";
import RenameModal from "../Models/RenameModal";
import AddNewButton from "../AddNewButton";
import "./DocList.css";

import { getAllDocsForUser, renameDocForUser } from "../../../auth/firestore";
import { useDocs } from "../../context/docContext";

const DocList = () => {
  const [docList, setDocList] = useState([]);
  const [filteredDocList, setFilteredDocList] = useState([]);

  const { loggedInUser } = useAuth();
  const { searchTerm } = useDocs();
  const [show, setShow] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedDocName, setSelectedDocName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (docId, docName) => {
    setSelectedDocId(docId);
    setSelectedDocName(docName);
    setShow(true);
  };

  const handleRenameDocument = (docId, newName) => {
    renameDocForUser(docId, newName).then(() => {
      console.log("successfully changed name");

      let newList = docList.docs.map((currentDoc) => {
        return {
          ...currentDoc,
          docName: currentDoc.docId == docId ? newName : currentDoc.docName,
        };
      });

      setDocList((prevState) => {
        return { ...prevState, docs: newList };
      });
    });
    setShow(false);
  };

  const refreshList = (docId) => {
    setDocList((prevDocList) => {
      const list = prevDocList?.docs.filter((doc) => doc.docId !== docId);
      return { ...prevDocList, docs: list };
    });
  };

  useEffect(() => {
    if (loggedInUser == null) return;
    getAllDocsForUser(loggedInUser.uid, loggedInUser.email).then((data) => {
      setDocList(data);
      setFilteredDocList(data);
    });
  }, [loggedInUser.uid]);

  useEffect(() => {
    if (searchTerm == "") {
      setFilteredDocList(docList);
    } else {
      setFilteredDocList(() => {
        const searchTermLowerCase = searchTerm.toLowerCase();

        const docs = docList.docs.filter((listItem) =>
          listItem.docName.toLowerCase().includes(searchTermLowerCase)
        );

        const sharedDocs = docList.sharedDocs.filter((listItem) =>
          listItem.docName.toLowerCase().includes(searchTermLowerCase)
        );

        return { docs: docs, sharedDocs: sharedDocs };
      });
    }
  }, [searchTerm, docList]);

  return (
    <>
      <div className="doclist-container">
        {filteredDocList && filteredDocList?.docs?.length > 0 && (
          <>
            <div className="doclist-title">Document owned by you</div>
            <div className="cards-container">
              {filteredDocList?.docs.map((doc) => (
                <DocCard
                  key={doc.docId}
                  docName={doc.docName}
                  docId={doc.docId}
                  userId={loggedInUser?.uid}
                  refreshList={refreshList}
                  handleShow={handleShow}
                  allowActions={true}
                />
              ))}
            </div>
          </>
        )}

        {filteredDocList && filteredDocList?.sharedDocs?.length > 0 && (
          <>
            <div className="doclist-title mt-5">Document shared to you</div>
            <div className="cards-container">
              {filteredDocList.sharedDocs.map((doc) => (
                <DocCard
                  key={doc.docId}
                  docName={doc.docName}
                  docId={doc.docId}
                  userId={loggedInUser?.uid}
                  refreshList={refreshList}
                  handleShow={handleShow}
                  allowActions={false}
                />
              ))}
            </div>
          </>
        )}
        <AddNewButton />
        <RenameModal
          show={show}
          docName={selectedDocName}
          docId={selectedDocId}
          onClose={handleClose}
          onRenameDocument={handleRenameDocument}
        />
      </div>
      {docList &&
        docList?.docs?.length == 0 &&
        docList?.sharedDocs?.length == 0 && (
          <div className="empty-list-container">
            <div className="empty-message-box">
              <p>No text documents yet</p>
              <p>Click + to create a new document.</p>
            </div>
          </div>
        )}
    </>
  );
};

export default DocList;
