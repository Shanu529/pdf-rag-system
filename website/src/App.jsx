// // import React from "react";
// // import Layout from "./shell/Layout";
// // import ChatView from "./shared/ui/ChatView";
// // import FolderHeader from "./shared/ui/FolderHeader";
// // import { useWorkspaceState } from "./shared/store";
// // import ChatContainer from "./shared/components/ChatContainer";
// // import FolderChatContainer from "./shared/components/FolderChatContainer";

// // function App() {

// //   const state = useWorkspaceState();

// //   const { selection, folders, setFolders, select } = state;

// //   const currentFolder = folders.find(
// //     (f) => f.id === selection.id
// //   );

// //   return (
// //     <Layout state={state}>

// //       {/* GENERAL AI CHAT */}
// //       {selection.kind === "general" && (
// //         <ChatContainer />
// //       )}

// //       {/* FOLDER PDF CHAT */}
// //       {selection.kind === "folder" && currentFolder && (
// //         <div className="flex flex-col h-full">

          
// //           <FolderHeader   
// //             folder={currentFolder}
// //             addFiles={state.addFiles}
// //             removeFile={state.removeFile}
// //           />

// //           <FolderChatContainer

// //             currentFolder={currentFolder}

// //             folders={state.folders}

// //             setFolders={state.setFolders}

// //           />

// //         </div>
// //       )}

// //     </Layout>
// //   );
// // }

// // export default App;


// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";

// import DashboardPage from "./app/pages/DashboardPage";


// import LoginPage
// from "./app/pages/LoginPage";

// import SignupPage
// from "./app/pages/SignupPage";

// import ChatContainer
// from "./shared/components/ChatContainer";

// function App() {

//   return (

//     <BrowserRouter>

//       <Routes>

//         {/* PUBLIC */}
//         <Route
//           path="/"
//           element={<ChatContainer />}
//         />

//         <Route
//           path="/login"
//           element={<LoginPage />}
//         />

//         <Route
//           path="/signup"
//           element={<SignupPage />}
//         />

//         {/* PRIVATE */}
//         <Route
//           path="/dashboard"
//           element={<DashboardPage />}
//         />

//       </Routes>

//     </BrowserRouter>

//   );

// }

// export default App;\





import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./app/pages/DashboardPage";
import LoginPage from "./app/pages/LoginPage";
import SignupPage from "./app/pages/SignupPage";

// import ChatContainer from "./shared/components/ChatContainer";
import HomePage
from "./app/pages/HomePage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTE */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        {/* PRIVATE DASHBOARD */}
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        {/* UNKNOWN ROUTES */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;