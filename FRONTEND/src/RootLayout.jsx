import React from "react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage.jsx";
import { Outlet } from "@tanstack/react-router";
import NavBar from "../src/components/NavBar.jsx";

const RootLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  )
};

export default RootLayout;
