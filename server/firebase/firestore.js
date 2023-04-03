import { db } from "./firebase-config.js";
import { collection, getDocs, doc, getDoc, query, where, setDoc, deleteDoc, documentId } from "firebase/firestore";


export const getAllDocs = async () => {
    const querySnapshot = await getDocs(collection(db, "DocsCollection"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
}


export const getSingleDoc = async (docId, userId) => {
    const q = query(collection(db, "DocsCollection"), where("userId", "==", userId), where(documentId(), "==", docId));

    const querySnapshot = await getDocs(q);

    var docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), "docId": doc.id });
        // console.log(doc.id, " => ", doc.data());
    });

    if (docs.length == 0) {
        return createDocForUser(userId, docId, JSON.stringify({ content: "" }), "Untitled Document");
    }

    return docs[0];

    // const docRef = doc(db, "DocsCollection", docId);

    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     // console.log("Document data:", docSnap.data());
    //     return docSnap.data();
    // } else {
    //     // doc.data() will be undefined in this case
    //     return createDocForUser(userId, docId, JSON.stringify({ content: "" }), "Untitled Document");
    // }
}

export const getAllDocsForUser = async (userId) => {
    const q = query(collection(db, "DocsCollection"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    var docs = [];
    querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), "docId": doc.id });
        // console.log(doc.id, " => ", doc.data());
    });

    return docs;
}

export const createDocForUser = async (userId, docId, docContent, docName) => {
    try {
        const newDoc = await setDoc(doc(db, "DocsCollection", docId), {
            userId: userId,
            docContent: docContent,
            docName: docName
        });

        return { userId, docId, docContent, docName }
    } catch (err) {
        console.log(err);
    }
}

export const deleteDocument = async (documentId) => {
    try {
        await deleteDoc(doc(db, "DocsCollection", documentId));

    } catch (err) {
        console.log(err);
    }
}