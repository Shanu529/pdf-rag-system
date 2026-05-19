import Layout from "../../shell/Layout";

import ChatContainer
from "../../shared/components/ChatContainer";

import { useWorkspaceState }
from "../../shared/store";

function HomePage() {

  const state =
    useWorkspaceState();

  return (

    <Layout state={state}>

      <ChatContainer  />

    </Layout>

  );

}

export default HomePage;