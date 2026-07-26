import { useState } from "react";
import UploadWorkspace from "../components/UploadWorkspace";
import ChatPanel from "../components/ChatPanel";
import { Hand, MessageSquare } from "lucide-react";

function Home() {
  const [selectedPalm, setSelectedPalm] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [mobileTab, setMobileTab] = useState("chat");
  const userName = localStorage.getItem("user_name") || "";

  return (
    <div className="min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.75rem)] bg-gradient-to-br from-ivory via-blush/40 to-ivory p-2 sm:p-3 md:p-4 lg:p-5">
      {/* <div className="max-w-[1600px] mx-auto mb-3 sm:mb-4 px-1">
        <h1 className="font-display text-xl sm:text-2xl font-semibold text-ink truncate">
          {userName ? (
            <>
              Welcome,{" "}
              <span className="italic text-gold-strong">{userName}</span>
            </>
          ) : (
            "Your palm workspace"
          )}
        </h1>
        <p className="text-xs sm:text-sm text-muted font-light mt-0.5">
          Upload a palm and chat with your AI reader
        </p>
      </div> */}

      {/* Mobile tab switcher */}
      <div className="lg:hidden flex gap-2 mb-3 p-1 rounded-2xl bg-white/80 border border-gold/15 max-w-[1600px] mx-auto">
        <button
          type="button"
          onClick={() => setMobileTab("palms")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${
            mobileTab === "palms"
              ? "bg-gold text-night shadow-sm"
              : "text-ink/60 hover:bg-blush/50"
          }`}
        >
          <Hand size={16} />
          Palms
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("chat")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${
            mobileTab === "chat"
              ? "bg-gold text-night shadow-sm"
              : "text-ink/60 hover:bg-blush/50"
          }`}
        >
          <MessageSquare size={16} />
          Chat
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 h-auto lg:h-[calc(100svh-9.5rem)] max-w-[1600px] mx-auto">
        <div
          className={`${
            mobileTab === "palms" ? "block" : "hidden"
          } lg:block w-full lg:w-[320px] xl:w-[360px] shrink-0 h-[calc(100svh-12rem)] lg:h-full`}
        >
          <UploadWorkspace
            selectedPalm={selectedPalm}
            setSelectedPalm={(palm) => {
              setSelectedPalm(palm);
              setMobileTab("chat");
            }}
            selectedConversation={selectedConversation}
            setSelectedConversation={(conv) => {
              setSelectedConversation(conv);
              setMobileTab("chat");
            }}
          />
        </div>

        <div
          className={`${
            mobileTab === "chat" ? "flex" : "hidden"
          } lg:flex flex-1 min-h-[60vh] lg:min-h-0 h-[calc(100svh-12rem)] lg:h-full`}
        >
          <ChatPanel
            selectedPalm={selectedPalm}
            setSelectedPalm={setSelectedPalm}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
