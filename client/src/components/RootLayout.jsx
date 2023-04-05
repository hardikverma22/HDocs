import { Outlet } from "react-router-dom";

import "./Root.css";

import { useState } from "react";
import NavBar from "./NavBar/NavBar";

const RootLayout = () => {
  const [docName, setDocName] = useState("Untitled Document");
  return (
    <>
      <NavBar docName={docName} setDocName={setDocName} />
      <Outlet context={[docName, setDocName]} />
    </>
  );
};

export default RootLayout;
