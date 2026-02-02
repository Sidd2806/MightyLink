import React from "react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage.jsx";
import { Outlet } from "@tanstack/react-router";
import NavBar from "../src/components/NavBar.jsx";

const RootLayout = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#172442] via-[#03071a] to-black text-white overflow-x-hidden">
      <NavBar />
      <main className="pt-20 px-4">
        <Outlet />
      </main>
    </div>
  )
};

export default RootLayout;
