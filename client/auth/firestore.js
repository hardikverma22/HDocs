import { db } from "./firebase"
import { collection, getDocs, doc, getDoc, query, where, setDoc, deleteDoc, documentId, updateDoc } from "firebase/firestore";


export const getSingleDoc = async (docId, userId, emailId) => {
    const q = query(collection(db, "DocsCollection"), where(documentId(), "==", docId));

    const querySnapshot = await getDocs(q);

    var docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), "docId": doc.id });
    });
    if (docs?.length != 0) {
        if (docs[0].userId == userId || docs[0].sharedEmailList.includes(emailId)) {
            return docs[0]
        }
    }
    else if (docs?.length == 0) {
        return createDocForUser(userId, docId, JSON.stringify({ content: "" }), "Untitled Document");
    }

    return docs[0];
}

export const getAllDocsForUser = async (userId, email) => {
    const qeuryUserId = query(collection(db, "DocsCollection"), where("userId", "==", userId));
    const sharedDoc = query(collection(db, "DocsCollection"), where("sharedEmailList", 'array-contains-any', [email]));

    const querySnapshot = await getDocs(qeuryUserId);

    const sharedDocSnapshot = await getDocs(sharedDoc);
    var docs = [];
    var sharedDocs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), "docId": doc.id });

    });

    sharedDocSnapshot.forEach((doc) => {
        sharedDocs.push({ ...doc.data(), "docId": doc.id });

    });

    return { docs: docs, sharedDocs: sharedDocs };
}

export const createDocForUser = async (userId, docId, docContent, docName, fullSharedEmailDetailsList = []) => {
    try {
        const justEmails = fullSharedEmailDetailsList && fullSharedEmailDetailsList.length != 0 ? fullSharedEmailDetailsList.map(e => JSON.parse(e).email) : [];
        const newDoc = await setDoc(doc(db, "DocsCollection", docId), {
            userId: userId,
            docContent: docContent,
            docName: docName,
            fullSharedEmailDetailsList: fullSharedEmailDetailsList,
            sharedEmailList: justEmails
        });

        return { userId, docId, docContent, docName, fullSharedEmailDetailsList }
    } catch (err) {
        console.log(err);
    }
}

export const deleteDocument = async (documentId, docName) => {
    await deleteDoc(doc(db, "DocsCollection", documentId));
}


export const renameDocForUser = async (documentId, docName) => {
    await updateDoc(doc(db, "DocsCollection", documentId), { docName: docName });
}

export const updateSharedListOfDocForUser = async (documentId, fullSharedEmailDetailsList) => {
    const justEmails = fullSharedEmailDetailsList && fullSharedEmailDetailsList.length != 0 ? fullSharedEmailDetailsList.map(e => JSON.parse(e).email) : [];

    await updateDoc(doc(db, "DocsCollection", documentId),
        { fullSharedEmailDetailsList: fullSharedEmailDetailsList, sharedEmailList: justEmails });
}

export const updateDocContentForUser = async (documentId, docContent) => {
    await updateDoc(doc(db, "DocsCollection", documentId), { docContent: docContent });
}