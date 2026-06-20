import Layout from "../../shell/Layout";
import FolderHeader from "../../shared/ui/FolderHeader";
import { useWorkspaceState } from "../../shared/store";
import ChatContainer from "../../shared/components/ChatContainer";
import FolderChatContainer from "../../shared/components/FolderChatContainer";

import { useState } from "react";

function DashboardPage() {

  const state = useWorkspaceState();
  const [pdfStatus, setPdfStatus] = useState("READY");
  const {
    selection,
    folders,
  } = state;

  const currentFolder =
    folders.find(
      (f) => f.id === selection.id
    );

  return (

    <Layout state={state}>

      {selection.kind === "general" && (
        <ChatContainer />
      )}

      {selection.kind === "folder" &&
        currentFolder && (
          <div className="flex flex-col h-full">

            <FolderHeader
              folder={currentFolder}
              addFiles={state.addFiles}
              removeFile={state.removeFile}
              setFolders={state.setFolders}
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

export default DashboardPage;