// import React, { useState } from "react";
// import {
//   Sparkles,
//   FolderClosed,
//   Plus,
//   MessageSquare,
//   Trash2,
//   FileText,
// } from "lucide-react";

// function AppSidebar({
//   folders = [],
//   selection,
//   select,
//   createFolder,
//   deleteFolder,
// })

// {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");

//   const submit = () => {
//     if (!name.trim()) return;
//     createFolder(name.trim());
//     setName("");
//     setOpen(false);
//   };

//   return (
//     <aside className="hidden md:flex h-full w-72 flex-col border-r bg-gray-50">

//       {/* HEADER */}
//       <div className="flex items-center gap-2 px-5 py-5">
//         <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500 text-white">
//           <Sparkles size={18} />
//         </div>
//         <div>
//           <h1 className="text-base font-semibold">Nexus AI</h1>
//           <p className="text-xs text-gray-500">Multi-AI workspace</p>
//         </div>
//       </div>

//       {/* GENERAL CHAT */}
//       <div className="px-3">
//         <button
//           onClick={() => select({ kind: "general" })}
//           className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
//             selection?.kind === "general"
//               ? "bg-purple-500 text-white"
//               : "hover:bg-gray-200"
//           }`}
//         >
//           <MessageSquare size={16} />
//           General Chat
//         </button>
//       </div>

//       {/* FOLDER HEADER */}
//       <div className="mt-6 flex items-center justify-between px-5">
//         <span className="text-xs font-semibold uppercase text-gray-500">
//           Folders
//         </span>

//         <button
//           onClick={() => setOpen(true)}
//           className="p-1 rounded hover:bg-gray-200"
//         >
//           <Plus
//             size={14}
//             className="cursor-pointer"
//           />
//         </button>
//       </div>

//       {/* CREATE FOLDER MODAL (simple) */}
//       {open && (
//         <div className="px-4 mt-2">
//           <input
//             autoFocus
//             placeholder="Folder name..."
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && submit()}
//             className="w-full border rounded px-2 py-1 text-sm"
//           />
//           <div className="flex gap-2 mt-2">
//             <button
//               onClick={() => setOpen(false)}
//               className="px-2 py-1 text-sm bg-gray-200 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={submit}
//               className="px-2 py-1 text-sm bg-purple-500 text-white rounded"
//             >
//               Create
//             </button>
//           </div>
//         </div>
//       )}

//       {/* FOLDER LIST */}
//       <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3 pb-4">

//         {folders.length === 0 && (
//           <p className="text-center text-xs text-gray-400 py-6">
//             No folders yet
//           </p>
//         )}

//         {folders.map((f) => {
//           const active =
//             selection?.kind === "folder" && selection?.id === f.id;

//           return (
//             <div key={f.id} className="group relative">

//               <button
//                 onClick={() => select({ kind: "folder", id: f.id })}
//                 className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
//                   active ? "bg-gray-200" : "hover:bg-gray-100"
//                 }`}
//               >
//                 <div className="flex h-7 w-7 items-center justify-center rounded bg-gray-300">
//                   <FolderClosed size={14} />
//                 </div>

//                 <div className="flex-1 text-left">
//                   <div className="truncate font-medium ">{f.name}</div>
//                   <div className="text-xs text-gray-500 flex items-center gap-1">
//                     <FileText size={12} />
//                     {f.files.length} PDF
//                   </div>
//                 </div>
//               </button>

//               {/* DELETE BUTTON */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   deleteFolder(f.id);
//                 }}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-red-500"
//               >
//                 <Trash2 size={14} />
//               </button>
              
//             </div>
//           );
//         })}
//       </nav>

//       {/* USER */}
//       <div className="border-t p-3">
//         <div className="flex items-center gap-3">
//           <div className="h-9 w-9 flex items-center justify-center rounded-full bg-purple-500 text-white">
//             S
//           </div>
//           <div>
//             <div className="text-sm font-medium">Alex Doe</div>
//             <div className="text-xs text-gray-500">alex@nexus.ai</div>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }

// export default AppSidebar;