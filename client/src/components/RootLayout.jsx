import { Outlet } from "react-router-dom";

import "./Root.css";
import { useState } from "react";
import NavBar from "./NavBar/NavBar";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
