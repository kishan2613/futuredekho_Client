import { useEffect, useState } from "react";
import { Hand, ImagePlus, Loader2, MessageSquare } from "lucide-react";
import api from "../services/backendapis";

function UploadWorkspace({
  selectedPalm,
  setSelectedPalm,
  selectedConversation,
  setSelectedConversation,
}) {
  const [palms, setPalms] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPalms();
    fetchConversations();
  }, []);

  const fetchPalms = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await api.get(`/palm/user/${userId}`);
      setPalms(res.data.palms || []);
    } catch (error) {
      console.error("Failed to fetch palms:", error);
    }
  };

  const fetchConversations = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const res = await api.get(`/chat/user/${userId}`);
      setConversations(res.data.conversations || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      setUploading(true);
      const userId = localStorage.getItem("user_id");
      const formData = new FormData();
      formData.append("image", selectedFile);

      const res = await api.post(
  `/palm/analyze?user_id=${userId}`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      setSelectedFile(null);
      await fetchPalms();
      setSelectedPalm({
        id: Number(res.data.palm_id),
        image_url: res.data.image_url,
      });
    } catch (error) {
      console.error("Upload Failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <aside className="w-full h-full bg-white/85 backdrop-blur-xl border border-gold/15 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-28px_rgba(10,15,28,0.35)] p-3 sm:p-5 overflow-y-auto">
      <div className="rounded-2xl bg-gradient-to-br from-blush to-ivory border border-gold/20 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <ImagePlus size={18} className="text-gold-deep shrink-0" />
          <h2 className="font-display text-lg sm:text-xl font-semibold text-ink">
            Upload palm
          </h2>
        </div>
        <p className="mt-1.5 text-xs sm:text-sm text-muted font-light">
          Clear palm photo for the best AI reading
        </p>

        <label
          htmlFor="palm-upload"
          className="mt-3 sm:mt-4 flex flex-col items-center justify-center border-2 border-dashed border-gold/30 rounded-2xl p-5 sm:p-7 cursor-pointer hover:bg-white/70 hover:border-gold/55 transition"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-gold-deep mb-2 sm:mb-3 shadow-sm border border-gold/15">
            <Hand size={20} />
          </div>
          <span className="font-semibold text-ink text-sm">
            Choose palm image
          </span>
          <span className="text-xs text-muted mt-1 font-light">
            JPG, PNG · Max 10MB
          </span>
          {selectedFile && (
            <span className="mt-3 px-3 py-1 bg-gold/15 text-gold-deep text-xs font-medium rounded-lg max-w-full truncate">
              {selectedFile.name}
            </span>
          )}
        </label>

        <input
          id="palm-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="hidden"
        />

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="btn-gold w-full mt-3 sm:mt-4 py-3 rounded-xl disabled:opacity-45 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Reading palm...
            </>
          ) : (
            "Analyze palm"
          )}
        </button>
      </div>

      <div className="mt-5 sm:mt-7 pt-5 sm:pt-6 border-t border-ink/5">
        <h2 className="font-display text-base sm:text-lg font-semibold text-ink mb-3 sm:mb-4 flex items-center gap-2">
          <Hand size={17} className="text-gold-deep" />
          My palm readings
        </h2>
        <div className="space-y-3">
          {palms.length === 0 && (
            <p className="text-center py-6 sm:py-8 text-sm text-muted font-light">
              No palm analyses yet
            </p>
          )}
          {palms.map((palm) => {
            const active = selectedPalm?.id === palm.id;
            return (
              <button
                key={palm.id}
                type="button"
                onClick={() => setSelectedPalm(palm)}
                className={`w-full text-left overflow-hidden rounded-2xl transition duration-300 ${
                  active
                    ? "ring-2 ring-gold shadow-md"
                    : "border border-ink/8 hover:border-gold/30 hover:shadow-sm"
                }`}
              >
                <img
                  src={palm.image_url}
                  alt={`Palm ${palm.id}`}
                  className="w-full h-24 sm:h-28 object-cover"
                />
                <div className="p-3 bg-white flex justify-between items-center gap-2">
                  <span className="text-sm font-medium text-ink truncate">
                    Palm #{palm.id}
                  </span>
                  {active && (
                    <span className="font-brand text-[9px] tracking-[0.2em] uppercase text-gold-deep shrink-0">
                      Attached
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 sm:mt-7 pt-5 sm:pt-6 border-t border-ink/5 pb-2">
        <h2 className="font-display text-base sm:text-lg font-semibold text-ink mb-3 sm:mb-4 flex items-center gap-2">
          <MessageSquare size={17} className="text-gold-deep" />
          Conversations
        </h2>
        <div className="space-y-2">
          {conversations.length === 0 && (
            <p className="text-center py-6 text-sm text-muted font-light">
              No conversations yet
            </p>
          )}
          {conversations.map((conv) => {
            const active = selectedConversation?.id === conv.id;
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-3 sm:p-3.5 rounded-2xl text-left transition flex items-center gap-3 ${
                  active
                    ? "bg-blush border border-gold/30"
                    : "bg-white border border-ink/8 hover:bg-ivory"
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-blush flex items-center justify-center text-gold-deep shrink-0 border border-gold/15">
                  <MessageSquare size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink text-sm truncate">
                    {conv.title || `Chat #${conv.id}`}
                  </p>
                  <p className="text-xs text-muted mt-0.5 font-light">
                    Astrology chat
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default UploadWorkspace;
