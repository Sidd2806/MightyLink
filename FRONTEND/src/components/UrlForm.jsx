import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../api/shortUrl.api";
import { useSelector } from "react-redux";

const UrlForm = () => {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);

      const result = await createShortUrl({
        url,
        slug: slug.trim() || null,
      });

      setShortUrl(result);
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setCopied(false);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6  max-w-svw  mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-md space-y-4">
      <h2 className="text-lg font-bold text-white">URL Shortener</h2>

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-sm font-medium">{error}</p>
      )}

      {/* URL input */}
      <input
        type="url"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
          setError("");
        }}
        placeholder="Enter your URL"
        className="w-full px-3 py-2 rounded-md bg-black/40 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      {/* Custom slug (only if logged in) */}
      {isAuthenticated && (
        <div>
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-white/80"
          >
            Custom Slug (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setError("");
            }}
            placeholder="Enter custom slug"
            className="w-full px-4 py-2 rounded-md bg-black/40 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      )}

      {/* Submit button */}
      <div className="flex justify-center">

      <button
        onClick={handleSubmit}
        disabled={!url || loading}
        className="w-42   py-2 rounded-md text-white font-semibold bg-blue-700 cursor-pointer transition-all"
        >
        {loading ? "Creating..." : "Shorten URL"}
      </button>
        </div>

      {/* Result */}
      {shortUrl && (
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={shortUrl}
            className="flex-1 px-3 py-2 rounded-md bg-black/30 text-white border border-white/10"
          />
          <button
            onClick={handleCopy}
            className={`px-4 rounded-md transition-colors ${
              copied
                ? "bg-green-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
