import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="mt-6">
        <Outlet />
      </main>
    </div>
  );
}
