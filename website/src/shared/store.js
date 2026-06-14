import { useEffect, useState } from "react";
import api from "./lib/axios";
export function useWorkspaceState() {
  const [folders, setFolders] = useState([]);

  const [selection, setSelection] = useState({ kind: "general" });

  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {

    const loadFolders = async () => {

      console.log("api folder hitting..");
      try {

        console.log(`api get folders ${backend}`)
        const res = await api.get(
          `${backend}/api/folders/getFolders`
          // http://localhost:5000/api/folders/getFolders this is real endpoint tested by postmen
        );

        console.log("here is response folders form sever", res);
        
        const dbFolders = res.data.map(
          (folder) => ({

            id: folder.id,
            name: folder.name,

            files: (folder.documents || [] ).map(
              (doc) => ({

                id: doc.id,
                name: doc.fileName,

              })
            ),

            messages: folder.messages || [],

            docId:
              folder.documents?.[0]?.docId || null

          })
        );
        console.log("dbFolders", dbFolders);
        setFolders(dbFolders);

      } catch (error) {

        console.log(
          "failed loading folders",
          error
        );

      }

    };

    loadFolders();

  }, []);



  // create folder
  const createFolder = async (name) => {

    if (!name.trim()) return;

    try {

      const res = await api.post(
        `${backend}/api/folders/create`,
        {
          name,
        }
      );
      console.log("response from api/folder/create",res);
      
      const folder = res.data;

      const newFolder = {
        id: folder.id,
        name: folder.name,
        files: [],
        messages: [],
        docId: null,
      };

      setFolders((prev) => [
        ...prev,
        newFolder,
      ]);

      setSelection({
        kind: "folder",
        id: folder.id,
      });

    } catch (error) {

      console.log(
        "folder creation failed",
        error
      );

    }

  };

  // delete folder

  const deleteFolder = async (id) => {

    try {

      await api.delete(
        `${backend}/api/folders/delete/${id}`
      );

      setFolders((prev) =>
        prev.filter((f) => f.id !== id)
      );

      setSelection({
        kind: "general",
      });

    } catch (error) {

      console.log(
        "folder delete failed",
        error
      );

    }

  };

  // select chat
  const select = (sel) => {
    setSelection(sel);

  };

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