import React from "react";
import { Link } from "react-router-dom";
import ChatContainer from "../shared/components/ChatContainer";

function LandingPage() {

  return (

    <div className="h-screen flex flex-col">

      {/* NAVBAR */}
      <header className="border-b bg-white px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-xl bg-purple-500 text-white flex items-center justify-center">
            ✨
          </div>

          <div>

            <h1 className="font-bold">
              Nexus AI 
            </h1>

            <p className="text-xs text-gray-500">
              Multi-AI Workspace
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="px-4 py-2 rounded-xl border text-sm"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm"
          >
            Signup
          </Link>

        </div>

      </header>

      {/* HERO */}
      <div className="border-b bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-10 text-center">

        <h1 className="text-4xl font-bold">
          AI Workspace Platform
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">

          Chat with AI, upload PDFs, build isolated workspaces,
          and create persistent AI memory systems.

        </p>

      </div>

      {/* GENERAL CHAT */}
      <div className="flex-1 overflow-hidden">

        <ChatContainer />

      </div>

    </div>

  );

}

export default LandingPage;