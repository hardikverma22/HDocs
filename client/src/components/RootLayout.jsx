import { Outlet } from "react-router-dom";

import "./Root.css";
import { useState } from "react";
import NavigationBar from "./NavigationBar/NavigationBar";

const RootLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
