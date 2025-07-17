import React from "react";
import Navbar from "./Navbar"; // Navbar import karo yaha
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <Navbar />  {/* Navbar ko yaha render karo */}

      <main style={{ padding: "2rem" }}>
        <Outlet />  {/* Nested routes ka content yaha render hoga */}
      </main>
    </>
  );
}
