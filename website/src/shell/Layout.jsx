import React from "react";

import AppSidebar from "./AppSidebar";
import MobileNav from "../shared/ui/MobileNav";

function Layout({ children, state }) {

  return (

    <div className="flex flex-col h-dvh overflow-hidden bg-gray-50">

      {/* MOBILE NAV */}
      <MobileNav {...state} />

      <div className="flex flex-1 overflow-hidden">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex">
          <AppSidebar {...state} />
        </div>

        {/* MAIN */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {children}

        </main>

      </div>

    </div>

  );

}

export default Layout;