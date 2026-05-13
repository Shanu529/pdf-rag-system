import React from "react";
import AppSidebar from "./AppSidebar";

function Layout({ children, state }) {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <AppSidebar {...state} />

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default Layout;