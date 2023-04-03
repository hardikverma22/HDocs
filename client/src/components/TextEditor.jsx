import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { validate as uuidValidate } from "uuid";
import { createDocForUser, getSingleDoc } from "../../auth/firestore";
import Portal from "./Portal";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const SAVE_TIME = 4000;

const TextEditor = () => {
  const { id: documentId } = useParams();

  const quillRef = useRef();

  // const [socket, setSocket] = useState();

  const { loggedInUser } = useAuth();

  const [docName, setDocName] = useOutletContext();

  const [sharedEmailList, setSharedEmailList] = useState([]);

  if (!uuidValidate(documentId)) {
    return (
      <>
        <h2>Invalid Document ID</h2>
      </>
    );
  }

  //connecting to server
  // useEffect(() => {
  //   const s = io("http://localhost:3000");
  //   setSocket(s);

  //   quillRef.current.getEditor().disable();
  //   quillRef.current.getEditor().setText = "Loading...";

  //   return () => {
  //     s.disconnect();
  //   };
  // }, []);

  //receiving changes from other users on same room from server
  // useEffect(() => {
  //   if (socket == null) return;

  //   const handler = (delta) => {
  //     quillRef.current.getEditor().updateContents(delta);
  //   };

  //   socket.on("receive-changes", handler);

  //   return () => {
  //     socket.off("receive-changes", handler);
  //   };
  // }, [socket, quillRef]);

  //inital loading document from server
  // useEffect(() => {
  //   if (
  //     socket == null ||
  //     quillRef == null ||
  //     documentId == null ||
  //     loggedInUser == null
  //   ) {
  //     return;
  //   }

  //   socket.once("load-document", (document) => {
  //     quillRef.current.getEditor().setContents(document.docContent);
  //     quillRef.current.getEditor().enable();
  //     setDocName(document.docName);
  //   });

  //   socket.emit("get-document", documentId, loggedInUser.uid);
  // }, [socket, quillRef, documentId, loggedInUser]);

  //auto save changes every few seconds
  // useEffect(() => {
  //   if (
  //     socket == null ||
  //     quillRef == null ||
  //     documentId == null ||
  //     loggedInUser == null
  //   )
  //     return;

  //   //TO-DO auto saving spinner
  //   // var element = document.createElement("div");
  //   // element.classList.add("spinner-border");
  //   // element.classList.add("custom-spinner");
  //   // var toolbar = document.querySelector(".ql-toolbar.ql-snow");
  //   // toolbar.appendChild(element);

  //   const timer = setInterval(() => {
  //     socket.emit(
  //       "save-document",
  //       loggedInUser.uid,
  //       documentId,
  //       quillRef.current.getEditor().getContents(),
  //       docName
  //     );
  //   }, SAVE_TIME);

  //   return () => {
  //     clearInterval(timer);
  //     // toolbar.removeChild(element);
  //   };
  // }, [socket, quillRef, documentId, loggedInUser, docName]);

  useEffect(() => {
    if (documentId == null || loggedInUser == null) return;
    getSingleDoc(documentId, loggedInUser.uid).then((data) => {
      quillRef.current
        .getEditor()
        .setContents(JSON.parse(data.docContent).content);
      quillRef.current.getEditor().enable();
      setDocName(data.docName);
      const sharedList =
        data.fullSharedEmailDetailsList.length == 0
          ? []
          : data.fullSharedEmailDetailsList.map((l) => JSON.parse(l));
      setSharedEmailList(sharedList);
      return () => {};
    });
  }, [documentId, loggedInUser.id]);

  useEffect(() => {
    if (quillRef == null || documentId == null || loggedInUser == null) return;

    var timeoutTimer;
    var element;
    var toolbar;

    const timer = setInterval(() => {
      element = document.createElement("div");
      var span = document.createElement("span");
      var textSpan = document.createElement("span");
      span.classList.add("spinner-border");
      element.classList.add("custom-spinner");
      span.classList.add("spinner-size");
      span.classList.add("text-primary");

      textSpan.textContent = "Auto Saving...";
      element.appendChild(span);
      element.appendChild(textSpan);

      toolbar = document.querySelector(".ql-toolbar.ql-snow");
      toolbar.appendChild(element);

      const docContentObject = JSON.stringify({
        content: quillRef.current.getEditor().getContents(),
      });

      timeoutTimer = setTimeout(() => {
        if (element) toolbar.removeChild(element);

        const list = sharedEmailList.map((l) => JSON.stringify(l));
        createDocForUser(
          loggedInUser.uid,
          documentId,
          docContentObject,
          docName,
          list
        )
          .then(() => {})
          .catch((err) => {
            console.error(err);
          });
      }, 1000);
    }, SAVE_TIME);

    return () => {
      clearInterval(timer);
      clearTimeout(timeoutTimer);
      // if (element) toolbar.removeChild(element);
    };
  }, [quillRef, documentId, loggedInUser, docName, sharedEmailList]);

  //sending delta to server as and when typed
  const handleChange = (content, delta, source, editor) => {
    // console.log(delta);
    // if (source !== "user") return;
    // if (socket !== null) socket.emit("send-changes", delta);
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        onChange={handleChange}
        ref={quillRef}
      />
      <Portal
        sharedEmailList={sharedEmailList}
        onChangeEmailList={(list) => setSharedEmailList(list)}
      />
    </>
  );
};

export default TextEditor;
