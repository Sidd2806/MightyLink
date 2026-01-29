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
    <div className="p-6 max-w-sm mx-auto bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-lg font-bold">URL Shortener</h2>

      {/* Error message */}
      {error && (
        <p className="text-red-600 text-sm font-medium">{error}</p>
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
        className="w-full px-3 py-2 border rounded-md"
      />

      {/* Custom slug (only if logged in) */}
      {isAuthenticated && (
        <div>
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700"
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
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!url || loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Creating..." : "Shorten URL"}
      </button>

      {/* Result */}
      {shortUrl && (
        <div className="flex justify-between space-x-2">
          <input
            type="text"
            readOnly
            value={shortUrl}
            className="flex px-3 py-2 border rounded-md bg-gray-100 w-full"
          />
          <button
            onClick={handleCopy}
            className={`px-4  rounded-md transition-colors ${
              copied
                ? "bg-green-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
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
