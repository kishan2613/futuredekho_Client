import { useEffect, useState } from "react";
import axios from "axios";

function UploadWorkspace({
  selectedPalm,
  setSelectedPalm,
   selectedConversation,
  setSelectedConversation
}) {
  const [palms, setPalms] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPalms(),
    fetchConversations();
  }, []);

  const fetchPalms = async () => {
    try {
      const userId = localStorage.getItem("user_id");

      const res = await axios.get(
        `https://futuredekho-server.onrender.com/palm/user/${userId}`
      );

      setPalms(res.data.palms);
    } catch (error) {
      console.error("Failed to fetch palms:", error);
    }
  };

  const fetchConversations = async () => {
  try {

    const userId = localStorage.getItem("user_id");

    const res = await axios.get(
      `https://futuredekho-server.onrender.com/chat/user/${userId}`
    );

    setConversations(
      res.data.conversations
    );

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

      const res = await axios.post(
        `https://futuredekho-server.onrender.com/palm/analyze?user_id=${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedFile(null);

      await fetchPalms();

      // Auto attach uploaded palm
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

  <div className="w-[350px] bg-white/90 backdrop-blur-xl border border-orange-100 rounded-3xl shadow-xl p-5 overflow-y-auto">

```
{/* Upload Section */}
<div className="mb-8">

  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-5 border border-orange-200">

    <h2 className="text-xl font-bold text-gray-800">
      ✨ Upload Palm
    </h2>

    <p className="text-sm text-gray-500 mt-1 mb-4">
      Upload a clear palm image for AI analysis
    </p>

    <label
      htmlFor="palm-upload"
      className="
        flex flex-col items-center justify-center
        border-2 border-dashed border-orange-300
        rounded-2xl p-8 cursor-pointer
        hover:bg-orange-50 transition
      "
    >
      <div className="text-5xl mb-3">
        🖐️
      </div>

      <span className="font-semibold text-gray-700">
        Choose Palm Image
      </span>

      <span className="text-xs text-gray-500 mt-1">
        JPG, PNG • Max 10MB
      </span>

      {selectedFile && (
        <div className="mt-4 px-3 py-1 bg-orange-100 rounded-full text-orange-600 text-sm">
          {selectedFile.name}
        </div>
      )}
    </label>

    <input
      id="palm-upload"
      type="file"
      accept="image/*"
      onChange={(e) =>
        setSelectedFile(
          e.target.files?.[0] || null
        )
      }
      className="hidden"
    />

    <button
      onClick={handleUpload}
      disabled={!selectedFile || uploading}
      className="
        w-full mt-4 py-3
        bg-gradient-to-r
        from-orange-500
        to-amber-400
        text-white
        rounded-xl
        font-semibold
        hover:shadow-lg
        disabled:opacity-50
        transition
      "
    >
      {uploading
        ? "🔮 Reading Palm..."
        : "Analyze Palm"}
    </button>

  </div>

</div>

{/* Palm Analyses */}
<div className="border-t border-orange-100 pt-6">

  <h2 className="text-xl font-bold mb-4 text-gray-800">
    🖐️ My Palm Readings
  </h2>

  <div className="space-y-4">

    {palms.length === 0 && (
      <div className="text-center py-8 text-gray-500">
        No palm analyses yet
      </div>
    )}

    {palms.map((palm) => (
      <div
        key={palm.id}
        onClick={() =>
          setSelectedPalm(palm)
        }
        className={`
          overflow-hidden rounded-2xl cursor-pointer
          transition-all duration-300

          ${
            selectedPalm?.id === palm.id
              ? "ring-2 ring-orange-500 shadow-lg"
              : "border border-gray-200 hover:shadow-md"
          }
        `}
      >

        <img
          src={palm.image_url}
          alt="Palm"
          className="w-full h-32 object-cover"
        />

        <div className="p-3 bg-white">

          <div className="flex justify-between items-center">

            <span className="font-medium text-gray-800">
              Palm Analysis
            </span>

            {selectedPalm?.id === palm.id && (
              <span className="text-xs text-orange-500">
                Attached
              </span>
            )}

          </div>

        </div>

      </div>
    ))}

  </div>

</div>

{/* Conversations */}
<div className="border-t border-orange-100 mt-8 pt-6">

  <h2 className="text-xl font-bold mb-4 text-gray-800">
    💬 Conversations
  </h2>

  <div className="space-y-3">

    {conversations.length === 0 && (
      <div className="text-center py-4 text-gray-500">
        No conversations found
      </div>
    )}

    {conversations.map((conv) => (

      <div
        key={conv.id}
        onClick={() =>
          setSelectedConversation(conv)
        }
        className={`
          p-4 rounded-2xl cursor-pointer transition

          ${
            selectedConversation?.id === conv.id
              ? "bg-orange-50 border border-orange-300"
              : "bg-white border border-gray-200 hover:bg-gray-50"
          }
        `}
      >

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            💬
          </div>

          <div className="flex-1 min-w-0">

            <p className="font-medium text-gray-800 truncate">
              {conv.title}
            </p>

            <p className="text-xs text-gray-500">
              Astrology Chat
            </p>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>
```

  </div>
);

}

export default UploadWorkspace; 