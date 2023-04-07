import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { validate as uuidValidate } from "uuid";
import { useDocs } from "../../context/docContext";
import Portal from "../Portal";

import "./TextEditor.css";

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

const SAVE_TIME = 1000;

const TextEditor = () => {
  const { id: documentId } = useParams();
  const { doc, setDocId, updateDocContent } = useDocs();
  const quillRef = useRef();

  const [content, setContent] = useState();

  if (!uuidValidate(documentId)) {
    return (
      <>
        <h2>Invalid Document ID</h2>
      </>
    );
  }

  useEffect(() => {
    if (documentId) setDocId(documentId);
  }, [documentId]);

  useEffect(() => {
    if (doc == null) return;
    quillRef.current
      .getEditor()
      .setContents(JSON.parse(doc.docContent).content);
    quillRef.current.getEditor().enable();
  }, [doc]);

  useEffect(() => {
    if (quillRef == null || content == null) return;
    var timeoutTimer;
    var element;
    var toolbar;
    const timer = setTimeout(() => {
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

      timeoutTimer = setTimeout(() => {
        if (element) toolbar.removeChild(element);
        updateDocContent(documentId, content);
      }, 1000);
    }, SAVE_TIME);
    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutTimer);
      // if (element) toolbar.removeChild(element);
    };
  }, [content, quillRef]);

  const handleChange = (content, delta, source, editor) => {
    if (source !== "user") return;
    const docContentObject = JSON.stringify({
      content: quillRef.current.getEditor().getContents(),
    });
    setContent(docContentObject);
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        onChange={handleChange}
        ref={quillRef}
      />
      <Portal />
    </>
  );
};

export default TextEditor;
