import { useState, useEffect, useRef } from "react";
import { Hand, Paperclip, SendHorizontal, X } from "lucide-react";
import { sendMessage } from "../services/chatservice";
import { createConversation } from "../services/conversationService";
import ReactMarkdown from "react-markdown";
import api from "../services/backendapis";

function ChatPanel({ selectedPalm, setSelectedPalm, selectedConversation }) {
  const [message, setMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [userName] = useState(
    () => localStorage.getItem("user_name") || ""
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initConversation = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;
        const res = await createConversation(userId);
        setConversationId(res.conversation_id);
      } catch (error) {
        console.error("Conversation Error:", error);
      }
    };
    initConversation();
  }, []);

  useEffect(() => {
    if (!selectedConversation) return;
    loadConversation();
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadConversation = async () => {
    try {
      const res = await api.get(`/chat/${selectedConversation.id}`);
      setMessages(res.data.messages || []);
      setConversationId(selectedConversation.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || sending) return;
    if (!conversationId) {
      alert("Conversation not ready");
      return;
    }

    const currentMessage = message;
    setMessage("");
    setSending(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", content: currentMessage },
      { id: "loading", role: "assistant", loading: true },
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
            ? { role: "assistant", content: res.reply }
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
                content: "Something went wrong. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 w-full h-full min-h-0 bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gold/15 shadow-[0_20px_60px_-28px_rgba(10,15,28,0.35)] flex flex-col overflow-hidden">
      <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-ink/5 flex items-center justify-between gap-3 bg-gradient-to-r from-ivory to-white">
        <div className="min-w-0">
          <h2 className="font-display text-base sm:text-lg font-semibold text-ink truncate">
            {userName ? `Welcome, ${userName}` : "AI Palm Reader"}
          </h2>
          <p className="text-[11px] sm:text-xs text-muted mt-0.5 font-light truncate">
            Ask anything about your palm or stars
          </p>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blush flex items-center justify-center text-gold-deep border border-gold/20 shrink-0">
          <Hand size={18} />
        </div>
      </div>

      {selectedPalm && (
        <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gold/15 bg-blush/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Paperclip size={15} className="text-gold-deep shrink-0" />
            <span className="text-sm font-medium text-ink truncate">
              Palm #{selectedPalm.id} attached
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPalm(null)}
            className="text-muted hover:text-gold-deep transition p-1 shrink-0"
            aria-label="Remove attached palm"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 md:p-5">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-3 animate-fade-in">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blush flex items-center justify-center text-gold-deep mb-4 sm:mb-5 border border-gold/20">
              <Hand size={26} />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink break-words px-2">
              {userName ? (
                <>
                  Welcome,{" "}
                  <span className="italic text-gold-strong">{userName}</span>
                </>
              ) : (
                <>
                  Welcome to{" "}
                  <span className="italic text-gold-strong">HathDekho</span>
                </>
              )}
            </h3>
            <p className="mt-3 text-sm text-muted max-w-xs leading-relaxed font-light">
              {selectedPalm
                ? `Palm #${selectedPalm.id} is attached. Ask questions about this reading.`
                : "Select a palm, then start chatting."}
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className="mb-4 sm:mb-5">
            {msg.role === "user" ? (
              <div className="flex justify-end">
                <div className="max-w-[88%] sm:max-w-[80%] bg-night text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl rounded-br-md text-sm sm:text-[15px] leading-relaxed break-words">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blush flex items-center justify-center text-gold-deep border border-gold/15 shrink-0">
                    <Hand size={14} />
                  </div>
                  <span className="font-brand text-[10px] sm:text-xs tracking-[0.15em] text-ink">
                    HathDekho
                  </span>
                </div>
                <div className="pl-0 sm:pl-10 text-sm sm:text-[15px] leading-7 text-ink/85 break-words">
                  {msg.loading ? (
                    <div className="flex gap-1.5 items-center py-1 pl-9 sm:pl-0">
                      <span className="w-2 h-2 rounded-full bg-gold dot-bounce" />
                      <span
                        className="w-2 h-2 rounded-full bg-gold dot-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-gold dot-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none prose-headings:font-display prose-a:text-gold-deep">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-ink/5 p-3 sm:p-4 bg-ivory/60 safe-pb">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={
              selectedPalm ? "Ask about this palm..." : "Ask freely..."
            }
            className="flex-1 min-w-0 border border-ink/10 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:ring-4 focus:ring-gold/15 focus:border-gold bg-white transition text-sm sm:text-[15px] font-light"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!conversationId || sending || !message.trim()}
            className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-2xl bg-night hover:bg-night-soft disabled:opacity-40 text-gold flex items-center justify-center transition"
            aria-label="Send message"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
