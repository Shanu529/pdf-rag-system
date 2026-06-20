


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./app/pages/DashboardPage";
import LoginPage from "./app/pages/LoginPage";
import SignupPage from "./app/pages/SignupPage";

import { useEffect } from "react";

// import ChatContainer from "./shared/components/ChatContainer";

import HomePage
from "./app/pages/HomePage";

import { socket} from "./socket/socket.js";

import { useNotifications } from "./context/NotificationContext";

function App() {

  const { addNotification } = useNotifications();

  useEffect(() => {

  socket.on("connect", () => {
    console.log("Socket Connected");
  });

  }, []);



  useEffect(() => {
  const handlePdfProcessed = (data) => {
    console.log("PDF processed", data);
    console.log("PDF processed", data);
    console.log("addNotification function", addNotification);
    addNotification({
      documentId: data.documentId,
      folderId: data.folderId,
      status: "READY",
      fileName:  data.fileName,
    });
  };

  socket.on("pdf-processed", handlePdfProcessed);

  return () => {
    socket.off("pdf-processed", handlePdfProcessed);
  };
}, [addNotification]);


  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTE */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* PRIVATE DASHBOARD */}
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;