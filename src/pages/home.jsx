import UploadWorkspace from "../components/UploadWorkspace";
import ChatPanel from "../components/ChatPanel";

function Home() {
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] p-4">
      <div className="flex gap-4 h-[calc(100vh-96px)]">

        {/* Upload Section */}
        <UploadWorkspace />

        {/* Chat Section */}
        <ChatPanel />

      </div>
    </div>
  );
}

export default Home;