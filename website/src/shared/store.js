import { useState } from "react";

export function useWorkspaceState() {
  const [folders, setFolders] = useState([]);
  
  const [selection, setSelection] = useState({ kind: "general" });
  
  // create folder
  const createFolder = (name) => {
    const folderName = name
    if (!folderName) return;

    const newFolder = {
      id: Date.now().toString(),
      name,
      files: [],
      messages: [],
      docId: null
    };
    setFolders((prev) => [...prev, newFolder]);
    // auto open folder
    setSelection({
      kind: "folder",
      id: newFolder.id,
    });
  };

  // delete folder
  const deleteFolder = (id) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    setSelection({ kind: "general" });
  };

  // select chat
  const select = (sel) => {
    setSelection(sel);

  };

  // // add files
  // const addFiles = (folderId, files) => {

  //   if (!files) return;

  //   setFolders((prev) =>
  //     prev.map((folder) => {

  //       if (folder.id === folderId) {

  //         return {
  //           ...folder,
  //           files: [...folder.files, ...files],
  //         };

  //       }

  //       return folder;

  //     })
  //   );

  // };

  const addFiles = (
  folderId,
  files,
  docId
) => {

  setFolders((prev) =>
    prev.map((folder) => {

      if (folder.id === folderId) {

        return {
          ...folder,

          files: [...folder.files, ...files],

          // IMPORTANT
          docId: docId,
        };

      }

      return folder;

    })
  );

};

  // remove file
  const removeFile = (folderId, fileId) => {

    setFolders((prev) =>
      prev.map((folder) => {

        if (folder.id === folderId) {

          return {
            ...folder,
            files: folder.files.filter(
              (file) => file.id !== fileId
            ),
          };

        }

        return folder;

      })
    );

  };

  const sendMessage = (text) => {

    const newMsg = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    setFolders((prev) =>
      prev.map((folder) => {

        if (folder.id === selection.id) {

          return {
            ...folder,
            messages: [...folder.messages, newMsg],
          };

        }

        return folder;

      })
    );

  };

  return {

    folders,
    setFolders,
    selection,

    createFolder,
    deleteFolder,

    select,

    addFiles,
    removeFile,

    sendMessage,

  };

}