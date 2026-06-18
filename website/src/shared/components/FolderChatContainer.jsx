import axios from "axios";
import React, { useState } from "react";
import ChatView from "../ui/ChatView";

function FolderChatContainer({
  currentFolder,
  folders,
  setFolders,
}) {

  const [isTyping, setIsTyping] = useState(false);

  const backend = import.meta.env.VITE_BACKEND_URL;
  console.log("CURRENT FOLDER", currentFolder);
  console.log("CURRENT FOLDER", currentFolder);
  console.log("CURRENT FOLDER DOCID", currentFolder.docId);
  console.log("FILES", currentFolder.files);

  const sendMessage = async (text) => {

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: text,
    };

    // add user msg
    setFolders((prev) =>
      prev.map((folder) => {

        if (folder.id === currentFolder.id) {

          return {
            ...folder,
            messages: [...folder.messages, userMsg],
          };

        }

        return folder;

      })
    );
    const processingFile = currentFolder.files.find(
        (file) => file.status === "PROCESSING"
      );

      if (processingFile) {
        alert(`${processingFile.name} is still processing`);
        return;
}
    setIsTyping(true);

    try {

      console.log("DOC ID: currentFolder.docId", currentFolder.docId);
      console.log("DOC ID currentFolder.files[0].docId:", currentFolder.files[0].docId);

      const response = await axios.post(
        `${backend}/api/chat/query`,
        {
          question: text,
          // doc_id: currentFolder.docId,
          doc_id: currentFolder.docId
        }
      );

      console.log(response.data);

      const llmMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.data.answer,
      };

      // add ai msg
      setFolders((prev) =>
        prev.map((folder) => {

          if (folder.id === currentFolder.id) {

            return {
              ...folder,
              messages: [...folder.messages, llmMsg],
            };

          }

          return folder;

        })
      );

    } catch (error) {

      console.log(error.response?.data);

    } finally {

      setIsTyping(false);

    }

  };

  return (

    <ChatView
      mode="folder"
      folderName={currentFolder.name}
      messages={currentFolder.messages}
      sendMessage={sendMessage}
      isTyping={isTyping}
    />

  );

}

export default FolderChatContainer;