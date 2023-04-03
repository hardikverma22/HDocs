import { Outlet } from "react-router-dom";

import "./Root.css";

import NavBar from "./NavBar";
import { useState } from "react";

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
