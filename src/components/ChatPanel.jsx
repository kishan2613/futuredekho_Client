import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { sendMessage } from "../services/chatservice";

function ChatPanel() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const res = await sendMessage(message);

      setReply(res.reply);
      setMessage("");
    } catch (error) {
      console.error(error);
      setReply("Something went wrong.");
    }
  };

  return (
    <div className="w-[380px] bg-white rounded-2xl border border-gray-200 flex flex-col">

      {/* Header */}
      <div className="p-5 border-b">
        <h2 className="font-semibold">
          AI Palm Reader
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-3xl">
          🖐
        </div>

        <h3 className="mt-5 text-lg font-semibold">
          Welcome to HathDekho
        </h3>

        <p className="text-center text-sm text-gray-500 mt-2 max-w-xs">
          Upload your palm image and start chatting with your AI palm reader.
        </p>

        {reply && (
          <div className="mt-6 w-full bg-gray-100 rounded-xl p-4 text-sm">
            {reply}
          </div>
        )}

      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            placeholder="Ask me anything..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={handleSend}
            className="h-12 w-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center"
          >
            <SendHorizontal size={18} />
          </button>

        </div>
      </div>

    </div>
  );
}

export default ChatPanel;