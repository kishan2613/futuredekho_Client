import { useState, useEffect, useRef } from "react";
import { SendHorizontal } from "lucide-react";

import { sendMessage } from "../services/chatservice";
import { createConversation } from "../services/conversationService";
import ReactMarkdown from "react-markdown";
import axios from "axios";

function ChatPanel({ selectedPalm,
  setSelectedPalm,selectedConversation }) {
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initConversation = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        const res = await createConversation(userId);

        setConversationId(res.conversation_id);

        console.log(
          "Conversation Created:",
          res.conversation_id
        );
      } catch (error) {
        console.error(
          "Conversation Error:",
          error
        );
      }
    };

    initConversation();
  }, []);

  useEffect(() => {
  if (!selectedConversation) return;

  loadConversation();
}, [selectedConversation]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);


  const loadConversation = async () => {
  try {
    const res = await axios.get(
      `https://futuredekho-server.onrender.com/chat/${selectedConversation.id}`
    );

    setMessages(res.data.messages);

    setConversationId(
      selectedConversation.id
    );

  } catch (error) {
    console.error(error);
  }
};


  const handleSend = async () => {
    if (!message.trim()) return;

    if (!conversationId) {
      alert("Conversation not ready");
      return;
    }

    const currentMessage = message;

    setMessage("");

    // Add user message + loading bubble
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentMessage,
      },
      {
        id: "loading",
        role: "assistant",
        loading: true,
      },
    ]);

    try {
      const res = await sendMessage(
        conversationId,
        currentMessage,
        selectedPalm?.id || null
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "loading"
            ? {
                role: "assistant",
                content: res.reply,
              }
            : msg
        )
      );
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "loading"
            ? {
                role: "assistant",
                content: "Something went wrong.",
              }
            : msg
        )
      );
    }
  };

  return (
    <div className="flex-1 h-full bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="p-5 border-b">
        <h2 className="font-semibold">
          AI Palm Reader
        </h2>
      </div>

      {/* Attached Palm */}
      {selectedPalm && (
  <div className="px-4 py-3 border-b bg-purple-50">

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-2">

        <span className="text-lg">
          📎
        </span>

        <span className="text-sm font-medium text-purple-700">
          Palm #{selectedPalm.id} Attached
        </span>

      </div>

      <button
        onClick={() => setSelectedPalm(null)}
        className="text-red-500 hover:text-red-700 text-sm font-medium"
      >
        ✕ Remove
      </button>

    </div>

  </div>
)}

      {/* Chat Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">

            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-3xl">
              🖐
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              Welcome to HathDekho
            </h3>

            <p className="text-center text-sm text-gray-500 mt-2 max-w-xs">
              {selectedPalm
                ? `Palm #${selectedPalm.id} is attached. Ask questions about this palm.`
                : "Select a palm from the left panel and start chatting."}
            </p>

          </div>
        )}

        {messages.map((msg, index) => (

  <div key={index} className="mb-6">

    {msg.role === "user" ? (

      <div className="flex justify-end">

        <div className="max-w-[75%] bg-purple-600 text-white px-4 py-3 rounded-2xl">
          {msg.content}
        </div>

      </div>

    ) : (

      <div className="w-full">

        {/* Assistant Header */}

        <div className="flex items-center gap-3 mb-3">

          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            🖐
          </div>

          <span className="font-semibold">
            HathDekho
          </span>

        </div>

        {/* Assistant Content */}

        <div className="pl-11 text-[15px] leading-7 text-gray-800">

          {msg.loading ? (

            <div className="flex gap-1 items-center">

              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>

              <span
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{
                  animationDelay: "0.15s",
                }}
              ></span>

              <span
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{
                  animationDelay: "0.3s",
                }}
              ></span>

            </div>

          ) : (

            <div className="prose prose-sm max-w-none">

              <ReactMarkdown>
                {msg.content}
              </ReactMarkdown>

            </div>

          )}

        </div>

      </div>

    )}

  </div>

))}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <div className="border-t p-4">

        <div className="flex items-center gap-2">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && handleSend()
            }
            placeholder={
              selectedPalm
                ? "Ask about this palm..."
                : "Select a palm first..."
            }
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={handleSend}
            disabled={!conversationId}
            className="h-12 w-12 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white flex items-center justify-center"
          >
            <SendHorizontal size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatPanel;