import { Outlet } from "react-router-dom";
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
