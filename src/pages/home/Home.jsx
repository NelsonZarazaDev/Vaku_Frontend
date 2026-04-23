import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";

export default function Home() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
}
