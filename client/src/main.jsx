import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import TextEditor from "./components/TextEditor";
import { v4 as uuidv4,  } from "uuid";
import DocList from "./components/DocList";
import RootLayout from "./components/RootLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/authContext";
import Login from "./components/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<DocList />} />
      <Route
        path="/newDoc"
        element={<Navigate to={`/document/${uuidv4()}`} />}
      />
      <Route path="/document/:id" element={<TextEditor />} />
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
);
