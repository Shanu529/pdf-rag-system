import React, { useState } from "react";
import { Menu, X, Sparkles, MessageSquare, FolderClosed } from "lucide-react";

import {
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
function MobileNav({ folders = [], selection, select }) {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
const [name, setName] = useState("");
  const submit  = async ()=>{
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
  }
  return (
    <>
      {/* HEADER */}
      <header className="
      
      bg-[#02051e] text-white
      flex items-center border-b-[#0B21BF]
      justify-between border-b px-4 py-3 md:hidden">
        <button
          onClick={() => setMenu(true)}
          className="rounded-lg p-2 hover:bg-gray-200"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0B21BF]">
          ⌬
          </div>
          <span className="text-sm font-semibold">ParaDox AI</span>
        </div>

        <div className="w-9" />
      </header>

      {/* SIDEBAR OVERLAY */}
      {menu && (
        <div
          className="fixed
          text-white
          inset-0 z-50 md:hidden"
          onClick={() => setMenu(false)}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Sidebar */}
         <aside
            className="absolute left-0 top-0 h-full w-72 bg-[#02051e] p-4 shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="font-semibold">Workspaces</span>
              <button
                onClick={() => setMenu(false)}
                className="rounded-md p-1.5 hover:bg-[#0B21BF]"
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
                  ? "bg-[#0B21BF] text-white"
                  : "hover:bg-[#0B21BF]"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              General Chat
            </button>

            {/* Folder Section */}
            
            <div className="mt-4 px-2
            flex justify-between
            text-xs font-semibold uppercase text-gray-500 text-center">
              <p className="pt-4"> Folders</p>     <p onClick={(()=>setOpen(true))} className="text-3xl hover:cursor-pointer">+</p>
              
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
                      className="w-full border
                      border-[#0B21BF]
                      text-white
                      p-2 rounded text-sm"
                    />


                    <button
                      onClick={submit}
                      className="mt-2 w-full bg-[#0B21BF] text-white py-2 rounded"
                    >
                      Create Folder
                    </button>

                  </div>

                )}
                

            
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
                      active ? "bg-[#0B21BF]" : "hover:bg-[#0B21BF]"
                    }`}
                  >
                    <FolderClosed className="h-4 w-4" />
                    {f.name}
                  </button>
                );
              })}
            </div>

          <div
      
            onClick={() =>navigate("/login")}
            className="bg-[#0B21BF] mt-auto
              flex gap-2 cursor-pointer
              text-white py-4 m-2 rounded-lg px-5">
            <User /> 
            <p>
            Profile
            </p>
          </div>

          </aside>
          
        </div>
      )}
    </>
  );
}

export default MobileNav;