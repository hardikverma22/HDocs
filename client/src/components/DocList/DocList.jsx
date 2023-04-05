import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

import DocCard from "../DocCard";
import RenameModal from "../Models/RenameModal";
import AddNewButton from "../AddNewButton";
import "./DocList.css";

import { getAllDocsForUser, renameDocForUser } from "../../../auth/firestore";

const DocList = () => {
  const [docList, setDocList] = useState();

  const { loggedInUser } = useAuth();

  const [show, setShow] = useState(false);
  const [seelctedDocId, setSelectedDocId] = useState(null);
  const [seelctedDocName, setSelectedDocName] = useState("");

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
    });
  }, [loggedInUser.uid]);

  return (
    <div className="doclist-container">
      {docList && docList?.docs.length > 0 && (
        <>
          <div className="doclist-title mt-5">Document owned by you</div>
          <div className="cards-container">
            {docList.docs.map((doc) => (
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

      {docList && docList?.sharedDocs.length > 0 && (
        <>
          <div className="doclist-title mt-5">Document shared to you</div>
          <div className="cards-container">
            {docList.sharedDocs.map((doc) => (
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
      <AddNewButton />
      <RenameModal
        show={show}
        docName={seelctedDocName}
        docId={seelctedDocId}
        onClose={handleClose}
        onRenameDocument={handleRenameDocument}
      />
    </div>
  );
};

export default DocList;
