import "@fontsource/inter";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import RootLayout from "./pages/root/RootLayout";
import AuthLayout from "./pages/auth/AuthLayout";

import { ClientsPage, HomePage, UsersPage } from "./pages/root/pages";
import { AuthPage } from "./pages/auth/pages";

import { useEffect } from "react";
import { socket } from "./socket";

function App() {
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Connected to server");
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("Disconnected from server");
  //   });
  // }, []);

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/clients" element={<ClientsPage />} />
          {/* <Route path="/clients/:clientId" element={<ClientPage />} /> */}
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
