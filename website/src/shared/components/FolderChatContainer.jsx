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



  // const sendMessage = async (text) => {

  //   // 
  //   const userMsg = {
  //     id: Date.now(),
  //     role: "user",
  //     content: text,
  //   };


  //   setFolders((prev) =>
  //     prev.map((folder) => {

  //       if (folder.id === currentFolder.id) {

  //         return {
  //           ...folder,
  //           messages: [...folder.messages, userMsg],
  //         };

  //       }

  //       return folder;

  //     })
  //   );



  //   setIsTyping(true);



  //   try {

  //     // API CALL
  //     const response = await axios.post(
  //       `${backend}/api/query`,
  //       {
  //         question: text,
  //         doc_id: currentFolder.docId,
  //       }
  //     );



  //     const llmMsg = {
  //       id: Date.now() + 1,
  //       role: "assistant",
  //       content: response.data.answer,
  //     };


  //     setFolders((prev) =>
  //       prev.map((folder) => {

  //         if (folder.id === currentFolder.id) {

  //           return {
  //             ...folder,
  //             messages: [...folder.messages, llmMsg],
  //           };

  //         }

  //         return folder;

  //       })
  //     );

  //   } catch (error) {

  //     console.log(
  //       "something went wrong at folder controller",
  //       error
  //     );

  //   } finally {

  //     setIsTyping(false);

  //   }

  // };

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

  setIsTyping(true);

  try {

    console.log("DOC ID:", currentFolder.docId);

    const response = await axios.post(
      `${backend}/api/query`,
      {
        question: text,
        doc_id: currentFolder.docId,
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