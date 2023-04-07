import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import { v4 as uuidv4 } from "uuid";
// import DocList from "./components/DocList/DocList";
// import TextEditor from "./components/TextEditor";
// import RootLayout from "./components/RootLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/authContext";
import ThemeProvider from "./context/ThemeContext";
import DocProvider from "./context/docContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

// lazy laoding
const DocList = lazy(() => import("./components/DocList/DocList"));
const TextEditor = lazy(() => import("./components/TextEditor/TextEditor"));
const RootLayout = lazy(() => import("./components/RootLayout"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<LoadingSpinner />}>
          <RootLayout />
        </Suspense>
      }
    >
      <Route
        index
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <DocList />
          </Suspense>
        }
      />
      <Route
        path="/document/:id"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <TextEditor />
          </Suspense>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <DocProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </DocProvider>
  </AuthProvider>
  // </React.StrictMode>
);
