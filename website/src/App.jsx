import React from "react";
import Layout from "./shell/Layout";
import ChatView from "./shared/ui/ChatView";
import FolderHeader from "./shared/ui/FolderHeader";
import { useWorkspaceState } from "./shared/store";
import ChatContainer from "./shared/components/ChatContainer";
import FolderChatContainer from "./shared/components/FolderChatContainer";

function App() {

  const state = useWorkspaceState();

  const { selection, folders, setFolders, select } = state;

  const currentFolder = folders.find(
    (f) => f.id === selection.id
  );

  return (
    <Layout state={state}>

      {/* GENERAL AI CHAT */}
      {selection.kind === "general" && (
        <ChatContainer />
      )}

      {/* FOLDER PDF CHAT */}
      {selection.kind === "folder" && currentFolder && (
        <div className="flex flex-col h-full">

          
          <FolderHeader   
            folder={currentFolder}
            addFiles={state.addFiles}
            removeFile={state.removeFile}
          />

          <FolderChatContainer

            currentFolder={currentFolder}

            folders={state.folders}

            setFolders={state.setFolders}

          />

        </div>
      )}

    </Layout>
  );
}

export default App;