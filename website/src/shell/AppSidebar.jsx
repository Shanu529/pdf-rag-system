import React, { useState } from "react";
import {
  MessageSquare,
  Folder,
  Plus,
} from "lucide-react";

import { useNavigate }
from "react-router-dom";

import { isAuthenticated }
from "../shared/lib/isAuth";


function AppSidebar({
  folders = [],
  selection,
  select,
  createFolder,
  deleteFolder,
}) {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [menuFolder, setMenuFolder] = useState(null);

  
  const navigate = useNavigate();

  const submit = async () => {

      const authcheck =
        await isAuthenticated();

      if (!authcheck) {

        navigate("/login");

        return;

      }

      if (!name.trim()) return;

      createFolder(name);

      setName("");

      setOpen(false);

    };

  return (

  <div
  onClick={() => setMenuFolder(null)}
  className="
      hidden md:flex
      w-64
      h-screen
      bg-gray-50
      border-r
      flex-col
      justify-between
      "
      >

      <div className="p-4">

      
        <div className="flex items-center gap-2 mb-6">

          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-purple-500 text-white">
            ✨
          </div>

          <div>
            <h1 className="text-sm font-semibold">
              Nexus AI
            </h1>

            <p className="text-xs text-gray-500">
              Multi-AI workspace
            </p>
          </div>

        </div>

        <div
          onClick={() =>
            select({ kind: "general" })
          }
          className={`flex items-center justify-between px-2 py-2 rounded-lg cursor-pointer mb-4 ${
            selection?.kind === "general"
              ? "bg-purple-100"
              : "hover:bg-gray-200"
          }`}
        >

          <div className="flex items-center gap-2 text-sm">
            <MessageSquare size={16} />
            General Chat
          </div>

        </div>



        {/* FOLDER HEADER */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-2 mb-2">

          <span className="uppercase">
            Folders
          </span>



          <button

            onClick={() => setOpen(true)}
          >
            <Plus size={14} />
          </button>

        </div>



        {/* MODAL */}
        {open && (

          <div className="mb-4 px-2">

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Folder name"
              className="w-full border p-2 rounded text-sm"
            />



            <button
              onClick={submit}
              className="mt-2 w-full bg-purple-500 text-white py-2 rounded"
            >
              Create Folder
            </button>

          </div>

        )}

        {folders.map((f) => {

  const active =
    selection?.kind === "folder" &&
    selection?.id === f.id;

  let pressTimer;

  return (

    <div
      key={f.id}

      onClick={() =>
        select({
          kind: "folder",
          id: f.id,
        })
      }

      onContextMenu={(e) => {

        e.preventDefault();

        setMenuFolder(f.id);

      }}

      onTouchStart={() => {

        pressTimer = setTimeout(() => {

          setMenuFolder(f.id);

        }, 700);

      }}

      onTouchEnd={() => {

        clearTimeout(pressTimer);

      }}

      className={`relative flex items-center gap-3 p-3 rounded-xl mb-2 cursor-pointer ${
        active
          ? "bg-purple-100"
          : "hover:bg-gray-200"
      }`}
    >

      <div
        className={`h-8 w-8 flex items-center justify-center rounded-lg ${
          active
            ? "bg-purple-500 text-white"
            : "bg-gray-300"
        }`}
      >
        <Folder size={14} />
      </div>

      <div>

        <p className="text-sm font-medium">
          {f.name}
        </p>

        <p className="text-xs text-gray-500">
          {f.files.length} PDFs
        </p>

      </div>

      {/* CONTEXT MENU */}
      {menuFolder === f.id && (

        <div
          className="absolute right-2 top-12 bg-white border shadow-lg rounded-lg p-2 z-50"
        >

          <button

            onClick={(e) => {

              e.stopPropagation();

              deleteFolder(f.id);

              setMenuFolder(null);

            }}

            className="text-red-500 text-sm"

          >
            Delete Folder
          </button>

        </div>

      )}

    </div>

  );

})}

      </div>

    </div>

  );

}

export default AppSidebar;