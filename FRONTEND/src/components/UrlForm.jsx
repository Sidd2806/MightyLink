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
    <div className="w-full px-3 sm:px-4">
      <div className="w-full max-w-full sm:max-w-md md:max-w-2xl mx-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-md p-3 sm:p-6 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-white">
          URL Shortener
        </h2>

        {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

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

        {/* Custom slug */}
        {isAuthenticated && (
          <div className="space-y-1">
            <label className="text-sm text-white/80">
              Custom Slug (optional)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setError("");
              }}
              placeholder="Enter custom slug"
              className="w-full px-3 py-2 rounded-md bg-black/40 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!url || loading}
          className="w-full py-2 rounded-md text-white font-semibold bg-blue-700 transition-all disabled:opacity-60"
        >
          {loading ? "Creating..." : "Shorten URL"}
        </button>

        {/* Result */}
        {shortUrl && (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="w-full px-3 py-2 rounded-md bg-black/30 text-white border border-white/10 text-sm break-all"
            />

            <button
              onClick={handleCopy}
              className={`w-full py-2 rounded-md text-sm transition-colors ${
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
    </div>
  );
};

export default UrlForm;
