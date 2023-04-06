import { createContext, useContext, useEffect, useState } from "react";
import {
  getSingleDoc,
  renameDocForUser,
  updateDocContentForUser,
  updateSharedListOfDocForUser,
} from "../../auth/firestore";
import { useAuth } from "./authContext";

const DocContext = createContext();

export const useDocs = () => useContext(DocContext);

const DocProvider = ({ children }) => {
  const [doc, setDoc] = useState(null);
  const [docId, setDocId] = useState(null);
  const { loggedInUser } = useAuth();

  const updateFullSharedEmailDetailsList = (newSharedList) => {
    let list = newSharedList.map((l) => JSON.stringify(l));
    updateSharedListOfDocForUser(docId, list).then(() => {
      setDoc((prevDoc) => {
        return { ...prevDoc, fullSharedEmailDetailsList: list };
      });
    });
  };

  const renameDocument = (docId, newName) => {
    renameDocForUser(docId, newName).then(() => {
      setDoc((prevDoc) => {
        return { ...prevDoc, docName: newName };
      });
    });
  };

  const updateDocContent = (docId, docContent) => {
    updateDocContentForUser(docId, docContent).then(() => {
      setDoc((prevDoc) => {
        return { ...prevDoc, docContent: docContent };
      });
    });
  };

  useEffect(() => {
    if (docId == null || docId == null) return;

    getSingleDoc(docId, loggedInUser.uid, loggedInUser.email).then((data) => {
      setDoc(data);
    });
  }, [docId, loggedInUser.id]);

  const value = {
    doc,
    setDocId,
    updateFullSharedEmailDetailsList,
    renameDocument,
    updateDocContent,
  };

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
};

export default DocProvider;
