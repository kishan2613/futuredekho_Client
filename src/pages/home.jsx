import { useState } from "react";
import UploadWorkspace from "../components/UploadWorkspace";
import ChatPanel from "../components/ChatPanel";

function Home() {
  const [selectedPalm, setSelectedPalm] = useState(null);
  const [selectedConversation,
      setSelectedConversation] =
      useState(null);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] p-4">
      <div className="flex gap-4 h-[calc(100vh-96px)]">

        <UploadWorkspace
          selectedPalm={selectedPalm}
          setSelectedPalm={setSelectedPalm}

           selectedConversation={selectedConversation}
  setSelectedConversation={setSelectedConversation}
        />

        <ChatPanel
          selectedPalm={selectedPalm}
          setSelectedPalm={setSelectedPalm}

           selectedConversation={selectedConversation}
  setSelectedConversation={setSelectedConversation}
        />

      </div>
    </div>
  );
}

export default Home;