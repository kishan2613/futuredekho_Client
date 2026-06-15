import { useState } from "react";
import { UploadCloud } from "lucide-react";

function UploadWorkspace() {
  const [preview, setPreview] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">

      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">
          Upload Palm Image
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Upload a clear palm image for AI analysis
        </p>
      </div>

      {/* Upload Area */}
      <div className="flex-1 flex items-center justify-center py-8">

        <label className="w-full max-w-2xl cursor-pointer">
          <div className="h-[350px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-purple-500 transition">

            {preview ? (
              <img
                src={preview}
                alt="Palm Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <UploadCloud
                  size={60}
                  className="text-gray-400"
                />

                <h3 className="mt-4 text-lg font-medium">
                  Select or drag palm image
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG, WEBP
                </p>
              </>
            )}
          </div>

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
        </label>

      </div>

      {/* Button */}
      <div className="flex justify-center">
        <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
          Analyze Palm
        </button>
      </div>

    </div>
  );
}

export default UploadWorkspace;