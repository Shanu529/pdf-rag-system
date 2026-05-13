import React, { useState } from "react";
import { Menu, X, Sparkles, MessageSquare, FolderClosed } from "lucide-react";

function MobileNav({ folders = [], selection, select }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between border-b px-4 py-3 md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-200"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold">Nexus AI</span>
        </div>

        <div className="w-9" />
      </header>

      {/* SIDEBAR OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Sidebar */}
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="font-semibold">Workspaces</span>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* General Chat */}
            <button
              onClick={() => {
                select({ kind: "general" });
                setOpen(false);
              }}
              className={`mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                selection?.kind === "general"
                  ? "bg-purple-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              General Chat
            </button>

            {/* Folder Section */}
            <div className="mt-4 px-2 text-xs font-semibold uppercase text-gray-500">
              Folders
            </div>

            <div className="mt-2 space-y-1">
              {folders.map((f) => {
                const active =
                  selection?.kind === "folder" && selection?.id === f.id;

                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      select({ kind: "folder", id: f.id });
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                      active ? "bg-gray-200" : "hover:bg-gray-100"
                    }`}
                  >
                    <FolderClosed className="h-4 w-4" />
                    {f.name}
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default MobileNav;