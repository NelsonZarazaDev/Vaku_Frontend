import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-10">
        <Outlet />
      </div>
    </>
  );
}
